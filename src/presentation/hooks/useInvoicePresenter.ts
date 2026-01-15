'use client';

import { DOCUMENT_PREFIXES, DOCUMENT_VALIDITY, VAT_CONFIG } from '@/src/config/quotation.config';
import {
    formatPrice,
    getProjectTypeById
} from '@/src/data/mock/mockFeatures';
import { useQuotationStore } from '@/src/store/quotationStore';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

/**
 * useInvoicePresenter Hook
 * Handles all business logic for InvoiceView
 * Following Clean Architecture - separates logic from UI
 */
export function useInvoicePresenter() {
  // Store state
  const {
    projectType,
    selectedFeatures,
    discountPercent,
    vatOption,
    customerName,
    customerPhone,
    customerEmail,
    notes,
    getSubtotal,
    getDiscount,
    getTotal,
    getSelectedFeaturesData,
    setCustomerInfo,
    setNotes,
  } = useQuotationStore();

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [dueDate, setDueDate] = useState(() => {
    return dayjs().add(DOCUMENT_VALIDITY.invoiceDueDays, 'day').format('YYYY-MM-DD');
  });
  const printRef = useRef<HTMLDivElement>(null);

  // Computed values
  const projectTypeData = useMemo(
    () => (projectType ? getProjectTypeById(projectType) : null),
    [projectType]
  );

  const selectedFeaturesData = useMemo(
    () => getSelectedFeaturesData(),
    [getSelectedFeaturesData]
  );

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  // VAT logic: include = add 7%, exclude/exempt = no VAT
  const vat = vatOption === 'include' ? Math.round(total * VAT_CONFIG.rate) : 0;
  const grandTotal = vatOption === 'include' ? Math.round(total * VAT_CONFIG.multiplier) : total;

  // Invoice metadata
  const invoiceNumber = useMemo(() => {
    const now = dayjs();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${DOCUMENT_PREFIXES.invoice}-${now.format('YYYYMMDD')}-${random}`;
  }, []);

  const invoiceDate = useMemo(() => {
    return dayjs().locale('th').format('D MMMM YYYY');
  }, []);

  const formattedDueDate = useMemo(() => {
    if (!dueDate) return '';
    return dayjs(dueDate).locale('th').format('D MMMM YYYY');
  }, [dueDate]);

  // Check if invoice has content
  const hasContent = !!(projectType || selectedFeatures.length > 0);

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `ใบแจ้งหนี้-${invoiceNumber}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 8mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          font-size: 11px;
        }
        .print-hidden {
          display: none !important;
        }
        .print\\:block {
          display: block !important;
        }
      }
    `,
  });

  // Customer info handlers
  const updateCustomerName = useCallback(
    (name: string) => setCustomerInfo({ name }),
    [setCustomerInfo]
  );

  const updateCustomerPhone = useCallback(
    (phone: string) => setCustomerInfo({ phone }),
    [setCustomerInfo]
  );

  const updateCustomerEmail = useCallback(
    (email: string) => setCustomerInfo({ email }),
    [setCustomerInfo]
  );

  const updateNotes = useCallback(
    (newNotes: string) => setNotes(newNotes),
    [setNotes]
  );

  const updateDueDate = useCallback((date: string) => {
    setDueDate(date);
  }, []);

  return {
    // Refs
    printRef,

    // State
    isLoading,
    hasContent,

    // Invoice metadata
    invoiceNumber,
    invoiceDate,
    dueDate,
    formattedDueDate,

    // Project data
    projectType,
    projectTypeData,

    // Features data
    selectedFeatures,
    selectedFeaturesData,

    // Price data
    subtotal,
    discount,
    discountPercent,
    total,
    vat,
    grandTotal,
    vatOption,

    // Customer data
    customerName,
    customerPhone,
    customerEmail,
    notes,

    // Actions
    handlePrint,
    updateCustomerName,
    updateCustomerPhone,
    updateCustomerEmail,
    updateNotes,
    updateDueDate,

    // Utilities
    formatPrice,
  };
}
