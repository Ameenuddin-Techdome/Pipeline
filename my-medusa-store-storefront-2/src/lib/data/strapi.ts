// Remove this line if not in App Router
// "use server"

const STRAPI_URL =
  process.env.PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL

export const fetchStrapiProducts = async () => {
  try {
    const res = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
      next: { revalidate: 300 }
      // headers: {
      //   Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      // },
    })

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    //console.log("Strapi raw data:", JSON.stringify(data, null, 2))

    // If data.data is null or empty, return empty array
    if (!data.data) {
      return []
    }

    return data.data.map((item: any) => {
      // Handle both Strapi v4 and legacy response formats
      const attributes = item.attributes || item
      const imagesArray = attributes.Image?.data || attributes.Image || []

      const images = imagesArray.map((img: any, index: number) => {
        const imageAttributes = img.attributes || img
        const imageUrl =
          imageAttributes.url ||
          imageAttributes.formats?.thumbnail?.url ||
          imageAttributes.formats?.small?.url

        return {
          id: `strapi-${img.id}-${index}`,
          url: imageUrl?.startsWith("http")
            ? imageUrl
            : `${STRAPI_URL}${imageUrl}`,
          alt:
            imageAttributes.alternativeText ||
            attributes.Title ||
            item.Title ||
            "Product image",
        }
      })

      const thumbnail = images[0]?.url || ""

      let category = null
      if (attributes.category) {
        if (attributes.category.data) {
          // Format: { category: { data: { id, attributes: { Name, ... } } } }
          const c = attributes.category.data
          category = {
            id: c.id,
            name: c.attributes?.Name || "Uncategorized",
            documentId: c.attributes?.documentId || null,
          }
        } else {
          // Format: { category: { id, Name, documentId, ... } }
          const c = attributes.category
          category = {
            id: c.id,
            name: c.Name || "Uncategorized",
            documentId: c.documentId || null,
          }
        }
      }

      return {
        id: item.id,
        title: attributes.Title || item.Title,
        description: (attributes.Description || item.Description)
          ?.map((block: any) =>
            block.children?.map((child: any) => child.text).join("")
          )
          .join("\n"),
        handle: attributes.handle || item.handle,
        price: attributes.Price || item.Price || null,
        currency: attributes.Currency || item.Currency || "USD",
        images,
        thumbnail,
        category,
      }
    })
  } catch (error) {
    console.error("Error fetching Strapi products:", error)
    return []
  }
}
