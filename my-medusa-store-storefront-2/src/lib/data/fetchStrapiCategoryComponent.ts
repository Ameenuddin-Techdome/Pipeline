"use server"

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"

export const fetchStrapiCategoryComponents = async (
  handle: string,
  section: "Disclosure" | "Overview" | "Testimonial" | "promotionalImages"
) => {
  // Find category id from strapi by handle
  const res = await fetch(
    `${STRAPI_URL}/api/categories?filters[handle][$eq]=${handle}`
  )
  const json = await res.json()
  const categoryId = json?.data?.[0]?.documentId
  if (!categoryId) return null;

  try {
    const res2 = await fetch(`${STRAPI_URL}/api/categories/${categoryId}?populate[${section}][populate]=*`)

    if (!res2.ok) {
      throw new Error(`Strapi API error: ${res2.status} ${res2.statusText}`)
    }

    const json2 = await res2.json()

    const sectionData = json2?.data?.[section]
    //console.log("Section data: ",sectionData)

    return sectionData ?? null
  } catch (error) {
    console.error(`Error fetching ${section}:`, error)
    return null
  }
}

// "use server"

// const STRAPI_URL =
//   process.env.STRAPI_URL ||
//   process.env.NEXT_PUBLIC_STRAPI_URL ||
//   "http://localhost:1337"

// export const fetchStrapiCategoryComponents = async (
//   handle: string,
//   section: "Disclosure" | "Overview" | "Testimonial" | "promotionalImages"
// ) => {
//   const params = new URLSearchParams({
//     "filters[handle][$eq]": handle,
//   })

//   params.append(`populate[${section}][populate]`, "*");
//   try {
//     const res = await fetch(`${STRAPI_URL}/api/categories?${params.toString()}`)

//     if (!res.ok) {
//       throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
//     }

//     const json = await res.json()

//     const sectionData = json?.data?.[0]?.[section]

//     return sectionData ?? null
//   } catch (error) {
//     console.error(`Error fetching ${section}:`, error)
//     return null
//   }
// }
