import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-info/product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import DynamicCategorySections from "@modules/categories/templates/components/DynamicCategorySections"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }
  //console.log("Product:",product)
  //console.log("Product images:", product.images)
  //console.log("Product thumbnail:", product.thumbnail)
  //console.log("Product category", JSON.stringify(product, null, 2))
  //console.log("Product category id",product.category?.documentId)

  return (
    <>
      {/* Main content: large left gallery + sticky, scrollable right column */}
      <div
        className="content-container grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-6"
        data-testid="product-container"
      >

        {/* Left: Big image gallery */}
        <div className="lg:col-span-8 w-full">
          <div className="rounded-xl overflow-hidden bg-white shadow-sm">
            <ImageGallery
              images={product?.images || []}
              thumbnail={product?.thumbnail || ""}
            />
          </div>
        </div>

        {/* Right: Sticky, scrollable info column */}
        <aside
          className="lg:col-span-4 w-full self-start"
          aria-label="Product details"
        >
          <div className="sticky top-20">
            <div
              className="max-h-[calc(100vh-5rem)] overflow-y-auto pr-4 space-y-6 no-scrollbar"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Top card: Product info + CTA */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <ProductInfo product={product} />
                <div className="mt-6">
                  <ProductOnboardingCta />
                </div>
                <div className="mt-6">
                  <Suspense
                    fallback={
                      <ProductActions
                        disabled={true}
                        product={product}
                        region={region}
                      />
                    }
                  >
                    <ProductActionsWrapper id={product.id} region={region} />
                  </Suspense>
                </div>
              </div>

              {/* Tabs card: benefits / pricing / description */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <ProductTabs product={product} />
              </div>

              {/* Keep related products outside of the sticky column (will still be below) */}
            </div>
          </div>
        </aside>
      </div>

      <DynamicCategorySections categoryId={(product as any).category?.documentId} /> 

      {/* Related products section */}{" "}
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />{" "}
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
