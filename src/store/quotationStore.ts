/**
 * Quotation Store
 * Zustand store สำหรับเก็บ state ของใบเสนอราคา
 */

import {
    calculateTotalPrice,
    checkDependencies,
    getFeatureById,
    getProjectTypeById,
    type Feature,
} from '@/src/data/mock/mockFeatures';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface QuotationState {
  // State
  projectType: string | null;
  selectedFeatures: string[];
  discountPercent: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;

  // Computed
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getSelectedFeaturesData: () => Feature[];

  // Actions
  setProjectType: (id: string | null) => void;
  toggleFeature: (id: string) => void;
  selectFeatures: (ids: string[]) => void;
  clearFeatures: () => void;
  canSelectFeature: (id: string) => boolean;
  setDiscountPercent: (percent: number) => void;
  setCustomerInfo: (info: { name?: string; phone?: string; email?: string }) => void;
  setNotes: (notes: string) => void;
  reset: () => void;
}

const initialState = {
  projectType: null as string | null,
  selectedFeatures: [] as string[],
  discountPercent: 0,
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
        const { projectType, selectedFeatures } = get();
        return calculateTotalPrice(projectType, selectedFeatures);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const { discountPercent } = get();
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

      setDiscountPercent: (percent) => {
        set({ discountPercent: Math.max(0, Math.min(100, percent)) });
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
        selectedFeatures: state.selectedFeatures,
        discountPercent: state.discountPercent,
        customerName: state.customerName,
        customerPhone: state.customerPhone,
        customerEmail: state.customerEmail,
        notes: state.notes,
      }),
    }
  )
);
