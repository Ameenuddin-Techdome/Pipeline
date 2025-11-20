const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL

export async function fetchCompanyInfo() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/company-info`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data.data;
  } 
  catch (error) {
    console.error("Error fetching Strapi categories:", error)
    return []
  }
}
