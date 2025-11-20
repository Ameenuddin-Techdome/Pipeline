"use server"

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337" // fallback for local dev

export const fetchStrapiCategories = async () => {
  try {
    const res = await fetch(`${STRAPI_URL}/api/categories?populate=*`, {
      next: { revalidate: 60 },
      // headers: {
      //   Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      // },
    })

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    if (!data.data) return []

    return data.data.map((item: any) => {
      const attributes = item.attributes || item

      return {
        id: item.id,
        uid: item.documentId,
        name: attributes.Name || "Unnamed Category",
        createdAt: attributes.createdAt,
        updatedAt: attributes.updatedAt,
        publishedAt: attributes.publishedAt,
        products: (attributes.products || []).map((prod: any) => ({
          id: prod.id,
          uid: prod.documentId,
          title: prod.Title,
          handle: prod.handle,
          description: prod.Description,
        })),
      }
    })
  } catch (error) {
    console.error("Error fetching Strapi categories:", error)
    return []
  }
}
