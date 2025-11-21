"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Info } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { getProductPrice } from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import { useCategoryTheme } from "@lib/context/CategoryThemeContext";

type Product = HttpTypes.StoreProduct;

const ProductCardNewStyle = React.memo(
    ({
        product,
        style,
        isActive,
        isFarOut,
    }: {
        product: Product;
        style: React.CSSProperties;
        isActive: boolean;
        isFarOut: boolean;
    }) => {
        const imageUrl =
            product.thumbnail ||
            product.images?.[0]?.url ||
            "https://placehold.co/320x240?text=No+Image";

        const productName = product.title || "Unknown Product";
        const pharmacy = product.subtitle || "Online Store";

        const { cheapestPrice } = getProductPrice({ product });
        const priceDisplay = cheapestPrice?.calculated_price || "N/A";

        const status = "In stock";
        const tag1 = "Cold-pack";
        const tag2 = "2-Days Delivery";

        const transitionClass = isFarOut
            ? ""
            : "transition-all duration-700 ease-in-out";

        const shopNowClasses =
            "bg-indigo-600 text-white py-2 px-3 rounded-lg shadow-md hover:bg-indigo-700 transition flex items-center justify-center gap-1 text-sm";

        const learnMoreClasses =
            "bg-white text-indigo-600 py-2 px-3 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition flex items-center justify-center gap-1 text-sm";

        const tagClasses =
            "text-xs px-2 py-1 border border-gray-400 text-gray-600 rounded-md bg-white font-medium";

        const statusClasses =
            "bg-green-400 text-white text-xs font-medium px-2.5 py-1 rounded-xl";

        return (
            <div
                className={`
          absolute left-1/2 top-1/2 w-72 h-[28rem] bg-gray-100 rounded-xl shadow-xl 
          overflow-hidden flex flex-col transform-gpu origin-center
          ${transitionClass}
          ${isActive ? "cursor-default" : "cursor-pointer"}
        `}
                style={{
                    ...style,
                    transform: `translate(-50%, -50%) ${style.transform}`,
                }}
            >
                <div className="relative w-full h-[17rem]">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url("${imageUrl}")` }}
                    />
                    <div className="relative z-10 flex justify-end items-start p-4">
                        {/* <span className="text-lg font-bold text-black w-2/3">
                            {productName}
                        </span> */}
                        <span className={statusClasses}>{status}</span>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[11rem] flex flex-col justify-between shadow-inner p-4">
                    <div className="mb-2">
                        <p className="text-base font-extrabold text-gray-800">
                            {productName}
                        </p>
                        <p className="text-xs text-gray-600">{pharmacy}</p>
                    </div>

                    <div className="flex gap-2 mb-3">
                        <span className={tagClasses}>{tag1}</span>
                        <span className={tagClasses}>{tag2}</span>
                    </div>

                    <div className="flex flex-col pb-1">
                        <span className="text-xl font-bold text-gray-900">
                            {priceDisplay}
                        </span>

                        <div className="flex gap-2 w-full mt-1">
                            <LocalizedClientLink
                                href={`/products/${product.handle}`}
                                className="flex-1"
                            >
                                <button className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded-lg border hover:bg-indigo-50 border-primary text-primary" 
                                style={{
                                    backgroundColor: "transparent",
                                }}>
                                    <Info className="w-3 h-3" />
                                    Learn
                                </button>
                            </LocalizedClientLink>

                            <LocalizedClientLink
                                href={`/products/${product.handle}`}
                                className="flex-1"
                            >
                                <button className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded-lg text-white bg-primary">
                                    <ShoppingCart className="w-3 h-3" />
                                    Shop
                                </button>
                            </LocalizedClientLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

const ProductCarousel = ({ products }: { products: Product[] }) => {
    const [centerIndex, setCenterIndex] = useState(products.length === 1 ? 0 : 2);

    const numProducts = products.length;
    const CARD_WIDTH_REM = 20;
    const GAP_REM = 1.5;
    const MOVE_UNIT_REM = CARD_WIDTH_REM + GAP_REM * 2;

    const slideLeft = useCallback(() => {
        setCenterIndex((prevIndex) => (prevIndex - 1 + numProducts) % numProducts);
    }, [numProducts]);

    const slideRight = useCallback(() => {
        setCenterIndex((prevIndex) => (prevIndex + 1) % numProducts);
    }, [numProducts]);

    const cardsWithStyles = useMemo(() => {
        return products.map((product: Product, index: number) => {
            let offset = index - centerIndex;

            if (offset > numProducts / 2) offset -= numProducts;
            else if (offset < -numProducts / 2) offset += numProducts;

            const absOffset = Math.abs(offset);

            let scale, opacity, zIndex;
            let isFarOut = false;

            if (absOffset === 0) {
                scale = 1;
                opacity = 1;
                zIndex = 30;
            } else if (absOffset === 1) {
                scale = 0.9;
                opacity = 0.7;
                zIndex = 20;
            } else if (absOffset === 2) {
                scale = 0.75;
                opacity = 0.4;
                zIndex = 10;
            } else {
                scale = 0.6;
                opacity = 0;
                zIndex = 0;
                isFarOut = true;
            }

            const translateX = offset * MOVE_UNIT_REM;

            return {
                product,
                index,
                style: {
                    transform: `translateX(${translateX}rem) scale(${scale})`,
                    opacity,
                    zIndex,
                },
                isActive: absOffset === 0,
                isFarOut,
            };
        });
    }, [centerIndex, MOVE_UNIT_REM, numProducts]);

    const canSlide = numProducts > 1;

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="relative w-full max-w-7xl h-[30rem] flex items-center justify-center">
                <div className="w-full h-full overflow-hidden">
                    {cardsWithStyles.map(({ product, style, isActive, isFarOut }) => (
                        <ProductCardNewStyle
                            key={product.id}
                            product={product}
                            style={style}
                            isActive={isActive}
                            isFarOut={isFarOut}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    onClick={slideLeft}
                    disabled={!canSlide}
                    aria-label="Previous product"
                    className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110 disabled:opacity-50"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>

                <button
                    onClick={slideRight}
                    disabled={!canSlide}
                    aria-label="Next product"
                    className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110 disabled:opacity-50"
                >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default ProductCarousel;