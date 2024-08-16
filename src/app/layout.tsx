import type { Metadata } from "next";
import {poppins} from "@/components/ui/font";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import {getUserRole, isLoggedIn} from "./actions/auth/auth-actions";



export const metadata: Metadata = {
  title: "Seatudy",
  description: "A online course platform to elevate your learning",
  icons: {
    icon: '/favicon.ico'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSignedIn = await isLoggedIn();
  const userIsLoggedIn = await isLoggedIn();
  const userRole = await getUserRole();

  return (
    <html lang="en">
    <body className={poppins.className}>
    <Navbar isSignedIn={userIsLoggedIn} userRole={userRole} />
    <Toaster/>
      <main className="px-10 sm:px-6 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        {children}
      </main>
    </body>
    </html>
  );
}
