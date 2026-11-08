# Sueda Kurnaz — Portfolyo

React + Vite ile yapılmış tek sayfalık portfolyo.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:5173
```

## Yayına alma

```bash
npm run build      # dist/ klasörü oluşur
```

`dist/` klasörünü Vercel, Netlify, GitHub Pages veya Cloudflare Pages'e yüklemen yeterli.
Vercel/Netlify'da: Build komutu `npm run build`, çıktı klasörü `dist`.

`npm run build:single` tüm siteyi tek bir HTML dosyasına (dist-single/index.html) paketler; önizleme ve paylaşım içindir.

## İçeriği değiştirme

| Ne | Dosya |
|----|-------|
| Ad, e-posta, sosyal bağlantılar, CV | `src/site.js` → `SITE` |
| Hakkımda metni, yetkinlikler, araçlar | `src/site.js` → `ABOUT` |
| Yol (zaman çizelgesi) | `src/site.js` → `JOURNEY` |
| Projeler, künye, ekran açıklamaları | `src/projects.js` |
| Proje ekranları | `src/assets/p/<proje-id>/<sıra>.jpg` |
| Renkler, yazı tipleri, boşluklar | `src/styles.css` (en üstteki değişkenler) |

Boş bırakılan sosyal bağlantılar ve CV sitede görünmez.

### Yeni proje eklemek

1. Ekranları `src/assets/p/<proje-id>/01.jpg, 02.jpg …` olarak koy ve boyutlarını `src/assets/sizes.json` içine ekle.
2. `src/projects.js` içinde mevcut bir projeyi kopyala; metinleri ve `chapters` (akışlar) alanını `shot('id/02', 'Etiket')` ile doldur.
3. `layout`: `center`, `side` veya `laptop`; `kind`: `phone` ya da `browser`.
4. İstersen `hero.points` ile ana ekranın üzerine numaralı noktalar ekle (`x` / `y` yüzde konum).

## Proje sayfası bağlantıları

Her vaka çalışmasının kendi adresi var: `#proje-sparkzone`, `#proje-subik`, `#proje-anadolu`.

## Kullanılan bileşenler

- TechText, MicroSlats — React Bits
- Antigravity ve Starfield — React Bits'teki Antigravity'den esinlenen hafif canvas sürümleri
- "Petal" tıklama sesi — Web Audio ile üretiliyor, ses dosyası yok
