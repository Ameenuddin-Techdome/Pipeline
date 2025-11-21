"use client"
import React from 'react'
import ProductCarousel from './ProductCarousel'

const ProductsSection = ({products}:{products: any[]}) => {
  return (
    <div
        className="w-full flex flex-col py-10 items-center justify-center bg-background"
      >
        {/* Header */}
        <div className="text-center mb-6 md:mb-12 max-w-2xl">
          <h2 className="text-[36px] font-semibold leading-[-44px] tracking-[-0.02em] mb-4">
            Find What <span className='text-primary'>Works for You</span>
          </h2>
          <p className="text-[#535862] font-normal text-xl">
            Compare products, read details, and choose what feels right.
          </p>
        </div>

        {/* Product Cards Container */}
        <ProductCarousel products={products}/>
      </div>
  )
}

export default ProductsSection