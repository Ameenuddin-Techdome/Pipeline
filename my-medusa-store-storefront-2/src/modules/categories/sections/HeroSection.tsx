"use client"
import { ChevronRight } from '@untitledui/icons'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const HeroSection = ({ title }: { title: string }) => {

    return (
        <div className="min-h-screen w-full px-6 md:px-16 lg:px-20 pb-16 flex flex-col justify-center">

            <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                <Image
                    src="/_Breadcrumb button base.png"
                    alt="breadcrumb"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                />
                <ChevronRight size={16} color='#A4A7AE'/>
                <span
                    className="font-semibold text-sm leading-[1.25rem] tracking-normal font-sans text-primary"
                >
                    {title}
                </span>
            </div>

            {/* Main content row: left + right */}
            <div className="flex flex-col md:flex-row items-center justify-between">

                {/* Left Side */}
                <div className="max-w-xl space-y-6 z-10">
                    {/* Heading */}
                    <h1 className="font-inter font-semibold text-[60px] leading-[72px] tracking-[-0.02em] text-[#181D27]">
                        <span className='text-primary'>{title}</span>
                        <br />
                        journey that feels <br /> achievable
                    </h1>

                    {/* Subtext */}
                    <p className="text-[#535862] font-inter font-normal text-xl leading-[30px] tracking-normal">
                        Explore options that make small steps easier, sustainable, and aligned
                        with your wellbeing goals.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            "No Insurance Required",
                            "Discreet Delivery",
                            "Free consultation, fast approval",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="font-medium text-sm text-[#414651] border border-[#D5D7DA] rounded-md p-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        className="font-inter font-semibold text-md text-white px-6 py-3 rounded-md flex items-center gap-2 bg-primary"
                    >
                        Find Your Treatment
                        <span>→</span>
                    </button>
                </div>

                {/* Right Side */}
                <div className="relative mt-10 md:mt-0 md:ml-10">
                    <div
                        className="relative h-[550px] w-[550px] flex items-center justify-center bg-background"
                        style={{
                            clipPath: "circle(50% at 50% 50%)"
                        }}
                    >
                    <Image
                        src="/funny-woman-with-curly-hair-raises-palms-smies-pos-BH8K23Z 1.png"
                        alt="Weight loss model"
                        width={400}
                        height={400}
                        priority
                        className="z-10 object-contain w-[280px] md:w-[400px]"
                    />
                </div>
            </div>

        </div>
        </div >
    )
}

export default HeroSection

// import Image from 'next/image'
// import React from 'react'

// const HeroSection = ({ color,title }: { color: string,title:string }) => {
//     return (
//         <div className="min-h-screen w-full px-6 md:px-16 lg:px-20 pb-16 flex flex-col justify-center">

//             <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
//                 <Image
//                     src="/_Breadcrumb button base.png"
//                     alt="breadcrumb"
//                     width={16}
//                     height={16}
//                     className="w-4 h-4"
//                 />
//                 <span
//                     style={{ color }}
//                     className="font-semibold text-sm leading-[1.25rem] tracking-normal font-sans"
//                 >
//                     {title}
//                 </span>
//             </div>

//             {/* Main content row: left + right */}
//             <div className="flex flex-col md:flex-row items-center justify-between">

//                 {/* Left Side */}
//                 <div className="max-w-xl space-y-6 z-10">
//                     {/* Heading */}
//                     <h1 className="font-inter font-semibold text-[60px] leading-[72px] tracking-[-0.02em] text-[#181D27]">
//                         <span style={{ color }}>{title}</span>
//                         <br />
//                         journey that feels <br /> achievable
//                     </h1>

//                     {/* Subtext */}
//                     <p className="text-[#535862] font-inter font-normal text-xl leading-[30px] tracking-normal">
//                         Explore options that make small steps easier, sustainable, and aligned
//                         with your wellbeing goals.
//                     </p>

//                     {/* Tags */}
//                     <div className="flex flex-wrap gap-3">
//                         {[
//                             "No Insurance Required",
//                             "Discreet Delivery",
//                             "Free consultation, fast approval",
//                         ].map((tag) => (
//                             <span
//                                 key={tag}
//                                 className="font-medium text-sm text-[#414651] border border-[#D5D7DA] rounded-md p-2"
//                             >
//                                 {tag}
//                             </span>
//                         ))}
//                     </div>

//                     {/* CTA */}
//                     <button
//                         style={{ backgroundColor: color }}
//                         className="font-inter font-semibold text-md text-white px-6 py-3 rounded-md flex items-center gap-2"
//                     >
//                         Find Your Treatment
//                         <span>→</span>
//                     </button>
//                 </div>

//                 {/* Right Side */}
//                 <div className="relative mt-10 md:mt-0 md:ml-10">
//                     <div
//                         className="relative h-[550px] w-[550px] flex items-center justify-center"
//                         style={{
//                             backgroundColor: color,
//                             clipPath:
//                                 "polygon(30% 0%, 70% 0%, 100% 20%, 100% 70%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
//                         }}
//                     >
//                         <Image
//                             src="/funny-woman-with-curly-hair-raises-palms-smies-pos-BH8K23Z 1.png"
//                             alt="Weight loss model"
//                             width={400}
//                             height={400}
//                             priority
//                             className="z-10 object-contain w-[280px] md:w-[400px]"
//                         />
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default HeroSection