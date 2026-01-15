'use client';

import { DOCUMENT_PREFIXES, VAT_CONFIG } from '@/src/config/quotation.config';
import {
    formatPrice,
    getProjectTypeById,
    type Feature,
} from '@/src/data/mock/mockFeatures';
import { useQuotationStore } from '@/src/store/quotationStore';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

/**
 * useReceiptPresenter Hook
 * Handles all business logic for ReceiptView
 * Following Clean Architecture - separates logic from UI
 */
export function useReceiptPresenter() {
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

  // Local state for payment info
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [paidDate, setPaidDate] = useState(() => {
    return dayjs().format('YYYY-MM-DD'); // Default to today
  });
  const [isLoading, setIsLoading] = useState(false);
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

  // Receipt metadata
  const receiptNumber = useMemo(() => {
    const now = dayjs();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${DOCUMENT_PREFIXES.receipt}-${now.format('YYYYMMDD')}-${random}`;
  }, []);

  const receiptDate = useMemo(() => {
    return dayjs().locale('th').format('D MMMM YYYY');
  }, []);

  const formattedPaidDate = useMemo(() => {
    if (!paidDate) return '';
    return dayjs(paidDate).locale('th').format('D MMMM YYYY');
  }, [paidDate]);

  // Group features by category
  const groupedFeatures = useMemo(() => {
    const groups: Record<string, { categoryName: string; features: Feature[] }> = {};
    selectedFeaturesData.forEach((feature) => {
      if (!groups[feature.categoryId]) {
        groups[feature.categoryId] = {
          categoryName: feature.categoryId,
          features: [],
        };
      }
      groups[feature.categoryId].features.push(feature);
    });
    return Object.entries(groups);
  }, [selectedFeaturesData]);

  // Check if receipt has content
  const hasContent = !!(projectType || selectedFeatures.length > 0);

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `ใบเสร็จรับเงิน-${receiptNumber}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 5mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          font-size: 10px;
          line-height: 1.3;
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

  // Payment info handlers
  const updatePaymentMethod = useCallback((method: string) => {
    setPaymentMethod(method);
  }, []);

  const updatePaymentReference = useCallback((reference: string) => {
    setPaymentReference(reference);
  }, []);

  const updatePaidDate = useCallback((date: string) => {
    setPaidDate(date);
  }, []);

  return {
    // Refs
    printRef,

    // State
    isLoading,
    hasContent,

    // Receipt metadata
    receiptNumber,
    receiptDate,

    // Project data
    projectType,
    projectTypeData,

    // Features data
    selectedFeatures,
    selectedFeaturesData,
    groupedFeatures,

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

    // Payment data
    paymentMethod,
    paymentReference,
    paidDate,
    formattedPaidDate,

    // Actions
    handlePrint,
    updateCustomerName,
    updateCustomerPhone,
    updateCustomerEmail,
    updateNotes,
    updatePaymentMethod,
    updatePaymentReference,
    updatePaidDate,

    // Utilities
    formatPrice,
  };
}
