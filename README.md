# วัดแอป (React + Node + MySQL) พร้อม Deploy (Docker/Railway)

## รัน Local
```bash
# Server
cd server
cp .env.example .env
# แก้ค่า DB_* และ JWT_SECRET
npm i
npm run dev

# Client
cd ../client
npm i
echo "VITE_API_URL=http://localhost:4000/api" > .env
npm run dev
```

## Deploy แบบบริการเดียวบน Railway
- เชื่อม GitHub repo ที่มีไฟล์นี้ (มี Dockerfile แล้ว)
- ตั้ง ENV ใน Service:
  - PORT=4000
  - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
  - JWT_SECRET (ค่าแข็งแรง)
  - JWT_EXPIRES=2h
  - CORS_ORIGIN=true
- เปิด URL → ล็อกอิน admin@wat.local / Admin@1234
