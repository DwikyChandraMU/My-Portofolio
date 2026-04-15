// Impor foto agar Vite bisa mengenalinya
import profileImg from './assets/profile.png'; 

// --- TAMBAHKAN IMPORT GAMBAR PROJEK DI SINI ---
// Pastikan nama file disesuaikan dengan yang ada di folder assets kamu
import libraryImg from './assets/project/SmartLibrary.jpg'; 
import sitemonImg from './assets/project/SiTemonLogo.jpg'; 
import teboxImg from './assets/project/Tebox1.png';

export const portfolioData = {
  name: "Dwiky Chandra Mulyo Utomo",
  role: "Informatics Engineer | Data Science & Fullstack Developer",
  // Ringkasan super singkat untuk Hero (Opening)
  shortSummary: "Lulusan Teknik Informatika (IPK 3.78) yang fokus pada sistem cerdas & full-stack development. Berpengalaman dalam riset Hybrid Clustering dan aplikasi monitoring.",
  // Path foto yang diimpor
  profileImage: profileImg, 

  // Cerita lebih detail (bisa ditaruh di section About terpisah)
  aboutDetail: "Lulusan Teknik Informatika yang memiliki pengalaman di bidang IT support,pengembangan sistem, serta troubleshooting software dan hardware. Menguasai dasar pengembangan aplikasi berbasis web dan mobile serta memiliki pemahaman terhadap database dan sistem operasi Windows/Linux. Memiliki komitmen Tinggi, kemampuan belajar cepat, dan siap memberikan kontribusi signifikan dalam pengembangan sistem IT.",

  experiences: [
    {
      company: "Perpustakaan Provinsi Jawa Tengah",
      role: "IT Developer Internship",
      period: "2025 - 2026",
      desc: "Membangun dashboard Smart Library Analytics dan sistem monitoring kegiatan magang (SiTemon)."
    },
    {
      company: "Senat Mahasiswa Fakultas Teknologi Industri",
      role: "Anggota Komisi IV (Aspirasi)",
      period: "2023 - 2026",
      desc: "Berperan aktif menjadi jembatan aspirasi antara mahasiswa dan pihak fakultas."
    },
    {
      company: "Fakultas Ilmu Keperawatan",
      role: "Teaching Assistant",
      period: "2024 - 2025",
      desc: "Memberikan pembelajaran dan bimbingan kepada mahasiswa/i baru pada matakuliah Sistem Ilmu Keperawatan."
    },
    {
      company: "Fakultas Bahasa Sastra dan Ilmu Budaya",
      role: "Juara Harapan 1",
      period: "2024 - 2024",
      desc: "Mendapatkan juara harapan 1 pada lomba essay yang diselenggarakan oleh Himpunan Mahasiswa Pendidikan Bahasa Inggris."
    },
    {
      company: "Kemendikbudristek",
      role: "Mahasiswa Pertukaran Pelajar",
      period: "2024 - 2024",
      desc: "Menjadi salah satu mahasiswa yang mengikuti pertukaran pelajar yang diselenggarakan oleh Kemendikbudristek."
    },
    {
      company: "Laboratorium Komputer FTI",
      role: "Lab Assistant",
      period: "2023 - 2024",
      desc: "Memberikan pembelajaran dan bimbingan kepada mahasiswa/i baru pada matakuliah Praktikum Algoritma dan Struktur Data."
    },
    {
      company: "UPTSI UNISSULA",
      role: "Teaching Assistant",
      period: "2023 - 2024",
      desc: "Memberikan pembelajaran dan bimbingan kepada mahasiswa/i baru pada matakuliah TDIA."
    },
  ],

  projects: [
    {
      title: "Smart Library Analytics",
      tag: "Data Science",
      desc: "Analisis profil pembaca menggunakan Hybrid K-Means & Fuzzy C-Means dengan klasifikasi LightGBM.",
      tech: ["Python", "Streamlit"],
      image: libraryImg, // Tambahkan gambar
      link: "https://github.com/DwikyChandraMU/isi-dengan-link-repo" // Tambahkan link
    },
    {
      title: "SiTemon",
      tag: "Mobile App",
      desc: "Aplikasi monitoring magang untuk sinkronisasi laporan dan tugas mahasiswa secara real-time.",
      tech: ["Flutter", "Dart", "PHP", "MySQL"],
      image: sitemonImg, // Tambahkan gambar
      link: "https://github.com/DwikyChandraMU/isi-dengan-link-repo" // Tambahkan link
    },
    {
      title: "Tebox Barbershop",
      tag: "Website",
      desc: "Website promosi barbershop dengan menampilkan profil barbershop beserta berbagai macam layanan yang diberikan oleh pihak barbershop.",
      tech: ["HTML", "CSS", "PHP", "MySQL"],
      image: teboxImg, // Tambahkan gambar
      link: "https://link-website-tebox.com" // Tambahkan link (atau github)
    }
  ]
};