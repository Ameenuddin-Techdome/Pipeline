"use client"

import { useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"

export default function NavClient({ categories }: { categories: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenId(null)
  }, [pathname])

  // Close dropdown on outside click
  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isClient])

  const toggleDropdown = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  if (!isClient) {
    return (
      <div className="flex items-center h-full gap-x-8 relative w-full justify-center">
        {categories.map((cat) => (
          <div key={cat.id} className="uppercase font-medium text-sm">
            {cat.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className="flex items-center h-full gap-x-8 relative w-full justify-center"
    >
      {categories.map((cat) => (
        <CategoryDropdown
          key={cat.id}
          category={cat}
          isOpen={openId === cat.id}
          onToggle={() => toggleDropdown(cat.id)}
        />
      ))}
    </div>
  )
}

function CategoryDropdown({
  category,
  isOpen,
  onToggle,
}: {
  category: any
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="relative">
      <button
        className="uppercase font-medium text-sm hover:text-black transition"
        onClick={onToggle}
      >
        {category.name}
      </button>

      <div
        className={`fixed left-0 w-full bg-white shadow-lg rounded-lg p-8 z-50 transition-all duration-500 ease-in-out
          ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-text-secondary font-semibold mb-2">{category.name}</h3>
            {category.products?.length === 0 && (
              <p className="text-sm text-gray-500">No products</p>
            )}
            {category.products?.map((prod: any) => (
              <LocalizedClientLink
                key={prod.id}
                href={`/products/${prod.handle}`}
                className="block text-gray-600 hover:text-black text-sm py-1"
              >
                {prod.title}
              </LocalizedClientLink>
            ))}
          </div>

          {/* Promo Section */}
          <div className="col-span-2 flex items-center justify-center bg-green-100 rounded-lg p-6">
            <div className="text-center">
              <h4 className="font-semibold text-gray-800">
                Personalized {category.name} Treatments
              </h4>
              <p className="text-sm text-gray-600">
                Starting from $139 first month*
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}