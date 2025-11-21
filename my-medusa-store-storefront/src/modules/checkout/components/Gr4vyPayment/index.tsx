"use client"

import React, { useEffect, useRef, useState } from "react"
import Embed from "@gr4vy/embed-react"
import "./Gr4vyPayment.css"
import { Button } from "@medusajs/ui"

// Define proper types for Gr4vy theme
interface Gr4vyTheme {
  colors: {
    primary: string
    danger: string
    focus: string
    text: string
    labelText: string
    subtleText: string
    inputBorder: string
    inputBackground: string
    inputText: string
    inputRadioBorder: string
    inputRadioBorderChecked: string
    pageBackground: string
    containerBackground: string
    containerBorder: string
  }
  borderWidths: {
    container: "thin" | "medium" | "thick" | "none"
    input: "thin" | "medium" | "thick" | "none"
  }
  radii: {
    container: "none" | "subtle" | "medium" | "pill"
    input: "none" | "subtle" | "medium" | "pill"
  }
  shadows: {
    focusRing: string
  }
  fontSizes: {
    base: string
    input: string
  }
  fonts: {
    body: string
  }
}

const Gr4vyPayment = ({ cart }: { cart: any }) => {
    const embedRef = useRef<any>(null)
    const [token, setToken] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [transactionId, setTransactionId] = useState<string | null>(null)
    const [isClient, setIsClient] = useState(false)
    const [isEmbedReady, setIsEmbedReady] = useState(false)

    const amount = cart?.total ? cart.total : 0
    const currency = cart?.currency_code?.toUpperCase() || "USD"
    const buyerExternalIdentifier = "40593bb4-be25-409b-87ce-bef7c979563f"

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (isClient) {
            const savedId = localStorage.getItem("transactionId")
            if (savedId) {
                setTransactionId(savedId)
            }
        }
    }, [isClient])

    const generateToken = async () => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.")
            return
        }
        setLoading(true)
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/generate-token`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-publishable-api-key":
                            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
                    },
                    body: JSON.stringify({
                        amount: amount,
                        currency: currency,
                        buyerExternalIdentifier: buyerExternalIdentifier,
                    }),
                }
            )

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const data = await res.json()
            setToken(data.token)
            setIsEmbedReady(false)
        } catch (err) {
            console.error("❌ Error generating Gr4vy token:", err)
            alert("Failed to generate payment token. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleComplete = (transaction: any) => {
        console.log("Transaction completed!")
        console.log(transaction)
        alert(
            "Transaction ID: " +
            transaction.id +
            "\n" +
            "Status: " +
            transaction.status
        )
        if (transaction.status === "authorization_succeeded" && isClient) {
            setTransactionId(transaction.id)
            localStorage.setItem("transactionId", transaction.id)
        }
    }

    const handleEmbedReady = () => {
        setIsEmbedReady(true)
        console.log("Gr4vy Embed is ready")
    }

    const handleEmbedError = (error: any) => {
        console.error("Gr4vy Embed error:", error)
        setIsEmbedReady(false)
    }

    const handlePayNow = () => {
        if (embedRef.current && typeof embedRef.current.submit === 'function') {
            embedRef.current.submit()
        } else {
            console.error("Embed ref not ready or submit function not available")
            alert("Payment form is not ready. Please wait a moment and try again.")
        }
    }

    // Theme customization with proper types
    const theme: Gr4vyTheme = {
        colors: {
            primary: "#ff6b6b",
            danger: "#dc3545",
            focus: "#ff6b6b",
            text: "#1a1a1a",
            labelText: "#333333",
            subtleText: "#666666",
            inputBorder: "#0b60dfff",
            inputBackground: "#ffffffff",
            inputText: "#1a1a1a",
            inputRadioBorder: "#0d62e1ff",
            inputRadioBorderChecked: "#ff6b6b",
            pageBackground: "#f9f9f9",
            containerBackground: "#fff0e7",
            containerBorder: "#000000ff",
        },
        borderWidths: {
            container: "thin",
            input: "none",
        },
        radii: {
            container: "none",
            input: "subtle",
        },
        shadows: {
            focusRing: "0 0 0 3px rgba(255, 107, 107, 0.2)",
        },
        fontSizes: {
            base: "15px",
            input: "15px",
        },
        fonts: {
            body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
    }

    if (!isClient) {
        return <div className="gr4vy-payment-wrapper">Loading payment...</div>
    }

    return (
        <div className="gr4vy-payment-wrapper">
            {cart?.total && (
                <div style={{ marginBottom: "1rem" }}>
                    <p style={{ fontSize: "16px", marginBottom: "8px" }}>
                        <strong>Total Amount:</strong>{" "}
                        {cart?.currency_code?.toUpperCase()}{" "}
                        {(cart.total / 100).toFixed(2)}
                    </p>
                </div>
            )}
            
            <h2 className="gr4vy-payment-title">Payment</h2>

            {!token ? (
                <button
                    className="gr4vy-pay-button"
                    onClick={generateToken}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Start Payment"}
                </button>
            ) : (
                <div>
                    <div className="gr4vy-container">
                        <Embed
                            ref={embedRef}
                            gr4vyId="smarteremr"
                            amount={amount}
                            currency={currency}
                            buyerExternalIdentifier={buyerExternalIdentifier}
                            country="US"
                            token={token}
                            environment="sandbox"
                            theme={theme}
                            onComplete={handleComplete}
                            onReady={handleEmbedReady}
                            onError={handleEmbedError}
                            showButton={false}
                        />
                    </div>
                    
                    <button 
                        className="gr4vy-pay-button" 
                        onClick={handlePayNow}
                        disabled={!isEmbedReady || loading}
                    >
                        {loading ? "Processing..." : "Complete Payment"}
                    </button>

                    <button
                        className="gr4vy-reset-button"
                        onClick={() => {
                            setToken("")
                            setIsEmbedReady(false)
                        }}
                        style={{
                            marginTop: "10px",
                            background: "transparent",
                            border: "1px solid #ccc",
                            color: "#666",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Start Over
                    </button>
                </div>
            )}

            {transactionId && (
                <div style={{ marginTop: "1rem", padding: "10px", background: "#f0f8ff", borderRadius: "4px" }}>
                    <p style={{ fontSize: "14px", color: "#0066cc" }}>
                        <strong>Transaction ID:</strong> {transactionId}
                    </p>
                </div>
            )}
        </div>
    )
}

export default Gr4vyPayment