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
  cv: '', // CV bağlantısı (PDF) eklenirse iletişimde buton olarak görünür
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

// Oldest first — the comet travels from top to bottom. The last stop leads to contact.
// kind: okul · yarışma · hackathon · topluluk · staj · ödül
export const JOURNEY = [
  {
    when: '2023',
    kind: 'okul',
    where: 'Başlangıç · Konya',
    detail: 'Konya Gıda ve Tarım Üniversitesi',
    role: 'Bilgisayar Mühendisliği — şu an 3. sınıf'
  },
  {
    when: '2025',
    kind: 'yarışma',
    where: 'Paribu University Code Prix',
    detail: 'Asya ekibiyle Konya şehir etabı',
    role: '15 takım arasından finale kaldık, etabı 5. tamamladık. Strateji Solidity ile sanal bir pistte kodlandı.',
    tags: ['Solidity', 'Finalist']
  },
  {
    when: 'Aralık 2025',
    kind: 'hackathon',
    where: 'Techstars Startup Weekend İstanbul',
    detail: 'Build with AI · 54 saat',
    role: 'Proje yöneticisi ve ürün tasarımcısı: yüksek sadakatli prototip ve jüri sunumu.',
    project: 'anadolu'
  },
  {
    when: 'Mart 2026',
    kind: 'hackathon',
    where: 'Startup Weekend Women İstanbul',
    detail: 'Garanti BBVA × Techstars Türkiye · 54 saat',
    role: 'Takım lideri: 2 kişilik kurucu ekiple çalışan prototip.',
    project: 'sparkzone'
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
    detail: 'KADEM ve InnoPark',
    role: 'Yapay zekâ destekli aromaterapi sistemiyle ekip olarak üçüncülük. Proje devam ediyor.',
    tags: ['3.lük', 'Yapay zekâ']
  },
  {
    when: 'Nisan – Mayıs 2026',
    kind: 'topluluk',
    where: 'Google Developer Groups',
    detail: 'GDG on Campus Selçuk Üniversitesi',
    role: 'Çekirdek takım üyesi — yazılım ve tasarım.'
  },
  {
    when: 'Nisan – Mayıs 2026',
    kind: 'staj',
    where: 'TNC Group · Software Persona',
    detail: 'Yazılım geliştirme stajyeri',
    role: 'React, SQL Server, Flutter ve Figma ile dört proje.',
    tags: ['React', 'SQL Server', 'Flutter', 'Figma'],
    project: 'subik'
  },
  {
    when: 'Temmuz 2026',
    kind: 'staj',
    where: 'Eduprime · ODTÜ Teknokent',
    detail: 'Ankara',
    role: 'Yapay zekâ yazılım geliştirici stajyeri.'
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
  sırada: '#ff6b3d'
};
