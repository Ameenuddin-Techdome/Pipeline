const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL

export const fetchStrapiBlogById = async (uid: string) => {
  try {
    const res = await fetch(`${STRAPI_URL}/api/blogs/${uid}?populate=*`, {
      cache: "no-store" 
    })

    if (!res.ok) throw new Error(`Failed to fetch blog: ${res.statusText}`)
    const data = await res.json()

    const item = data.data
    if (!item) return null

    const attributes = item
    // console.log("Blog attributes:", attributes);

    const imageData = attributes.Image?.[0]
    const imageUrl = imageData?.url
      ? imageData.url.startsWith("http")
        ? imageData.url
        : `${STRAPI_URL}${imageData.url}`
      : ""

    return {
      id: item.id,
      title: attributes.Title,
      content: attributes.Content,
      image: imageUrl,
      author: attributes.Author,
      publishedAt: attributes.publishedAt,
      createdAt: attributes.createdAt,
    }
  } catch (error) {
    console.error("Error fetching blog by id:", error)
    return null
  }
}
