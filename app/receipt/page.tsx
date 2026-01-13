import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import { ReceiptView } from "@/src/presentation/components/receipt/ReceiptView";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";

/**
 * Generate metadata for the Receipt page
 */
export const metadata: Metadata = {
  title: "ใบเสร็จรับเงิน | Queue Quote",
  description: "ใบเสร็จรับเงินระบบจัดการคิว Queue Management System แบบ Print-friendly",
  robots: "noindex", // Don't index receipt pages
};

/**
 * Receipt Page - Server Component
 * Print-friendly receipt document
 */
export default function ReceiptPage() {
  return (
    <MainLayout showBubbles={false}>
      <ReceiptView />
    </MainLayout>
  );
}
