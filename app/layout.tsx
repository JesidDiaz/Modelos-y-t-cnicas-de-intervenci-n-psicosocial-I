import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  return {
    metadataBase,
    title: "Modelos y técnicas de intervención psicosocial I",
    description:
      "OVA de la Maestría en Intervención Psicosocial con cinco modelos, actividades, autoevaluaciones, modo presentación y progreso local.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Modelos y técnicas de intervención psicosocial I",
      description: "Comprender contextos, fortalecer comunidades y diseñar transformación social.",
      type: "website",
      locale: "es_CO",
      images: [{ url: new URL("/og.png", metadataBase).href, width: 1672, height: 945, alt: "Comunidad en diálogo conectada con su territorio y redes" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Modelos y técnicas de intervención psicosocial I",
      description: "Comprender contextos, fortalecer comunidades y diseñar transformación social.",
      images: [new URL("/og.png", metadataBase).href],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
