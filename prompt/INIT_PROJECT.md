1. ช่วยเขียน TODO สำหรับโปรเจค /Users/marosdeeuma/queue-quotation-builder-nextjs

อ่านฟีเจอร์ที่เขียนไว้ที่ /Users/marosdeeuma/queue-quotation-builder-nextjs/prompt/FEATURE.md

2. เริ่มพัฒนาโปรเจคอันดับแรกเลย ต้องสร้างหน้า MainLayout พร้อม Header Footer และใส่ Theme Toggle เพื่อทำ dark mode

MainLayout ต้องให้ออกแบบให้ เป็น Full screen ห้าม scroll อารมณ์เหมือนใช้เว็บแอพ (scroll ใน main content เท่านั้น)

ให้ใช้ tailwindcss สำหรับทำ style ที่ /Users/marosdeeuma/queue-quotation-builder-nextjs/public/styles/index.css

3. ออกแบบ Reuse Component ของ MainLayout

ใช้ effect crystal bubble animation ด้วย react-spring

4. จากนั้นสร้างหน้าแรก landing page สวยงาม พร้อมคอนเทนต์ เพิ่งดึงดูดลูกค้าอยากจ้างงานกับเรา

ทุกครั้งที่สร้าง page.tsx ต้องทำตาม rule ที่เขียนไว้ที่ /Users/marosdeeuma/queue-quotation-builder-nextjs/prompt/CREATE_PAGE_PATTERN.md

Data ทุกอย่าง ประกาศไว้ใน Code เป็น Master Data ไม่ต้องเชื่อมต่อ API หรือ DB

ส่วนข้อมูลที่ User เลือก ให้เก็บไว้ใน Zustand เพื่อ ปรินต์ใบเสนอราคา

