import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import { PrivacyView } from "@/src/presentation/components/privacy/PrivacyView";
import type { Metadata } from "next";

/**
 * Metadata for Privacy page
 */
export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | Queue Quote",
  description: "นโยบายความเป็นส่วนตัวของ Queue Quote ระบบจัดการคิวอัจฉริยะ",
};

/**
 * Privacy Page - Server Component
 */
export default function PrivacyPage() {
  return (
    <MainLayout showBubbles={false}>
      <PrivacyView />
    </MainLayout>
  );
}
