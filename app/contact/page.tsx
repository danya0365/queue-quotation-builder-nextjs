import { ContactView } from "@/src/presentation/components/contact/ContactView";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

/**
 * Metadata for Contact page
 */
export const metadata: Metadata = {
  title: "ติดต่อเรา | Queue Quote",
  description: "ติดต่อทีมงาน Queue Quote ระบบจัดการคิวอัจฉริยะ โทร 02-xxx-xxxx",
};

/**
 * Contact Page - Server Component
 */
export default function ContactPage() {
  return (
    <MainLayout showBubbles={false}>
      <ContactView />
    </MainLayout>
  );
}
