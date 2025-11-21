"use client"

import React from "react"
import Image from "next/image"
import { getStrapiImageUrls } from "@lib/data/strapiMedia"

const PromotionalGallery = ({
  title,
  promotionalImages = [],
}: {
  title: string
  promotionalImages: any[]
}) => {
  //console.log("Raw promotionalImages:", promotionalImages);

  if (!Array.isArray(promotionalImages) || promotionalImages.length === 0) {
    return null // prevents crashing with undefined array
  }

  const images = getStrapiImageUrls(promotionalImages)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <section
      className="w-full flex flex-col relative py-16 px-4 sm:px-10 lg:px-20 overflow-hidden bg-background"
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181D27] leading-tight">
            Ready to Start Your {title} Journey?
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#535862] max-w-xl sm:max-w-2xl mx-auto">
            Order your essentials and get trusted clinic-backed care delivered
            to your doorstep.
          </p>

          <button
            className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 text-white text-base sm:text-lg 
                   font-medium rounded-md shadow-lg hover:brightness-110 transition-all bg-primary"
          >
            Explore Now
          </button>
        </div>

        {/* Image Carousel */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          {images.map((imgUrl, i) => {
            const staggerClass = i % 2 === 0 ? "mt-6 sm:mt-10 lg:mt-16" : "mt-0"

            return (
              <div
                key={i}
                className={`
              relative 
              min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[300px]
              h-[260px] sm:h-[320px] md:h-[380px] lg:h-[450px]
              rounded-2xl overflow-hidden snap-center
              ${staggerClass}
            `}
              >
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={`Promotional image ${i + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-600">
                    No image
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PromotionalGallery
