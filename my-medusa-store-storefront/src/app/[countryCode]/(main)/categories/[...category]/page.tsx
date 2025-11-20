// working code commented out for reference-
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export const revalidate = 60; // revalidate every 60s

export async function generateStaticParams() {
  const product_categories = await listCategories().catch(() => [])
  const regions = await listRegions().catch(() => [])

  if (!product_categories.length || !regions.length) return []

  const countryCodes = regions
  .map((r) => r.countries?.map((c) => c.iso_2))
  .flat()
  .filter((code): code is string => Boolean(code))

  const categoryHandles = product_categories.map((c: any) => c.handle)

  return countryCodes.flatMap((countryCode: string) =>
    categoryHandles.map((handle: string) => ({
      countryCode,
      category: [handle],
    }))
  )
}

export const dynamicParams = true // enables fallback mode


export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  try {
    const productCategory = await getCategoryByHandle(params.category)

    if (!productCategory) {
      return {
        title: "Category Not Found | Medusa Store",
        description: "The category you are looking for does not exist.",
      }
    }

    const title = productCategory.name + " | Medusa Store"
    const description = productCategory.description ?? `${title} category.`

    return {
      title,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
      },
    }
  } catch {
    return {
      title: "Category Not Found | Medusa Store",
      description: "The category you are looking for does not exist.",
    }
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <> 
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
    </>
  )
}







// export async function generateStaticParams() {
//   const product_categories = await listCategories()

//   if (!product_categories) {
//     return []
//   }

//   // const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
//   //   regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
//   // )

//   const countryCodes = (await listRegions())
//     ?.map((r) => r.countries?.map((c) => c.iso_2))
//     .flat()
//     .filter(Boolean)

//   const categoryHandles = product_categories.map(
//     (category: any) => category.handle
//   )

//   const staticParams =
//     countryCodes
//       ?.filter((code): code is string => Boolean(code))
//       .map((countryCode) =>
//         categoryHandles.map((handle: string) => ({
//           countryCode,
//           category: [handle],
//         }))
//       )
//       .flat() ?? []

//   return staticParams
// }


// export async function generateMetadata(props: Props): Promise<Metadata> {
//   const params = await props.params
//   try {
//     const productCategory = await getCategoryByHandle(params.category)

//     const title = productCategory.name + " | Medusa Store"

//     const description = productCategory.description ?? `${title} category.`

//     return {
//       title: `${title} | Medusa Store`,
//       description,
//       alternates: {
//         canonical: `${params.category.join("/")}`,
//       },
//     }
//   } catch (error) {
//     notFound()
//   }
// }

