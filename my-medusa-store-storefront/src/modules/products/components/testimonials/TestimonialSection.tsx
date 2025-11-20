"use client"

import React from "react"
import { TestimonialCard } from "./TestimonialCard"

interface RichTextBlock {
  type: string
  children: { text: string }[]
}

interface ImageData {
  url: string
}

interface TestimonialData {
  quote: RichTextBlock[]
  name: string
  result: string
  image?: ImageData
}

export const TestimonialSection = ({testimonials}:{testimonials:TestimonialData[]}) => {

  return (
    <section className="content-container mt-5">
      <h2 className="text-3xl font-semibold text-center mb-10">Real Results, Real People</h2>
      <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 no-scrollbar">
        {testimonials.map((t, i) => (
          <div key={i} className="snap-center shrink-0">
            <TestimonialCard
              quote={t.quote?.[0]?.children?.[0]?.text || ""}
              name={t.name}
              result={t.result}
              image={t.image?.url ? t.image.url : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
