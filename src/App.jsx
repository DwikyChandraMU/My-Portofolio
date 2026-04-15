import React, { useState, useEffect, useCallback, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { portfolioData } from './data';
import { 
  FaInstagram, 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp,
  FaFigma,
  FaCode,
  FaDatabase
} from 'react-icons/fa';
import { SiGmail } from "react-icons/si";
import { Download } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { TypeAnimation } from 'react-type-animation';
import cvPdf from './assets/CV_Dwiky_Chandra_Mulyo_Utomo.pdf';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  // State untuk melacak apakah halaman sudah di-scroll dari posisi 0
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();

  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' atau 'error'

  // 2. Buat fungsi untuk mengirim pesan
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Ganti string di bawah ini dengan ID milikmu dari EmailJS
    const serviceID = 'service_l69glno';
    const templateID = 'template_zp8b0az';
    const publicKey = 'mUxADYUp70xr71Qzl';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log('Berhasil:', result.text);
          setSubmitStatus('success');
          setIsSubmitting(false);
          e.target.reset(); // Mengosongkan form setelah berhasil
          
          // Hilangkan pesan sukses setelah 5 detik
          setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
          console.log('Gagal:', error.text);
          setSubmitStatus('error');
          setIsSubmitting(false);
      });
  };
  useEffect(() => {
    const handleScroll = () => {
      // 1. Deteksi posisi scroll untuk efek Navbar transparan vs Blur
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Deteksi section aktif
      const sections = ['home', 'services', 'projects', 'experiences', 'contact'];
      const scrollPosition = window.scrollY + 200; 

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

  // Konfigurasi Particle
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const navLinks = ['Home', 'Services', 'Projects', 'Experiences', 'Contact'];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden">
      
      {/* --- SCROLL PROGRESS BAR --- */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-600 to-orange-400 transform origin-left z-[100]"
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
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 3 },
            },
          },
          particles: {
            color: { value: "#f97316" },
            links: { color: "#f97316", distance: 150, enable: true, opacity: 0.15, width: 1 },
            move: { enable: true, speed: 1.2, direction: "none", outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 35 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0 pointer-events-auto"
      />

      {/* --- NAVBAR DINAMIS --- */}
      <motion.header 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        // Menggunakan conditional class berdasarkan isScrolled
        className={`fixed top-0 w-full z-50 py-5 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
            className="font-black text-3xl text-orange-500 tracking-wide cursor-pointer"
          >
            Dwiky
          </motion.div>
          <nav className="hidden md:flex space-x-8 text-[15px] font-medium">
            {navLinks.map((link) => {
              const sectionId = link.toLowerCase();
              const isActive = activeSection === sectionId;
              
              return (
                <a 
                  key={sectionId}
                  href={`#${sectionId}`} 
                  onClick={() => setActiveSection(sectionId)}
                  className={`relative pb-1 transition-colors duration-300 ${isActive ? 'text-orange-500' : 'text-zinc-300 hover:text-white'}`}
                >
                  {link}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-underline"
                      className="absolute left-0 right-0 bottom-[-4px] h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </motion.header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[90vh] gap-12 lg:gap-8 relative z-10">
        
        {/* Kolom Kiri: Foto */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center relative"
        >
          <motion.div 
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative w-[280px] h-[320px] lg:w-[400px] lg:h-[450px] flex items-center justify-center mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 to-transparent blur-3xl rounded-full animate-pulse"></div>
            <img 
              src={portfolioData.profileImage} 
              alt={portfolioData.name} 
              className="absolute z-10 w-[85%] lg:w-[90%] h-[115%] object-cover object-bottom -bottom-4 lg:-bottom-6 drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Kolom Kanan: Teks */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full lg:w-1/2 text-left flex flex-col justify-center pl-0 lg:pl-10"
        >
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-4xl lg:text-[48px] font-bold mb-4 tracking-wide leading-tight"
          >
            Hi, It's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Dwiky Chandra M.U</span>
          </motion.h1>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-[16px] lg:text-[22px] font-bold mb-6 tracking-wide h-[30px]"
          >
            <TypeAnimation
              sequence={[
                'Fullstack Web Developer', 2000,
                'Mobile Developer', 2000,
                'Data Science Enthusiast', 2000,
                'Data Analyst', 2000
              ]}
              wrapper="span"
              speed={50}
              className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]"
              repeat={Infinity}
            />
          </motion.div>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-zinc-300 text-base lg:text-lg mb-8 max-w-[600px] leading-relaxed text-justify"
          >
            {portfolioData.aboutDetail}
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex space-x-4 mb-10"
          >
            <SocialIcon icon={<FaInstagram size={20} />} link="https://www.instagram.com/dwikychandramu?igsh=MWhybzd1NHppaDB6NQ==" delay={0} />
            <SocialIcon icon={<FaLinkedin size={20} />} link="https://www.linkedin.com/in/dwiky-chandra-mulyo-utomo-aa418524b/" delay={0.1} />
            <SocialIcon icon={<SiGmail size={20} />} link="#contact" delay={0.2} />
            <SocialIcon icon={<FaGithub size={20} />} link="https://github.com/DwikyChandraMU" delay={0.3} />
            <SocialIcon icon={<FaWhatsapp size={20} />} link="https://wa.me/6282251021591" delay={0.4} />
          </motion.div>

          <motion.button 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(249, 115, 22, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 bg-orange-500/10 border-[2px] border-orange-500 text-orange-500 px-8 py-3 rounded-xl font-bold text-lg hover:bg-orange-500 hover:text-black transition-all duration-300 w-max relative overflow-hidden group"
          >
            <a 
              href={cvPdf} 
              download="CV_Dwiky_Chandra_Mulyo_Utomo.pdf"
              className="cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Download CV <Download size={22} />
              </span>
            </a>
            <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </motion.button>
        </motion.div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle title="Services" />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <ServiceCard 
              title="Web & Mobile Dev" 
              icon={<FaCode size={28} />}
              desc="Membangun aplikasi fungsional yang scalable menggunakan React, Flutter, PHP, dan MySQL." 
            />
            <ServiceCard 
              title="Data Science" 
              icon={<FaDatabase size={28} />}
              desc="Menganalisis data mentah menjadi keputusan cerdas menggunakan algoritma Machine Learning." 
            />
            <ServiceCard 
              title="UI/UX Design" 
              icon={<FaFigma size={28} />}
              desc="Merancang antarmuka pengguna yang intuitif dan menarik untuk pengalaman digital yang optimal." 
            />
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      {/* UPDATE: Background diubah menjadi transparan agar partikel tembus */}
      <section id="projects" className="py-24 relative z-10 border-y border-white/5 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle title="Featured Projects" />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
          >
            {portfolioData.projects.map((proj, i) => (
              <ProjectCard key={i} project={proj} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- EXPERIENCES SECTION --- */}
      <section id="experiences" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle title="Experiences" />
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {portfolioData.experiences.map((exp, i) => (
              <ExperienceCard key={i} experience={exp} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 relative z-10 pb-32 bg-gradient-to-b from-transparent to-orange-900/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <SectionTitle title="Get In Touch" />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-300 mb-10 text-lg"
          >
            Mari berkolaborasi untuk menciptakan solusi teknologi yang inovatif.
          </motion.p>
          
          {/* 3. Hubungkan form dengan useRef dan fungsi onSubmit */}
          <motion.form 
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="relative p-[2px] rounded-[22px] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite]" style={{ backgroundImage: 'conic-gradient(from 0deg, transparent 70%, #f97316 100%)'}}></div>
            
            <div className="relative bg-black/80 backdrop-blur-xl rounded-[20px] p-8 text-left space-y-6 z-10 h-full w-full">
              <div>
                <label className="block font-medium text-zinc-300 mb-2 text-sm tracking-wide">Nama Lengkap</label>
                {/* WAJIB TAMBAH atribut 'name' yang sesuai dengan template EmailJS */}
                <input type="text" name="user_name" placeholder="Masukkan Nama..." required className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-4 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block font-medium text-zinc-300 mb-2 text-sm tracking-wide">Email</label>
                {/* WAJIB TAMBAH atribut 'name' */}
                <input type="email" name="user_email" placeholder="Masukkan Email..." required className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-4 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block font-medium text-zinc-300 mb-2 text-sm tracking-wide">Pesan</label>
                {/* WAJIB TAMBAH atribut 'name' */}
                <textarea rows="4" name="message" placeholder="Ketik pesan Anda di sini..." required className="w-full bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-4 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none transition-all"></textarea>
              </div>
              
              <motion.button 
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold text-white mt-2 transition-all shadow-[0_10px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.5)] ${
                  isSubmitting 
                    ? 'bg-zinc-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-600 to-orange-500'
                }`}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </motion.button>

              {/* Tampilkan Notifikasi Sukses/Error */}
              {submitStatus === 'success' && (
                <p className="text-green-500 text-center font-medium mt-4">Pesan berhasil terkirim! Saya akan segera membalasnya.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center font-medium mt-4">Gagal mengirim pesan. Silakan coba lagi nanti.</p>
              )}
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

/** * SUB-KOMPONEN */

const SectionTitle = ({ title }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center mb-16"
  >
    <h2 className="text-3xl lg:text-4xl font-black text-white tracking-wider uppercase">
      {title}
    </h2>
    <div className="w-20 h-1 bg-orange-500 rounded-full mt-4"></div>
  </motion.div>
);

const SocialIcon = ({ icon, link, delay }) => {
  // Cek apakah link diawali dengan '#' (internal link)
  const isInternal = link.startsWith('#');

  return (
    <motion.a 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: "spring" }}
      whileHover={{ y: -8, scale: 1.1, backgroundColor: "#f97316", color: "#000", boxShadow: "0px 10px 15px rgba(249, 115, 22, 0.4)" }}
      href={link} 
      // Jika internal link, jangan buka tab baru
      target={isInternal ? "_self" : "_blank"} 
      rel="noopener noreferrer"
      className="w-[45px] h-[45px] bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center text-zinc-300 transition-colors"
    >
      {icon}
    </motion.a>
  );
};

const ServiceCard = ({ title, icon, desc }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    }}
    whileHover={{ y: -12, scale: 1.02 }}
    className="group relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 hover:border-orange-500/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 z-10 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="w-[65px] h-[65px] bg-zinc-900 border border-zinc-700 group-hover:border-orange-500 group-hover:bg-orange-500/10 rounded-full mb-6 flex items-center justify-center text-zinc-400 group-hover:text-orange-500 transition-all duration-300 shadow-lg relative z-10">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors relative z-10">{title}</h3>
    <p className="text-zinc-400 text-[14px] leading-relaxed relative z-10">
      {desc}
    </p>
  </motion.div>
);

const ProjectCard = ({ project }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    }}
    whileHover={{ y: -10 }}
    className="group flex flex-col bg-zinc-900/20 backdrop-blur-sm border border-zinc-800 hover:border-orange-500/50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
  >
    {/* --- IMAGE CONTAINER --- */}
    {/* Class 'aspect-video' akan memastikan gambar otomatis mengambil rasio 16:9 */}
    <div className="w-full bg-zinc-800/50 aspect-video relative overflow-hidden">
      
      {/* Merender gambar dari data.js */}
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
      />

      <div className="absolute inset-0 bg-orange-900/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Tag Mengambang */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 text-orange-400 text-[11px] font-bold px-4 py-1.5 rounded-full z-10">
        {project.tag}
      </div>
    </div>
    
    {/* --- CONTENT CONTAINER --- */}
    <div className="p-8 flex flex-col flex-grow relative z-10">
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors">{project.title}</h3>
      <p className="text-zinc-300 text-[14px] leading-relaxed mb-6 flex-grow">
        {project.desc}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map(t => (
          <span key={t} className="bg-zinc-800/80 text-zinc-300 text-[11px] font-medium px-3 py-1.5 rounded-md border border-zinc-700/50">
            {t}
          </span>
        ))}
      </div>
      
      {/* Menggunakan target="_blank" agar link terbuka di tab baru tanpa menutup portfolio kamu */}
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-orange-500 transition-colors w-max group/link"
      >
        View Project Details 
        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-orange-500">→</motion.span>
      </a>
    </div>
  </motion.div>
);

const ExperienceCard = ({ experience }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    }}
    whileHover={{ scale: 1.03 }}
    className="group border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/50 rounded-2xl p-8 flex flex-col text-left transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/5 blur-3xl rounded-full group-hover:bg-orange-500/10 transition-colors"></div>
    
    <div className="flex items-center gap-4 mb-4 relative z-10">
      <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-500 font-bold shadow-inner">
        {experience.period.split(' ')[0].substring(2)}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{experience.role}</h3>
        <span className="text-orange-500 text-sm font-medium">{experience.company}</span>
      </div>
    </div>
    
    <div className="mt-2 text-zinc-400 text-[14px] leading-relaxed relative z-10 border-l-2 border-zinc-800 pl-4 ml-6 group-hover:border-orange-500/50 transition-colors">
      {experience.desc}
    </div>
  </motion.div>
);