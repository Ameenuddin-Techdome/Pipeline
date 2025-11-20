import { fetchStrapiInformationalPage } from "@lib/data/fetchStrapiInformational"
import React from "react"

export default async function InfoPage({ params }: { params: { slug: string } }) {
  const pageData = await fetchStrapiInformationalPage(params.slug)

  if (!pageData) {
    return (
      <div className="py-20 text-center text-gray-600">
        Page not found
      </div>
    )
  }

  const { Title, Content } = pageData

  const renderRichText = (blocks: any[]) => {
    return blocks.map((block, i) => {
      if (block.type === "paragraph") {
        return (
          <p key={i} className="mb-4 text-gray-700 leading-relaxed">
            {block.children.map((child: any, j: number) => (
              <span key={j}>{child.text}</span>
            ))}
          </p>
        )
      }
      if (block.type === "heading") {
        return (
          <h2 key={i} className="text-2xl font-semibold mt-6 mb-3">
            {block.children.map((child: any) => child.text).join("")}
          </h2>
        )
      }
      return null
    })
  }

  return (
     <main className="flex justify-start px-8 md:px-16 py-20 bg-white">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">
          {Title}
        </h1>

        <article className="text-gray-800 text-[15px] leading-7 space-y-4">
          {renderRichText(Content)}
        </article>
      </div>
    </main>
  )
}
