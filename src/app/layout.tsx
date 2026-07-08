import type { Metadata } from 'next';
import { Inter, Playfair_Display, Pinyon_Script } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets:  ['latin'],
  display:  'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets:  ['latin'],
  display:  'swap',
  weight:   ['400', '500', '600', '700'],
});

const pinyonScript = Pinyon_Script({
  variable: '--font-pinyon-script',
  subsets:  ['latin'],
  display:  'swap',
  weight:   '400',
});

export const metadata: Metadata = {
  title:       'Sema & Özcan — Düğün Davetiyesi',
  description: '20 Ağustos 2026 Perşembe, Jade Beach Club Kuşadası. Düğünümüze davetlisiniz.',
  // Kişiye özel davetiye — arama motorlarında listelenmesin
  robots: {
    index:  false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable} ${pinyonScript.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
