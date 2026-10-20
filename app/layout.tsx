import type { Metadata } from "next";
import { Inter, Space_Mono, Turret_Road } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Scene3D from "@/components/scene-3d";
import { GridOverlay } from "@/components/ui";
import "./globals.css";

const turret = Turret_Road({
  variable: "--font-turret",
  weight: ["500", "700", "800"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "cryptocoders · Grupo de estudio Blockchain & Web3",
    template: "%s · cryptocoders",
  },
  description:
    "Crypto Coders es un grupo de estudio de La Paz, Bolivia, enfocado en el desarrollo Blockchain y Web3: bootcamps, buildathons, investigación y comunidad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${turret.variable} ${inter.variable} ${spaceMono.variable} antialiased`}>
      <body className="min-h-svh">
        <GridOverlay />
        <Scene3D />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
