import type { Metadata } from "next";
import "./globals.css";
import "./star-pages.css";
import { SITE } from "@/lib/site";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} | Midtown Manhattan Medical Spa Demo`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "AestheticBiz — Midtown Manhattan medical spa demo. Facials, laser, peels, skincare, gift cards & AestheticBiz Points. Patient Revenue Platform by CRM Solutions.",
  openGraph: {
    title: `${SITE.name} | Medical Spa Demo`,
    description:
      "Reveal calm clinical confidence — custom booking, retail, gifts & loyalty on one branded platform.",
    url: SITE.domain,
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
