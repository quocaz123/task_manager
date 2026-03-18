# Task Manager (React + Vite + Express)

Dự án gồm 2 phần:
- **Backend**: Express API trong thư mục `server/`
- **Frontend**: React + Vite trong thư mục `client/`

## Yêu cầu
- **Node.js**: khuyến nghị **>= 18** (Node 20 OK)
- **npm**: đi kèm Node

## Cài dependencies

```powershell
cd E:\Learn\Test\task-manager

cd .\server
npm install

cd ..\client
npm install
```

## Chạy dự án

### Backend
Mặc định port **3000**:

```powershell
cd E:\Learn\Test\task-manager\server
npm start
```

Đổi port:

```powershell
cd E:\Learn\Test\task-manager\server
$env:PORT=3001; npm start
```

API:
- `GET  /tasks`
- `POST /tasks` body: `{ "title": "..." }`
- `PUT  /tasks/:id` body: `{ "title": "...", "completed": true/false }`
- `DELETE /tasks/:id`

### CORS (cho Frontend)
Backend cho phép CORS theo biến môi trường:
- **`CORS_ORIGIN`**: danh sách origin, ngăn cách bằng dấu phẩy  
  Ví dụ: `http://localhost:5173,http://localhost:5174,https://your-frontend.onrender.com`

Chạy backend với CORS_ORIGIN (PowerShell):

```powershell
cd E:\Learn\Test\task-manager\server
$env:CORS_ORIGIN="http://localhost:5173,http://localhost:5174"; npm start
```

### Frontend

```powershell
cd E:\Learn\Test\task-manager\client
npm run dev -- --host
```

Mở URL Vite in ra trong terminal (thường `http://localhost:5173/`, nếu bận sẽ là 5174, 5175...).

Frontend gọi backend mặc định:
- `http://localhost:3000/tasks`

## Cấu hình FE bằng biến môi trường (env)
Frontend (Vite) đọc base URL của API từ:
- **`VITE_API_URL`** (ví dụ: `http://localhost:3000`)

Tạo file env cho FE:
- Copy `client/env.example` thành `client/.env.local` (hoặc `client/.env`) rồi chỉnh value.

Ví dụ `client/.env.local`:

```bash
VITE_API_URL=http://localhost:3000
```

Sau khi đổi env, **restart** Vite dev server.

# Task Manager (React + Vite + Express)

Dự án gồm 2 phần:
- **Backend**: Express API trong thư mục `server/`
- **Frontend**: React + Vite trong thư mục `client/`

## Yêu cầu cài đặt
- **Node.js**: khuyến nghị **>= 18** (bạn đang dùng Node 20 là OK)
- **npm**: đi kèm theo Node

## Cài dependencies
Mở PowerShell tại thư mục `task-manager` và chạy:

```powershell
cd E:\Learn\Test\task-manager

cd .\server
npm install

cd ..\client
npm install
```

## Chạy dự án

### 1) Chạy backend (API)
Mặc định chạy port **3000**:

```powershell
cd E:\Learn\Test\task-manager\server
npm start
```

Nếu muốn đổi port:

```powershell
cd E:\Learn\Test\task-manager\server
$env:PORT=3001; npm start
```

API endpoints:
- `GET  /tasks`
- `POST /tasks` body JSON: `{ "title": "..." }`
- `PUT  /tasks/:id` body JSON: `{ "title": "...", "completed": true/false }`
- `DELETE /tasks/:id`

### 2) Chạy frontend (UI)

```powershell
cd E:\Learn\Test\task-manager\client
npm run dev -- --host
```

Vite thường chạy ở:
- `http://localhost:5173/` (nếu port bận sẽ tự nhảy sang 5174, 5175...)

Frontend đang gọi backend tại:
- `http://localhost:3000/tasks`

## Troubleshooting

### Port 3000 bị chiếm (`EADDRINUSE`)
- Chỉ chạy **1** backend instance.
- Hoặc đổi port bằng: `$env:PORT=3001; npm start`

### Trang trắng / không render
- Frontend dùng entry `client/src/main.jsx` để mount React vào `#root`.

### Lỗi Tailwind/PostCSS (Vite báo “use tailwindcss directly as a PostCSS plugin”)
- Dự án dùng **Tailwind v4**, PostCSS plugin nằm ở `@tailwindcss/postcss`.
- Đảm bảo bạn mở đúng URL của instance Vite đang chạy (5173/5174...) và restart dev server nếu vừa đổi config.

