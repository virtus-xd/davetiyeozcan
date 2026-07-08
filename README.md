# Sema & Özcan — Düğün Davetiyesi

20 Ağustos 2026 Perşembe, Jade Beach Club Kuşadası.
"Bahar Çiçeği" temalı, tek sayfalık dijital düğün davetiyesi (Next.js 16 + Tailwind CSS 4).

## Geliştirme

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## İçerik güncelleme

Tüm davetiye içeriği tek dosyada: `src/data/invitation.ts`
(isimler, tarih, program, mekan, hashtag, galeri fotoğrafları).

Galeri fotoğrafları `public/gallery/` klasöründe — 6 fotoğraf 2×3'lü düzende gösterilir.

## Deploy (GitHub + Vercel)

1. GitHub'da boş bir repo oluştur (ör. `ozcan-davetiye`).
2. Bu klasörden push et:

   ```bash
   git remote add origin https://github.com/<kullanici>/ozcan-davetiye.git
   git push -u origin main
   ```

3. [vercel.com/new](https://vercel.com/new) → repoyu import et → framework otomatik
   Next.js algılanır → **Deploy**. Ortam değişkeni gerekmez.
