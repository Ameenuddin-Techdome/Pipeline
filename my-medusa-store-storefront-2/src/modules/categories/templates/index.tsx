import Image from "next/image"
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCarousel from "../sections/ProductCarousel";
import HeroSection from "../sections/HeroSection";
import ProductsSection from "../sections/ProductsSection";
import GuidedJourney from "../sections/GuidedJourney";
import Testimonials from "../sections/Testimonials";
import { fetchStrapiCategoryComponents } from "@lib/data/fetchStrapiCategoryComponent";
import FaqSection from "../sections/FaqSection";
import PromotionalGallery from "../sections/PromotionalGallery";
import { HttpTypes } from "@medusajs/types";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { listProductsWithSort } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import { notFound } from "next/navigation";

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  if (!category) notFound()

  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const region = await getRegion(countryCode)
  if (!region) notFound()

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page: pageNumber,
    sortBy: sort,
    queryParams: {
      limit: 100,
      category_id: [category.id],
    },
    countryCode,
  })

  // const color = "#175CD3"
  // const backgroundColor = "#D1E9FF"
  //console.log("Catgeory: ",category)

  const overview = await fetchStrapiCategoryComponents(
    category.handle,
    "Overview"
  );

  const testimonials = await fetchStrapiCategoryComponents(
    category.handle,
    "Testimonial"
  );

  const disclosure = await fetchStrapiCategoryComponents(
    category.handle,
    "Disclosure"
  );

  const promotionalImages = await fetchStrapiCategoryComponents(
    category.handle,
    "promotionalImages"
  );

  // console.log("Overview: ",overview)
  // console.log("Testimonials: ",testimonials)
  // console.log("Disclosure: ",disclosure)
  //console.log("promotionalImages: ",promotionalImages)

  return (
    <section className="bg-white flex flex-col items-center justify-between relative overflow-hidden">

        <HeroSection title={category.name} />

        <ProductsSection products={products} />

        <GuidedJourney overview={overview} />

        <Testimonials testimonials={testimonials} />

        <FaqSection disclosure={disclosure} />

        <PromotionalGallery title={category.name} promotionalImages={promotionalImages?.image ?? []} />
    </section>
  )
}