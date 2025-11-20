"use client"

import React, { useEffect, useRef, useState } from "react"
import Embed from "@gr4vy/embed-react"
import "./Gr4vyPayment.css"
import { Button } from "@medusajs/ui"

const Gr4vyPayment = ({ cart }: { cart: any }) => {
    const embedRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState<string>("");

    const amount = cart?.total ? cart.total : 0;
    const currency = cart?.currency_code?.toUpperCase() || "USD";
    const buyerExternalIdentifier = "40593bb4-be25-409b-87ce-bef7c979563f"

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
                        amount: amount, // we can replace this with dynamic cart total
                        currency: currency,
                        buyerExternalIdentifier: buyerExternalIdentifier,
                    }),
                }
            )

            const data = await res.json()
            setToken(data.token) // Set token to render Embed
        } catch (err) {
            console.error("❌ Error generating Gr4vy token:", err)
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
    }

    const handlePayNow = () => {
        if (embedRef.current) {
            embedRef.current.submit()
        }
    }

    // Theme customization to match your design
    const theme = {
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

    return (
        <>
            <div className="gr4vy-payment-wrapper">
                {cart?.total && (
                    <div style={{ marginBottom: "1rem" }}>
                        <p style={{ fontSize: "16px", marginBottom: "8px" }}>
                            <strong>Total Amount:</strong>{" "}
                            {cart?.currency_code?.toUpperCase()}{" "}
                            {(cart.total).toFixed(2)}
                        </p>
                    </div>
                )}
                <button
                    className="gr4vy-pay-button"
                    onClick={generateToken}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Start Payment"}
                </button>
                <h2 className="gr4vy-payment-title">Payment</h2>
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
                        />
                    </div>
                    <button className="gr4vy-pay-button" onClick={handlePayNow}>
                        Complete Payment
                    </button>
                </div>
            </div>
        </>
    )
}

export default Gr4vyPayment


//PUSHED-
// "use client"

// import React, { useEffect, useRef, useState } from "react"
// import Embed from "@gr4vy/embed-react"
// import "./Gr4vyPayment.css"
// import { Button } from "@medusajs/ui"

// const Gr4vyPayment = ({ cart }: { cart: any }) => {
//     const embedRef = useRef(null)
//     const [token, setToken] = useState<string | null>(null)
//     const [loading, setLoading] = useState(false)
//     const [transactionId, setTransactionId] = useState<string | null>(null);
//     const [amount, setAmount] = useState<number>(0);

//     useEffect(() => {
//         if (cart?.total) {
//             // Medusa totals are usually in smallest currency unit (e.g. cents)
//             // Convert to regular amount if your backend expects that
//             setAmount(cart.total);
//         }
//     }, [cart]);

//     useEffect(() => {
//         const savedId = localStorage.getItem("transactionId");
//         if (savedId) {
//             setTransactionId(savedId);
//         }
//     }, []);

//     const generateToken = async () => {
//         if (!amount || amount <= 0) {
//             alert("Please enter a valid amount.")
//             return
//         }
//         setLoading(true)
//         try {
//             const res = await fetch(
//                 `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/generate-token`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "x-publishable-api-key":
//                             process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
//                     },
//                     body: JSON.stringify({
//                         amount: amount, // we can replace this with dynamic cart total
//                         currency: cart?.currency_code?.toUpperCase() || "USD",
//                         buyerExternalIdentifier: "40593bb4-be25-409b-87ce-bef7c979563f",
//                     }),
//                 }
//             )

//             const data = await res.json()
//             setToken(data.token) // Set token to render Embed
//         } catch (err) {
//             console.error("❌ Error generating Gr4vy token:", err)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleComplete = (transaction: any) => {
//         console.log("Transaction completed!")
//         console.log(transaction)
//         alert(
//             "Transaction ID: " +
//             transaction.id +
//             "\n" +
//             "Status: " +
//             transaction.status
//         )
//         if (transaction.status === "authorization_succeeded") {
//             setTransactionId(transaction.id);
//             localStorage.setItem("transactionId", transaction.id);
//         }
//         else {
//             alert(`Payment failed: ${transaction.error_message || transaction.reason || "Unknown error"}`);
//         }
//     }

//     const handlePayNow = () => {
//         if (embedRef.current) {
//             embedRef.current.submit()
//         }
//     }

//     console.log("🎯 Rendering Gr4vy Embed with props:", {
//         amount,
//         currency: cart.currency_code?.toUpperCase() || "USD",
//         token,
//     });

//     // Theme customization to match your design
//     const theme = {
//         colors: {
//             primary: "#ff6b6b",
//             danger: "#dc3545",
//             focus: "#ff6b6b",
//             text: "#1a1a1a",
//             labelText: "#333333",
//             subtleText: "#666666",
//             inputBorder: "#0b60dfff",
//             inputBackground: "#ffffffff",
//             inputText: "#1a1a1a",
//             inputRadioBorder: "#0d62e1ff",
//             inputRadioBorderChecked: "#ff6b6b",
//             pageBackground: "#f9f9f9",
//             containerBackground: "#fff0e7",
//             containerBorder: "#000000ff",
//         },
//         borderWidths: {
//             container: "thin",
//             input: "none",
//         },
//         radii: {
//             container: "none",
//             input: "subtle",
//         },
//         shadows: {
//             focusRing: "0 0 0 3px rgba(255, 107, 107, 0.2)",
//         },
//         fontSizes: {
//             base: "15px",
//             input: "15px",
//         },
//         fonts: {
//             body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//         },
//     }

//     return (
//         <>
//             <div className="gr4vy-payment-wrapper">
//                 {cart?.total && (
//                     <div style={{ marginBottom: "1rem" }}>
//                         <p style={{ fontSize: "16px", marginBottom: "8px" }}>
//                             <strong>Total Amount:</strong>{" "}
//                             {cart?.currency_code?.toUpperCase()}{" "}
//                             {(cart.total).toFixed(2)}
//                         </p>
//                     </div>
//                 )}
//                 <h2 className="gr4vy-payment-title">Payment</h2>
//                 {token ? (
//                     <div>
//                         <div className="gr4vy-container">
//                             <Embed
//                                 ref={embedRef}
//                                 gr4vyId="smarteremr"
//                                 amount={amount}
//                                 currency={cart.currency_code?.toUpperCase() || "USD"}
//                                 buyerExternalIdentifier="40593bb4-be25-409b-87ce-bef7c979563f"
//                                 country="US"
//                                 token={token}
//                                 environment="sandbox"
//                                 theme={theme}
//                                 onComplete={handleComplete}
//                             />
//                         </div>

//                         <button className="gr4vy-pay-button" onClick={handlePayNow}>
//                             Complete Payment
//                         </button>
//                     </div>
//                 ) : (
// <button
//     className="gr4vy-pay-button"
//     onClick={generateToken}
//     disabled={loading}
// >
//     {loading ? "Loading..." : "Start Payment"}
// </button>
//                 )}
//             </div>
//             {/* <Button
//                 size="large"
//                 className="mt-6"
//                 disabled={!transactionId}
//             >
//                 Continue to review
//             </Button> */}
//         </>
//     )
// }

// export default Gr4vyPayment





//WORKING CODE-
// "use client";

// import React, { useEffect, useRef, useState } from 'react';
// import Embed from '@gr4vy/embed-react';
// import './Gr4vyPayment.css';
// import { Button } from '@medusajs/ui';

// const Gr4vyPayment = () => {
//     const embedRef = useRef(null);
//     const [isAuthorized, setIsAuthorized] = useState(false)
//     const [transactionId, setTransactionId] = useState<string | null>(null);

//     useEffect(() => {
//         const savedId = localStorage.getItem("transactionId");
//         if (savedId) {
//             setTransactionId(savedId);
//         }
//     }, []);


//     // TODO: Replace this with your actual token
//     const token = "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6ImsyY1BpY1g2MHBCRVMtTkpLckY0bUd3RUR2OGNRSVhibzc2ZUlrS0JRaWMifQ.eyJzY29wZXMiOlsiZW1iZWQiXSwiY2hlY2tvdXRfc2Vzc2lvbl9pZCI6ImViOGY3MWUxLTU4NmYtNGE1NS04ZDFlLTEzNDJmNGZkNzVkZSIsImVtYmVkIjp7ImFtb3VudCI6MTM5OSwiY3VycmVuY3kiOiJVU0QiLCJidXllcl9leHRlcm5hbF9pZGVudGlmaWVyIjoiNDA1OTNiYjQtYmUyNS00MDliLTg3Y2UtYmVmN2M5Nzk1NjNmIn0sImlhdCI6MTc2MTgyOTc3NywibmJmIjoxNzYxODI5Nzc3LCJleHAiOjE3NjE4MzMzNzcsImlzcyI6InNwZWFrZWFzeS1zZGsvdHlwZXNjcmlwdCAxLjQuMCAyLjcyOC4wIDEuMC4wIEBncjR2eS9zZGsiLCJqdGkiOiI2OGUyMjBmZi1jZjJkLTQ5NzctYmVhYy0wOGU1ZTFlZDQ3MGEifQ.AbKdFt8Nl_Q7DsK9IR06pRJvbgnzLeIAC2Pb2wciE4QnDUAwShWtqSBXPtZS2OruIoBIxtgnnvTqbWJ687AD5bXzAB3ob4lF5Ni74MopBnJLBUB1GuLrJNoCH7xlejTWovy1V40X0Y3xs7oDxp9loNxSCdqmUH57AhuMUorFabOxX9Y9";

//     const handleComplete = (transaction: any) => {
//         console.log("Transaction completed!");
//         console.log(transaction);
//         alert(
//             "Transaction ID: " + transaction.id + "\n" +
//             "Status: " + transaction.status
//         );
//         if (transaction.status === "authorization_succeeded") {
//             setTransactionId(transaction.id);
//             localStorage.setItem("transactionId", transaction.id);
//         }
//     };

//     const handlePayNow = () => {
//         if (embedRef.current) {
//             embedRef.current.submit();
//         }
//     };

//     // Theme customization to match your design
//     const theme = {
//         colors: {
//             primary: '#ff6b6b',
//             danger: '#dc3545',
//             focus: '#ff6b6b',
//             text: '#1a1a1a',
//             labelText: '#333333',
//             subtleText: '#666666',
//             inputBorder: '#0b60dfff',
//             inputBackground: '#ffffffff',
//             inputText: '#1a1a1a',
//             inputRadioBorder: '#0d62e1ff',
//             inputRadioBorderChecked: '#ff6b6b',
//             pageBackground: '#f9f9f9',
//             containerBackground: '#fff0e7',
//             containerBorder: '#000000ff',

//         },
//         borderWidths: {
//             container: 'thin',
//             input: 'none'
//         },
//         radii: {
//             container: 'none',
//             input: 'subtle'
//         },
//         shadows: {
//             focusRing: '0 0 0 3px rgba(255, 107, 107, 0.2)'
//         },
//         fontSizes: {
//             base: '15px',
//             input: '15px'
//         },
//         fonts: {
//             body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
//         }
//     };

//     return (
//         <div className="gr4vy-payment-wrapper">
//             <h2 className="gr4vy-payment-title">Payment</h2>

//             <div className="gr4vy-container">
//                 <Embed
//                     ref={embedRef}
//                     gr4vyId="smarteremr"
//                     amount={1399}
//                     currency="USD"
//                     buyerExternalIdentifier="40593bb4-be25-409b-87ce-bef7c979563f"
//                     country="US"
//                     token={token}
//                     environment="sandbox"
//                     theme={theme}
//                     onComplete={handleComplete}
//                 />
//             </div>

//             <button
//                 className="gr4vy-pay-button"
//                 onClick={handlePayNow}
//             >
//                 Complete Payment
//             </button>
//             <Button
//                 size="large"
//                 className="mt-6"
//                 disabled={!transactionId}
//             >
//                 Continue to review
//             </Button>
//         </div>
//     );
// };

// export default Gr4vyPayment;
