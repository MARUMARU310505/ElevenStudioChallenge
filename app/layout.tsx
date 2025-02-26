import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Epic Gaming | Home",
  description: "Descubre y guarda tus videojuegos favoritos en Epic Gaming.",

  openGraph: {
    title: "Epic Gaming | Home",  
    description: "Descubre y guarda tus videojuegos favoritos en Epic Gaming.",
    url: "https://www.tu-sitio-web.com",
    siteName: "Epic Gaming",
    images: [
      {
        url: "https://www.tu-sitio-web.com/imagen-previa.jpg", 
        width: 1200,
        height: 630,
        alt: "Epic Gaming - Juegos"
      }
    ],
    type: "website", 
  },

  robots: "index, follow",  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="bg-no-repeat bg-cover bg-center h-screen bg-gradient-to-b from-pink-200 from-1% via-white via-20% px-5 md:px-[15%]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
