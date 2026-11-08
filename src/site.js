// Everything personal lives here. Change these values and the whole site follows.
// Empty strings hide the related link.
export const SITE = {
  name: 'Sueda Kurnaz',
  short: 'sk.',
  role: 'Yapay zekâ / LLM yazılım geliştirici',
  sub: 'Bilgisayar mühendisliği öğrencisi',
  location: 'Konya · hibrit / uzaktan',
  lede: 'Yapay zekâ destekli ürünleri fikirden yayına taşıyorum: LLM entegrasyonu, agent sistemleri ve kullanıcının dokunduğu arayüz.',
  email: 'suedakurnaz15@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/suedakurnaz' },
    { label: 'GitHub', href: 'https://github.com/suedakurnaz' }
  ],
  cv: './Sueda-Kurnaz-CV.pdf', // public/ klasöründeki PDF; menüde ve iletişimde görünür
  year: 2026
};

export const ABOUT = {
  hello: 'Merhaba, ben Sueda.',
  bio: [
    'Konya Gıda ve Tarım Üniversitesi’nde bilgisayar mühendisliği 3. sınıf öğrencisiyim.',
    'Python ve JavaScript ile yapay zekâ destekli uygulamalar geliştiriyor; LLM entegrasyonu, agent sistemleri ve prompt mühendisliği üzerine çalışıyorum.'
  ],
  facts: [
    ['Okul', 'Konya Gıda ve Tarım Üniversitesi · Bilgisayar Mühendisliği'],
    ['Konum', 'Konya · hibrit / uzaktan'],
    ['Odak', 'LLM entegrasyonu · agent sistemleri · prompt mühendisliği'],
    ['Diller', 'Türkçe (ana dil) · İngilizce (B1)']
  ],
  approach: [
    { t: 'Baştan sona', d: 'Fikir, prototip, yayın ve geri bildirim; her aşamada yer alırım.' },
    { t: 'Önce problem', d: 'Çözüme geçmeden problemi ve kullanıcı ihtiyacını netleştiririm.' },
    { t: 'Erken prototip', d: 'İki Startup Weekend bana erken geri bildirimin değerini öğretti.' },
    { t: 'Kontrollü yapay zekâ', d: 'Yapay zekâ bir araç; model çıktıları için kontrol adımları tasarlarım.' }
  ]
};

// Stack: four groups. Each tool carries a short note on what it was used for
// (shown on hover, tap or keyboard focus).
export const STACK = [
  {
    group: 'Yapay zekâ',
    items: [
      { name: 'Speech‑to‑Text · Whisper', note: 'Öğrenci konuşmasını Türkçe metne çeviren akışı kurdum.' },
      { name: 'Eval · Model karşılaştırma', note: "Whisper modellerini test ettim; doğruluk 12 cümlede 4'ten 8'e çıktı." },
      { name: 'Human‑in‑the‑loop · Güven eşiği', note: 'Güveni düşük puanlar otomatik olarak öğretmen incelemesine düşüyor.' },
      { name: 'Konuşma agent’ı · Görev takibi', note: 'Bilge: rol yapma diyaloğunda tamamlanan görevleri takip eden asistan.' }
    ]
  },
  {
    group: 'Diller',
    items: [
      { name: 'Python', note: 'Fırsat Akışı’nda veri çekme hattı, FLO’da Türkçe yorum analizi.' },
      { name: 'TypeScript', note: 'Türkçe öğrenme platformunun öğrenci ve öğretmen arayüzleri.' },
      { name: 'SQL', note: 'Supabase’de tablo tasarımı, beceri puanı fonksiyonları.' },
      { name: 'Dart', note: 'Flutter ile film kataloğu uygulaması.' }
    ]
  },
  {
    group: 'Arayüz',
    items: [
      { name: 'React · Next.js', note: 'Öğrenme platformu arayüzleri ve kullanıcı yönetim paneli.' },
      { name: 'Tailwind CSS', note: 'Yönetim paneli ve web projelerimin tasarımı.' },
      { name: 'Flutter', note: 'iOS ve Android’de çalışan film kataloğu uygulaması.' },
      { name: 'Figma · UX tasarımı', note: '5 ekranlık rezervasyon akışı · Google UX sertifikası.' }
    ]
  },
  {
    group: 'Altyapı',
    items: [
      { name: 'Supabase · RLS', note: '28 kuralla her kullanıcı yalnızca yetkili olduğu veriyi görüyor.' },
      { name: 'REST API · Node.js', note: 'Ses yükleme, yazıya çevirme ve puanlama uç noktaları.' },
      { name: 'Web scraping · Veri hattı', note: 'Sitelerden ilan çekip LLM ile özetleyen hat.' },
      { name: 'Git · GitHub · Vercel', note: 'Ana dala gönderince otomatik yayın; projelerim canlıda.' }
    ]
  }
];

// Photos for stops on the journey: src/assets/yol/<name>.jpg
const YOL_FILES = import.meta.glob('./assets/yol/*.jpg', { eager: true, import: 'default' });
const photo = (name, caption, w, h, focus = '50% 50%') => ({ src: YOL_FILES[`./assets/yol/${name}.jpg`], caption, w, h, focus });

// Oldest first — the comet travels from top to bottom. The last stop leads to contact.
// kind: okul · yarışma · hackathon · topluluk · staj · ödül
export const JOURNEY = [
  {
    when: '2023',
    kind: 'okul',
    where: 'Başlangıç · Konya',
    detail: 'Konya Gıda ve Tarım Üniversitesi',
    role: 'Bilgisayar Mühendisliği — şu an 3. sınıf',
    photos: [
      photo('kgtu-1', 'Elektronik laboratuvarı: sinyal üreteci ve osiloskop', 1400, 1054, '50% 55%'),
      photo('kgtu-2', 'Lojik deney setinde devre kurulumu', 1302, 1350, '50% 50%'),
      photo('kgtu-3', 'Trafik ışığı kontrol devresi · Logisim tasarımı', 1054, 1400, '50% 35%'),
      photo('kgtu-4', 'Aynı devre breadboard üzerinde', 1054, 1400, '50% 55%'),
      photo('kgtu-5', 'Devreyi simülasyonla karşılaştırırken', 1054, 1400, '50% 50%')
    ]
  },
  {
    when: 'Ekim 2025',
    kind: 'yarışma',
    where: 'Paribu University Code Prix',
    detail: 'Asya ekibiyle Konya şehir etabı',
    role: '15 takım arasından finale kaldık, etabı 5. tamamladık. Strateji Solidity ile sanal bir pistte kodlandı.',
    tags: ['Solidity', 'Finalist'],
    photos: [
      photo('paribu-1', 'Konya Grand Prix · 28 Ekim 2025', 1044, 1400, '50% 35%'),
      photo('paribu-2', 'Yarış ekranda, Solidity kodu masada', 788, 1400, '50% 45%'),
      photo('paribu-3', 'Asya ekibi', 1037, 1400, '50% 55%'),
      photo('paribu-4', 'Takım sıralaması', 788, 1400, '50% 35%')
    ]
  },
  {
    when: 'Kasım 2025',
    kind: 'hackathon',
    where: 'Divizyon Jam Week #2548',
    detail: 'Divizyon · 26–30 Kasım 2025',
    role: 'Haftanın case’i olan Konya WIK42’yi geliştirdim: öğrencilerin yazıp doğruladığı şehir wikisi, yorumlar, GençCoin ödülleri ve moderasyon.',
    project: 'wik42',
    photos: [
      photo('jamweek-1', 'Jam Week’te kod başında', 1054, 1400, '50% 70%'),
      photo('jamweek-2', 'Case checklist: arayüz, oyunlaştırma ve moderasyon maddeleri', 1054, 1400, '50% 35%'),
      photo('jamweek-3', 'Jam Week açılışı: tanışma etkinliği', 1054, 1400, '50% 55%')
    ]
  },
  {
    when: 'Aralık 2025',
    kind: 'hackathon',
    where: 'Techstars Startup Weekend İstanbul',
    detail: 'Build with AI · 54 saat',
    role: 'Proje yöneticisi ve ürün tasarımcısı: yüksek sadakatli prototip ve jüri sunumu.',
    project: 'anadolu',
    photos: [
      photo('swai-1', 'Fikir sunumu, ilk gün', 1400, 933, '48% 40%'),
      photo('swai-2', 'Ekiple, Techstars Startup Weekend İstanbul', 1400, 933, '40% 45%'),
      photo('swai-3', 'Yapay zekâ ile ürün fotoğrafı denemesi', 1400, 725, '30% 50%'),
      photo('swai-4', 'Kapanışta, sertifikalarla', 1400, 1050, '50% 45%')
    ]
  },
  {
    when: 'Mart 2026',
    kind: 'hackathon',
    where: 'Startup Weekend Women İstanbul',
    detail: 'Garanti BBVA × Techstars Türkiye · 54 saat',
    role: 'Takım lideri: 2 kişilik kurucu ekiple çalışan prototip.',
    project: 'sparkzone',
    photos: [
      photo('swwomen-1', 'İlk gün: yaka kartı ve Lean Canvas', 1054, 1400, '50% 60%'),
      photo('swwomen-5', 'Fikrimizi anlatırken', 1400, 933, '72% 40%'),
      photo('swwomen-2', 'Çalışma alanı · Techstars İstanbul', 1054, 1400, '50% 60%'),
      photo('swwomen-6', 'Sunumlardan sonra sahnede', 1400, 933, '35% 45%'),
      photo('swwomen-3', 'Ekiple, etkinlik salonunda', 1400, 1033, '50% 55%'),
      photo('swwomen-4', 'Final sahnesinde', 1080, 799, '50% 60%')
    ]
  },
  {
    when: 'Mart – Eylül 2026',
    kind: 'topluluk',
    where: 'TurkStudentCo',
    detail: 'Öğrenci topluluğu',
    role: 'Dijital içerik ekip üyesi.'
  },
  {
    when: 'Nisan 2026',
    kind: 'ödül',
    where: 'AromaMind · Erasmus+ yarışması',
    detail: 'EYES Women Innovation Bootcamp · KADEM ve InnoPark',
    role: 'Yapay zekâ destekli aromaterapi sistemiyle ekip olarak üçüncülük. Proje devam ediyor.',
    tags: ['3.lük', 'Yapay zekâ'],
    photos: [
      photo('aromamind-1', 'Üçüncülük ödülü · EYES Women Innovation Bootcamp', 1054, 1400, '50% 32%'),
      photo('aromamind-2', 'Bootcamp katılımcıları · InnoPark, Konya', 1400, 1367, '50% 52%'),
      photo('aromamind-3', 'Bootcamp’te mentor oturumu', 1054, 1400, '50% 45%'),
      photo('aromamind-4', 'Bootcamp akşamı, ateş başında', 1054, 1400, '50% 50%')
    ]
  },
  {
    when: 'Nisan – Mayıs 2026',
    kind: 'topluluk',
    where: 'Google Developer Groups',
    detail: 'GDG on Campus Selçuk Üniversitesi',
    role: 'Çekirdek takım üyesi — yazılım ve tasarım.',
    photos: [
      photo('gdg-1', 'GDG on Campus Selçuk Üniversitesi ekibi', 1400, 1050, '50% 55%'),
      photo('gdg-2', 'Etkinlik günü, ekip arkadaşlarımla', 1400, 1050, '55% 40%')
    ]
  },
  {
    when: 'Nisan – Mayıs 2026',
    kind: 'staj',
    where: 'TNC Group · Software Persona',
    detail: 'Yazılım geliştirme stajyeri',
    role: 'Yazılım geliştirme stajında iki proje geliştirdik: Subik Travel ve CineTrack.',
    tags: ['React', 'SQL Server', 'Flutter', 'Figma'],
    projects: ['subik', 'cinetrack']
  },
  {
    when: 'Temmuz 2026',
    kind: 'staj',
    where: 'Eduprime · ODTÜ Teknokent',
    detail: 'Ankara',
    role: 'Yapay zekâ yazılım geliştirici stajyeri.',
    photos: [
      photo('eduprime-1', 'ODTÜ Teknokent', 1054, 1400, '50% 60%'),
      photo('eduprime-2', 'Staj günlerinden: kod başında', 1054, 1400, '60% 70%'),
      photo('eduprime-3', 'Akşam mesaisi', 1054, 1400, '35% 70%'),
      photo('eduprime-4', 'Her sabah ODTÜ durağı', 1054, 1400, '50% 45%')
    ]
  },
  {
    when: 'Ekim 2026’dan beri',
    now: true,
    kind: 'program',
    where: 'Kılavuz Gemisi · Mühendislik Tayfası',
    detail: 'İki yıllık program',
    role: '9 Ekim 2026’da Mühendislik Tayfası’na kabul edildim; iki yıllık süreç başladı.'
  },
  {
    when: 'Devam ediyor',
    now: true,
    kind: 'program',
    where: 'Şişecam · Geleceğe İlerleyen Kadınlar',
    detail: 'Şişecam programı',
    role: 'Programın katılımcısıyım.'
  },
  {
    when: 'Devam ediyor',
    now: true,
    kind: 'topluluk',
    where: 'The Language Lounge · KFAU',
    detail: 'Konya Gıda ve Tarım Üniversitesi öğrenci topluluğu',
    role: 'Başkan yardımcısı.'
  },
  {
    when: 'Yakında',
    now: true,
    kind: 'program',
    where: 'Divizyon Füzyon',
    detail: 'Zero-to-One · Divizyon’26 · Yazılım Divizyonu',
    role: 'Divizyon’da gerçekleşecek Füzyon programına kabul edildim.'
  },
  {
    when: 'Sıradaki durak',
    kind: 'sırada',
    where: 'Senin projen?',
    detail: 'Yeni bir ürün, yeni bir ekip.',
    role: 'Yapay zekâ destekli bir fikrin varsa birlikte yayına taşıyalım.'
  }
];

export const KIND_COLORS = {
  okul: '#a29dff',
  yarışma: '#5ee0cf',
  topluluk: '#f3f2ee',
  ödül: '#ffc857',
  staj: '#ff6b3d',
  program: '#7cc4ff',
  sırada: '#ff6b3d'
};
