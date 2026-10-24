// Impor aset profil dan proyek
import profileImg from './assets/profile.png'; 
import libraryImg from './assets/project/SmartLibrary.jpg'; 
import sitemonImg from './assets/project/SiTemonLogo.jpg'; 
import teboxImg from './assets/project/Tebox1.jpg';
import presensiImg from './assets/project/apk_presensi1.jpg';

export const portfolioData = {
  name: "Dwiky Chandra Mulyo Utomo",
  role: "Informatics Engineer | Data Science & Fullstack Developer",
  shortSummary: "Lulusan Teknik Informatika (IPK 3.78) yang fokus pada sistem cerdas & full-stack development. Berpengalaman dalam riset Hybrid Clustering, aplikasi mobile, dan sistem monitoring modern.",
  profileImage: profileImg, 

  aboutDetail: "Lulusan Teknik Informatika berpredikat Cum Laude (IPK 3.78) yang memiliki pengalaman komprehensif di bidang pengembangan aplikasi web & mobile, analisis data cerdas (Machine Learning), serta troubleshooting hardware & software. Menguasai arsitektur database, sistem operasi Windows & Linux, serta alur deployment modern. Berkomitmen tinggi, adaptif terhadap perkembangan teknologi baru, dan siap memberikan kontribusi nyata dalam memecahkan masalah industri melalui solusi teknologi yang efisien.",

  // Statistik pencapaian
  stats: [
    { value: "3.78", label: "IPK (Cum Laude)" },
    { value: "4+", label: "Proyek Nyata" },
    { value: "7+", label: "Pengalaman & Asistensi" },
    { value: "100%", label: "Komitmen Dedikasi" }
  ],

  // Kontak & Media Sosial
  contactInfo: {
    email: "dwikychandramu@gmail.com",
    whatsapp: "https://wa.me/6282251021591",
    whatsappDisplay: "+62 822-5102-1591",
    location: "Semarang, Jawa Tengah, Indonesia",
    github: "https://github.com/DwikyChandraMU",
    linkedin: "https://www.linkedin.com/in/dwiky-chandra-mulyo-utomo-aa418524b/",
    instagram: "https://www.instagram.com/dwikychandramu?igsh=MWhybzd1NHppaDB6NQ=="
  },

  // Tech Stack & Skills
  skillCategories: [
    {
      title: "Data Science & AI",
      skills: [
        { name: "Python", level: "Lanjutan" },
        { name: "Streamlit", level: "Lanjutan" },
        { name: "Machine Learning (LightGBM)", level: "Menengah" },
        { name: "Clustering (K-Means & FCM)", level: "Lanjutan" },
        { name: "Pandas & NumPy", level: "Menengah" }
      ]
    },
    {
      title: "Frontend & Mobile",
      skills: [
        { name: "React.js", level: "Menengah" },
        { name: "Flutter & Dart", level: "Lanjutan" },
        { name: "Tailwind CSS", level: "Lanjutan" },
        { name: "JavaScript (ES6+)", level: "Menengah" },
        { name: "HTML5 / CSS3", level: "Ahli" }
      ]
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "PHP", level: "Lanjutan" },
        { name: "MySQL", level: "Lanjutan" },
        { name: "RESTful API", level: "Menengah" },
        { name: "Database Design", level: "Lanjutan" }
      ]
    },
    {
      title: "Tools & Environment",
      skills: [
        { name: "Git & GitHub", level: "Lanjutan" },
        { name: "Figma UI/UX", level: "Menengah" },
        { name: "Linux & Windows OS", level: "Lanjutan" },
        { name: "IT Support & Troubleshooting", level: "Ahli" }
      ]
    }
  ],

  // Layanan / Value Proposition
  services: [
    {
      title: "Web & Mobile Development",
      category: "Development",
      desc: "Merancang dan membangun aplikasi web interaktif serta aplikasi mobile multiplatform (Android/iOS) yang responsif, cepat, dan mudah di-maintain menggunakan React, Flutter, PHP, dan MySQL."
    },
    {
      title: "Data Science & Machine Learning",
      category: "Analytics",
      desc: "Mengolah dan menganalisis kumpulan data mentah menjadi wawasan bisnis yang actionable menggunakan teknik clustering (K-Means, Fuzzy C-Means), klasifikasi LightGBM, serta deployment dashboard interaktif via Streamlit."
    },
    {
      title: "UI/UX & IT System Solutions",
      category: "Consulting",
      desc: "Mendesain antarmuka pengguna yang ramah dan intuitif di Figma, sekaligus menangani perancangan basis data, integrasi API, serta troubleshooting infrastruktur software dan hardware."
    }
  ],

  // Daftar Proyek Unggulan
  projects: [
    {
      title: "Smart Library Analytics",
      tag: "Data Science",
      category: "Data Science",
      desc: "Dashboard analitik profil pembaca perpustakaan dengan metode Hybrid K-Means & Fuzzy C-Means clustering, diintegrasikan dengan klasifikasi LightGBM untuk prediksi tren peminjaman buku.",
      tech: ["Python", "Streamlit", "LightGBM", "Scikit-Learn", "Pandas"],
      image: libraryImg,
      github: "https://github.com/DwikyChandraMU",
      demo: null
    },
    {
      title: "SiTemon (Sistem Magang Online)",
      tag: "Mobile App",
      category: "Mobile",
      desc: "Aplikasi mobile monitoring magang untuk sinkronisasi laporan harian, rekapitulasi presensi, dan monitoring tugas mahasiswa magang secara real-time.",
      tech: ["Flutter", "Dart", "PHP", "MySQL", "REST API"],
      image: sitemonImg,
      github: "https://github.com/DwikyChandraMU",
      demo: null
    },
    {
      title: "Tebox Barbershop Website",
      tag: "Fullstack Web",
      category: "Web",
      desc: "Website company profile modern dan katalog layanan barbershop interaktif untuk memperluas jangkauan promosi digital, daftar paket harga, dan portofolio pangkas rambut.",
      tech: ["HTML5", "CSS3", "PHP", "MySQL", "JavaScript"],
      image: teboxImg,
      github: "https://github.com/DwikyChandraMU",
      demo: null
    },
    {
      title: "Aplikasi Presensi Digital",
      tag: "Mobile App",
      category: "Mobile",
      desc: "Sistem presensi mobile terintegrasi dengan validasi data dan rekapitulasi kehadiran instan untuk mempermudah tata kelola administrasi kegiatan.",
      tech: ["Flutter", "Dart", "PHP", "MySQL"],
      image: presensiImg,
      github: "https://github.com/DwikyChandraMU",
      demo: null
    }
  ],

  // Riwayat Pengalaman & Prestasi (diberi kategori agar bisa difilter di tab)
  experiences: [
    {
      company: "Perpustakaan Provinsi Jawa Tengah",
      role: "IT Developer Internship",
      period: "2025 - 2026",
      type: "work",
      desc: "Membangun dashboard cerdas Smart Library Analytics berbasis Machine Learning dan mengembangkan aplikasi mobile monitoring magang (SiTemon)."
    },
    {
      company: "Senat Mahasiswa Fakultas Teknologi Industri",
      role: "Anggota Komisi IV (Aspirasi)",
      period: "2023 - 2026",
      type: "organization",
      desc: "Berperan aktif mengadvokasi aspirasi ratusan mahasiswa FTI dan menjembatani dialog strategis dengan pimpinan fakultas."
    },
    {
      company: "Fakultas Ilmu Keperawatan",
      role: "Teaching Assistant",
      period: "2024 - 2025",
      type: "academic",
      desc: "Memberikan bimbingan teknis dan materi perkuliahan komputer/sistem informasi kepada mahasiswa baru pada mata kuliah Sistem Ilmu Keperawatan."
    },
    {
      company: "Fakultas Bahasa Sastra dan Ilmu Budaya",
      role: "Juara Harapan 1 - Lomba Essay",
      period: "2024",
      type: "award",
      desc: "Meraih Juara Harapan 1 pada kompetisi essay tingkat universitas yang diselenggarakan oleh Himpunan Mahasiswa Pendidikan Bahasa Inggris."
    },
    {
      company: "Kemendikbudristek RI",
      role: "Mahasiswa Program Pertukaran Pelajar",
      period: "2024",
      type: "academic",
      desc: "Terpilih sebagai mahasiswa delegasi program Pertukaran Mahasiswa Merdeka (PMM) Kemendikbudristek untuk memperdalam wawasan lintas budaya dan akademik."
    },
    {
      company: "Laboratorium Komputer FTI",
      role: "Laboratorium Assistant",
      period: "2023 - 2024",
      type: "academic",
      desc: "Mengajar modul praktikum Algoritma dan Struktur Data, membimbing mahasiswa dalam pemecahan masalah algoritma, serta mengevaluasi tugas praktikum."
    },
    {
      company: "UPTSI UNISSULA",
      role: "Teaching Assistant (TDIA)",
      period: "2023 - 2024",
      type: "academic",
      desc: "Mendampingi instruktur dalam pelatihan Teknologi Informasi Dasar untuk mahasiswa baru di lingkungan universitas."
    }
  ]
};
