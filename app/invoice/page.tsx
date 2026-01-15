import { InvoiceView } from "@/src/presentation/components/invoice/InvoiceView";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";

/**
 * Generate metadata for the Invoice page
 */
export const metadata: Metadata = {
  title: "ใบแจ้งหนี้ | Queue Quote",
  description: "ใบแจ้งหนี้สำหรับเรียกเก็บเงินค่าระบบจัดการคิว (Queue Management)",
  openGraph: {
    title: "ใบแจ้งหนี้ระบบ Queue Management",
    description: "ใบแจ้งหนี้สำหรับเรียกเก็บเงิน",
    type: "website",
  },
};

/**
 * Invoice Page - Server Component
 * Invoice for payment request
 */
export default function InvoicePage() {
  return (
    <MainLayout showBubbles={false}>
      <InvoiceView />
    </MainLayout>
  );
}
