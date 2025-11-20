"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "@untitledui/icons"
import { Star } from "lucide-react"
import { getStrapiImageUrl } from "@lib/data/strapiMedia"
import { useCategoryTheme } from "@lib/context/CategoryThemeContext"

// --- Data ---
const testimonialsData = [
    {
        quote:
            "I lost 8 kilos in just 3 months without feeling deprived! I feel healthier, more confident, and full of energy again!",
        name: "Lana Steiner",
        role: "Designer, Layers",
        company: "Web Design Agency",
        rating: 5,
        image: "/lana-steiner.jpg", // Replace with your actual image path
    },
    {
        quote:
            "Simple, effective, and sustainable. I finally found a plan that works for my busy lifestyle. Highly recommended!",
        name: "Sarah Kim",
        role: "Manager, Finance",
        company: "Investment Bank",
        rating: 5,
        image: "/sarah-kim.jpg", // Replace with your actual image path
    },
    {
        quote:
            "I finally found a plan that works for my busy lifestyle. Highly recommended!",
        name: "John Doe",
        role: "Director, Finance",
        company: "Investment Bank",
        rating: 4,
        image: "/sarah-kim.jpg", // Replace with your actual image path
    },
]
/* ---------------------- Types ---------------------- */
export function generatePastelBackground(hex: string, strength: number = 0.85) {
  let f = parseInt(hex.slice(1), 16),
    R = f >> 16,
    G = (f >> 8) & 255,
    B = f & 255;

  // move the color toward white
  const newR = Math.round(R + (255 - R) * strength);
  const newG = Math.round(G + (255 - G) * strength);
  const newB = Math.round(B + (255 - B) * strength);

  return `rgb(${newR}, ${newG}, ${newB})`;
}

interface RichTextBlock {
    type: string
    children: { text: string }[]
}

export interface TestimonialData {
    quote: RichTextBlock[]
    name: string
    result?: string
    image?: any
    rating?: number
    role?: string
    company?: string
}

/* ---------------------- Utils ---------------------- */

export const extractText = (blocks?: RichTextBlock[]) => {
    if (!blocks || !Array.isArray(blocks)) return ""
    return blocks
        .map((b) => b.children?.map((c) => c.text).join(" ") || "")
        .join(" ")
}

/* ---------------------- Component ---------------------- */

const Testimonials = ({
    testimonials,
}: {
    testimonials: TestimonialData[]
}) => {
     const {color,backgroundColor}=useCategoryTheme();
    //console.log("Testimonials: ",testimonials)

    /* ----- Protect Against Missing/Empty Data ------- */
    if (!testimonials || testimonials.length === 0) {
        return null
    }

    const [currentIndex, setCurrentIndex] = useState(0)

    // Prevent out-of-range errors
    const safeIndex = Math.min(currentIndex, testimonials.length - 1)
    const current = testimonials[safeIndex]

    /* ----- Extract Data Safely ----- */
    const quoteText = extractText(current.quote)
    const name = current.name || ""
    const role = current.role || "Customer"
    const company = current.company || "Web Design Agency"
    const rating = current.rating ?? 3

    // Strapi image — use medium > small > raw url
    const image = getStrapiImageUrl(current.image) || "/placeholder.jpg"

    /* ----- Navigation ----- */
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }

    /* ----- Star Rating Component ----- */
    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-white fill-white" : "text-gray-400"
                        }`}
                />
            ))}
        </div>
    )

    return (
        <div
            className="w-full flex flex-col py-12 sm:py-16 lg:py-20"
            style={{ backgroundColor }}
        >
            <div
                className="flex-1 w-full flex flex-col lg:flex-row overflow-hidden
                pl-4 sm:pl-8 lg:pl-20"
            style={{ backgroundColor: generatePastelBackground(backgroundColor) }}
            >
                {/* ----------------- Left: Quote ----------------- */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between py-10 pr-4 sm:pr-10">
                    <div className="flex-1 flex items-center lg:items-end">
                        <p
                            className="font-display font-medium 
                    text-2xl sm:text-3xl lg:text-[48px] 
                    leading-snug lg:leading-[60px] 
                    tracking-[-0.02em] text-[#181D27]"
                        >
                            {quoteText}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-row justify-between items-center mt-6 sm:mt-8 lg:mt-10">
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold text-[#181D27]">{name}</div>
                            <div className="text-sm sm:text-base text-[#535862]">{role}</div>
                        </div>

                        <div className="flex space-x-3 sm:space-x-4">
                            <button
                                onClick={handlePrev}
                                className="bg-white w-10 h-10 sm:w-12 sm:h-12 
                     rounded-full flex items-center justify-center 
                     border-2 border-current hover:bg-white transition"
                                style={{ color }}
                            >
                                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            <button
                                onClick={handleNext}
                                className="bg-white w-10 h-10 sm:w-12 sm:h-12 
                     rounded-full flex items-center justify-center 
                     border-2 border-current hover:bg-white transition"
                                style={{ color }}
                            >
                                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ----------------- Right: Image ----------------- */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[500px]">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-fill"
                        priority
                    />
                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-white text-xl font-semibold">{name}</div>
                                <div className="text-white/90 text-sm mt-1">{role}</div>
                                <div className="text-white/90 text-sm">
                                    {company ? `${company}` : ""}
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <StarRating rating={rating} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials