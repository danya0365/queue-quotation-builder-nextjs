import { AboutView } from "@/src/presentation/components/about/AboutView";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

/**
 * Metadata for About page
 */
export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | Queue Quote",
  description: "Queue Quote - ผู้เชี่ยวชาญระบบจัดการคิวอัจฉริยะ ด้วยประสบการณ์กว่า 10 ปี ในการพัฒนาโซลูชันสำหรับธุรกิจทุกขนาด",
};

/**
 * About Page - Server Component
 */
export default function AboutPage() {
  return (
    <MainLayout>
      <AboutView />
    </MainLayout>
  );
}
