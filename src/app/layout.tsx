import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { CalmModeProvider } from "@/components/animations/calm-mode-provider"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "The Chosen Generation | Children's Bible School",
    template: "%s | The Chosen Generation",
  },
  description:
    "Raising a generation of children who know God, love His Word, and walk in His ways through intentional discipleship and formation.",
  keywords: [
    "children ministry",
    "bible school",
    "kids church",
    "christian education",
    "discipleship",
    "Sunday school",
    "children's church",
  ],
  authors: [{ name: "The Chosen Generation Ministry" }],
  openGraph: {
    title: "The Chosen Generation | Children's Bible School",
    description:
      "Raising a generation of children who know God, love His Word, and walk in His ways.",
    type: "website",
    locale: "en_US",
    siteName: "The Chosen Generation",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Chosen Generation | Children's Bible School",
    description:
      "Raising a generation of children who know God, love His Word, and walk in His ways.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f59e0b",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased">
        <CalmModeProvider>
          <ToastProvider>
            {children}
            <ToastViewport />
          </ToastProvider>
        </CalmModeProvider>
      </body>
    </html>
  )
}
