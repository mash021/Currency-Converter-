import React from 'react';
import './globals.css';
import { Vazirmatn } from 'next/font/google';

const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

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
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={vazirmatn.className}>{children}</body>
    </html>
  );
} 