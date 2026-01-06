import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import { QuoteView } from "@/src/presentation/components/quote/QuoteView";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";

/**
 * Generate metadata for the Quote page
 */
export const metadata: Metadata = {
  title: "ใบเสนอราคา | Queue Quote",
  description: "ใบเสนอราคาระบบจัดการคิว Queue Management System แบบ Print-friendly",
  robots: "noindex", // Don't index quote pages
};

/**
 * Quote Page - Server Component
 * Print-friendly quotation document
 */
export default function QuotePage() {
  return (
    <MainLayout showBubbles={false}>
      <QuoteView />
    </MainLayout>
  );
}
