import React from 'react';
import './globals.css';
import { Vazirmatn } from 'next/font/google';

const vazirmatn = Vazirmatn({ subsets: ['arabic'] });

export const metadata = {
  title: 'مبدل ارز',
  description: 'برنامه مبدل ارز با قابلیت تنظیم هشدار',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>{children}</body>
    </html>
  );
} 