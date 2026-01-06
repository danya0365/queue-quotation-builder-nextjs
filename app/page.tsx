import { HomeView } from "@/src/presentation/components/home/HomeView";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the Home page
 */
export const metadata: Metadata = {
  title: "Queue Quote - สร้างใบเสนอราคาระบบจัดการคิว Queue Management",
  description: "สร้างใบเสนอราคาระบบจัดการคิว (Queue Management System) ง่ายๆ คุณเลือกฟีเจอร์ เราคำนวณราคาให้ ไม่มีค่าใช้จ่ายในการประเมินราคา",
  openGraph: {
    title: "Queue Quote - สร้างใบเสนอราคาระบบจัดการคิว",
    description: "เลือกฟีเจอร์ที่ต้องการ ระบบคำนวณราคาให้ทันที",
    type: "website",
  },
};

/**
 * Home Page - Server Component
 * Landing page for Queue Quotation Builder
 */
export default function HomePage() {
  return (
    <MainLayout showBubbles={true}>
      <HomeView />
    </MainLayout>
  );
}
