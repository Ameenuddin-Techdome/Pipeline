const STRAPI_URL = process.env.PUBLIC_STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchStrapiTheme() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/theme`,
      { cache: "no-store" }
    )

    if (!res.ok) throw new Error("Failed to fetch theme")

    const data = await res.json()
    const theme = data?.data 
    //console.log("Fetched theme from Strapi:", theme)

    return {
      "--primary-color": theme.primary_color,
      "--secondary-color": theme.secondary_color,
      "--background-color": theme.background_color,
      "--surface-color": theme.surface_color,
      "--text-primary": theme.text_primary,
      "--text-secondary": theme.text_secondary,
      "--border-color": theme.border_color,
    }
  } catch (error) {
    console.error("Error fetching theme from Strapi:", error)
    return null
  }
}
