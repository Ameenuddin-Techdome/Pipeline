import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  thumbnail?: string
}

const ImageGallery = ({ images, thumbnail }: ImageGalleryProps) => {
  const hasImages = images && images.length > 0
  const imageList = hasImages
    ? images
    : thumbnail
      ? [{ id: "thumb", url: thumbnail }]
      : []

  if (imageList.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] ml-10 mr-10 bg-gray-100 rounded-lg">
        <p className="text-gray-500 text-sm">No image available</p>
      </div>
    )
  }
  return (
    <div className="flex items-start justify-center relative">
      <div className="flex flex-col flex-1 small:mx-8 sm:mx-12 gap-y-6">
        {imageList.map((image, index) => (
          <Container
            key={image.id}
            id={image.id}
            className="relative w-[80%] sm:w-[75%] md:w-[70%] lg:w-[65%] mx-auto aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            {!!image.url && (
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                priority={index <= 2}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
                className="object-cover rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
              />
            )}
          </Container>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
