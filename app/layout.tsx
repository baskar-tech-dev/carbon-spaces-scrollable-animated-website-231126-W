import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CARBON SPACES — We Design Experience | Interior, Acoustics, Signboards, Elevation",
  description:
    "Complete Space Transformation Company based in Tamil Nadu, India. Architectural luxury across Interior Solutions, Acoustics, Signboards, and Building Elevation.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  keywords: [
    "CARBON SPACES",
    "We Design Experience",
    "Complete Space Transformation",
    "Interior Solutions Coimbatore",
    "Architectural Acoustics Tamil Nadu",
    "Commercial Signboards",
    "Building Elevation ACP Cladding",
    "Coimbatore Architects",
    "Luxury Architecture India",
  ],
  authors: [{ name: "Future Mind Studio", url: "https://futuremindstudio.com" }],
  creator: "Future Mind Studio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
