import { BuilderView } from "@/src/presentation/components/builder/BuilderView";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";

/**
 * Generate metadata for the Builder page
 */
export const metadata: Metadata = {
  title: "สร้างใบเสนอราคา | Queue Quote",
  description: "เลือกฟีเจอร์ระบบจัดการคิว (Queue Management) ที่ต้องการ ระบบคำนวณราคาให้อัตโนมัติ พร้อมดู dependencies และ recommendations",
  openGraph: {
    title: "สร้างใบเสนอราคาระบบ Queue Management",
    description: "เลือกฟีเจอร์ คำนวณราคาทันที",
    type: "website",
  },
};

/**
 * Builder Page - Server Component
 * Quotation builder for selecting features
 */
export default function BuilderPage() {
  return (
    <MainLayout showBubbles={false}>
      <BuilderView />
    </MainLayout>
  );
}
