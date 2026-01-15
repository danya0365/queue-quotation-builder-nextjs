/**
 * Quotation Configuration
 * 
 * Single source of truth for quotation-related settings.
 * Update this file to change VAT rates, validity periods, and document terms.
 * 
 * ⚠️ Changes here will affect:
 * - useQuotePresenter, useInvoicePresenter, useReceiptPresenter
 * - SummaryPanel (VAT calculations)
 * - QuoteView, InvoiceView, ReceiptView (terms & conditions)
 */

/**
 * VAT Configuration
 */
export const VAT_CONFIG = {
  /** VAT rate (e.g., 0.07 = 7%) */
  rate: 0.07,
  /** VAT percentage for display */
  ratePercent: 7,
  /** Multiplier for total with VAT (e.g., 1.07) */
  multiplier: 1.07,
} as const;

/**
 * Document Validity Periods
 */
export const DOCUMENT_VALIDITY = {
  /** Quote valid for N days */
  quoteValidDays: 30,
  /** Invoice due in N days */
  invoiceDueDays: 7,
  /** Late payment interest rate (monthly) */
  latePaymentInterestPercent: 1.5,
} as const;

/**
 * Quote Terms & Conditions
 */
export const QUOTE_TERMS = [
  `ราคานี้มีผล ${DOCUMENT_VALIDITY.quoteValidDays} วันนับจากวันที่ออกใบเสนอราคา`,
  'ราคารวมแล้วนี้รวมบริการ: ติดตั้ง, Training, Support 3 เดือน',
  'เงื่อนไขการชำระ: 50% เมื่อตกลง, 50% เมื่อส่งมอบงาน',
] as const;

/**
 * Invoice Terms & Conditions
 */
export const INVOICE_TERMS = [
  'กรุณาชำระเงินภายในวันครบกำหนด',
  `หากพ้นกำหนด บริษัทฯ ขอสงวนสิทธิ์คิดดอกเบี้ย ${DOCUMENT_VALIDITY.latePaymentInterestPercent}% ต่อเดือน`,
] as const;

/**
 * Document Number Prefixes
 */
export const DOCUMENT_PREFIXES = {
  quote: 'QQ',
  invoice: 'INV',
  receipt: 'RC',
} as const;

/**
 * Calculate VAT amount from total
 */
export function calculateVAT(total: number): number {
  return Math.round(total * VAT_CONFIG.rate);
}

/**
 * Calculate grand total with VAT
 */
export function calculateGrandTotal(total: number): number {
  return Math.round(total * VAT_CONFIG.multiplier);
}

/**
 * Export type for quotation config
 */
export type QuotationConfig = {
  vat: typeof VAT_CONFIG;
  validity: typeof DOCUMENT_VALIDITY;
  quoteTerms: typeof QUOTE_TERMS;
  invoiceTerms: typeof INVOICE_TERMS;
  prefixes: typeof DOCUMENT_PREFIXES;
};
