"use client"

import { CheckCircleSolid } from "@medusajs/icons"
import {Heading, Text, clx } from "@medusajs/ui"
//import { Button} from "@medusajs/ui"
import { CustomButton as Button } from "@modules/common/components/custom-button/Button"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import Gr4vyPayment from "../Gr4vyPayment"

const Payment = ({ cart }: { cart: any }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isClient, setIsClient] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const isOpen = searchParams.get("step") === "payment"

  // If you want to show "✓ Payment done" on summary step
  const [transactionId, setTransactionId] = useState<string | null>(null)
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedId = localStorage.getItem("transactionId")
      setTransactionId(storedId)
    }
  }, [isClient])

  const paymentReady = !!transactionId

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleContinueToReview = () => {
    router.push(pathname + "?" + createQueryString("step", "review"), {
      scroll: false,
    })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      {/* HEADER */}
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>

        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-payment-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>

      {/* PAYMENT STEP */}
      <div>
        {/* Open step (user entering payment info) */}
        <div className={isOpen ? "block" : "hidden"}>
          <ErrorMessage error={error} data-testid="payment-method-error-message" />

          {/* Your Gr4vy UI */}
          <Gr4vyPayment cart={cart}/>

          {/* If already paid, show continue button */}
          {transactionId && (
            <Button
              size="large"
              className="mt-6"
              onClick={handleContinueToReview}
              data-testid="submit-payment-button"
            >
              Continue to review
            </Button>
          )}
        </div>

        {/* Summary view (after payment done) */}
        <div className={isOpen ? "hidden" : "block"}>
          {paymentReady && (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Payment method
              </Text>
              <Text className="txt-medium text-ui-fg-subtle">Gr4vy Payment</Text>
            </div>
          )}
        </div>
      </div>

      <Divider className="mt-8" />
    </div>
  )
}

export default Payment