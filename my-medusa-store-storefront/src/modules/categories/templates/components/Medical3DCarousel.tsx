"use client";
import React, { useState, useRef, useEffect } from 'react';

const Medical3DCarousel = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [cardTransforms, setCardTransforms] = useState<{ [key: number]: { rotateY: number; scale: number; opacity: number } }>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const isResettingRef = useRef(false);
    const scrollStartRef = useRef(0);
    const [isClient, setIsClient] = useState(false);

    const products = [
        {
            id: 1,
            title: "Digital Stethoscope",
            category: "Diagnostic Equipment",
            price: "$299",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop",
            gradient: "from-emerald-300/80 via-teal-400/80 to-cyan-500/80"
        },
        {
            id: 2,
            title: "Surgical Scissors Set",
            category: "Surgical Instruments",
            price: "$149",
            image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=1000&fit=crop",
            gradient: "from-rose-300/80 via-orange-400/80 to-amber-500/80"
        },
        {
            id: 3,
            title: "Blood Pressure Monitor",
            category: "Patient Monitoring",
            price: "$89",
            image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=1000&fit=crop",
            gradient: "from-cyan-300/80 via-teal-400/80 to-emerald-500/80"
        },
        {
            id: 4,
            title: "ECG Machine",
            category: "Diagnostic Equipment",
            price: "$1,299",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=1000&fit=crop",
            gradient: "from-purple-300/80 via-violet-400/80 to-indigo-500/80"
        },
    ];

    const infiniteProducts = Array.from({ length: 100 }, (_, i) => products[i % products.length]);
    const cardWidth = 384 + 48; // w-96 (384px) + gap-12 (48px)
    const singleSetWidth = cardWidth * products.length;

    const updateCardTransforms = () => {
        if (!containerRef.current || !isClient) return;

        const container = containerRef.current;
        const containerCenter = container.offsetWidth / 2;
        const cards = container.querySelectorAll('.carousel-card') as NodeListOf<HTMLElement>;
        const transforms: { [key: number]: { rotateY: number; scale: number; opacity: number } } = {};

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
            const distanceFromCenter = cardCenter - containerCenter;
            const maxDistance = containerCenter + cardRect.width;
            const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));

            // Rotation based on distance from center (positive = right, negative = left)
            const rotateY = normalizedDistance * 45;
            
            // Scale: center card is largest, edges are smaller
            const scale = 1 - Math.abs(normalizedDistance) * 0.15;
            
            // Opacity: fade out cards at the edges
            const opacity = 1 - Math.abs(normalizedDistance) * 0.3;

            transforms[index] = { rotateY, scale, opacity };
        });

        setCardTransforms(transforms);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        updateCardTransforms();
        const container = containerRef.current;

        const handleScroll = () => {
            updateCardTransforms();
        };

        if (container) {
            container.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', updateCardTransforms);
            // Start at a middle position
            container.scrollLeft = singleSetWidth * 3;
            scrollStartRef.current = singleSetWidth * 3;
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
            if (isClient) {
                window.removeEventListener('resize', updateCardTransforms);
            }
        };
    }, [singleSetWidth, isClient]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartX(e.pageX - (containerRef.current?.offsetLeft ?? 0));
        setScrollLeft(containerRef.current?.scrollLeft ?? 0);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (containerRef.current?.offsetLeft ?? 0);
        const walk = (x - startX) * 2;
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft ?? 0));
        setScrollLeft(containerRef.current?.scrollLeft ?? 0);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - (containerRef.current?.offsetLeft ?? 0);
        const walk = (x - startX) * 2;
        if (containerRef.current) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    if (!isClient) {
        return <div className="w-full h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-cyan-100 overflow-hidden relative flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="w-full h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-cyan-100 overflow-hidden relative flex items-center">
            <div className="w-full" style={{ perspective: '1200px' }}>
                <div
                    ref={containerRef}
                    className="flex gap-12 overflow-x-auto px-12 cursor-grab active:cursor-grabbing scrollbar-hide"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {infiniteProducts.map((product, index) => {
                        const transform = cardTransforms[index] || { rotateY: 0, scale: 1, opacity: 1 };

                        return (
                            <div
                                key={`${product.id}-${index}`}
                                className="carousel-card flex-shrink-0 w-96 h-[500px] select-none transition-all duration-300"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: `perspective(1200px) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
                                    opacity: transform.opacity
                                }}
                            >
                                <div
                                    className={`w-full h-full rounded-3xl overflow-hidden relative bg-gradient-to-br ${product.gradient}`}
                                    style={{
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover mix-blend-overlay opacity-90"
                                        draggable="false"
                                    />

                                    {/* Product Details Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                        <div className="text-white">
                                            <p className="text-sm font-medium opacity-90 mb-1">{product.category}</p>
                                            <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                                            <p className="text-3xl font-bold">{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default Medical3DCarousel;