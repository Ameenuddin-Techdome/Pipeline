"use client"

import React from "react"

export default function ThemePreview() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">
        Theme Preview
      </h1>
      <p className="text-text-secondary">
        These boxes show your current theme colors from Strapi.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-primary text-surface text-center">
          Primary
        </div>
        <div className="p-6 rounded-xl bg-secondary text-surface text-center">
          Secondary
        </div>
        <div className="p-6 rounded-xl bg-surface text-text-primary border border-border text-center">
          Surface
        </div>
        <div className="p-6 rounded-xl bg-background text-text-primary border border-border text-center">
          Background
        </div>
        <div className="p-6 rounded-xl bg-surface text-text-primary border border-border text-center">
          Text Primary
        </div>
        <div className="p-6 rounded-xl bg-surface text-text-secondary border border-border text-center">
          Text Secondary
        </div>
      </div>
    </div>
  )
}
