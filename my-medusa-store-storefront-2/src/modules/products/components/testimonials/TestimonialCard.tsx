// "use client"

// import React from "react"
// import { BeforeAfterImages } from "./BeforeAfterImages"
// import { CheckCircle } from "lucide-react"

// interface TestimonialCardProps {
//   quote: string
//   name: string
//   result?: string
//   image?: string
// }

// export const TestimonialCard: React.FC<TestimonialCardProps> = ({
//   quote,
//   name,
//   result,
//   image
// }) => {
//   return (
//     <div className="bg-background rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col h-full max-w-sm mx-auto">
//       {/* Image Section - Fixed dimensions */}
//       <div className="flex justify-center">
//         <div className="w-full max-w-[250px] h-[320px] flex items-center justify-center">
//           <img
//             src={image}
//             alt={name}
//             className="max-w-full max-h-full object-contain rounded-2xl"
//             loading="lazy"
//           />
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="p-4 flex flex-col flex-grow">
//         {result && (
//           <h3 className="text-xl font-semibold text-gray-900 mb-4">{result}</h3>
//         )}

//         <div className="flex-grow mb-4 min-h-0">
//           <p className="text-gray-700 text-sm leading-relaxed">
//             "{quote}"
//           </p>
//         </div>

//         <div className="mt-auto pt-3 border-t border-gray-100">
//           <span className="font-semibold text-gray-900 text-sm">{name}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import React from "react"

interface TestimonialCardProps {
  quote: string
  name: string
  result?: string
  image?: string
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  result,
  image
}) => {
  return (
    <div className="bg-background rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col h-full max-w-sm mx-auto">
      {/* Image Section - Hardcoded 200x200px */}
      <div className="w-full p-4 pb-0">
        {image ? (
          <div className="w-full flex items-center justify-center">
            <img
              src={image}
              alt={`${name} transformation`}
              className="rounded-lg"
              style={{
                width: '300px',
                height: '270px',
                objectFit: 'fill',
                display: 'block'
              }}
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg"
            style={{
              width: '300px',
              height: '270px',
              margin: '0 auto'
            }}
          >
            <div className="text-center">
              <div className="flex justify-center space-x-4 mb-2">
                <div className="w-16 h-20 bg-gray-300 rounded"></div>
                <div className="w-16 h-20 bg-gray-300 rounded"></div>
              </div>
              <span className="text-sm">Before / After</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {result && (
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {result}
          </h3>
        )}

        <div className="flex-grow mb-4 min-h-0">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-5 overflow-hidden">
            "{quote}"
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900 text-sm">{name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}