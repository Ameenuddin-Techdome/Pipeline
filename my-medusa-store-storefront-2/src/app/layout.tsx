import { fetchStrapiTheme } from "@lib/data/fetchStrapiTheme"
import { getBaseURL } from "@lib/util/env"
import ApplyTheme from "@modules/layout/templates/ApplyTheme"
import ThemePreview from "@modules/layout/templates/ThemePreview"
import { Metadata } from "next"
import "styles/globals.css"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  icons: {
    icon: "/favicon.png",
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {

  const themeVars = await fetchStrapiTheme();
  const styleObject: React.CSSProperties = themeVars
    ? Object.fromEntries(Object.entries(themeVars))
    : {}

  return (
    <html lang="en" data-mode="light" className={inter.className}>
      <body style={styleObject}>
        <ApplyTheme />
        <main className="relative">{props.children}</main>
        {/* <ThemePreview /> */}
      </body>
    </html>
  )
}
