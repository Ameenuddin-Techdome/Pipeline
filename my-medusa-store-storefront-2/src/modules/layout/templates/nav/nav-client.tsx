"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NavClient({ categories }: { categories: any[] }) {
  return (
    <div
      className="flex items-center h-full gap-x-8 relative w-full justify-center"
    >
      {categories.map((category,key) => (
        <LocalizedClientLink key={key}
          href={`/categories/${category.handle}`} // or category.name if slug not available
          className="uppercase font-medium text-sm hover:text-black transition"
        >
          {category.name}
        </LocalizedClientLink>
      ))}
    </div>
  )
}
