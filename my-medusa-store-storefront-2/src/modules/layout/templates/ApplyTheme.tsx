'use client'

import React, { useEffect } from "react"
import { fetchStrapiTheme } from "../../../lib/data/fetchStrapiTheme"

export default function ApplyTheme() {
  useEffect(() => {
    async function loadTheme() {
      const themeVars = await fetchStrapiTheme()
      if (!themeVars) return
      for (const [key, value] of Object.entries(themeVars)) {
        document.documentElement.style.setProperty(key, value)
      }
    }
    loadTheme()
  }, [])

  return null
}
