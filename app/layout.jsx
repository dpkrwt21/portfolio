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
  metadataBase: new URL("https://deepakrawat18.me"),
  title: {
    default: "Deepak Rawat | Freelancer & Fullstack Developer",
    template: "%s | Deepak Rawat",
  },
  description:
    "Deepak Rawat (dpkrwt) is a freelancer and fullstack developer building SEO friendly websites, modern web apps, and high-performing digital experiences.",
  keywords: [
    "Deepak Rawat",
    "deepak rawat",
    "dpkrwt",
    "freelancer",
    "freelancer deepak rawat",
    "fullstackdeveloper",
    "deepak rawat fullstack developer",
    "seo friendly",
    "seoranking",
    "websitedevelopment",
    "devdeepak",
    "web developer",
    "React developer",
    "Next.js developer",
  ],
  authors: [{ name: "Deepak Rawat" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  alternates: {
    canonical: "https://deepakrawat18.me/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Deepak Rawat | Freelancer & Fullstack Developer",
    description:
      "Freelancer and fullstack developer Deepak Rawat creating SEO friendly websites, web apps, and digital experiences.",
    url: "https://deepakrawat18.me/",
    siteName: "Deepak Rawat Portfolio",
    images: [
      {
        url: "https://deepakrawat18.me/preview.png",
        width: 1200,
        height: 630,
        alt: "Deepak Rawat portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Rawat | Freelancer & Fullstack Developer",
    description: "SEO friendly website development and fullstack solutions by Deepak Rawat.",
    images: ["https://deepakrawat18.me/preview.png"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Deepak Rawat",
      alternateName: ["deepakrawat18", "dpkrwt", "devdeepak"],
      url: "https://deepakrawat18.me/",
      jobTitle: "Freelancer and Fullstack Developer",
      description:
        "Deepak Rawat is a freelancer and fullstack developer building SEO friendly websites and modern web apps.",
      sameAs: [
        "https://github.com/dpkrwt21",
        "https://www.linkedin.com/in/deepak-rawat-95003a363",
      ],
      knowsAbout: [
        "Web Development",
        "SEO",
        "Next.js",
        "React",
        "Fullstack Development",
        "Freelancing",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Deepak Rawat Portfolio",
      url: "https://deepakrawat18.me/",
      description:
        "Portfolio website of Deepak Rawat, a freelancer and fullstack developer focused on SEO friendly website development.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://deepakrawat18.me/",
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#111111" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
