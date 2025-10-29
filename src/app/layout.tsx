// src/app/layout.tsx

import localFont from 'next/font/local';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import SmoothScroll from '@/app/SmoothScroll';
import './globals.css';
import '@blueprintjs/core/lib/css/blueprint.css';


// Load your BODY font (e.g., Helvetica Neue)
const helveticaNeue = localFont({
  src: [
    { path: '../assets/fonts/HelveticaNeue-Light.woff2', weight: '300' },
    { path: '../assets/fonts/HelveticaNeue-Regular.woff2', weight: '400' },
    { path: '../assets/fonts/HelveticaNeue-Bold.woff2', weight: '700' },
  ],
  display: 'swap',
  variable: '--font-helvetica-neue',
});

// Load your TITLE font (Bilderberg)
// Next.js will automatically create the required @font-face rule from this file.
const bilderberg = localFont({
  src: '../assets/fonts/Bilderberg.woff2',
  display: 'swap',
  variable: '--font-bilderberg',
});

export const metadata = {
  title: 'NGC Walls | Floors | Fabrics',
  description:
    'Every detail matters. From textures to finishes, we curate high-quality materials that bring precision, elegance, and excellence to every project.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNeue.variable} ${bilderberg.variable} font-sans antialiased`}
      >
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
