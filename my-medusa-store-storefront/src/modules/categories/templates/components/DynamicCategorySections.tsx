import { fetchStrapiCategoryComponents } from "@lib/data/fetchStrapiCategoryComponent"
import ProductDisclosure from "@modules/products/components/product-disclosure"
import ProductOverviewSection from "@modules/products/components/product-overview"
import { TestimonialSection } from "@modules/products/components/testimonials/TestimonialSection"

export default async function DynamicCategorySections({
    categoryId,
}: {
    categoryId: string
}) {
    const [disclosure, overview, testimonials] = await Promise.all([
        fetchStrapiCategoryComponents(categoryId, "Disclosure"),
        fetchStrapiCategoryComponents(categoryId, "Overview"),
        fetchStrapiCategoryComponents(categoryId, "Testimonial"),
    ])
    //console.log("Category ID:", categoryId)
    //console.log("Fetched Disclosure:", disclosure)
    //console.log("Fetched Overview:", overview)
    //console.log("Fetched Testimonial:", testimonials)  

    if(!disclosure && !overview && (!testimonials || testimonials.length === 0)) {
        console.log("No dynamic sections found for category:", categoryId)
    }

    return (
        <>
            {disclosure && (<ProductDisclosure disclosure={disclosure} />)}
            {overview && <ProductOverviewSection overview={overview} />}
            {testimonials?.length > 0 && <TestimonialSection testimonials={testimonials} />}
        </>
    )
}
