# INET Business Analyst Interview — Interactive Web Presentation Deck
**ผู้สมัคร:** กรรวี ศิริขันธ์ (แพรว) | Kornravee Sirikhan (Praew)  
**ตำแหน่งที่สมัคร:** Business Analyst @ INET (Internet Thailand Public Company Limited)  
**การศึกษา:** คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์ (GPAX 3.03)

---

## 🌟 จุดเด่นของโปรเจกต์นี้
1. **การดีไซน์ตาม Reference Template สไตล์ Editorial Brutalist**:
   - จัดวางโครงสร้าง 12 สไลด์สลับธีมสีเข้ม (Dark Emerald) และสีสว่าง (Crisp Mint Alabaster) ตามภาพต้นแบบอย่างประณีต
   - หัวข้อตัวหนาขนาดใหญ่ สไตล์นิตยสารแฟชั่นเทค (`Syne`, `Space Grotesk`, `Prompt`, `Plus Jakarta Sans`)
   - องค์ประกอบกราฟิกสไตล์โมเดิร์น: บาร์โค้ด, แถบข้อมูล Metadata, พิกัด `EST 2026`, ป้ายสัญลักษณ์ `CV`
2. **ปรับแต่งตามอัตลักษณ์องค์กรของ INET**:
   - ดึงสี CI ของ INET ตัวจริงมาใช้: สีเขียวมรกต (`#33C98D`), สีเขียวตองอ่อน (`#8DC63F`), และเฉดฟ้าเทอร์ควอยซ์ (`#29D3BF`)
   - โลโก้เวกเตอร์ SVG แท้ของ INET
   - เนื้อหาเชื่อมโยงกับ 5 เสาหลักธุรกิจของ INET: Cloud Solutions, INET Data Center, Cyber Security, Internet Access และ e-Service & Digital Platform
3. **ฟังก์ชันสำหรับใช้สัมภาษณ์งานจริง**:
   - **โหมดสไลด์พรีเซนต์ (Slide Deck Mode):** อัตราส่วน 16:9 ลื่นไหล กดปุ่มลูกศร ซ้าย-ขวา หรือ Spacebar เพื่อเลื่อนสไลด์
   - **โหมดมุมมองหน้าเว็บ (Web Portfolio Mode):** สลับดูเนื้อหาทั้งหมดในหน้าเดียวแบบ Scroll ต่อเนื่อง
   - **คู่มือแนวทางการตอบสัมภาษณ์ (Talking Points / Speaker Notes):** มีปุ่มเปิดแถบโพยสัมภาษณ์ในทุกๆ สไลด์ ให้คำแนะนำว่าสไลด์นี้ควรพูดเน้นประเด็นอะไรเพื่อมัดใจกรรมการ
   - **ระบบปรับแต่งและอัปโหลดรูปจริง (Customizer & LocalStorage):** คลิกที่รูปโปรไฟล์เพื่อเปลี่ยนเป็นรูปถ่ายจริงของตนเองได้ทันที พร้อมบันทึกเบอร์โทรและอีเมลลงเบราว์เซอร์
   - **พิมพ์เป็นเอกสาร PDF ได้ทันที (Print PDF):** ออกแบบ CSS `@media print` สำหรับ A4 Landscape ให้แต่ละสไลด์ขึ้นหน้าใหม่อย่างเรียบร้อย ไม่ตัดทอนเนื้อหา

---

## 🚀 วิธีเปิดใช้งาน
### วิธีที่ 1 (ง่ายที่สุด):
- ดับเบิ้ลคลิกเปิดไฟล์ `index.html` ใน Google Chrome, Safari หรือ Edge ได้ทันที

### วิธีที่ 2 (เปิดผ่าน Local Server):
```bash
cd /Users/pimnicha.sir/Downloads/resume_praew
python3 -m http.server 8088
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:8088/`

---

## ⌨️ ปุ่มลัดบนคีย์บอร์ด (Keyboard Shortcuts)
| ปุ่ม | หน้าที่ |
|---|---|
| `→` / `Space` / `PageDown` | ไปยังสไลด์ถัดไป |
| `←` / `Backspace` / `PageUp` | ย้อนกลับสไลด์ก่อนหน้า |
| `Home` / `End` | ไปสไลด์แรก / สไลด์สุดท้าย |
| `N` | เปิด/ปิด แถบแนวทางการพูดสัมภาษณ์ (Talking Points) |
| `T` | เปิด/ปิด แถบสารบัญสไลด์ด้านล่าง (Thumbnails) |
| `F` | สลับโหมดเต็มหน้าจอ (Fullscreen) |
| `Esc` | ปิดหน้าต่าง Popup / Drawer |

---

## 📁 โครงสร้างไฟล์
- `index.html` — โครงสร้างเว็บพรีเซนต์เทชัน 12 สไลด์
- `css/style.css` — ระบบดีไซน์และสไตล์ชีต (INET Colors, Editorial Typography, Responsive, Print CSS)
- `js/app.js` — เอนจินควบคุมสไลด์, บันทึกข้อมูล LocalStorage, ระบบอัปโหลดรูป, และ Talking Points
- `assets/`
  - `inet_logo.svg` — โลโก้เวกเตอร์ทางการของ INET
  - `barcode.svg` — ลายกราฟิกบาร์โค้ด
  - `profile_default.svg` — รูปภาพโปรไฟล์สไตล์โมเดิร์น
  - `final_project_diagram.png` — กราฟิกแผนภาพโครงงาน AI/NLP Transformer จากเอกสารต้นฉบับ
