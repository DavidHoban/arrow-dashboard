import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Arrow | Retail Pipeline',
  description: 'Arrow Supplements retail store pipeline dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`} style={{ backgroundColor: '#EDEAE6', color: '#1C1C1C' }}>
        {children}
      </body>
    </html>
  );
}
