import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import { NextAuthProvider } from "@/context/AuthProvider";
import Toast from "@/components/ui/Toast";

const quicksand = localFont({
  src: "./fonts/Quicksand.ttf",
  variable: "--font-quicksand",
  weight: "400, 500, 600, 700, 800, 900",
});

export const metadata: Metadata = {
  title: "Hotel Management App",
  description: "Discover the best hotel rooms in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${quicksand.variable} antialiased overflow-x-hidden`}>
        <NextAuthProvider>
          <ThemeProvider>
            <Toast />
            <main className="font-normal dark:bg-black">
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
