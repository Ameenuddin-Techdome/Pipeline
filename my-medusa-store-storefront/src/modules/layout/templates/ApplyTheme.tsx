'use client'

import React, { useEffect, useState } from "react"
import { fetchStrapiTheme } from "../../../lib/data/fetchStrapiTheme"

export default function ApplyTheme() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    async function loadTheme() {
      const themeVars = await fetchStrapiTheme()
      if (!themeVars || !document) return;
      
      for (const [key, value] of Object.entries(themeVars)) {
        document.documentElement.style.setProperty(key, value)
      }
    }
    loadTheme()
  }, [isClient])

  return null
}