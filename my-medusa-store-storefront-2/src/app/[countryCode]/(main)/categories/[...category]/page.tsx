import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{ sortBy?: SortOptions; page?: string }>
}

export const revalidate = 60 // revalidate every minute

export async function generateStaticParams() {
  const categories = await listCategories().catch(() => [])
  const regions = await listRegions().catch(() => [])

  if (!categories.length || !regions.length) return []

  const countryCodes = regions
    .map((r) => r.countries?.map((c) => c.iso_2))
    .flat()
    .filter((code): code is string => Boolean(code))

  return countryCodes.flatMap((countryCode: string) =>
    categories.map((cat: any) => ({
      countryCode,
      category: [cat.handle],
    }))
  )
}

export const dynamicParams = true

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category } = await props.params

  try {
    const categoryData = await getCategoryByHandle(category)

    if (!categoryData) {
      return {
        title: "Category Not Found | Medusa Store",
        description: "This category does not exist.",
      }
    }

    return {
      title: `${categoryData.name} | Medusa Store`,
      description:
        categoryData.description ?? `${categoryData.name} category products.`,
      alternates: {
        canonical: `${category.join("/")}`,
      },
    }
  } catch {
    return {
      title: "Category | Medusa Store",
      description: "Browse our products.",
    }
  }
}

export default async function CategoryPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { sortBy, page } = searchParams

  const categoryData = await getCategoryByHandle(params.category)

  if (!categoryData) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={categoryData}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
