import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center bg-white border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="text-red-600 text-2xl font-bold mr-8">
              <Link 
                  href={"/home"} 
                >
                  The Crust Experts
                </Link>
              </div>
              <div className="flex gap-8 items-center font-normal text-base mx-auto">
                <Link 
                  href={"/home"} 
                  className="text-black hover:text-red-600 transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href={"/menu"} 
                  className="text-black hover:text-red-600 transition-colors"
                >
                  Menu
                </Link>
                <Link 
                  href={"/cart"} 
                  className="text-black hover:text-red-600 transition-colors"
                >
                  Cart
                </Link>
                <Link 
                  href={"/profile"} 
                  className="text-black hover:text-red-600 transition-colors"
                >
                  Profile
                </Link>
                <Link 
                  href={"/adminDashboard"} 
                  className="text-black hover:text-red-600 transition-colors"
                >
                  Admin dashboard
                </Link>
              </div>
              <div className="ml-8">
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </div>
          </nav>
          <div className="flex flex-col gap-20 w-[90%] p-5">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <h1>FOOTER INFORMATION HERE</h1>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}