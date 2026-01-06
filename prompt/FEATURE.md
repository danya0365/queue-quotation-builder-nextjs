คุณคือ Senior Product Designer + Full-stack Developer

เป้าหมาย:
สร้างเว็บใบเสนอราคา (Quotation Builder) สำหรับขายระบบ "Queue Management System" 
ซึ่งลูกค้าสามารถเลือกฟีเจอร์เป็น checkbox เพื่อกำหนดงบประมาณได้เอง

Tech Stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- (Optional) Zustand หรือ React Context สำหรับ state
- ไม่ต้องเชื่อม backend จริง (mock data ได้)

Business Logic:
- ระบบแบ่งฟีเจอร์เป็น Level (Core → Advanced)
- ฟีเจอร์บางอย่างมี dependency กัน
- เมื่อเลือกฟีเจอร์ ระบบต้อง:
  - คำนวณราคารวมอัตโนมัติ
  - ป้องกันการเลือกฟีเจอร์ที่ dependency ยังไม่ครบ
  - แสดงคำอธิบายว่าฟีเจอร์นี้เหมาะกับร้านแบบไหน

Output ที่ต้องการ:
- โค้ด Next.js ที่ production-ready
- โครงสร้าง component ชัดเจน
- UX ใช้งานง่ายสำหรับเจ้าของร้าน (ไม่ใช่ dev)