# Felini — Restaurant Management System

> **Hệ thống quản lý nhà hàng Felini** — Backend API, Admin Portal & Website chính thức.

---

## Thông Tin Dự Án

| | |
|---|---|
| **Tên dự án** | Felini |
| **Tác giả** | Đỗ Lê Trọng Hiếu |
| **Nhóm dự án** | JaThong · Trần Hoàng Thông · Đỗ Lê Trọng Hiếu |
| **Ngày hoàn thành** | 06/2026 |
| **Công ty** | T.H.L |

---

## Kiến Trúc Hệ Thống

```
web-felini/
├── Luxury Restaurant Website Design/   # Website chính (React + Vite)
├── felini-admin/                        # Admin Portal (React + Vite + TailwindCSS)
└── felini-backend/                      # REST API (NestJS + PostgreSQL)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Vite, TailwindCSS, TypeScript |
| **Backend** | NestJS, TypeORM, PostgreSQL |
| **Image CDN** | Cloudinary |
| **Database Host** | Render PostgreSQL |
| **Deployment** | Render (Backend) · Netlify (Frontend/Admin) |

## Production URLs

| Service | URL |
|---------|-----|
| 🌐 Website | Netlify (felini-web) |
| 🔧 Admin Portal | Netlify (felini-admin) |
| ⚙️ Backend API | https://web-felini-1.onrender.com |

## API Endpoints

```
GET    /menu              # Danh sách thực đơn
POST   /menu              # Thêm món mới
PATCH  /menu/:id          # Cập nhật món
DELETE /menu/:id          # Xóa món

GET    /reservations      # Danh sách đặt bàn
POST   /reservations      # Tạo đặt bàn mới
PATCH  /reservations/:id  # Cập nhật đặt bàn
DELETE /reservations/:id  # Xóa đặt bàn

GET    /customers         # Danh sách khách hàng VIP
POST   /auth/login        # Đăng nhập admin
```

## Setup & Development

```bash
# Backend
cd felini-backend
npm install
npm run start:dev

# Admin Portal
cd felini-admin
npm install
npm run dev

# Website chính
cd "Luxury Restaurant Website Design"
npm install
npm run dev
```

## Seeding Database

```bash
cd felini-backend
node seed-menu.js        # Seed menu (localhost)

# Production (Render DB)
$env:DATABASE_URL="postgresql://..."
node seed-menu.js
```

---

## © Bản Quyền

Xem file [COPYRIGHT.md](./COPYRIGHT.md) để biết đầy đủ điều khoản sử dụng.

*© 2026 Đỗ Lê Trọng Hiếu — Dự án Felini. All rights reserved.*
