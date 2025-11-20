import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import SubscribeSection from "./SubscribeSection"
import { fetchCompanyInfo } from "@lib/data/fetchCompanyInfo"
import { FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6"
import { Mail, MapPin, Phone } from "lucide-react"
import { FaLocationDot } from "react-icons/fa6"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()
  const company = await fetchCompanyInfo()
  //console.log("Company Info in Footer:", company);

  return (
    <footer className="bg-background border-t border-gray-200 w-full text-gray-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <LocalizedClientLink href="/">
              <img src="/wizlo-logo.png" alt="Wizlo Logo" className="h-6" />
            </LocalizedClientLink>
          </div>

          {/* Categories + Collections (hierarchy + clean UI) */}
          <div className="flex flex-col gap-y-6">
            {/* Categories */}
            {productCategories?.length > 0 && (
              <div>
                <h3 className="text-lg text-text-secondary font-medium mb-4">
                  Categories
                </h3>

                <ul className="space-y-3">
                  {productCategories.slice(0, 6).map((cat) => {
                    // Skip child categories from the main list
                    if (cat.parent_category) return null

                    const children =
                      cat.category_children?.map((child) => ({
                        id: child.id,
                        name: child.name,
                        handle: child.handle,
                      })) || null

                    return (
                      <li key={cat.id} className="flex flex-col gap-1">
                        {/* Parent Category */}
                        <LocalizedClientLink
                          href={`/categories/${cat.handle}`}
                          className="text-sm hover:text-gray-900 font-medium"
                        >
                          {cat.name}
                        </LocalizedClientLink>

                        {/* Child Categories */}
                        {children && (
                          <ul className="ml-3 space-y-1">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  href={`/categories/${child.handle}`}
                                  className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections */}
            {collections?.length > 0 && (
              <div>
                <h3 className="text-lg text-text-secondary font-medium mb-4">
                  Collections
                </h3>

                <ul
                  className={`grid gap-2 ${collections.length > 3 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                >
                  {collections.slice(0, 6).map((col) => (
                    <li key={col.id}>
                      <LocalizedClientLink
                        href={`/collections/${col.handle}`}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {col.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* <div>
            <ul className="space-y-2 text-sm">
              {productCategories?.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <LocalizedClientLink
                    href={`/categories/${cat.handle}`}
                    className="hover:text-gray-900"
                  >
                    {cat.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Support */}
          <div>
            <h3 className="text-lg text-text-secondary font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LocalizedClientLink
                  href="/info/privacy-policy"
                  className="hover:text-gray-900"
                >
                  Privacy Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/info/terms-of-use"
                  className="hover:text-gray-900"
                >
                  Terms of Use
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/info/refund-policy"
                  className="hover:text-gray-900"
                >
                  Refund Policy
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/info/about-us"
                  className="hover:text-gray-900"
                >
                  About Us
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg text-text-secondary font-medium mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              {company?.Email && (
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  <a
                    href={`mailto:${company.Email}`}
                    className="hover:text-gray-900"
                  >
                    {company.Email}
                  </a>
                </li>
              )}
              {company?.Phone && (
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  <a
                    href={`tel:${company.Phone}`}
                    className="hover:text-gray-900"
                  >
                    {company.Phone}
                  </a>
                </li>
              )}
              {company?.Address && (
                <li className="flex items-start gap-2">
                  <FaLocationDot size={16} className="text-gray-500 mt-0.5" />
                  <span>{company.Address}</span>
                </li>
              )}
            </ul>

            <div className="flex gap-4 mt-4">
              {company?.Instagram && (
                <a
                  href={company.Instagram} target="_blank" rel="noopener noreferrer"
                  aria-label="Music"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  < FaSquareXTwitter className="text-black w-4 h-4" />
                </a>
              )}
              {company?.Facebook && (
                <a
                  href={company.Facebook} target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <FaInstagram className="text-[#E1306C] w-4 h-4" />
                </a>
              )}
              {company?.X && (
                <a
                  href={company.X} target="_blank" rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <FaFacebook className="text-[#1877F2] w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Subscribe */}
          {/* <SubscribeSection /> */}
        </div>

        {/* Bottom line */}
        <div className="mt-16 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Wizlo. All rights reserved.
        </div>
      </div>
    </footer>
  )
}


// import { listCategories } from "@lib/data/categories"
// import { listCollections } from "@lib/data/collections"
// import { Text, clx } from "@medusajs/ui"

// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import WizloCTA from "@modules/layout/components/medusa-cta"
// import MedusaCTA from "@modules/layout/components/medusa-cta"

// export default async function Footer() {
//   const { collections } = await listCollections({
//     fields: "*products",
//   })
//   const productCategories = await listCategories()

//   return (
//     <footer className="border-t border-ui-border-base w-full">
//       <div className="content-container flex flex-col w-full">
//         <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
//           <div>
//             <LocalizedClientLink
//               href="/"
//               className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
//             >
//               WIZLO
//             </LocalizedClientLink>
//           </div>
//           <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
//             {productCategories && productCategories?.length > 0 && (
//               <div className="flex flex-col gap-y-2">
//                 <span className="txt-small-plus txt-ui-fg-base">
//                   Categories
//                 </span>
//                 <ul
//                   className="grid grid-cols-1 gap-2"
//                   data-testid="footer-categories"
//                 >
//                   {productCategories?.slice(0, 6).map((c) => {
//                     if (c.parent_category) {
//                       return
//                     }

//                     const children =
//                       c.category_children?.map((child) => ({
//                         name: child.name,
//                         handle: child.handle,
//                         id: child.id,
//                       })) || null

//                     return (
//                       <li
//                         className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
//                         key={c.id}
//                       >
//                         <LocalizedClientLink
//                           className={clx(
//                             "hover:text-ui-fg-base",
//                             children && "txt-small-plus"
//                           )}
//                           href={`/categories/${c.handle}`}
//                           data-testid="category-link"
//                         >
//                           {c.name}
//                         </LocalizedClientLink>
//                         {children && (
//                           <ul className="grid grid-cols-1 ml-3 gap-2">
//                             {children &&
//                               children.map((child) => (
//                                 <li key={child.id}>
//                                   <LocalizedClientLink
//                                     className="hover:text-ui-fg-base"
//                                     href={`/categories/${child.handle}`}
//                                     data-testid="category-link"
//                                   >
//                                     {child.name}
//                                   </LocalizedClientLink>
//                                 </li>
//                               ))}
//                           </ul>
//                         )}
//                       </li>
//                     )
//                   })}
//                 </ul>
//               </div>
//             )}
//             {collections && collections.length > 0 && (
//               <div className="flex flex-col gap-y-2">
//                 <span className="txt-small-plus txt-ui-fg-base">
//                   Collections
//                 </span>
//                 <ul
//                   className={clx(
//                     "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
//                     {
//                       "grid-cols-2": (collections?.length || 0) > 3,
//                     }
//                   )}
//                 >
//                   {collections?.slice(0, 6).map((c) => (
//                     <li key={c.id}>
//                       <LocalizedClientLink
//                         className="hover:text-ui-fg-base"
//                         href={`/collections/${c.handle}`}
//                       >
//                         {c.title}
//                       </LocalizedClientLink>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
//           <Text className="txt-compact-small">
//             © {new Date().getFullYear()} Wizlo Store. All rights reserved.
//           </Text>
//           <WizloCTA/>
//         </div>
//       </div>
//     </footer>
//   )
// }