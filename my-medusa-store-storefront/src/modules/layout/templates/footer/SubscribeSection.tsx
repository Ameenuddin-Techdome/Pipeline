"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { FaSquareXTwitter,FaInstagram ,FaFacebook  } from "react-icons/fa6";

export default function SubscribeSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Subscribed successfully!") // Replace with your real subscription logic
    setEmail("")
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Subscribe to our news</h3>
      <p className="text-sm mb-4 text-gray-600">
        Stay informed and never miss a beat! Subscribe to our exclusive news updates.
      </p>

      {/* Subscription Form */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-1border-border"
        />
        <button
          type="submit"
          className="bg-primary text-surface hover:bg-secondary px-4 py-2 rounded"
        >
          Subscribe
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-6">
        <p className="text-sm mb-2 font-medium">Contact us:</p>
        <a
          href="mailto:care@wizlo.com"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          care@wizlo.com
        </a>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4">
          <a
            href="#"
            aria-label="Music"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            < FaSquareXTwitter className="w-4 h-4" /> 
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <FaFacebook className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
