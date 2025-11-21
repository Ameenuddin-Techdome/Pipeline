"use client"

import { useState } from "react"

interface RichTextBlock {
  type: string
  children: { text: string }[]
}

interface DisclosureData {
  fda_disclaimer: RichTextBlock[]
  usage_info: RichTextBlock[]
  regulatory_info: RichTextBlock[]
  resources_link: string
}

export default function ProductDisclosure({ disclosure }: { disclosure: DisclosureData }) {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const toggleSection = (id: string) => setOpenSection(prev => (prev === id ? null : id))

  //console.log("ProductDisclosure received data:", disclosure)

  return (
    <section className="border-t border-gray-200 p-10">
      <h2 className="text-lg font-semibold mb-4">Important Information</h2>

      {/* FDA Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm p-4 rounded-md mb-6">
        <strong>FDA Disclaimer:</strong>{" "}
        {disclosure?.fda_disclaimer?.[0]?.children?.[0]?.text ||
          "These statements have not been evaluated by the FDA."}
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-3 text-sm text-gray-700">
        <DisclosureItem
          id="usage"
          title="Usage & Safety Information"
          isOpen={openSection === "usage"}
          onToggle={() => toggleSection("usage")}
        >
          {disclosure?.usage_info?.map((block, i) => (
            <p key={i} className="text-[14px] leading-relaxed mb-2">
              {block.children?.[0]?.text}
            </p>
          ))}
        </DisclosureItem>

        <DisclosureItem
          id="regulations"
          title="Regulatory and Legal Information"
          isOpen={openSection === "regulations"}
          onToggle={() => toggleSection("regulations")}
        >
          {disclosure?.regulatory_info?.map((block, i) => (
            <p key={i} className="text-[14px] leading-relaxed mb-2">
              {block.children?.[0]?.text}
            </p>
          ))}
        </DisclosureItem>

        <DisclosureItem
          id="resources"
          title="Additional Resources"
          isOpen={openSection === "resources"}
          onToggle={() => toggleSection("resources")}
        >
          <p className="text-[14px] leading-relaxed">
            Learn more at{" "}
            <a
              href={disclosure?.resources_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {disclosure?.resources_link}
            </a>
          </p>
        </DisclosureItem>
      </div>
    </section>
  )
}

function DisclosureItem({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: {
  id: string
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-medium text-gray-800">{title}</span>
        <span className="text-gray-600 text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`px-4 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 py-3" : "max-h-0 py-0"
        }`}
      >
        {isOpen && <div className="text-gray-700 text-[14px]">{children}</div>}
      </div>
    </div>
  )
}