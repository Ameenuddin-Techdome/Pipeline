"use server"

import { fetchStrapiProducts } from "./strapi"

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337" // fallback for local dev

export async function fetchStrapiCategoryProducts(categoryIdOrSlug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories/${categoryIdOrSlug}?populate[products][populate]=*`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) throw new Error("Failed to fetch category from Strapi")

    const data = await res.json()
    const category = data.data
    const products = category.products || category.attributes?.products

    return {
      id: category.id,
      name: category.Name || category.attributes?.Name,
      products: products.map((p: any) => ({
        id: p.id,
        title: p.Title,
        description: p.Description,
        handle: p.handle,
        medusaId: p.medusa_id,
        image: p.Image?.[0]?.formats?.medium?.url || p.Image?.[0]?.url,
      })),
    }
  } catch (err) {
    console.error("Error fetching Strapi category products:", err)
    return null
  }
}
