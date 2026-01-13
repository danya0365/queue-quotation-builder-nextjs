/**
 * Quotation Store
 * Zustand store สำหรับเก็บ state ของใบเสนอราคา
 */

import {
  calculatePlatformPrice,
  calculateTotalPrice,
  checkDependencies,
  getFeatureById,
  getPlatformById,
  getProjectTypeById,
  type Feature,
  type Platform,
} from '@/src/data/mock/mockFeatures';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface QuotationState {
  // State
  projectType: string | null;
  selectedPlatforms: string[];
  selectedFeatures: string[];
  discountPercent: number;
  discountAmount: number; // Fixed discount amount (ส่วนลดจำนวนเงิน)
  vatOption: 'include' | 'exclude' | 'exempt'; // VAT option: include=รวม, exclude=ไม่รวม, exempt=ไม่คิด
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;

  // Computed
  getSubtotal: () => number;
  getPlatformSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getSelectedFeaturesData: () => Feature[];
  getSelectedPlatformsData: () => Platform[];

  // Actions
  setProjectType: (id: string | null) => void;
  toggleFeature: (id: string) => void;
  selectFeatures: (ids: string[]) => void;
  clearFeatures: () => void;
  canSelectFeature: (id: string) => boolean;
  togglePlatform: (id: string) => void;
  clearPlatforms: () => void;
  setDiscountPercent: (percent: number) => void;
  setDiscountAmount: (amount: number) => void;
  setVatOption: (option: 'include' | 'exclude' | 'exempt') => void; // Set VAT option
  setCustomerInfo: (info: { name?: string; phone?: string; email?: string }) => void;
  setNotes: (notes: string) => void;
  reset: () => void;
}

const initialState = {
  projectType: null as string | null,
  selectedPlatforms: [] as string[],
  selectedFeatures: [] as string[],
  discountPercent: 0,
  discountAmount: 0,
  vatOption: 'include' as 'include' | 'exclude' | 'exempt', // Default: include VAT
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  notes: '',
};

export const useQuotationStore = create<QuotationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // ============================================
      // Computed
      // ============================================
      getSubtotal: () => {
        const { projectType, selectedFeatures, selectedPlatforms } = get();
        const featurePrice = calculateTotalPrice(projectType, selectedFeatures);
        const platformPrice = calculatePlatformPrice(selectedPlatforms);
        return featurePrice + platformPrice;
      },

      getPlatformSubtotal: () => {
        const { selectedPlatforms } = get();
        return calculatePlatformPrice(selectedPlatforms);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const { discountPercent, discountAmount } = get();
        // If discountAmount is set, use it; otherwise calculate from percent
        if (discountAmount > 0) {
          return discountAmount;
        }
        return Math.round(subtotal * (discountPercent / 100));
      },

      getTotal: () => {
        return get().getSubtotal() - get().getDiscount();
      },

      getSelectedFeaturesData: () => {
        const { selectedFeatures } = get();
        return selectedFeatures
          .map((id) => getFeatureById(id))
          .filter((f): f is Feature => f !== undefined);
      },

      getSelectedPlatformsData: () => {
        const { selectedPlatforms } = get();
        return selectedPlatforms
          .map((id) => getPlatformById(id))
          .filter((p): p is Platform => p !== undefined);
      },

      // ============================================
      // Actions
      // ============================================
      setProjectType: (id) => {
        const projectType = id ? getProjectTypeById(id) : null;
        if (projectType || id === null) {
          set({ projectType: id });
        }
      },

      toggleFeature: (id) => {
        const { selectedFeatures } = get();
        const isSelected = selectedFeatures.includes(id);

        if (isSelected) {
          // When deselecting, also remove features that depend on this one
          const newSelected = selectedFeatures.filter((fId) => {
            if (fId === id) return false;
            const feature = getFeatureById(fId);
            return !feature?.dependencies.includes(id);
          });
          set({ selectedFeatures: newSelected });
        } else {
          // When selecting, check dependencies
          if (get().canSelectFeature(id)) {
            set({ selectedFeatures: [...selectedFeatures, id] });
          }
        }
      },

      selectFeatures: (ids) => {
        set({ selectedFeatures: ids });
      },

      clearFeatures: () => {
        set({ selectedFeatures: [] });
      },

      canSelectFeature: (id) => {
        const { selectedFeatures } = get();
        return checkDependencies(id, selectedFeatures);
      },

      togglePlatform: (id) => {
        const { selectedPlatforms } = get();
        const isSelected = selectedPlatforms.includes(id);
        if (isSelected) {
          set({ selectedPlatforms: selectedPlatforms.filter((pId) => pId !== id) });
        } else {
          set({ selectedPlatforms: [...selectedPlatforms, id] });
        }
      },

      clearPlatforms: () => {
        set({ selectedPlatforms: [] });
      },

      setDiscountPercent: (percent) => {
        // When setting percent, clear fixed amount
        set({ discountPercent: Math.max(0, Math.min(100, percent)), discountAmount: 0 });
      },

      setDiscountAmount: (amount) => {
        // When setting fixed amount, clear percent
        set({ discountAmount: Math.max(0, amount), discountPercent: 0 });
      },

      setVatOption: (option) => {
        set({ vatOption: option });
      },

      setCustomerInfo: (info) => {
        set((state) => ({
          customerName: info.name ?? state.customerName,
          customerPhone: info.phone ?? state.customerPhone,
          customerEmail: info.email ?? state.customerEmail,
        }));
      },

      setNotes: (notes) => {
        set({ notes });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'quotation-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        projectType: state.projectType,
        selectedPlatforms: state.selectedPlatforms,
        selectedFeatures: state.selectedFeatures,
        discountPercent: state.discountPercent,
        discountAmount: state.discountAmount,
        vatOption: state.vatOption,
        customerName: state.customerName,
        customerPhone: state.customerPhone,
        customerEmail: state.customerEmail,
        notes: state.notes,
      }),
    }
  )
);
