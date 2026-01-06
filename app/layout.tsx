import type { Metadata } from "next";
import "../public/styles/index.css";
import { ThemeProvider } from "../src/presentation/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Queue Quote - ระบบสร้างใบเสนอราคา Queue Management",
  description: "สร้างใบเสนอราคาระบบจัดการคิว (Queue Management System) ง่ายๆ คุณเลือกฟีเจอร์ เราคำนวณราคาให้",
  keywords: ["Queue Management", "ใบเสนอราคา", "Quotation Builder", "ระบบจัดการคิว"],
  authors: [{ name: "Queue Quote Team" }],
  openGraph: {
    title: "Queue Quote - ระบบสร้างใบเสนอราคา Queue Management",
    description: "สร้างใบเสนอราคาระบบจัดการคิว (Queue Management System) ง่ายๆ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
