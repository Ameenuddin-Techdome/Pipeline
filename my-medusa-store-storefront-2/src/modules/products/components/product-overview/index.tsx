"use client"

import React from "react"

interface RichTextBlock {
  type: string
  children: { text: string }[]
}

interface OverviewData {
  card1_title: string
  card1_description: RichTextBlock[]
  card2_title: string
  card2_description: RichTextBlock[]
  card3_title: string
  card3_description: RichTextBlock[]
}

const ProductOverviewSection = ({ overview }: { overview: OverviewData }) => {
  //console.log("ProductOverviewSection:", overview)

  const cards = [
    { title: overview.card1_title, description: overview.card1_description },
    { title: overview.card2_title, description: overview.card2_description },
    { title: overview.card3_title, description: overview.card3_description },
  ]

  return (
    <section
      className="content-container py-12 rounded-3xl bg-background"
    >
      <h2
        className="text-3xl font-semibold text-center mb-12"
        style={{ color: "var(--text-primary)" }}
      >
        Your goals, your plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl p-8 bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {card.title}
            </h3>
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-start gap-4">
              <span className="text-4xl font-bold text-gray-900 leading-none">
                {index + 1}
              </span>
              <p className="text-gray-600 text-base leading-relaxed">
                {card.description?.[0]?.children?.[0]?.text ?? ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductOverviewSection
