import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Epic Gaming | Home",
  description: "Descubre y guarda tus videojuegos favoritos en Epic Gaming.",

  openGraph: {
    title: "Epic Gaming | Home",  
    description: "Descubre y guarda tus videojuegos favoritos en Epic Gaming.",
    url: "https://eleven-studio-challenge.vercel.app/",
    siteName: "Epic Gaming",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmN4lJni3wJeQJ2S8cXblsRrZY4hItckkQpw&s", 
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
