import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import Gr4vyWrapper from "@modules/checkout/components/Gr4vyPayment/Gr4vyWrapper"
import Gr4vyPayment from "@modules/checkout/components/Gr4vyPayment"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  // Removed window usage - using server-side logic only
  const step = "delivery" // Default step

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods} />

      {/* <Payment cart={cart} availablePaymentMethods={paymentMethods} /> */}
      <Payment cart={cart} />
      {/* <Gr4vyPayment /> */}

      <Review cart={cart} />
    </div>
  )
}