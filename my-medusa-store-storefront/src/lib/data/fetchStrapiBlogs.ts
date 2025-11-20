// src/lib/data/fetchStrapiBlogs.ts
"use server"

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL;

export const fetchStrapiBlogs = async () => {
  try {
    const res = await fetch(`${STRAPI_URL}/api/blogs?populate=*`, {
      next: { revalidate: 60 },
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    if (!data.data) return []

    return data.data.map((item: any) => {
      const attributes = item.attributes || item
      const imageData = attributes.Image?.data || []
      const imageUrl = imageData[0]?.attributes?.url
        ? imageData[0].attributes.url.startsWith("http")
          ? imageData[0].attributes.url
          : `${STRAPI_URL}${imageData[0].attributes.url}`
        : null

      return {
        id: item.id,
        uid: item.documentId,
        title: attributes.Title || "Untitled",
        content: attributes.Content || "",
        slug: attributes.Slug || "",
        thumbnail: imageUrl,
        publishedAt: attributes.publishedAt,
      }
    })
  } catch (error) {
    console.error("Error fetching Strapi blogs:", error)
    return []
  }
}
