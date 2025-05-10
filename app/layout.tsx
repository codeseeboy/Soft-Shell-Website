import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "SoftSell - Maximize Your Software License Value",
  description:
    "SoftSell helps businesses sell unused software licenses quickly and at the best market rates. Turn your idle software assets into cash.",
  keywords: [
    "software resale",
    "license reselling",
    "software license marketplace",
    "sell software licenses",
    "software asset management",
  ],
  authors: [{ name: "SoftSell Team" }],
  openGraph: {
    title: "SoftSell - Maximize Your Software License Value",
    description: "SoftSell helps businesses sell unused software licenses quickly and at the best market rates.",
    url: "https://softsell.vercel.app",
    siteName: "SoftSell",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftSell - Maximize Your Software License Value",
    description: "SoftSell helps businesses sell unused software licenses quickly and at the best market rates.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
