"use client"
import { useCategoryTheme } from '@lib/context/CategoryThemeContext';
import Image from 'next/image';
import React from 'react';

interface RichTextBlock {
    type: string
    children: { text: string }[]
}

interface OverviewData {
    card1_title: string
    card1_description: RichTextBlock[]
    card2_title: string
    card2_description: RichTextBlock[]
    card3_title: string
    card3_description: RichTextBlock[]
}

const getText = (blocks: RichTextBlock[]) => {
  if (!blocks) return "";
  return blocks
    .map(block => block.children.map(c => c.text).join(" "))
    .join("\n");
};


const GuidedJourney = ({ overview }: { overview: OverviewData }) => {
    const {color}=useCategoryTheme();
    if (!overview) {
        return null;
    }
    const steps = [
        {
            title: overview.card1_title,
            description: getText(overview.card1_description),
        },
        {
            title: overview.card2_title,
            description: getText(overview.card2_description),
        },
        {
            title: overview.card3_title,
            description: getText(overview.card3_description),
        },
    ];
    
    return (
        <div className="w-full px-6 md:px-16 lg:px-20 md:py-16 py-8 flex flex-col justify-center">
            <div className="max-w-6xl mx-auto">
                {/* Content wrapper: Flex layout for desktop, stacked for mobile */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">

                    {/* --- Image Section (Left) --- */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
                        {/* Image Container with rounded corners */}
                        <div className="relative rounded-3xl overflow-hidden w-full max-w-1/4">
                            <Image
                                src="/image (3).png"
                                alt="Group of people running together"
                                width={400}
                                height={500}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* --- Title and Steps Section (Right) --- */}
                    <div className="w-full lg:w-1/2">
                        {/* Title */}
                        <h2 className="font-semibold text-[36px] leading-[44px] text-[#181D27] tracking-[-0.02em] mb-16">
                            Your Guided Journey to Better Health
                        </h2>

                        {/* Steps */}
                        <div className="space-y-10">
                            {steps.map((step, idx) => (
                                <div className="flex gap-6 items-start" key={idx}>
                                    {/* Number Badge with Background Shape */}
                                    <div className="flex-shrink-0 relative w-24 h-24">
                                        {/* Light blue rounded background shape */}
                                        <div
                                            className="absolute top-5 right-8 w-20 h-20 rounded-bl-3xl rounded-tr-3xl"
                                            style={{ backgroundColor: `${color}30` }}
                                        ></div>

                                        {/* Number Text */}
                                        <div
                                            className="absolute top-0 left-0 font-semibold text-[72px] leading-[90px] tracking-[-0.02em]"
                                            style={{ color }}
                                        >
                                            0{idx + 1}
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col pt-2">
                                        <h3 className="font-semibold text-[24px] leading-[32px] mb-2 text-[#181D27]">
                                            {step.title}
                                        </h3>
                                        <p className="font-normal text-[18px] leading-[28px] text-[#414651]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuidedJourney;