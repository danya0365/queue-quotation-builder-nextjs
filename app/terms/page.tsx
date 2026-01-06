import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import { TermsView } from "@/src/presentation/components/terms/TermsView";
import type { Metadata } from "next";

/**
 * Metadata for Terms page
 */
export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้งาน | Queue Quote",
  description: "ข้อกำหนดและเงื่อนไขการใช้งาน Queue Quote ระบบจัดการคิวอัจฉริยะ",
};

/**
 * Terms Page - Server Component
 */
export default function TermsPage() {
  return (
    <MainLayout showBubbles={false}>
      <TermsView />
    </MainLayout>
  );
}
