import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "./globals.css";
import AppProvider from "@/provider/AppProvider";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/Form/theme/theme-provider";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard Task",
  description: "A dashboard task to manage products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className}  antialiased max-w-screen-2xl mx-auto `}
      >
        <AppProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
            <ToastContainer />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
