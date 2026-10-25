import React, { useState, useEffect, useCallback, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { portfolioData } from './data';
import { 
  FaInstagram, 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp,
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaGraduationCap,
  FaTrophy,
  FaBriefcase,
  FaUsers,
  FaMapMarkerAlt,
  FaEnvelope
} from 'react-icons/fa';
import { 
  SiGmail, 
  SiReact, 
  SiTailwindcss, 
  SiFlutter, 
  SiDart, 
  SiPython, 
  SiMysql, 
  SiStreamlit, 
  SiPhp, 
  SiFigma, 
  SiGit, 
  SiLinux 
} from "react-icons/si";
import { 
  Download, 
  Menu, 
  X, 
  ArrowUp, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Copy, 
  Check 
} from 'lucide-react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { TypeAnimation } from 'react-type-animation';
import cvPdf from './assets/CV_Dwiky_Chandra_Mulyo_Utomo.pdf';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('Semua');
  const [expFilter, setExpFilter] = useState('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Kirim email via EmailJS
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceID = 'service_l69glno';
    const templateID = 'template_zp8b0az';
    const publicKey = 'mUxADYUp70xr71Qzl';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        console.log('Email terkirim:', result.text);
        setSubmitStatus('success');
        setIsSubmitting(false);
        e.target.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch((error) => {
        console.error('Gagal kirim email:', error.text);
        setSubmitStatus('error');
        setIsSubmitting(false);
      });
  };

  // Salin email ke clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Deteksi scroll untuk active nav dan navbar blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'services', 'projects', 'experiences', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Init konfigurasi tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experiences', id: 'experiences' },
    { label: 'Contact', id: 'contact' },
  ];

  // Filter proyek
  const filteredProjects = projectFilter === 'Semua'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => (p.category || '').trim().toLowerCase() === projectFilter.trim().toLowerCase());

  // Filter pengalaman
  const filteredExperiences = portfolioData.experiences.filter(exp => {
    if (expFilter === 'all') return true;
    if (expFilter === 'work_academic') return exp.type === 'work' || exp.type === 'academic';
    if (expFilter === 'org_award') return exp.type === 'organization' || exp.type === 'award';
    return true;
  });

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden">
      
      {/* --- SCROLL PROGRESS BAR --- */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.75 bg-linear-to-r from-orange-600 via-orange-500 to-amber-400 transform origin-left z-100"
        style={{ scaleX: scrollYProgress }}
      />

      {/* --- PARTICLE BACKGROUND INTERAKTIF --- */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 90, duration: 0.4 },
              push: { quantity: 2 },
            },
          },
          particles: {
            color: { value: "#f97316" },
            links: { color: "#f97316", distance: 140, enable: true, opacity: 0.14, width: 1 },
            move: { enable: true, speed: 1.1, direction: "none", outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 900 }, value: 30 },
            opacity: { value: 0.28 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2.5 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0 pointer-events-auto"
      />

      {/* --- BACKGROUND GLOW ACCENTS --- */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-300 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-600 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* --- NAVBAR DINAMIS & RESPONSIF --- */}
      <motion.header 
        initial={{ y: -80 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 w-full z-50 py-4 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group cursor-pointer">
            <span className="w-9 h-9 rounded-xl bg-linear-to-tr from-orange-600 to-orange-400 flex items-center justify-center font-black text-black text-lg shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:scale-105 transition-transform">
              D
            </span>
            <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
              Dwiky<span className="text-orange-500">.</span>
            </span>
          </a>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center space-x-7 text-[14px] font-medium">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  onClick={() => setActiveSection(item.id)}
                  className={`relative py-1 transition-colors duration-200 ${isActive ? 'text-orange-400 font-semibold' : 'text-zinc-300 hover:text-white'}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick Contact CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="#contact" 
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-black border border-orange-500/40 rounded-lg transition-all duration-300 shadow-[0_0_12px_rgba(249,115,22,0.2)]"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-200 hover:text-orange-400 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 overflow-hidden"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id 
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold' 
                        : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center w-full py-3 rounded-lg bg-orange-500 text-black font-bold text-sm shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                  >
                    Hubungi Saya
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="pt-32 pb-16 px-6 max-w-6xl mx-auto min-h-[92vh] flex flex-col justify-center relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Kolom Teks / Intro */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:w-3/5 text-left flex flex-col justify-center"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide w-max mb-5"
            >
              <Sparkles size={14} className="text-orange-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Available for Opportunities & Projects</span>
            </motion.div>

            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 tracking-tight leading-tight"
            >
              Hi, Saya <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-500 to-amber-300">Dwiky Chandra</span>
            </motion.h1>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-lg sm:text-2xl font-bold mb-5 tracking-wide h-9 flex items-center"
            >
              <span className="text-zinc-400 mr-2">I am a</span>
              <TypeAnimation
                sequence={[
                  'Fullstack Developer', 2000,
                  'Mobile Developer (Flutter)', 2000,
                  'Data Science & ML Enthusiast', 2000,
                  'IT Support & System Troubleshooter', 2000
                ]}
                wrapper="span"
                speed={50}
                className="text-orange-400 font-extrabold drop-shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                repeat={Infinity}
              />
            </motion.div>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-zinc-300 text-base sm:text-lg mb-8 max-w-xl leading-relaxed"
            >
              {portfolioData.shortSummary}
            </motion.p>
            
            {/* Social Media Row */}
            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="flex items-center space-x-3.5 mb-9"
            >
              <SocialIcon icon={<FaLinkedin size={18} />} link={portfolioData.contactInfo.linkedin} title="LinkedIn" />
              <SocialIcon icon={<FaGithub size={18} />} link={portfolioData.contactInfo.github} title="GitHub" />
              <SocialIcon icon={<FaWhatsapp size={18} />} link={portfolioData.contactInfo.whatsapp} title="WhatsApp" />
              <SocialIcon icon={<FaInstagram size={18} />} link={portfolioData.contactInfo.instagram} title="Instagram" />
              <SocialIcon icon={<SiGmail size={18} />} link="#contact" title="Email" />
            </motion.div>

            {/* DUAL CTA BUTTONS */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center gap-4"
            >
              <a 
                href="#contact"
                className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
              >
                <Mail size={18} />
                Hubungi Saya
              </a>

              <motion.a 
                href={cvPdf} 
                download="CV_Dwiky_Chandra_Mulyo_Utomo.pdf"
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px rgba(249, 115, 22, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-zinc-900/80 hover:bg-orange-500/10 border-2 border-orange-500 text-orange-400 hover:text-orange-300 transition-all duration-300 flex items-center gap-2"
              >
                <span>Unduh CV</span>
                <Download size={18} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Kolom Foto Profil */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-2/5 flex justify-center relative"
          >
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-67.5 h-77.5 sm:w-80 sm:h-90 lg:w-90 lg:h-100 flex items-center justify-center"
            >
              {/* Glowing Aura Rings */}
              <div className="absolute inset-0 bg-linear-to-tr from-orange-600/40 via-amber-500/20 to-transparent blur-3xl rounded-full animate-pulse" />
              <div className="absolute inset-3 border border-orange-500/30 rounded-3xl rotate-3" />
              <div className="absolute inset-3 border border-white/10 rounded-3xl -rotate-3" />
              
              {/* Frame Background Card */}
              <div className="absolute inset-0 bg-linear-to-b from-zinc-900/90 to-zinc-950/90 border border-zinc-700/60 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-black via-black/40 to-transparent z-20 pointer-events-none" />
                <img 
                  src={portfolioData.profileImage} 
                  alt={portfolioData.name} 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 relative z-10"
                />
              </div>

              {/* Float Badge: IPK */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-zinc-950/95 border border-orange-500/40 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 z-30"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">
                  ★
                </div>
                <div>
                  <div className="text-xs text-zinc-400">Predikat Lulus</div>
                  <div className="text-sm font-black text-white">IPK 3.78 (Cum Laude)</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>

        {/* --- STATS COUNTER BAR --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-zinc-800/80"
        >
          {portfolioData.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-zinc-900/40 border border-zinc-800/80 hover:border-orange-500/40 rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 hover:bg-zinc-900/70"
            >
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle title="About Me" subtitle="Mengenal lebih dekat latar belakang dan fokus keahlian saya" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Kolom Cerita Profil */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between backdrop-blur-sm"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Profil Profesional</h3>
                    <p className="text-xs text-orange-400 font-medium">Informatics Engineer & Data Practitioner</p>
                  </div>
                </div>

                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base mb-6 text-justify">
                  {portfolioData.aboutDetail}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="text-orange-400 mt-1">✔</span>
                    <span><strong>Fullstack & Mobile Engineering:</strong> Terbiasa membangun sistem dari database hingga antarmuka user dengan Flutter & React.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="text-orange-400 mt-1">✔</span>
                    <span><strong>Applied Data Science:</strong> Riset nyata Hybrid K-Means & Fuzzy C-Means dengan model prediktif LightGBM.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="text-orange-400 mt-1">✔</span>
                    <span><strong>Technical Troubleshooting:</strong> Pengalaman praktis asisten laboratorium komputer dan IT support UPTSI.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center gap-4">
                <a 
                  href={cvPdf}
                  download="CV_Dwiky_Chandra_Mulyo_Utomo.pdf"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Lihat Rincian Riwayat Hidup di CV <span>→</span>
                </a>
              </div>
            </motion.div>

            {/* Kolom Bio Ringkas & Minat */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col justify-between gap-6"
            >
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
                <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Award size={18} className="text-orange-400" />
                  Informasi Singkat
                </h4>
                
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between pb-3 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Pendidikan:</span>
                    <span className="font-semibold text-white">S1 Teknik Informatika</span>
                  </li>
                  <li className="flex justify-between pb-3 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Indeks Prestasi (IPK):</span>
                    <span className="font-bold text-orange-400">3.78 / 4.00 (Cum Laude)</span>
                  </li>
                  <li className="flex justify-between pb-3 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Domisili:</span>
                    <span className="font-semibold text-white">Pangkalan Bun, Kalimantan Tengah</span>
                  </li>
                  <li className="flex justify-between pb-3 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Minat Spesialisasi:</span>
                    <span className="font-semibold text-white text-right">Data Science, Mobile & Web</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Status Ketersediaan:</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400 text-xs bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Open to Work
                    </span>
                  </li>
                </ul>
              </div>

              {/* Callout Box */}
              <div className="bg-linear-to-r from-orange-600/15 via-orange-500/10 to-transparent border border-orange-500/30 rounded-3xl p-6">
                <div className="text-orange-400 font-bold text-sm mb-1">Siap Berkolaborasi?</div>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Terbuka untuk posisi Software Engineer, Mobile Developer, Data Analyst, maupun proyek lepas (freelance).
                </p>
                <a 
                  href="#contact" 
                  className="text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  Kirim Tawaran Proyek
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TECH STACK & SKILLS SECTION --- */}
      <section id="skills" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle 
            title="Tech Stack & Skills" 
            subtitle="Alat, bahasa pemrograman, dan teknologi yang saya gunakan dalam membangun solusi digital" 
          />

          {/* Quick Icons Showcase Banner */}
          <div className="mb-12 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-zinc-400">
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiPython size={26} className="text-[#3776AB]" />
              <span className="text-xs font-semibold">Python</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiFlutter size={26} className="text-[#02569B]" />
              <span className="text-xs font-semibold">Flutter</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiReact size={26} className="text-[#61DAFB]" />
              <span className="text-xs font-semibold">React.js</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiStreamlit size={26} className="text-[#FF4B4B]" />
              <span className="text-xs font-semibold">Streamlit</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiPhp size={26} className="text-[#777BB4]" />
              <span className="text-xs font-semibold">PHP</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiMysql size={26} className="text-[#4479A1]" />
              <span className="text-xs font-semibold">MySQL</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiTailwindcss size={26} className="text-[#06B6D4]" />
              <span className="text-xs font-semibold">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiGit size={26} className="text-[#F05032]" />
              <span className="text-xs font-semibold">Git</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiFigma size={24} className="text-[#F24E1E]" />
              <span className="text-xs font-semibold">Figma</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <SiLinux size={24} className="text-[#FCC624]" />
              <span className="text-xs font-semibold">Linux OS</span>
            </div>
          </div>

          {/* Categorized Skills Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {portfolioData.skillCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6 }}
                className="bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-800">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-base text-white">{cat.title}</h3>
                </div>

                <ul className="space-y-3">
                  {cat.skills.map((s, sIdx) => (
                    <li key={sIdx} className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-zinc-200 font-medium">{s.name}</span>
                      <span className="text-[11px] font-semibold text-orange-400/90 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-md">
                        {s.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle 
            title="Services & Solusi" 
            subtitle="Nilai tambah dan kapabilitas teknis yang siap saya berikan untuk proyek Anda" 
          />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <ServiceCard 
              title="Web & Mobile Dev" 
              icon={<FaCode size={26} />}
              desc="Membangun aplikasi web interaktif & mobile cross-platform yang responsif, terstruktur, dan scalable menggunakan React, Flutter, PHP, dan MySQL." 
            />
            <ServiceCard 
              title="Data Science & ML" 
              icon={<FaDatabase size={26} />}
              desc="Menganalisis data mentah menjadi wawasan berharga melalui Hybrid Clustering (K-Means & FCM), klasifikasi LightGBM, serta deployment Streamlit." 
            />
            <ServiceCard 
              title="UI/UX & IT Solutions" 
              icon={<FaLaptopCode size={26} />}
              desc="Merancang mockup interaktif di Figma, merancang database yang efisien, serta menyediakan solusi troubleshooting software, hardware, & IT support." 
            />
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 relative z-10 border-t border-white/5 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle 
            title="Featured Projects" 
            subtitle="Koleksi karya pengembangan sistem, aplikasi mobile, dan riset data science" 
          />

          {/* Project Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {['Semua', 'Data Science', 'Mobile', 'Web'].map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  projectFilter === filter
                    ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <ProjectCard key={proj.title} project={proj} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- EXPERIENCES & ACHIEVEMENTS SECTION --- */}
      <section id="experiences" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle 
            title="Experiences & Journey" 
            subtitle="Rekam jejak pengalaman magang, asisten akademik, organisasi, dan prestasi" 
          />

          {/* Experience Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {[
              { id: 'all', label: 'Semua Riwayat' },
              { id: 'work_academic', label: 'Magang & Akademik' },
              { id: 'org_award', label: 'Organisasi & Prestasi' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setExpFilter(tab.id)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  expFilter === tab.id
                    ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="relative grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((exp) => (
                <ExperienceCard key={exp.company + exp.role} experience={exp} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 relative z-10 pb-28 border-t border-white/5 bg-linear-to-b from-transparent via-orange-950/5 to-orange-900/10">
        <div className="max-w-5xl mx-auto px-6">
          <SectionTitle 
            title="Get In Touch" 
            subtitle="Mari terhubung dan berkolaborasi untuk menciptakan solusi teknologi inovatif" 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-5"
            >
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2">Mari Berdiskusi</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  Jika Anda memiliki pertanyaan seputar proyek, tawaran pekerjaan, atau sekadar ingin menyapa, hubungi saya langsung melalui kanal berikut:
                </p>

                <div className="space-y-4">
                  {/* Email Item */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                        <Mail size={18} />
                      </div>
                      <div className="truncate">
                        <div className="text-[11px] text-zinc-400 font-medium">Email</div>
                        <a href={`mailto:${portfolioData.contactInfo.email}`} className="text-xs font-semibold text-white hover:text-orange-400 transition-colors truncate block">
                          {portfolioData.contactInfo.email}
                        </a>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={handleCopyEmail}
                      title="Salin Email"
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-orange-500 hover:text-black text-zinc-300 transition-colors ml-2 shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* WhatsApp Item */}
                  <a 
                    href={portfolioData.contactInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-400 font-medium">WhatsApp Direct</div>
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {portfolioData.contactInfo.whatsappDisplay}
                        </div>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                  </a>

                  {/* Lokasi */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] text-zinc-400 font-medium">Lokasi</div>
                      <div className="text-xs font-semibold text-white">
                        {portfolioData.contactInfo.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="mt-6 pt-5 border-t border-zinc-800/80">
                  <div className="text-xs text-zinc-400 font-medium mb-3">Sosial Media & Repositori:</div>
                  <div className="flex space-x-3">
                    <SocialIcon icon={<FaLinkedin size={16} />} link={portfolioData.contactInfo.linkedin} title="LinkedIn" />
                    <SocialIcon icon={<FaGithub size={16} />} link={portfolioData.contactInfo.github} title="GitHub" />
                    <SocialIcon icon={<FaInstagram size={16} />} link={portfolioData.contactInfo.instagram} title="Instagram" />
                    <SocialIcon icon={<FaWhatsapp size={16} />} link={portfolioData.contactInfo.whatsapp} title="WhatsApp" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative p-[1.5px] rounded-3xl overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 opacity-40 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ backgroundImage: 'conic-gradient(from 0deg, transparent 70%, #f97316 100%)' }}
                />
                
                <div className="relative bg-zinc-950/90 backdrop-blur-xl rounded-[22px] p-7 sm:p-9 text-left space-y-5 z-10 w-full border border-zinc-800/80">
                  <h4 className="text-lg font-bold text-white mb-1">Kirim Pesan Langsung</h4>
                  <p className="text-xs text-zinc-400 mb-4">Pesan Anda akan otomatis diteruskan langsung ke kotak masuk email saya.</p>

                  <form ref={form} onSubmit={sendEmail} className="space-y-4">
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1.5 text-xs tracking-wide">
                        Nama Lengkap <span className="text-orange-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="user_name" 
                        placeholder="Contoh: Budi Santoso" 
                        required 
                        className="w-full bg-zinc-900/70 border border-zinc-700/60 rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" 
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-zinc-300 mb-1.5 text-xs tracking-wide">
                        Alamat Email <span className="text-orange-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="user_email" 
                        placeholder="nama@perusahaan.com" 
                        required 
                        className="w-full bg-zinc-900/70 border border-zinc-700/60 rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" 
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-zinc-300 mb-1.5 text-xs tracking-wide">
                        Isi Pesan <span className="text-orange-500">*</span>
                      </label>
                      <textarea 
                        rows="4" 
                        name="message" 
                        placeholder="Ceritakan kebutuhan proyek atau topik yang ingin Anda bicarakan..." 
                        required 
                        className="w-full bg-zinc-900/70 border border-zinc-700/60 rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none transition-all"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-[0_10px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.45)] cursor-pointer ${
                        isSubmitting 
                          ? 'bg-zinc-700 cursor-not-allowed text-zinc-400' 
                          : 'bg-linear-to-r from-orange-600 via-orange-500 to-amber-500 hover:brightness-110'
                      }`}
                    >
                      {isSubmitting ? 'Sedang Mengirim Pesan...' : 'Kirim Pesan Sekarang →'}
                    </button>

                    {/* Notifikasi Status */}
                    {submitStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-medium"
                      >
                        ✔ Pesan Anda berhasil dikirim! Saya akan segera merespons ke email Anda.
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium"
                      >
                        ✖ Gagal mengirim pesan. Silakan hubungi langsung via WhatsApp atau Email di kolom kiri.
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="relative z-10 border-t border-zinc-900 bg-black py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center font-black text-black text-sm">
              D
            </span>
            <span className="font-bold text-lg text-white">
              Dwiky Chandra Mulyo Utomo
            </span>
          </div>

          <p className="text-zinc-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Dwiky Chandra M.U. Dirancang dengan React, Tailwind CSS, & Framer Motion.
          </p>

          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <a href="#home" className="hover:text-orange-400 transition-colors">Home</a>
            <span>•</span>
            <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
            <span>•</span>
            <a href="#skills" className="hover:text-orange-400 transition-colors">Skills</a>
            <span>•</span>
            <a href="#projects" className="hover:text-orange-400 transition-colors">Projects</a>
            <span>•</span>
            <a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* --- FLOATING SCROLL TO TOP BUTTON --- */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Kembali ke atas"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-orange-500/90 hover:bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.5)] flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

/** * SUB-KOMPONEN */

const SectionTitle = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center mb-16"
  >
    <div className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
      Portofolio Showcase
    </div>
    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
      {title}
    </h2>
    <div className="w-16 h-1 bg-linear-to-r from-orange-600 to-amber-400 rounded-full mt-3 mb-3"></div>
    {subtitle && (
      <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mt-1">
        {subtitle}
      </p>
    )}
  </motion.div>
);

const SocialIcon = ({ icon, link, title }) => {
  const isInternal = link.startsWith('#');

  return (
    <motion.a 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.1, backgroundColor: "#f97316", color: "#000", boxShadow: "0px 8px 18px rgba(249, 115, 22, 0.4)" }}
      href={link} 
      title={title}
      target={isInternal ? "_self" : "_blank"} 
      rel="noopener noreferrer"
      className="w-10 h-10 bg-zinc-900 border border-zinc-700/80 rounded-xl flex items-center justify-center text-zinc-300 transition-colors cursor-pointer"
    >
      {icon}
    </motion.a>
  );
};

const ServiceCard = ({ title, icon, desc }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ y: -8 }}
    className="group relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 z-10 overflow-hidden"
  >
    <div className="absolute inset-0 bg-linear-to-b from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="w-14 h-14 bg-zinc-900 border border-zinc-700 group-hover:border-orange-500 group-hover:bg-orange-500/10 rounded-2xl mb-6 flex items-center justify-center text-zinc-400 group-hover:text-orange-400 transition-all duration-300 shadow-lg relative z-10">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors relative z-10">{title}</h3>
    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed relative z-10">
      {desc}
    </p>
  </motion.div>
);

const ProjectCard = React.forwardRef(({ project }, ref) => (
  <motion.div 
    ref={ref}
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    whileHover={{ y: -8 }}
    className="group flex flex-col bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 hover:border-orange-500/50 rounded-3xl overflow-hidden transition-colors duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
  >
    {/* Image Container */}
    <div className="w-full bg-zinc-800/60 aspect-video relative overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
      
      {/* Category Tag */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 text-orange-400 text-[11px] font-bold px-3.5 py-1 rounded-full z-10">
        {project.tag}
      </div>
    </div>
    
    {/* Content Container */}
    <div className="p-7 flex flex-col grow relative z-10">
      <h3 className="text-xl font-bold mb-2.5 text-white group-hover:text-orange-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 grow">
        {project.desc}
      </p>
      
      {/* Tech Pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tech.map((t) => (
          <span key={t} className="bg-zinc-800/80 text-zinc-300 text-[11px] font-medium px-2.5 py-1 rounded-md border border-zinc-700/50">
            {t}
          </span>
        ))}
      </div>
      
      {/* Actions: Code & Details */}
      <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-orange-400 bg-zinc-800 hover:bg-zinc-700 px-3.5 py-2 rounded-xl transition-colors"
        >
          <FaGithub size={14} />
          <span>Lihat Source Code</span>
        </a>

        {project.demo && (
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 px-3.5 py-2 rounded-xl border border-orange-500/30 transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  </motion.div>
));
ProjectCard.displayName = 'ProjectCard';

const ExperienceCard = React.forwardRef(({ experience }, ref) => {
  // Tentukan ikon berdasarkan tipe
  const getIcon = () => {
    switch (experience.type) {
      case 'award':
        return <FaTrophy size={18} className="text-amber-400" />;
      case 'academic':
        return <FaGraduationCap size={18} className="text-orange-400" />;
      case 'organization':
        return <FaUsers size={18} className="text-blue-400" />;
      default:
        return <FaBriefcase size={18} className="text-orange-400" />;
    }
  };

  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="group border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-orange-500/40 rounded-2xl p-6 sm:p-7 flex flex-col text-left transition-colors duration-300 relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
              {experience.role}
            </h3>
            <span className="text-orange-400 text-xs sm:text-sm font-medium">
              {experience.company}
            </span>
          </div>
        </div>
        
        {/* Periode Badge */}
        <span className="shrink-0 text-[11px] font-semibold text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-1 rounded-lg">
          {experience.period}
        </span>
      </div>
      
      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed relative z-10 pl-3 border-l-2 border-zinc-700 group-hover:border-orange-500 transition-colors">
        {experience.desc}
      </p>
    </motion.div>
  );
});
ExperienceCard.displayName = 'ExperienceCard';