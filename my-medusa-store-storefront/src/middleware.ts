import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

console.log("BACKEND_URL: "+BACKEND_URL);
console.log("PUBLISHABLE_API_KEY: "+PUBLISHABLE_API_KEY );
console.log("DEFAULT_REGION: "+DEFAULT_REGION);

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    console.error("MEDUSA_BACKEND_URL is not defined")
    return null
  }

  if (!PUBLISHABLE_API_KEY) {
    console.error("NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is not defined")
    return null
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    try {
      // Fetch regions from Medusa
      const response = await fetch(`${BACKEND_URL}/store/regions`, {
        headers: {
          "x-publishable-api-key": PUBLISHABLE_API_KEY,
        },
        next: {
          revalidate: 3600,
          tags: [`regions-${cacheId}`],
        },
        cache: "force-cache",
      })

      if (!response.ok) {
        console.error(`Failed to fetch regions: ${response.status} ${response.statusText}`)
        return null
      }

      const json = await response.json()
      const { regions } = json

      if (!regions?.length) {
        console.error("No regions found in response")
        return null
      }

      // Create a map of country codes to regions
      regions.forEach((region: HttpTypes.StoreRegion) => {
        region.countries?.forEach((c) => {
          if (c.iso_2) {
            regionMapCache.regionMap.set(c.iso_2, region)
          }
        })
      })

      regionMapCache.regionMapUpdated = Date.now()
    } catch (error) {
      console.error("Error fetching regions:", error)
      return null
    }
  }

  return regionMapCache.regionMap
}

async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    console.error("Error getting country code:", error)
    return DEFAULT_REGION
  }
}

export async function middleware(request: NextRequest) {
  try {
    // Skip static assets
    if (request.nextUrl.pathname.includes(".")) {
      return NextResponse.next()
    }

    let cacheIdCookie = request.cookies.get("_medusa_cache_id")
    let cacheId = cacheIdCookie?.value || crypto.randomUUID()

    // Try to get region map
    const regionMap = await getRegionMap(cacheId)

    // If regionMap fails, fallback to default region
    if (!regionMap || regionMap.size === 0) {
      console.warn("Region map not available, using default region")
      const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()
      
      // If URL already has a country code, let it through
      if (urlCountryCode && urlCountryCode.length === 2) {
        return NextResponse.next()
      }

      // Redirect to default region
      const redirectPath = request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
      const queryString = request.nextUrl.search ? request.nextUrl.search : ""
      const redirectUrl = `${request.nextUrl.origin}/${DEFAULT_REGION}${redirectPath}${queryString}`
      
      const response = NextResponse.redirect(redirectUrl, 307)
      response.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
      return response
    }

    const countryCode = await getCountryCode(request, regionMap)

    if (!countryCode) {
      console.error("No country code found")
      return NextResponse.next()
    }

    const urlHasCountryCode =
      countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode)

    // If country code is in URL and cache is set, continue
    if (urlHasCountryCode && cacheIdCookie) {
      return NextResponse.next()
    }

    // If country code is in URL but cache not set, set cache
    if (urlHasCountryCode && !cacheIdCookie) {
      const response = NextResponse.next()
      response.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
      return response
    }

    // Redirect to country-specific URL
    const redirectPath = request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname
    const queryString = request.nextUrl.search ? request.nextUrl.search : ""
    const redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
    
    const response = NextResponse.redirect(redirectUrl, 307)
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })
    
    return response

  } catch (error) {
    console.error("Middleware error:", error)
    // On error, just let the request through
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}