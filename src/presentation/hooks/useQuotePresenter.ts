'use client';

import {
    formatPrice,
    getProjectTypeById,
    type Feature,
} from '@/src/data/mock/mockFeatures';
import { useQuotationStore } from '@/src/store/quotationStore';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

/**
 * useQuotePresenter Hook
 * Handles all business logic for QuoteView
 * Following Clean Architecture - separates logic from UI
 */
export function useQuotePresenter() {
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
  // VAT logic: include = add 7%, exclude = show 0 but note, exempt = no VAT
  const vat = vatOption === 'include' ? Math.round(total * 0.07) : 0;
  const grandTotal = vatOption === 'include' ? Math.round(total * 1.07) : total;

  // Quote metadata
  const quoteNumber = useMemo(() => {
    const date = new Date();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `QQ-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${random}`;
  }, []);

  const quoteDate = new Date().toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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

  // Check if quote has content
  const hasContent = !!(projectType || selectedFeatures.length > 0);

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `ใบเสนอราคา-${quoteNumber}`,
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

  return {
    // Refs
    printRef,

    // State
    isLoading,
    hasContent,

    // Quote metadata
    quoteNumber,
    quoteDate,
    validUntil,

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

    // Actions
    handlePrint,
    updateCustomerName,
    updateCustomerPhone,
    updateCustomerEmail,
    updateNotes,

    // Utilities
    formatPrice,
  };
}
