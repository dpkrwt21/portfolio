import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deepak Rawat Developer | deepakrawat18 — Full-Stack Developer Portfolio",
  description: "Deepak Rawat (deepakrawat18) — full-stack developer portfolio. Projects, skills and contact details for Deepak Rawat, software engineer specializing in React, Node.js and Python.",
  keywords: "Deepak Rawat developer, deepakrawat18, Deepak Rawat portfolio, Deepak Rawat software engineer, Deepak Rawat full stack developer, Deepak Rawat coder",
  authors: [{ name: "Deepak Rawat" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://deepakrawat18.me/",
  },
  openGraph: {
    type: "website",
    title: "Deepak Rawat Developer | deepakrawat18",
    description: "Full-stack developer portfolio of Deepak Rawat (deepakrawat18) — projects, skills, and contact.",
    url: "https://deepakrawat18.me/",
    siteName: "Deepak Rawat Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Rawat Developer | deepakrawat18",
    description: "Full-stack developer portfolio of Deepak Rawat (deepakrawat18).",
    images: ["https://deepakrawat18.me/preview.png"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Deepak Rawat",
    "alternateName": "deepakrawat18",
    "url": "https://deepakrawat18.me/",
    "jobTitle": "Full-Stack Developer",
    "sameAs": [
      "https://github.com/dpkrwt21",
      "https://www.linkedin.com/in/deepak-rawat-95003a363"
    ]
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
