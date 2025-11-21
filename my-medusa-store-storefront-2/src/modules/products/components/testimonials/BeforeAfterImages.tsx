"use client"

import React from "react"

interface BeforeAfterImagesProps {
  before: string
  after: string
  alt?: string
}

export const BeforeAfterImages: React.FC<BeforeAfterImagesProps> = ({ before, after, alt }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
      {/* Before Image */}
      <div className="w-full md:w-1/2 max-w-[280px] bg-gray-100 rounded-2xl overflow-hidden">
        <img
          src={before}
          alt={alt ? `${alt} - before` : "Before"}
          className="w-full h-auto object-cover aspect-[3/4]"
          loading="lazy"
        />
        <p className="text-center mt-2 text-sm text-gray-600 font-medium">Before</p>
      </div>

      {/* After Image */}
      <div className="w-full md:w-1/2 max-w-[280px] bg-gray-100 rounded-2xl overflow-hidden">
        <img
          src={after}
          alt={alt ? `${alt} - after` : "After"}
          className="w-full h-auto object-cover aspect-[3/4]"
          loading="lazy"
        />
        <p className="text-center mt-2 text-sm text-gray-600 font-medium">After</p>
      </div>
    </div>
  )
}
