import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chandra Sekhar Yamparala | Software Engineer Portfolio",
  description:
    "Portfolio of Chandra Sekhar Yamparala, a final-year Computer Science Engineer specializing in Java, Spring Boot, Full Stack Development, Cloud and AI.",
  keywords: [
    "Chandra Sekhar Yamparala",
    "Java Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Spring Boot",
    "Portfolio",
    "Cloud Computing",
    "LeetCode",
  ],
  openGraph: {
    title: "Chandra Sekhar Yamparala | Software Engineer Portfolio",
    description:
      "Building scalable software solutions with Java, Spring Boot, Cloud & AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
