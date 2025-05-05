import { EnvVarWarning } from "@/components/env-var-warning"
import HeaderAuth from "@/components/header-auth"
import { hasEnvVars } from "@/utils/supabase/check-env-vars"
import { Geist } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { getCustomerType } from "../app/actions/getCustomerType"
import { Home, Menu, ShoppingCart, User, LayoutDashboard } from "lucide-react"
import { CartProvider } from "../app/context/CartContext" // Import CartProvider
import { CartCounter } from "../app/components/CartCounter" // Import CartCounter
import type { ReactNode } from "react"

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "The Crust Experts",
  description: "Pizza restaurant",
}

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
})

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Get profile type using a client-side approach or static props
  let profileType = 0
  try {
    const profileData = await getCustomerType()
    if (profileData && profileData.customer) {
      profileType = profileData.customer.user_type
    }
  } catch (error) {
    console.error("Error fetching customer type:", error)
  }

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-gray-50 text-foreground">
        {/* Wrap the entire app with CartProvider */}
        <CartProvider>
          <main>
            <div className="flex-1 w-full flex flex-col gap-10 items-center">
              {/* Modern Navigation Bar */}
              <header className="w-full bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <Link href="/home" className="text-red-600 text-2xl font-bold flex items-center">
                        The Crust Experts
                      </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-8">
                      <Link
                        href="/home"
                        className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Home className="h-4 w-4" />
                        Home
                      </Link>
                      <Link
                        href="/menu"
                        className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <Menu className="h-4 w-4" />
                        Menu
                      </Link>
                      <Link
                        href="/cart"
                        className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 relative"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Cart
                        <CartCounter />
                      </Link>
                      <Link
                        href="/profile"
                        className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                      {profileType > 0 && (
                        <Link
                          href="/adminDashboard"
                          className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Admin
                        </Link>
                      )}
                    </nav>

                    {/* Auth Button */}
                    <div className="flex items-center">{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}</div>
                  </div>
                </div>

                {/* Mobile Navigation (hidden on desktop) */}
                <div className="md:hidden border-t border-gray-200">
                  <div className="flex justify-between px-2 pt-2 pb-3 space-x-1">
                    <Link
                      href="/home"
                      className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex flex-col items-center"
                    >
                      <Home className="h-5 w-5" />
                      <span className="text-xs mt-1">Home</span>
                    </Link>
                    <Link
                      href="/menu"
                      className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex flex-col items-center"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="text-xs mt-1">Menu</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex flex-col items-center relative"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <CartCounter />
                      <span className="text-xs mt-1">Cart</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex flex-col items-center"
                    >
                      <User className="h-5 w-5" />
                      <span className="text-xs mt-1">Profile</span>
                    </Link>
                    {profileType > 0 && (
                      <Link
                        href="/adminDashboard"
                        className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex flex-col items-center"
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="text-xs mt-1">Admin</span>
                      </Link>
                    )}
                  </div>
                </div>
              </header>

              <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>

              <footer className="w-full bg-white border-t py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-red-600 font-bold text-xl">The Crust Experts</h2>
                      <p className="text-gray-600 text-sm mt-1">Authentic Italian Pizza Since 1985</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span>(662) 854-9012</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span>TheCrustExperts07@gmail.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} The Crust Experts. All rights reserved.
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
