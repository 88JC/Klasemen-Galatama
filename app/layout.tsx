import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Klasemen Galatama (Galtam) | Live Tournament Leaderboard",
  description: "Platform pencatatan skor, klasemen real-time, dan manajemen turnamen mancing Galatama Fish It secara profesional.",
  keywords: ["Klasemen Galatama", "Galtam", "Roblox Fish It", "Mancing Galatama", "Turnamen Leaderboard"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#15803d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${lexend.variable} dark h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900 dark:selection:bg-emerald-900 dark:selection:text-emerald-100">
        {children}
      </body>
    </html>
  );
}
