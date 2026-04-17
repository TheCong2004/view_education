# 📚 View Education Platform

Một nền tảng học trực tuyến hiện đại được xây dựng với **Next.js 14**, **TypeScript**, và **Tailwind CSS**. Cung cấp trải nghiệm học tập tương tác với video player, sidebar khóa học, và tracking tiến độ.

## ✨ Tính Năng

- **📹 Video Player YouTube**: Nhúng trực tiếp video YouTube với iframe
- **📚 Quản Lý Khóa Học**: Organize các bài học theo khóa học khác nhau
- **🎬 Thumbnail YouTube**: Hiển thị thumbnail hình ảnh từ YouTube API
- **📊 Tracking Tiến Độ**: Vòng tròn progress động cập nhật theo khóa học
- **🔄 Auto-Update Header**: Header tự động cập nhật tên khóa học khi scroll
- **👆 Click để Chuyển Video**: Click vào bài học để phát video tương ứng
- **📱 Responsive Design**: Hỗ trợ mobile, tablet, desktop
- **🎨 Sticky Header & Sidebar**: Fixed positioning cho video player và sidebar header
- **⏱️ Thời Lượng Video**: Hiển thị tổng thời lượng của từng khóa học
- **🏷️ Tags**: FREE / PRO badges cho từng bài học

## 🚀 Cách Chạy

### Yêu Cầu
- **Node.js**: v18 hoặc cao hơn
- **npm** hoặc **yarn**

### Bước Cài Đặt

```bash
# 1. Clone repository
cd wiew_education

# 2. Cài đặt dependencies
npm install

# 3. Chạy development server
npm run dev

# 4. Mở trình duyệt
# Truy cập http://localhost:3000
```

### Build Production
```bash
npm run build
npm run start
```

## 📁 Cấu Trúc Dự Án

```
wiew_education/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Layout chính
│   ├── page.tsx                 # Trang chủ
│   └── globals.css              # CSS global
├── components/                   # React components
│   ├── data.ts                  # Dữ liệu khóa học & bài học
│   ├── EducationPlatform.tsx    # Component chính, state management
│   ├── header.tsx               # Header với progress circle
│   └── Sidebar.tsx              # Sidebar danh sách khóa học
├── public/                       # Static assets
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
├── next.config.ts               # Next.js config
└── README.md                    # File hướng dẫn này
```