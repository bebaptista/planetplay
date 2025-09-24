import type { Metadata } from "next";
import "./globals.css";
import Header from "../app/header/header";
import Footer from "../app/footer/footer";

export const metadata: Metadata = {
  title: "PlanetPlay",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-black text-white antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

