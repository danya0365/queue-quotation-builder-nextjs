/**
 * Landing Page Master Data
 * ข้อมูล mock สำหรับหน้า Landing Page
 */

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// ============================================
// Features Data
// ============================================
export const LANDING_FEATURES: Feature[] = [
  {
    id: 'feature-1',
    icon: '📱',
    title: 'จัดการคิวแบบ Real-time',
    description: 'ลูกค้าติดตามคิวผ่านมือถือได้ทันที ลดการรอคอยหน้าร้าน',
  },
  {
    id: 'feature-2',
    icon: '📊',
    title: 'Dashboard วิเคราะห์ข้อมูล',
    description: 'ดูสถิติลูกค้า ช่วงเวลายอดนิยม และ Pattern ต่างๆ',
  },
  {
    id: 'feature-3',
    icon: '🔔',
    title: 'แจ้งเตือนอัตโนมัติ',
    description: 'LINE, SMS แจ้งลูกค้าเมื่อใกล้ถึงคิว ไม่พลาดทุกนัด',
  },
  {
    id: 'feature-4',
    icon: '💳',
    title: 'ชำระเงินออนไลน์',
    description: 'รองรับ QR PromptPay, บัตรเครดิต ครบจบในที่เดียว',
  },
  {
    id: 'feature-5',
    icon: '🎨',
    title: 'ปรับแต่งได้ตามแบรนด์',
    description: 'เปลี่ยนสี โลโก้ ข้อความ ให้ตรงกับธุรกิจของคุณ',
  },
  {
    id: 'feature-6',
    icon: '📈',
    title: 'รองรับหลายสาขา',
    description: 'จัดการคิวหลายสาขาจากที่เดียว ดูรายงานรวมได้',
  },
];

// ============================================
// Stats Data
// ============================================
export const LANDING_STATS: Stat[] = [
  { id: 'stat-1', value: '500+', label: 'ร้านค้าไว้วางใจ' },
  { id: 'stat-2', value: '2M+', label: 'คิวต่อเดือน' },
  { id: 'stat-3', value: '98%', label: 'ความพึงพอใจ' },
  { id: 'stat-4', value: '24/7', label: 'ซัพพอร์ต' },
];

// ============================================
// Testimonials Data
// ============================================
export const LANDING_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'คุณสมศักดิ์',
    role: 'เจ้าของร้าน',
    company: 'ร้านอาหาร ABC',
    avatar: '👨‍🍳',
    content: 'ระบบใช้งานง่าย ลูกค้าชอบมาก ช่วยลดปัญหาคิวยาวหน้าร้านได้ดีเยี่ยม',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'คุณวิไล',
    role: 'ผู้จัดการ',
    company: 'คลินิกความงาม XYZ',
    avatar: '👩‍⚕️',
    content: 'ลูกค้าจองคิวล่วงหน้าได้ ทำให้เราวางแผนคนได้ดีขึ้น ไม่ต้องรับโทรศัพท์ตลอดวัน',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'คุณพิชัย',
    role: 'เจ้าของธุรกิจ',
    company: 'ช้างบาร์เบอร์',
    avatar: '💇‍♂️',
    content: 'ราคาคุ้มค่ามาก รายงานช่วยให้เห็นช่วงเวลาลูกค้าเยอะ วางแผนพนักงานได้',
    rating: 5,
  },
];

// ============================================
// FAQ Data
// ============================================
export const LANDING_FAQ: FAQ[] = [
  {
    id: 'faq-1',
    question: 'ระบบ Queue Management คืออะไร?',
    answer: 'ระบบจัดการคิวออนไลน์ที่ช่วยให้ลูกค้าจองคิว ติดตามสถานะ และรับแจ้งเตือนผ่านมือถือ ลดเวลารอคอย เพิ่มความสะดวกให้ทั้งร้านค้าและลูกค้า',
  },
  {
    id: 'faq-2',
    question: 'ใช้เวลาติดตั้งนานเท่าไหร่?',
    answer: 'หลังจากยืนยันใบเสนอราคา ทีมงานจะติดต่อเพื่อเก็บ requirements และทำการ setup ภายใน 3-5 วันทำการ ขึ้นอยู่กับความซับซ้อนของฟีเจอร์',
  },
  {
    id: 'faq-3',
    question: 'มีค่าบริการรายเดือนไหม?',
    answer: 'มีทั้งแบบ one-time license และ subscription ขึ้นอยู่กับแพ็คเกจที่เลือก โปรดสร้างใบเสนอราคาเพื่อดูรายละเอียดค่าใช้จ่าย',
  },
  {
    id: 'faq-4',
    question: 'รองรับธุรกิจประเภทไหนบ้าง?',
    answer: 'รองรับทุกธุรกิจที่มีการให้บริการแบบคิว เช่น ร้านอาหาร คลินิก ธนาคาร หน่วยงานราชการ ร้านตัดผม สปา และอื่นๆ',
  },
];
