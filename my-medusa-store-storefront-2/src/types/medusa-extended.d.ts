// src/types/medusa-extended.d.ts

import "@medusajs/types"

declare module "@medusajs/types" {
  interface StoreProductListParams {
    category_id?: string[]
    collection_id?: string[]
    id?: string[]
    order?: string
  }

  interface FindParams {
    category_id?: string[]
    collection_id?: string[]
    id?: string[]
    order?: string
  }
}
