"use client"
// ...existing code...
import React from "react"
import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type HeroProps = {
  headline?: string
  subtext?: string
  backgroundImage?: string
  backgroundGradient?: string
}

const DEFAULT_HEADLINE =
  "Healthy Life - Tailored to you"
const DEFAULT_SUBTEXT =
  "Look, feel and perform your best every day."

const clamp = (s: string | undefined, max = 150) =>
  (s ?? "").length > max ? (s ?? "").slice(0, max - 1) + "…" : s ?? ""

const PaymentBadges = () => {
  return (
    <div className="flex items-center gap-4 flex-wrap mt-6">
      {/* Klarna */}
      <div className="border border-gray-600 rounded px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-gray-100 hover:scale-105 transition-all duration-200 cursor-pointer">
        Klarna
      </div>

      {/* Afterpay */}
      <div className="border border-gray-600 rounded px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-gray-100 hover:scale-105 transition-all duration-200 cursor-pointer">
        Afterpay
      </div>

      {/* Apple Pay */}
      <div className="border border-gray-600 rounded px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-gray-100 hover:scale-105 transition-all duration-200 cursor-pointer">
        Apple Pay
      </div>
    </div>
  )
}

const CTAButton = ({ label }: { label: string }) => {
  const [loading, setLoading] = React.useState(false)

  const handleClick = () => {
    setLoading(true)
    console.log("CTA clicked - tracking event") // Replace with real analytics
    // simulate loading before navigating
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  return (
    <LocalizedClientLink href="/account">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex items-center justify-center gap-3 h-14 px-6 w-full sm:w-auto
          bg-white text-gray-900 font-semibold rounded-lg shadow-md 
          hover:bg-gray-100 hover:scale-105 active:scale-95
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/70
          disabled:opacity-70 disabled:cursor-not-allowed`}
        style={{ minHeight: 56 }}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
        ) : (
          <>
            <span>{label}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12l-3.75 3.75M3 12h18" />
            </svg>
          </>
        )}
      </button>
    </LocalizedClientLink>
  )
}

export default function Hero({
  headline = DEFAULT_HEADLINE,
  subtext = DEFAULT_SUBTEXT,
  backgroundImage,
  //backgroundGradient = "from-indigo-600 to-pink-500",
  backgroundGradient = "from-secondary to-primary",
}: HeroProps) {
  const safeHeadline = clamp(headline, 60)
  const safeSubtext = clamp(subtext, 150)

  const bgStyle: React.CSSProperties = backgroundImage
    ? {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
    : {}

  return (
    <section
      className={`w-full relative overflow-hidden text-white`}
      style={bgStyle}
      aria-labelledby="hero-heading"
    >
      {/* background gradient overlay (configurable via tailwind classes) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} opacity-90`}
        aria-hidden
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-left w-full
             h-screen py-10 lg:py-20"
      >
        <div className="w-full md:w-3/4 lg:w-2/3">
          <Heading
            id="hero-heading"
            level="h1"
            className="font-extrabold leading-tight text-3xl md:text-[48px] tracking-tight"
            style={{ lineHeight: 1.05 }}
          >
            {safeHeadline}
          </Heading>

          <p className="mt-6 text-base md:text-lg max-w-2xl">
            {safeSubtext}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <CTAButton label="Get Started" />
            <div className="mt-2 sm:mt-0">
              <PaymentBadges />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// ...existing code...