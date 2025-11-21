const STRAPI_URL = process.env.PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchStrapiInformationalPage(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/informational-pages?filters[slug][$eq]=${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to Information page")
  }

  const data = await res.json()
  //console.log("Fetched informational page data:", data);
  return data.data[0];
}