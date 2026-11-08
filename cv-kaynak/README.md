# CV kaynağı

`cv.html` CV'nin kendisidir. Metni bu dosyada düzenleyip PDF'i yeniden üretmek için:

```
cd cv-kaynak
npm install          # yazı tiplerini indirir (Mona Sans, JetBrains Mono)
pip install playwright && playwright install chromium
python render.py     # Sueda-Kurnaz-CV.pdf oluşur
```

Oluşan `Sueda-Kurnaz-CV.pdf` dosyasını `public/` klasörüne kopyalayın; site menüdeki
"cv" bağlantısından ve iletişimdeki "CV'yi aç" düğmesinden bu dosyayı açar.
