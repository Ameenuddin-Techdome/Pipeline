"use client"

import { useEffect, useState } from "react"

// Your existing review component code, but wrap any localStorage usage in useEffect
export const Review = ({ cart }: { cart: any }) => {
  const [storedId, setStoredId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      // const storedId = localStorage.getItem("transactionId")
      // setStoredId(storedId)
    }
  }, [isClient])

  // Your existing component logic
  return (
    <div>
      {/* Your review component content */}
    </div>
  )
}