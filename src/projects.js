// Project images live in src/assets/p/<proje-id>/<sıra>.jpg (e.g. sparkzone/02.jpg).
// To add or replace a screen, drop the file there and reference it with shot('id/NN', 'Etiket').
import SIZES from './assets/sizes.json';

const FILES = import.meta.glob('./assets/p/*/*.jpg', { eager: true, import: 'default' });

const shot = (key, label) => {
  const k = `${key}.jpg`;
  const src = FILES[`./assets/p/${k}`];
  const [w, h, bg, top] = SIZES[k] || [16, 10, '#000', '#000'];
  return { src, label, w, h, bg, top };
};

const RAW = [
  {
    id: 'firsat',
    name: 'Fırsat Akışı',
    layout: 'laptop',
    kind: 'browser',
    url: 'firsat-akisi',
    accent: '#5b5bd6',
    glow: '#5b5bd6',
    theme: { bg: '#f4f3ee', dark: false },
    line1: 'Fırsatlar,',
    line2: 'sana göre sıralansın.',
    tagline: 'Fırsatlar, yapay zekâyla sana göre sıralanır.',
    pills: ['Mart 2026', 'Bireysel proje'],
    info: {
      meta: '#bireysel proje · Mart 2026',
      role: 'kurucu, ürün tasarımı ve yapay zekâ geliştirme',
      desc: 'Kullanıcının kendi seçtiği sitelerden anlık veri çeken, yapay zekâyla özetleyip kategorize eden ve profiline göre puanlayan kişisel fırsat akışı.',
      tools: ['Figma', 'Llama 3.3 70B', 'Groq', 'Web']
    },
    story: [
      'Seçilen sitelerden anlık veri çekip yapay zekâyla özetleyen, kategorize eden ve kullanıcı profiline göre puanlayan fırsat akışı.',
      'Hackathon, yarışma, staj ve bootcamp ilanları tek akışta toplanıyor; her fırsat profil uyumuna göre sıralanıyor ve kaçırılacak tarih kalmıyor.'
    ],
    specs: [
      ['Rol', 'Kurucu, ürün tasarımı ve yapay zekâ geliştirme'],
      ['Model', 'Llama 3.3 70B · Groq'],
      ['Araçlar', 'Figma · Web'],
      ['Tarih', 'Mart 2026']
    ],
    stats: [
      { v: '%84', u: 'uyum', d: 'her fırsat profiline göre puanlanır' },
      { v: '6', u: 'kategori', d: 'hackathon’dan bootcamp’e' },
      { v: '70B', u: 'model', d: 'Llama 3.3 ile özetleme' }
    ],
    hero: {
      shot: shot('firsat/01', 'Ana akış'),
      title: 'Ana akış',
      points: [
        { x: 34, y: 14, t: 'Özet sayaçlar', d: 'Aktif fırsat, sana %70+ uygun olanlar ve son 7 günde kapananlar ilk bakışta.' },
        { x: 84, y: 14.4, t: 'Takip edilen siteler', d: 'Akışı besleyen kaynak sayısı; + ile yeni site eklenir.' },
        { x: 80, y: 22.8, t: 'Uyuma göre sırala', d: 'Arama ve sıralama; varsayılan sıralama profil uyumu.' },
        { x: 40.6, y: 29, t: 'Kategoriler', d: 'Hackathon, yarışma, staj, etkinlik, bootcamp, program ve %70+ uyum filtresi.' },
        { x: 58.6, y: 47, t: 'Profil uyumu', d: 'Her fırsatın profiline ne kadar uyduğu yüzdelik bir halkayla.' },
        { x: 25.8, y: 65, t: 'Tarihler', d: 'Son başvuru, başlangıç ve bitiş tek satırda; kaçırılacak tarih kalmıyor.' }
      ]
    },
    chapters: [
      {
        t: 'Fırsatı incele',
        d: 'Detay sayfasında profil uyumu, ilanın aradığı yetenekler ve bunların hangilerinin profilinle eşleştiği; tek tıkla takvime ekleme ve başvuruya gitme.',
        shots: [shot('firsat/02', 'Fırsat detayı · profil uyumu %84')]
      },
      {
        t: 'Kaynaklarını sen seç',
        d: 'Takip edilen siteler ve her birinden gelen fırsat sayısı. Yeni bir site eklendiğinde, orada yayınlanan her fırsat otomatik olarak akışa düşüyor ve profiline göre puanlanıyor.',
        shots: [shot('firsat/03', 'Takip ettiğim linkler')]
      },
      {
        t: 'Profil ve CV',
        d: 'CV yüklendiğinde metin çıkarılıyor, yapay zekâ yetenek ve ilgi alanlarını ayrıştırıp profile ekliyor. Profil doldukça uyum yüzdeleri daha isabetli hâle geliyor.',
        shots: [shot('firsat/04', 'Profil · CV ile yetenek çıkarımı')]
      },
      {
        t: 'Planla',
        d: 'Son başvuru ve etkinlik günleri takvimde; kaydedilen fırsatlar kalan gün sayısıyla ve aktif / kapanıyor / kapandı filtresiyle.',
        shots: [shot('firsat/05', 'Takvim'), shot('firsat/06', 'Kaydedilenler')]
      }
    ]
  },
  {
    id: 'anadolu',
    name: 'Anadolu.ai',
    layout: 'side',
    kind: 'browser',
    url: 'anadolu.ai',
    accent: '#0fa596',
    glow: '#0fa596',
    theme: { bg: '#f4f8f7', dark: false },
    line1: 'Cebinizdeki',
    line2: 'ihracat çırağı.',
    tagline: 'Zanaat, yapay zekâyla dünyaya açılıyor.',
    pills: ['Aralık 2025', 'Build with AI'],
    info: {
      meta: '#54 saat · Techstars SW İstanbul · Aralık 2025',
      role: 'proje yöneticisi ve ürün tasarımcısı (UI/UX)',
      desc: 'Geleneksel zanaatkârları dijital dünyayla buluşturan yapay zekâ destekli pazar yeri: zanaat videoları, yapay zekâ ile ürün girişi, güvenli ödeme ve Usta Kontrol Paneli.',
      tools: ['Figma', 'Pazar yeri', 'Yapay zekâ', 'Usta paneli']
    },
    story: [
      'Geleneksel zanaatkârları dijitale taşıyan yapay zekâ destekli pazar yeri: zanaat videoları, yapay zekâ ile ürün girişi, güvenli ödeme ve Usta Kontrol Paneli.',
      'Dil bilmene gerek yok: usta ürünün fotoğrafını çeker, sesle anlatır; yapay zekâ vitrini hazırlar ve ürün dünyaya satışa çıkar. Techstars Startup Weekend İstanbul “Build with AI” kapsamında 54 saatte yüksek sadakatli prototip ve jüri sunumu.'
    ],
    specs: [
      ['Rol', 'Proje yöneticisi ve ürün tasarımcısı (UI/UX)'],
      ['Etkinlik', 'Techstars Startup Weekend İstanbul · Build with AI'],
      ['Araçlar', 'Figma · yapay zekâ · pazar yeri'],
      ['Tarih', 'Aralık 2025']
    ],
    stats: [
      { v: '54', u: 'saat', d: 'Build with AI hackathonu' },
      { v: '19', u: 'ekran', d: 'usta ve alıcı tarafı' },
      { v: 'AI', u: 'ile ürün girişi', d: 'fotoğraf çek, anlat, sat' }
    ],
    hero: {
      shot: shot('anadolu/01', 'Usta Kontrol Paneli'),
      title: 'Usta Kontrol Paneli',
      part: true,
      points: [
        { x: 8, y: 29, t: 'Tek menü', d: 'Kontrol paneli, siparişler, mesajlar, videolar, ürünler, kazanç ve raporlar; bekleyen siparişler rozetle işaretli.' },
        { x: 30, y: 59, t: 'Sihir Alanı', d: 'Fotoğrafını çek, sesle anlat; yapay zekâ ürünü stüdyo fotoğrafı ve İngilizce vitrin metniyle hazırlar.' },
        { x: 79, y: 39, t: 'Kazançlarım', d: 'Toplam bakiye ve aylık değişim ilk bakışta.' },
        { x: 84, y: 48, t: 'Ödemeler', d: 'Gelen son ödeme ve onay sürecinde bekleyen tutar ayrı ayrı.' },
        { x: 29, y: 78, t: 'Bekleyen siparişler', d: 'Yurt içi ve yurt dışı siparişler; acil olanlar “Bugün kargoya ver” diye işaretli.' },
        { x: 90.5, y: 85.4, t: 'Kargoya ver', d: 'Sipariş tek dokunuşla kargoya; yurt dışı gönderiler ayrıca etiketli.' }
      ]
    },
    poster: shot('anadolu/21', 'Vaka kapağı'),
    chapters: [
      {
        t: 'Karşılama ve giriş',
        d: '“Cebinizdeki İhracat Çırağı”: dil bilmene gerek yok; fotoğraf çek, anlat, dünyaya sat. Giriş telefon numarası ve SMS onay koduyla, sosyal hesaplar da destekli.',
        shots: [shot('anadolu/02', 'Karşılama'), shot('anadolu/03', 'Giriş'), shot('anadolu/04', 'SMS onay kodu')]
      },
      {
        t: 'Sihir Alanı · yapay zekâ ile ürün girişi',
        d: 'Usta ürünü kameraya gösterir ve sesle kısaca anlatır (“Bu nedir ustam? Kısaca anlat.”). Yapay zekâ fotoğrafı stüdyo kalitesine getirir, İngilizce vitrin metnini ve fiyatı hazırlar; usta tek tuşla dünyaya yayınlar.',
        shots: [shot('anadolu/05', 'Sihir Alanı · kamera ve sesli anlatım'), shot('anadolu/06', 'Yapay zekâ sonucu')]
      },
      {
        t: 'Usta paneli',
        d: 'Bekleyen siparişler, son ilanlar, stok ve görüntülenme; kazanç ve satış grafikleriyle atölyenin bütün durumu tek yerde.',
        shots: [shot('anadolu/07', 'Kontrol paneli · genel bakış'), shot('anadolu/08', 'Kazanç ve satış grafikleri')]
      },
      {
        t: 'Keşif · herkese açık taraf',
        d: 'Ana sayfa, zanaat videoları ve hakkımızda; ürünün arkasındaki ustayı ve hikâyeyi öne çıkaran görsel odaklı bir keşif.',
        shots: [shot('anadolu/09', 'Ana sayfa'), shot('anadolu/10', 'Zanaat videoları'), shot('anadolu/11', 'Hakkımızda')]
      },
      {
        t: 'Ürün ve usta',
        d: 'Ürün detayında ustanın hikâyesi, atölye videosu ve yorumlar; usta mağaza profili, takip edilen zanaatkârlar ve favoriler.',
        shots: [shot('anadolu/12', 'Ürün detayı'), shot('anadolu/13', 'Usta mağaza profili'), shot('anadolu/14', 'Takip ettiklerim'), shot('anadolu/15', 'Favorilerim')]
      },
      {
        t: 'Satın alma ve hesap',
        d: 'Sepet, adım adım ödeme ve sipariş onayı; geçmiş siparişler, kargo takibi ve profil ayarları.',
        shots: [shot('anadolu/16', 'Sepetim'), shot('anadolu/17', 'Ödeme'), shot('anadolu/18', 'Sipariş tamamlandı'), shot('anadolu/19', 'Geçmiş siparişler'), shot('anadolu/20', 'Profil ayarları')]
      }
    ]
  },
  {
    id: 'wik42',
    name: 'Konya WIK42',
    layout: 'laptop',
    kind: 'browser',
    url: 'wik42',
    accent: '#e8781f',
    glow: '#e8781f',
    theme: { bg: '#0d1424', dark: true },
    line1: 'Konya’nın',
    line2: 'kolektif hafızası.',
    tagline: 'Öğrencilerin yazdığı, öğrencilerin doğruladığı wiki.',
    pills: ['Web uygulaması', 'Topluluk'],
    info: {
      meta: '#web uygulaması · topluluk',
      desc: 'Konya’daki üniversite öğrencileri için topluluk wiki’si. İçerikler topluluk tarafından yazılıp doğrulanıyor; katkı verenler GençCoin kazanıyor.',
      tools: ['Topluluk', 'Doğrulama', 'Coin sistemi', 'Web']
    },
    story: [
      'Bilgi dağınık: otobüs saatleri, kütüphane saatleri, yurt fiyatları, sınav arşivleri ve staj ilanları farklı gruplarda ve sayfalarda kayboluyor. WIK42 bu bilgiyi tek yerde topluyor ve güncelliğini topluluğa emanet ediyor.',
      'Her bilgi “Doğru / Yanlış” oylarıyla doğrulanıyor, eskiyen içerik işaretleniyor. Katkı veren ve doğrulayan kullanıcı GençCoin kazanıyor; bakiye Kültür Kart’a aktarılabiliyor.'
    ],
    specs: [
      ['Platform', 'Web uygulaması'],
      ['Kitle', 'Konya’daki üniversite öğrencileri'],
      ['Öne çıkanlar', 'Topluluk doğrulaması · GençCoin · Kültür Kart'],
    ],
    stats: [
      { v: '4', u: 'kategori', d: 'akademik · yeme-içme · barınma · kariyer' },
      { v: '+5', u: 'coin', d: 'her doğrulama için' },
      { v: '12', u: 'ekran', d: 'wiki, rehber, kariyer, profil' }
    ],
    hero: {
      shot: shot('wik42/01', 'Ana sayfa'),
      title: 'Ana sayfa',
      points: [
        { x: 6.7, y: 18.4, t: 'Ana menü', d: 'Ana sayfa, Wiki, Trendler, Topluluk ve Moderasyon.' },
        { x: 7.5, y: 57, t: 'Kategoriler', d: 'Akademik, Yeme & İçme, Barınma / Yurt, Kariyer / Staj; her biri alt başlıklara açılıyor.' },
        { x: 58.6, y: 14, t: 'Wiki araması', d: 'Bütün başlıklarda tek alandan arama.' },
        { x: 30, y: 39.6, t: 'Bunu biliyor muydun?', d: 'Şehirle ilgili öne çıkan bilgi; ayrıntıyı okumaya davet.' },
        { x: 37.3, y: 63.3, t: 'Doğrula (+5 Coin)', d: 'Bilgiyi doğrulayan kullanıcı coin kazanıyor.' },
        { x: 58.6, y: 88.8, t: 'Doğru / Yanlış', d: 'Kısa bilgi kartları tek dokunuşla oylanıyor.' },
        { x: 8.6, y: 93.4, t: 'İçerik ekle', d: 'Her ekranda sabit; herkes katkı verebiliyor.' }
      ]
    },
    chapters: [
      {
        t: 'Wiki sayfası',
        d: 'Bir başlığın sayfası: açıklama, çalışma saatleri, hizmetler ve iletişim. Düzenle, konumu göster ve geçmişi gör; sonunda “Bu bilgi yararlı mıydı?” ve kazanılan coin bildirimi.',
        shots: [shot('wik42/02', 'Wiki detayı'), shot('wik42/03', 'İçerik ve yararlılık oyu')]
      },
      {
        t: 'Trendler ve topluluk',
        d: 'Kampüste en çok konuşulan içerikler zaman aralığı ve kategoriye göre sıralanıyor; topluluk ekosisteminde üniversiteler ve öğrenci kulüpleri keşfediliyor.',
        shots: [shot('wik42/04', 'Trendler'), shot('wik42/05', 'Topluluk ekosistemi')]
      },
      {
        t: 'Şehir rehberi',
        d: 'Bölgeye göre filtrelenen kafeler, ayrıntılı mekân sayfası ve üniversiteye göre özel yurtlar.',
        shots: [shot('wik42/06', 'Kafeler'), shot('wik42/07', 'Mekân detayı'), shot('wik42/08', 'Özel yurtlar')]
      },
      {
        t: 'Akademik ve kariyer',
        d: 'Ders notları ve sınav arşivi, Konya’daki staj ilanları ve çalışanların yazdığı şirket incelemeleri.',
        shots: [shot('wik42/09', 'Akademik · sınavlar'), shot('wik42/10', 'Staj ilanları'), shot('wik42/11', 'Şirket incelemeleri')]
      },
      {
        t: 'Profil ve GençCoin',
        d: 'Coin bakiyesi, Kültür Kart’a aktarma, seviye, arkadaş davet kodu ve son aktiviteler.',
        shots: [shot('wik42/12', 'Profil')]
      }
    ]
  },
  {
    id: 'gorev',
    name: 'Görev Takip',
    layout: 'side',
    kind: 'browser',
    url: 'gorev-takip',
    accent: '#6d4ae0',
    glow: '#6d4ae0',
    theme: { bg: '#f4f5fa', dark: false },
    line1: 'Tüm görevler,',
    line2: 'tek panelde.',
    tagline: 'Görevler, öncelikler ve ilerleme tek panelde.',
    pills: ['Web uygulaması', 'Verimlilik'],
    info: {
      meta: '#web uygulaması · verimlilik',
      desc: 'Kategori, öncelik ve durum filtreli görev yönetimi. Tamamlanma oranı, kategori grafiği ve öncelik dağılımı tek panelde.',
      tools: ['Dashboard', 'Filtreleme', 'Grafikler', 'Web']
    },
    story: ['Kategori, öncelik ve durum filtreli görev yönetimi; tamamlanma oranı ve grafikler tek panelde.'],
    specs: [
      ['Platform', 'Web uygulaması'],
      ['Filtreler', 'Kategori · öncelik · durum'],
      ['Panel', 'Tamamlanma oranı · kategori grafiği · öncelik dağılımı']
    ],
    stats: [
      { v: '4', u: 'sayaç', d: 'toplam · tamamlanan · bekleyen · bugün' },
      { v: '3', u: 'filtre', d: 'kategori · öncelik · durum' },
      { v: '1', u: 'panel', d: 'tüm metrikler bir arada' }
    ],
    chapters: [
      {
        t: 'Panel',
        d: 'Toplam, tamamlanan, bekleyen ve bugünkü görev sayaçları; kategori grafiği, öncelik dağılımı ve tamamlanma oranı tek panelde.',
        shots: [shot('gorev/01', 'Görev Takip · panel')]
      }
    ]
  },
  {
    id: 'sparkzone',
    name: 'SparkZone',
    layout: 'center',
    kind: 'phone',
    accent: '#c6f400',
    glow: '#c6f400',
    theme: { bg: '#0a0a0a', dark: true },
    line1: 'Şehrindeki etkinlikleri',
    line2: 'keşfet, katıl.',
    tagline: 'Şehrindeki etkinlikleri keşfet, katıl.',
    pills: ['Mart 2026', 'Hackathon'],
    info: {
      meta: '#54 saat · Startup Weekend Women İstanbul · Mart 2026',
      role: 'takım lideri, ürün tasarımı ve geliştirme',
      desc: 'Lokasyon bazlı, topluluk odaklı etkinlik keşfi ve ağ kurma uygulaması. 2 kişilik kurucu ekiple 54 saatte çalışan prototipe taşıdık.',
      tools: ['Figma', 'Emergent', 'Antigravity', 'Mobil']
    },
    story: [
      'Lokasyon bazlı, topluluk odaklı etkinlik keşfi ve ağ kurma uygulaması.',
      'Garanti BBVA × Techstars Türkiye Startup Weekend Women İstanbul’da, 2 kişilik kurucu ekiple 54 saatte tasarlayıp çalışan prototipe taşıdık. Gelir modeli: ücretsiz ve Premium plan ile ilanlara katılmak için harcanan Spark Coin paketleri.'
    ],
    specs: [
      ['Rol', 'Takım lideri, ürün tasarımı ve geliştirme'],
      ['Etkinlik', 'Garanti BBVA × Techstars Türkiye Startup Weekend Women İstanbul'],
      ['Araçlar', 'Figma · Emergent · Antigravity'],
      ['Tarih', 'Mart 2026']
    ],
    stats: [
      { v: '54', u: 'saat', d: 'fikirden çalışan prototipe' },
      { v: '2', u: 'kişi', d: 'kurucu ekip' },
      { v: '13', u: 'ekran', d: 'keşiften mağazaya' }
    ],
    cover: ['sparkzone/02', 'sparkzone/05'],
    hero: {
      shot: shot('sparkzone/02', 'Ana sayfa'),
      title: 'Ana sayfa',
      points: [
        { x: 75.5, y: 5.9, t: 'Coin bakiyesi', d: 'Etkinliklere katılım coin kazandırıyor; bakiye her ekranda üst köşede.' },
        { x: 50, y: 13.4, t: 'İlan arama', d: 'Spor, konum ya da başlığa göre tek arama alanından ilan bulunuyor.' },
        { x: 60, y: 46.8, t: 'İlanlarım', d: 'Kullanıcının kendi açtığı etkinlikler; doluluk (6/6) kartın üzerinde.' },
        { x: 71.5, y: 78.5, t: 'Güncel ilanlar', d: '“Başvur” ve “Katıldın” durumları tek bakışta ayrışıyor; her ilanın coin karşılığı altta.' },
        { x: 85, y: 85.2, t: 'Yeni ilan', d: 'Neon FAB ile her yerden etkinlik oluşturma.' },
        { x: 30, y: 96.4, t: 'Alt navigasyon', d: 'Topluluk, Keşfet, Ana sayfa, Mesajlar ve Profil.' }
      ]
    },
    chapters: [
      {
        t: 'Karşılama',
        d: '“Spor arkadaşını bul, harekete geç.” Uygulamanın özü üç adımda: keşfet, katıl, kazan; giriş tek dokunuşla Google ile.',
        shots: [shot('sparkzone/01', 'Karşılama ve giriş')]
      },
      {
        t: 'Topluluklar',
        d: 'Trend topluluklar ve tüm topluluklar üye ve çevrimiçi sayısıyla listeleniyor; kullanıcı spor dalını seçip kendi topluluğunu açabiliyor.',
        shots: [shot('sparkzone/03', 'SparkZone Hubs'), shot('sparkzone/04', 'Topluluk oluştur')]
      },
      {
        t: 'Etkinlik ve katılım',
        d: 'Etkinlik detayında organizatör, gün, yer, kontenjan ve açıklama tek sayfada. Katılım tek dokunuşla; buton kalan kişi sayısını gösteriyor, katıldıktan sonra “Katılım Onaylandı” durumuna geçiyor.',
        shots: [shot('sparkzone/05', 'Etkinlik detayı · katıl'), shot('sparkzone/06', 'Etkinlik detayı · katılım onaylandı')]
      },
      {
        t: 'Mesajlar',
        d: 'Birebir mesajlar ve topluluk sohbetleri ayrı sekmelerde; etkinlik öncesi buluşma sohbeti ve kişi arayarak yeni mesaj.',
        shots: [shot('sparkzone/07', 'Mesajlar'), shot('sparkzone/08', 'Sohbet'), shot('sparkzone/09', 'Yeni mesaj')]
      },
      {
        t: 'Profil ve rozetler',
        d: 'Puanlanan profil, Spark bakiyesi, kazanılan rozetler ve son aktiviteler; güven ve süreklilik için profil bir itibar alanına dönüşüyor.',
        shots: [shot('sparkzone/10', 'Profil'), shot('sparkzone/11', 'Rozetler ve son aktiviteler')]
      },
      {
        t: 'Spark Mağaza',
        d: 'Gelir modeli: ücretsiz ve Premium plan (aylık 49,99 TL) ile ilanlara katılmak için harcanan Spark Coin paketleri.',
        shots: [shot('sparkzone/12', 'Planlar · Free ve Premium'), shot('sparkzone/13', 'Spark Coin paketleri')]
      }
    ]
  },
  {
    id: 'subik',
    name: 'Subik Travel',
    layout: 'side',
    kind: 'phone',
    accent: '#5b4cf0',
    glow: '#5b4cf0',
    theme: { bg: '#f3f2fb', dark: false },
    line1: 'Keşfet,',
    line2: 'Subik Travel',
    tagline: 'Keşiften rezervasyona, tek bir akışta.',
    pills: ['TNC Group', 'Software Persona'],
    info: {
      meta: '#tnc group · software persona',
      role: 'arayüz tasarımı',
      desc: 'Keşiften rezervasyon onayına seyahat uygulaması arayüzü; üç adımlı rezervasyon akışı ve yeniden kullanılabilir bileşenlerle.',
      tools: ['Figma', 'Bileşen sistemi', 'Mobil']
    },
    story: [
      'Keşiften rezervasyon onayına seyahat uygulaması arayüzü.',
      'Tekrar eden buton, form ve kart yapıları yeniden kullanılabilir bileşenlere dönüştürüldü. Rezervasyon tek uzun form yerine bilgiler, tarih ve kişi sayısı, ödeme olarak üç adıma bölündü; her adımda üstte ilerleme ve altta güncel toplam görünüyor.'
    ],
    specs: [
      ['Rol', 'Arayüz tasarımı'],
      ['Bağlam', 'TNC Group · Software Persona'],
      ['Yaklaşım', 'Yeniden kullanılabilir bileşen sistemi'],
      ['Araçlar', 'Figma']
    ],
    stats: [
      { v: '3', u: 'adım', d: 'rezervasyon akışı' },
      { v: '8', u: 'ekran', d: 'keşiften onaya' },
      { v: '1', u: 'sistem', d: 'yeniden kullanılabilir bileşenler' }
    ],
    cover: ['subik/03', 'subik/01'],
    chapters: [
      {
        t: 'Keşfet ve incele',
        d: 'Öne çıkan tur, kategori filtreleri ve tur listesi; tur detayında puan, süre, genel bakış ve fiyat.',
        shots: [shot('subik/01', 'Keşfet'), shot('subik/02', 'Tur detayı')]
      },
      {
        t: 'Giriş ve kayıt',
        d: 'Fotoğraf üzerinde cam efektli formlar; e-posta, Google ve Apple ile giriş.',
        shots: [shot('subik/03', 'Giriş'), shot('subik/04', 'Hesap oluştur')]
      },
      {
        t: 'Rezervasyon · 3 adım',
        d: 'Kişisel bilgiler, tarih ve kişi sayısı, ödeme özeti; ardından onay ekranı.',
        shots: [shot('subik/05', 'Adım 1 · bilgiler'), shot('subik/06', 'Adım 2 · tarih ve kişi'), shot('subik/07', 'Adım 3 · ödeme'), shot('subik/08', 'Rezervasyon onaylandı')]
      }
    ]
  },
  {
    id: 'odak',
    name: 'Kişisel Odak Paneli',
    layout: 'laptop',
    kind: 'browser',
    url: 'odak-paneli',
    accent: '#8b6cf6',
    glow: '#8b6cf6',
    theme: { bg: '#0b0b0e', dark: true },
    line1: 'Yaz ya da söyle,',
    line2: 'yapay zekâ yerleştirsin.',
    tagline: 'Fikirler, projeler ve fırsatlar tek çalışma alanında.',
    pills: ['Kişisel araç', 'Yapay zekâ'],
    info: {
      meta: '#kişisel araç · web',
      desc: 'Fikirleri, projeleri, yapay zekâ araçlarını, takvimi ve staj/yarışma fırsatlarını tek panelde toplayan kişisel çalışma alanı. Yazılanları yapay zekâ doğru bölüme yerleştiriyor.',
      tools: ['AI kategorileme', 'Sesli giriş', 'Hızlı kayıt', 'Web']
    },
    story: [
      'Tek bir giriş alanı: bir fikir, bir AI aracı, bir staj ilanı ya da bir not yazılıyor; yapay zekâ kategorisini kendisi belirleyip doğru bölüme yerleştiriyor. Sesli giriş ve Ctrl + Enter ile hızlı kayıt destekleniyor.',
      'Kaydedilen her şey kendi ekranında yaşıyor: ilerleme yüzdeli projeler, AI araçları kütüphanesi, takvim, uyum yüzdeli staj ve yarışmalar, renkli notlar ve beceri ile hedeflerin takip edildiği profil.'
    ],
    specs: [
      ['Tür', 'Kişisel araç · web'],
      ['Girdi', 'Tek giriş alanı · sesli giriş · Ctrl + Enter'],
      ['Yapay zekâ', 'Yazılanı doğru bölüme yerleştirme']
    ],
    stats: [
      { v: '1', u: 'giriş alanı', d: 'gerisini yapay zekâ ayırır' },
      { v: '8', u: 'ekran', d: 'projeler, takvim, notlar…' },
      { v: '30', u: 'gün', d: 'çöp kutusunda saklama' }
    ],
    chapters: [
      {
        t: 'Fikrini paylaş',
        d: 'Tek giriş alanı; kategori isteğe bağlı, seçilmezse yapay zekâ belirliyor.',
        shots: [shot('odak/01', 'Fikrinizi paylaşın')]
      },
      {
        t: 'Projeler ve AI araçları',
        d: 'Durumu ve ilerleme yüzdesiyle projeler; açıklaması ve linkiyle kaydedilen AI araçları.',
        shots: [shot('odak/02', 'Projelerim'), shot('odak/03', 'AI araçları')]
      },
      {
        t: 'Planla ve başvur',
        d: 'Takvim ve yaklaşan etkinlikler; kaydedilen, başvurulan ve mülakat aşamasındaki staj ve yarışmalar uyum yüzdesiyle.',
        shots: [shot('odak/04', 'Takvim'), shot('odak/05', 'Staj ve yarışmalar')]
      },
      {
        t: 'Notlar ve profil',
        d: 'Renkli not kartları, 30 gün tutulan çöp kutusu ve beceriler, hedefler, rozetlerle profil.',
        shots: [shot('odak/06', 'Notlarım'), shot('odak/07', 'Çöp kutusu'), shot('odak/08', 'Profil')]
      }
    ]
  },
  {
    id: 'cinetrack',
    name: 'CineTrack',
    layout: 'center',
    kind: 'phone',
    accent: '#f2b632',
    glow: '#f2b632',
    theme: { bg: '#0e0f14', dark: true },
    line1: 'İzlediklerin,',
    line2: 'tek listede.',
    tagline: 'Film ve dizi kataloğu, kendi izleme listenle.',
    pills: ['TNC Group', 'Flutter'],
    info: {
      meta: '#tnc group · software persona',
      role: 'geliştirici, Flutter',
      desc: 'Film ve dizi kataloğu: trendler, kategoriler, arama, tür filtresi ve “izledim / izliyorum / izleyeceğim” işaretleme.',
      tools: ['Flutter', 'Mobil', 'Arama ve filtre']
    },
    story: [
      '8 film ve 6 diziden oluşan 14 başlıklık bir katalog. Ana sayfada hero banner, kategoriler ve yatay kaydırmalı trend listeleri; keşfette gerçek zamanlı arama, film / dizi geçişi, tür filtresi ve sıralama.',
      'Her başlık “İzledim / İzliyorum / İzleyeceğim” olarak işaretlenebiliyor; izleme listesi bu durumlara göre sekmelere ayrılıyor.'
    ],
    specs: [
      ['Rol', 'Flutter geliştirici'],
      ['Bağlam', 'TNC Group · Software Persona'],
      ['Platform', 'Mobil uygulama']
    ],
    stats: [
      { v: '14', u: 'başlık', d: '8 film ve 6 dizi' },
      { v: '3', u: 'durum', d: 'izledim · izliyorum · izleyeceğim' },
      { v: '1', u: 'izleme listesi', d: 'durumlara göre sekmeler' }
    ],
    chapters: [
      {
        t: 'Keşif',
        d: 'Ana sayfa ve üç sütunlu, filtrelenebilir keşfet ekranı.',
        shots: [shot('cinetrack/01', 'Ana sayfa'), shot('cinetrack/02', 'Keşfet')]
      },
      {
        t: 'Başlık detayı',
        d: 'IMDb puanı, tür etiketleri, özet, yapım kadrosu ve izleme durumu.',
        shots: [shot('cinetrack/03', 'Film detayı'), shot('cinetrack/04', 'Dizi detayı')]
      },
      {
        t: 'İzleme listem',
        d: 'İzledim, izliyorum ve izleyeceğim sekmeleri.',
        shots: [shot('cinetrack/05', 'İzleme listem')]
      }
    ]
  },
  {
    id: 'kuki',
    name: 'KUKI Cafe',
    layout: 'side',
    kind: 'browser',
    url: 'kuki-cafe',
    accent: '#e04545',
    glow: '#e04545',
    theme: { bg: '#fbf5ee', dark: false },
    line1: 'Kurabiye kokulu',
    line2: 'bir web sitesi.',
    tagline: 'Tarifler, menüler ve iletişim; sıcak bir kafe sitesi.',
    pills: ['Web sitesi', 'Eğitim amaçlı'],
    info: {
      meta: '#web sitesi · eğitim amaçlı',
      desc: 'Bir kafe için tasarlanan web sitesi: öne çıkan lezzetler, malzemeleri ve yapılışıyla tarifler ve iletişim formu.',
      tools: ['Web', 'Arayüz', 'Form']
    },
    story: [
      'Bir kafe için tasarlanan, eğitim amaçlı web sitesi: karşılama ve öne çıkan lezzetler, malzemeleri ve yapılış adımlarıyla tarif kartları ve konu seçmeli iletişim formu.'
    ],
    specs: [
      ['Tür', 'Web sitesi · eğitim amaçlı'],
      ['Sayfalar', 'Ana sayfa · tarifler · iletişim']
    ],
    stats: [
      { v: '3', u: 'sayfa', d: 'ana sayfa · tarifler · iletişim' },
      { v: 'Web', u: 'sitesi', d: 'eğitim amaçlı' }
    ],
    chapters: [
      {
        t: 'Ana sayfa ve tarifler',
        d: 'Karşılama, öne çıkan lezzetler ve malzemeleri, hazırlık süresi ve yapılışıyla tarif kartları.',
        shots: [shot('kuki/01', 'Ana sayfa'), shot('kuki/02', 'Tarifler')]
      },
      {
        t: 'İletişim',
        d: 'Ad, e-posta, konu ve telefon alanlarıyla öneri ve iş birliği formu.',
        shots: [shot('kuki/03', 'İletişim')]
      }
    ]
  }
];

// Derived fields used across the site.
export const PROJECTS = RAW.map(p => {
  const shots = [...(p.hero ? [p.hero.shot] : []), ...p.chapters.flatMap(c => c.shots)];
  const cover = p.cover ? p.cover.map(k => shots.find(s => s.src === shot(k).src)) : shots.slice(0, p.kind === 'phone' ? 2 : 1);
  return {
    ...p,
    screens: shots,
    coverShots: cover,
    sub: p.story[0],
    count: shots.length - (p.hero?.part ? 1 : 0)
  };
});
