/**
 * Mock Features Data
 * Master data สำหรับ Queue Management System features
 */

// ============================================
// Types
// ============================================

export type FeatureLevel = 'basic' | 'standard' | 'premium';

export interface ProjectType {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  basePrice: number;
}

export interface FeatureCategory {
  id: string;
  name: string;
  icon: string;
  order: number;
}

export interface Feature {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  level: FeatureLevel;
  dependencies: string[]; // Feature IDs that must be selected first
  recommendedFor: string[]; // Project Type IDs
  isPopular?: boolean;
}

// ============================================
// Project Types
// ============================================
export const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'restaurant',
    name: 'ร้านอาหาร',
    nameEn: 'Restaurant',
    icon: '🍽️',
    description: 'ร้านอาหาร ภัตตาคาร คาเฟ่',
    basePrice: 15000,
  },
  {
    id: 'clinic',
    name: 'คลินิก/โรงพยาบาล',
    nameEn: 'Clinic/Hospital',
    icon: '🏥',
    description: 'คลินิกความงาม ทันตกรรม โรงพยาบาล',
    basePrice: 25000,
  },
  {
    id: 'bank',
    name: 'ธนาคาร/การเงิน',
    nameEn: 'Bank/Finance',
    icon: '🏦',
    description: 'ธนาคาร สถาบันการเงิน',
    basePrice: 35000,
  },
  {
    id: 'government',
    name: 'หน่วยงานราชการ',
    nameEn: 'Government',
    icon: '🏛️',
    description: 'สำนักงาน หน่วยงานรัฐ',
    basePrice: 30000,
  },
  {
    id: 'salon',
    name: 'ร้านตัดผม/สปา',
    nameEn: 'Salon/Spa',
    icon: '💇',
    description: 'ร้านตัดผม ร้านเสริมสวย สปา',
    basePrice: 12000,
  },
  {
    id: 'retail',
    name: 'ร้านค้าปลีก',
    nameEn: 'Retail',
    icon: '🛒',
    description: 'ร้านค้า ศูนย์บริการ',
    basePrice: 18000,
  },
  {
    id: 'gaming',
    name: 'ร้านเกม',
    nameEn: 'Gaming Center',
    icon: '🎮',
    description: 'ร้านเกม อินเทอร์เน็ตคาเฟ่ E-Sports',
    basePrice: 14000,
  },
];

// ============================================
// Feature Categories
// ============================================
export const FEATURE_CATEGORIES: FeatureCategory[] = [
  { id: 'core', name: 'ฟีเจอร์หลัก', icon: '⚙️', order: 1 },
  { id: 'queue', name: 'จัดการคิว', icon: '📋', order: 2 },
  { id: 'notification', name: 'การแจ้งเตือน', icon: '🔔', order: 3 },
  { id: 'payment', name: 'การชำระเงิน', icon: '💳', order: 4 },
  { id: 'analytics', name: 'รายงาน/วิเคราะห์', icon: '📊', order: 5 },
  { id: 'customization', name: 'ปรับแต่ง', icon: '🎨', order: 6 },
  { id: 'integration', name: 'เชื่อมต่อระบบ', icon: '🔗', order: 7 },
];

// ============================================
// Features
// ============================================
export const FEATURES: Feature[] = [
  // === Core Features ===
  {
    id: 'queue-basic',
    categoryId: 'core',
    name: 'ระบบคิวพื้นฐาน',
    description: 'จัดการคิวเดียว รองรับ walk-in',
    price: 0,
    level: 'basic',
    dependencies: [],
    recommendedFor: ['restaurant', 'salon', 'clinic', 'bank', 'government', 'retail'],
    isPopular: true,
  },
  {
    id: 'admin-dashboard',
    categoryId: 'core',
    name: 'Admin Dashboard',
    description: 'หน้าจอจัดการสำหรับพนักงาน',
    price: 0,
    level: 'basic',
    dependencies: ['queue-basic'],
    recommendedFor: ['restaurant', 'salon', 'clinic', 'bank', 'government', 'retail'],
  },
  {
    id: 'display-screen',
    categoryId: 'core',
    name: 'จอแสดงคิว',
    description: 'หน้าจอ TV แสดงหมายเลขคิว',
    price: 5000,
    level: 'basic',
    dependencies: ['queue-basic'],
    recommendedFor: ['restaurant', 'clinic', 'bank', 'government'],
    isPopular: true,
  },

  // === Queue Management ===
  {
    id: 'multi-queue',
    categoryId: 'queue',
    name: 'หลายคิว',
    description: 'รองรับหลายคิว/บริการพร้อมกัน',
    price: 8000,
    level: 'standard',
    dependencies: ['queue-basic'],
    recommendedFor: ['clinic', 'bank', 'government'],
    isPopular: true,
  },
  {
    id: 'priority-queue',
    categoryId: 'queue',
    name: 'คิวลำดับความสำคัญ',
    description: 'VIP, ผู้สูงอายุ, คนพิการ',
    price: 5000,
    level: 'standard',
    dependencies: ['queue-basic'],
    recommendedFor: ['bank', 'government', 'clinic'],
  },
  {
    id: 'appointment',
    categoryId: 'queue',
    name: 'จองคิวล่วงหน้า',
    description: 'ลูกค้าจองคิวผ่านเว็บ/แอป',
    price: 12000,
    level: 'standard',
    dependencies: ['queue-basic'],
    recommendedFor: ['clinic', 'salon', 'restaurant'],
    isPopular: true,
  },
  {
    id: 'virtual-queue',
    categoryId: 'queue',
    name: 'Virtual Queue',
    description: 'สแกน QR จองคิวจากที่ใดก็ได้',
    price: 15000,
    level: 'premium',
    dependencies: ['queue-basic', 'appointment'],
    recommendedFor: ['restaurant', 'clinic', 'retail'],
  },
  {
    id: 'multi-branch',
    categoryId: 'queue',
    name: 'รองรับหลายสาขา',
    description: 'จัดการคิวหลายสาขาจากที่เดียว',
    price: 25000,
    level: 'premium',
    dependencies: ['queue-basic', 'admin-dashboard'],
    recommendedFor: ['restaurant', 'clinic', 'bank', 'retail'],
  },

  // === Notification ===
  {
    id: 'sms-notify',
    categoryId: 'notification',
    name: 'SMS แจ้งเตือน',
    description: 'ส่ง SMS เมื่อใกล้ถึงคิว',
    price: 8000,
    level: 'standard',
    dependencies: ['queue-basic'],
    recommendedFor: ['clinic', 'bank', 'government'],
  },
  {
    id: 'line-notify',
    categoryId: 'notification',
    name: 'LINE แจ้งเตือน',
    description: 'แจ้งเตือนผ่าน LINE Official',
    price: 10000,
    level: 'standard',
    dependencies: ['queue-basic'],
    recommendedFor: ['restaurant', 'salon', 'clinic', 'retail'],
    isPopular: true,
  },
  {
    id: 'push-notification',
    categoryId: 'notification',
    name: 'Push Notification',
    description: 'แจ้งเตือนผ่านแอปมือถือ',
    price: 12000,
    level: 'premium',
    dependencies: ['queue-basic'],
    recommendedFor: ['restaurant', 'clinic', 'retail'],
  },
  {
    id: 'voice-call',
    categoryId: 'notification',
    name: 'เรียกด้วยเสียง',
    description: 'ระบบเรียกคิวด้วยเสียง TTS',
    price: 8000,
    level: 'standard',
    dependencies: ['display-screen'],
    recommendedFor: ['bank', 'government', 'clinic'],
  },

  // === Payment ===
  {
    id: 'qr-payment',
    categoryId: 'payment',
    name: 'QR PromptPay',
    description: 'ชำระเงินผ่าน QR PromptPay',
    price: 8000,
    level: 'standard',
    dependencies: ['queue-basic'],
    recommendedFor: ['restaurant', 'salon', 'retail'],
    isPopular: true,
  },
  {
    id: 'credit-card',
    categoryId: 'payment',
    name: 'บัตรเครดิต/เดบิต',
    description: 'รองรับ VISA, MasterCard, JCB',
    price: 15000,
    level: 'premium',
    dependencies: ['queue-basic'],
    recommendedFor: ['clinic', 'retail'],
  },
  {
    id: 'deposit',
    categoryId: 'payment',
    name: 'มัดจำ/จ่ายล่วงหน้า',
    description: 'เก็บมัดจำตอนจองคิว',
    price: 10000,
    level: 'premium',
    dependencies: ['appointment', 'qr-payment'],
    recommendedFor: ['restaurant', 'clinic', 'salon'],
  },

  // === Analytics ===
  {
    id: 'basic-report',
    categoryId: 'analytics',
    name: 'รายงานพื้นฐาน',
    description: 'จำนวนลูกค้า, เวลารอเฉลี่ย',
    price: 5000,
    level: 'basic',
    dependencies: ['admin-dashboard'],
    recommendedFor: ['restaurant', 'salon', 'clinic', 'bank', 'government', 'retail'],
  },
  {
    id: 'advanced-analytics',
    categoryId: 'analytics',
    name: 'วิเคราะห์ขั้นสูง',
    description: 'Peak hours, Prediction, Heatmap',
    price: 18000,
    level: 'premium',
    dependencies: ['basic-report'],
    recommendedFor: ['clinic', 'bank', 'retail'],
    isPopular: true,
  },
  {
    id: 'export-report',
    categoryId: 'analytics',
    name: 'Export รายงาน',
    description: 'ส่งออก Excel, PDF อัตโนมัติ',
    price: 5000,
    level: 'standard',
    dependencies: ['basic-report'],
    recommendedFor: ['bank', 'government', 'clinic'],
  },

  // === Customization ===
  {
    id: 'branding',
    categoryId: 'customization',
    name: 'Branding',
    description: 'ใส่โลโก้ เปลี่ยนสี ตามแบรนด์',
    price: 8000,
    level: 'standard',
    dependencies: ['queue-basic'],
    recommendedFor: ['restaurant', 'salon', 'clinic', 'bank', 'retail'],
    isPopular: true,
  },
  {
    id: 'custom-ticket',
    categoryId: 'customization',
    name: 'ตั๋วคิวกำหนดเอง',
    description: 'ออกแบบตั๋วคิวตามต้องการ',
    price: 5000,
    level: 'standard',
    dependencies: ['queue-basic'],
    recommendedFor: ['restaurant', 'clinic', 'bank'],
  },
  {
    id: 'multi-language',
    categoryId: 'customization',
    name: 'หลายภาษา',
    description: 'รองรับ ไทย, English, 中文',
    price: 10000,
    level: 'premium',
    dependencies: ['queue-basic'],
    recommendedFor: ['bank', 'retail', 'government'],
  },

  // === Integration ===
  {
    id: 'pos-integration',
    categoryId: 'integration',
    name: 'เชื่อม POS',
    description: 'เชื่อมต่อระบบ POS ร้านค้า',
    price: 20000,
    level: 'premium',
    dependencies: ['queue-basic'],
    recommendedFor: ['restaurant', 'retail'],
  },
  {
    id: 'crm-integration',
    categoryId: 'integration',
    name: 'เชื่อม CRM',
    description: 'เชื่อมต่อระบบ CRM',
    price: 25000,
    level: 'premium',
    dependencies: ['queue-basic', 'admin-dashboard'],
    recommendedFor: ['clinic', 'bank', 'retail'],
  },
  {
    id: 'api-access',
    categoryId: 'integration',
    name: 'API Access',
    description: 'REST API สำหรับ developers',
    price: 15000,
    level: 'premium',
    dependencies: ['queue-basic'],
    recommendedFor: ['bank', 'government', 'retail'],
  },
];

// ============================================
// Feature Packages (Templates)
// ============================================

export interface FeaturePackage {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  projectTypes: string[]; // Which project types this package is for
  features: string[]; // Feature IDs included
  discountPercent: number; // Package discount
}

export const FEATURE_PACKAGES: FeaturePackage[] = [
  // === Gaming Center Packages ===
  {
    id: 'gaming-basic',
    name: 'แพ็กเกจเริ่มต้น',
    nameEn: 'Starter',
    icon: '🎯',
    description: 'ระบบคิวพื้นฐาน เหมาะกับร้านเกมขนาดเล็ก',
    projectTypes: ['gaming'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen'],
    discountPercent: 0,
  },
  {
    id: 'gaming-standard',
    name: 'แพ็กเกจมาตรฐาน',
    nameEn: 'Standard',
    icon: '⭐',
    description: 'รองรับหลายโซน + LINE แจ้งเตือน',
    projectTypes: ['gaming'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'multi-queue', 'line-notify', 'qr-payment', 'basic-report'],
    discountPercent: 5,
  },
  {
    id: 'gaming-premium',
    name: 'แพ็กเกจพรีเมียม',
    nameEn: 'Premium',
    icon: '👑',
    description: 'ครบเครื่อง รองรับ E-Sports + สมาชิก',
    projectTypes: ['gaming'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'multi-queue', 'appointment', 'line-notify', 'push-notification', 'qr-payment', 'credit-card', 'basic-report', 'advanced-analytics', 'branding'],
    discountPercent: 10,
  },

  // === Restaurant Packages ===
  {
    id: 'restaurant-basic',
    name: 'แพ็กเกจเริ่มต้น',
    nameEn: 'Starter',
    icon: '🎯',
    description: 'คิว walk-in พื้นฐาน',
    projectTypes: ['restaurant'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen'],
    discountPercent: 0,
  },
  {
    id: 'restaurant-standard',
    name: 'แพ็กเกจมาตรฐาน',
    nameEn: 'Standard',
    icon: '⭐',
    description: 'จองคิวล่วงหน้า + QR Payment',
    projectTypes: ['restaurant'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'appointment', 'line-notify', 'qr-payment', 'basic-report', 'branding'],
    discountPercent: 5,
  },
  {
    id: 'restaurant-premium',
    name: 'แพ็กเกจพรีเมียม',
    nameEn: 'Premium',
    icon: '👑',
    description: 'ครบจบ Virtual Queue + POS + Analytics',
    projectTypes: ['restaurant'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'appointment', 'virtual-queue', 'line-notify', 'qr-payment', 'deposit', 'basic-report', 'advanced-analytics', 'branding', 'pos-integration'],
    discountPercent: 10,
  },

  // === Clinic Packages ===
  {
    id: 'clinic-basic',
    name: 'แพ็กเกจเริ่มต้น',
    nameEn: 'Starter',
    icon: '🎯',
    description: 'คิวผู้ป่วยพื้นฐาน',
    projectTypes: ['clinic'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'basic-report'],
    discountPercent: 0,
  },
  {
    id: 'clinic-standard',
    name: 'แพ็กเกจมาตรฐาน',
    nameEn: 'Standard',
    icon: '⭐',
    description: 'นัดหมาย + SMS/LINE แจ้งเตือน',
    projectTypes: ['clinic'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'multi-queue', 'priority-queue', 'appointment', 'sms-notify', 'line-notify', 'basic-report', 'export-report'],
    discountPercent: 5,
  },
  {
    id: 'clinic-premium',
    name: 'แพ็กเกจพรีเมียม',
    nameEn: 'Premium',
    icon: '👑',
    description: 'ครบจบ CRM + Analytics + หลายสาขา',
    projectTypes: ['clinic'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'multi-queue', 'priority-queue', 'appointment', 'virtual-queue', 'multi-branch', 'sms-notify', 'line-notify', 'voice-call', 'qr-payment', 'credit-card', 'deposit', 'basic-report', 'advanced-analytics', 'export-report', 'branding', 'crm-integration'],
    discountPercent: 15,
  },

  // === Generic Packages (for other types) ===
  {
    id: 'generic-basic',
    name: 'แพ็กเกจเริ่มต้น',
    nameEn: 'Starter',
    icon: '🎯',
    description: 'ระบบคิวพื้นฐาน',
    projectTypes: ['bank', 'government', 'salon', 'retail'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'basic-report'],
    discountPercent: 0,
  },
  {
    id: 'generic-standard',
    name: 'แพ็กเกจมาตรฐาน',
    nameEn: 'Standard',
    icon: '⭐',
    description: 'หลายคิว + แจ้งเตือน + รายงาน',
    projectTypes: ['bank', 'government', 'salon', 'retail'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'multi-queue', 'priority-queue', 'line-notify', 'voice-call', 'qr-payment', 'basic-report', 'export-report', 'branding'],
    discountPercent: 5,
  },
  {
    id: 'generic-premium',
    name: 'แพ็กเกจพรีเมียม',
    nameEn: 'Premium',
    icon: '👑',
    description: 'ครบทุกฟีเจอร์',
    projectTypes: ['bank', 'government', 'salon', 'retail'],
    features: ['queue-basic', 'admin-dashboard', 'display-screen', 'multi-queue', 'priority-queue', 'appointment', 'virtual-queue', 'sms-notify', 'line-notify', 'voice-call', 'qr-payment', 'credit-card', 'basic-report', 'advanced-analytics', 'export-report', 'branding', 'multi-language', 'api-access'],
    discountPercent: 10,
  },
];

// ============================================
// Platforms
// ============================================

export interface Platform {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  basePrice: number;
  priceMultiplier: number; // Multiplier for feature prices
}

export const PLATFORMS: Platform[] = [
  {
    id: 'web',
    name: 'Web App',
    nameEn: 'Web Application',
    icon: '💻',
    description: 'ระบบ Web-based เข้าถึงผ่าน Browser ทุกอุปกรณ์',
    basePrice: 0,
    priceMultiplier: 1.0,
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    nameEn: 'Mobile Application',
    icon: '📱',
    description: 'แอปพลิเคชันสำหรับ iOS และ Android',
    basePrice: 25000,
    priceMultiplier: 1.3,
  },
  {
    id: 'kiosk',
    name: 'Kiosk',
    nameEn: 'Kiosk Terminal',
    icon: '🖥️',
    description: 'ตู้ Kiosk สำหรับลูกค้ากดคิวเอง',
    basePrice: 15000,
    priceMultiplier: 1.2,
  },
  {
    id: 'hardware',
    name: 'Hardware + Web',
    nameEn: 'Hardware Bundle',
    icon: '⚙️',
    description: 'ชุด Hardware (เครื่องพิมพ์ตั๋ว, จอแสดงผล) พร้อม Web Admin',
    basePrice: 35000,
    priceMultiplier: 1.5,
  },
];

// Helper function for platforms
export function getPlatformById(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}

export function calculatePlatformPrice(selectedPlatforms: string[]): number {
  return selectedPlatforms.reduce((total, platformId) => {
    const platform = getPlatformById(platformId);
    return total + (platform?.basePrice ?? 0);
  }, 0);
}

export function getHighestPriceMultiplier(selectedPlatforms: string[]): number {
  if (selectedPlatforms.length === 0) return 1.0;
  
  return selectedPlatforms.reduce((highest, platformId) => {
    const platform = getPlatformById(platformId);
    return Math.max(highest, platform?.priceMultiplier ?? 1.0);
  }, 1.0);
}

// ============================================
// Helper Functions
// ============================================

export function getFeaturesByCategory(categoryId: string): Feature[] {
  return FEATURES.filter((f) => f.categoryId === categoryId);
}

export function getFeatureById(id: string): Feature | undefined {
  return FEATURES.find((f) => f.id === id);
}

export function getProjectTypeById(id: string): ProjectType | undefined {
  return PROJECT_TYPES.find((p) => p.id === id);
}

export function getCategoryById(id: string): FeatureCategory | undefined {
  return FEATURE_CATEGORIES.find((c) => c.id === id);
}

export function getPackagesForProjectType(projectTypeId: string): FeaturePackage[] {
  return FEATURE_PACKAGES.filter((p) => p.projectTypes.includes(projectTypeId));
}

export function getPackageById(id: string): FeaturePackage | undefined {
  return FEATURE_PACKAGES.find((p) => p.id === id);
}

export function calculatePackagePrice(pkg: FeaturePackage, projectTypeId: string): number {
  const projectType = getProjectTypeById(projectTypeId);
  const basePrice = projectType?.basePrice ?? 0;
  
  const featuresPrice = pkg.features.reduce((total, featureId) => {
    const feature = getFeatureById(featureId);
    return total + (feature?.price ?? 0);
  }, 0);
  
  const subtotal = basePrice + featuresPrice;
  const discount = Math.round(subtotal * (pkg.discountPercent / 100));
  return subtotal - discount;
}

export function checkDependencies(featureId: string, selectedFeatures: string[]): boolean {
  const feature = getFeatureById(featureId);
  if (!feature) return false;
  
  return feature.dependencies.every((depId) => selectedFeatures.includes(depId));
}

export function getMissingDependencies(featureId: string, selectedFeatures: string[]): Feature[] {
  const feature = getFeatureById(featureId);
  if (!feature) return [];
  
  return feature.dependencies
    .filter((depId) => !selectedFeatures.includes(depId))
    .map((depId) => getFeatureById(depId))
    .filter((f): f is Feature => f !== undefined);
}

export function calculateTotalPrice(
  projectTypeId: string | null,
  selectedFeatures: string[]
): number {
  const projectType = projectTypeId ? getProjectTypeById(projectTypeId) : null;
  const basePrice = projectType?.basePrice ?? 0;
  
  const featuresPrice = selectedFeatures.reduce((total, featureId) => {
    const feature = getFeatureById(featureId);
    return total + (feature?.price ?? 0);
  }, 0);
  
  return basePrice + featuresPrice;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
