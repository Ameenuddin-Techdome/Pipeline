"use server"

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"

export const fetchStrapiCategoryComponents = async (
  categoryId: string,
  section: "Disclosure" | "Overview" | "Testimonial"
) => {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/categories/${categoryId}?populate[${section}][populate]=*`,
    )

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()

    //Strapi nests data like: data.attributes.<Section>
    const sectionData = json?.data?.[section] || json?.data?.attributes?.[section]

    return sectionData ?? null
  } catch (error) {
    console.error(`Error fetching ${section}:`, error)
    return null
  }
}
