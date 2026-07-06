import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Mail, Download, Calendar, Terminal, Layers } from 'lucide-react';
import { EngineeringModal, LeadershipModal, ContactModal } from './Modals';
import { ItemDetailModal } from './ItemDetailModal';

// --- PREMIUM SLIDING ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Time between each card flying in
      delayChildren: 0.1,    // Slight pause before starting
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 1
    }
  }
};

// --- ANIMATION COMPONENTS ---
const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}<span className="animate-pulse">_</span></span>;
};

const AnimatedCounter = ({ end, suffix = "" }: { end: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span className="font-bold text-2xl text-white">{count}{suffix}</span>;
};

// --- DATA ARRAYS ---
const topProjects = [
  {
    title: "SwiftDrop", tags: ["NGINX", "ML", "Node.js", "Redis"],
    desc: "High-concurrency delivery platform featuring multi-node load balancing.",
    longDesc: "Designed and developed SwiftDrop, a scalable flash sale platform built to handle high-demand real-time traffic with a strong focus on performance, security, and system reliability.",
    overview: { type: "Team Project", year: "2025", focus: "High-Concurrency Backend", role: "Backend Architecture & ML" },
    contributions: [
      "Engineered multi-node load balancing architecture using NGINX to handle simulated traffic spikes.",
      "Integrated machine learning pipelines to detect and mitigate automated bot purchasing during flash sales.",
      "Implemented secure JWT authentication and Redis caching for rapid session retrieval."
    ],
    github: "https://github.com/hasii-04/Bitcode-Flash-Sale-Platform.git",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800"
  },
  {
    title: "SkyNest Hotel System", tags: ["Node.js", "MySQL", "React"],
    desc: "Complex relational MySQL schema design for distributed operations.",
    longDesc: "Developed a full-stack SkyNest Hotels Management System focusing on hotel reservations, guest services, and complex billing schemas.",
    overview: { type: "Database Assignment", year: "2025", focus: "Database Management Systems", role: "Full-Stack Developer" },
    contributions: [
      "Designed and normalized complex MySQL relational schemas handling guests, rooms, and multi-branch transactions.",
      "Developed secure backend REST APIs using Node.js to manage booking logic.",
      "Implemented ACID-compliant database transactions to ensure booking integrity during concurrent access."
    ],
    github: "https://github.com/hiru616/hotel-management-system.git",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800"
  },
  {
    title: "PredictiveOps", tags: ["Machine Learning", "Python", "AWS"],
    desc: "Machine learning integration for predictive infrastructure scaling.",
    overview: { type: "Software Engineering Project", year: "2026", focus: "AI & Cloud Infrastructure", role: "ML Pipeline Developer" },
    contributions: ["Developed ML models to analyze telemetry data and predict resource bottlenecks.", "Created Python scripts for automated dataset cleaning and preparation."],
    github: "https://github.com/PredictiveOps/Pred.git",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800"
  }
];

const logisticsEvents = [
  { title: "MoraXtreme 10.0", role: "Logistics Lead", desc: "Directed 24-hr continuous infrastructure & power delivery.", img: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?q=80&w=800" },
  { title: "IEEE Open Week 2026", role: "Logistics Co-Lead", desc: "Managed 72-foot display & custom fabric merch production.", img: "https://images.unsplash.com/photo-1665035212282-3e117d618b36?q=80&w=800" },
  { title: "SLIoT Challenge 2026", role: "Delegate Handling OC", desc: "End-to-end event execution workflows and VIP procurement.", img: "https://images.unsplash.com/photo-1722332998970-f2335db8ab6d?q=80&w=800" },
  { title: "Hit the Grounds 2025", role: "Logistics Co-Lead", desc: "Operational setup and welcoming logistics for flagship orientation.", img: "https://images.unsplash.com/photo-1523580494112-749862df4b82?q=80&w=800" },
  { title: "Mora Foresight 3.0", role: "Logistics Member", desc: "Organized island-wide awareness sessions and Foresight Padura.", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800" }
];

const galleryImages = [
  "images/gallery/1.jpg",
  "images/gallery/2.jpg",
  "images/gallery/3.jpg",
  "images/gallery/4.jpg",
  "images/gallery/5.jpg",
  "images/gallery/6.jpg",
  "images/gallery/7.jpg",
  "images/gallery/8.jpg",
  "images/gallery/9.jpg",
  "images/gallery/10.jpg",
  "images/gallery/11.jpg",
  "images/gallery/12.jpg",
  "images/gallery/13.jpg",
  "images/gallery/14.jpg",
  "images/gallery/15.jpg",
  "images/gallery/16.jpg",
  "images/gallery/17.jpg",
  "images/gallery/18.jpg",
  "images/gallery/19.jpg"
];

const techStack = ["Node.js", "React", "MySQL", "C", "C++", "Python", "NGINX", "Linux", "Git", "Machine Learning", "IoT (ESP32)"];

const techStackDetails = [
  { name: "Node.js", desc: "Server-side JS runtime for highly scalable backends.", icon: "🌐" },
  { name: "React", desc: "Component-based library for interactive interfaces.", icon: "⚛️" },
  { name: "MySQL", desc: "Relational database management and complex schema design.", icon: "🗄️" },
  { name: "C / C++", desc: "Low-level system programming and hardware integration.", icon: "⚙️" },
  { name: "Python", desc: "Machine learning pipelines and data analysis.", icon: "🐍" },
  { name: "NGINX", desc: "High-performance load balancing and web serving.", icon: "🚦" },
  { name: "Linux", desc: "Ubuntu server administration and terminal-based workflows.", icon: "🐧" },
  { name: "Git", desc: "Version control and collaborative repository management.", icon: "📦" },
  { name: "Machine Learning", desc: "Predictive modeling and telemetry data analysis.", icon: "🧠" },
  { name: "IoT (ESP32)", desc: "Embedded systems and MQTT broker communications.", icon: "📡" }
];

const aboutMeData = {
  title: "Ishakya Gamage", role: "Software Engineer & Logistics Lead", tags: ["University of Moratuwa", "Batch Representative", "Full-Stack Dev"],
  desc: "Undergraduate in Computer Science & Engineering at the University of Moratuwa. I specialize in building highly scalable full-stack systems and orchestrating massive technical events and hackathons.",
  longDesc: "Beyond the code, I am deeply involved in student leadership as the CSE Batch '23 Rep and CSESS Events Committee member. When I'm not debugging C-compilers or managing NGINX instances, you can find me analyzing automotive specifications (like the Audi A3 Advanced Edition) or performing as a vocalist and stage actor.",
  img: "/images/profile2.jpeg",
  gallery: [
    "images/profileGallery/1.jpeg",
    "images/profileGallery/2.jpeg",
    "images/profileGallery/3.jpeg",
    "images/profileGallery/4.jpeg",
    "images/profileGallery/5.jpeg",
    "images/profileGallery/6.jpeg",
    "images/profileGallery/7.jpeg",
    "images/profileGallery/8.jpeg"
  ]
};



export function Dashboard() {
  const [isEngineeringOpen, setIsEngineeringOpen] = useState(false);
  const [isLeadershipOpen, setIsLeadershipOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [deepDiveItem, setDeepDiveItem] = useState<any | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setGalleryIdx((prev) => (prev + 1) % galleryImages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen text-white relative">
      <div className="fixed inset-0 w-full h-full z-0 bg-[#050505]">
        <img src="/images/bg1.jpeg" className="w-full h-full object-cover opacity-70" alt="Background" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto p-4 md:p-8 overflow-hidden">

        {/* THIS IS THE PARENT GRID MOTION DIV */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(220px,auto)]"
        >

          {/* 1. HERO ANCHOR CARD */}
          <motion.div variants={cardVariants} className="md:col-span-4 md:row-span-2 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 relative overflow-hidden group flex flex-col p-8 cursor-pointer" onClick={() => setDeepDiveItem(aboutMeData)}>
            <div className="flex-1 transition-opacity duration-500 group-hover:opacity-100 relative z-10">
              <div className="w-24 h-24 rounded-full border-2 border-white/20 mb-4 overflow-hidden bg-black">
                <img src={aboutMeData.img} alt="Ishakya" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Ishakya Gamage</h1>
              <p className="text-green-400 font-bold uppercase tracking-widest text-xs mb-6 h-4">
                <TypewriterText text="Software Engineer @ UoM CSE" />
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-auto">
                <div>
                  <AnimatedCounter end={12} suffix="+" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Projects</p>
                </div>
                <div>
                  <AnimatedCounter end={13} suffix="+" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Events Led</p>
                </div>
                <div>
                  <AnimatedCounter end={3} suffix="" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Semesters</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 p-8 flex flex-col justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none bg-black/80 backdrop-blur-md">
              <h3 className="text-white font-bold text-xl mb-3">About Me</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{aboutMeData.desc}</p>
              <p className="text-green-400 text-xs font-bold mt-4 tracking-widest uppercase">Click for Full Profile</p>
            </div>

            <div className="mt-auto flex gap-3 z-30 relative pt-4">
              <a href="/cv.pdf" download onClick={(e) => e.stopPropagation()} className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white text-sm rounded-xl transition-colors border border-white/10 flex justify-center items-center gap-2">
                <Download size={16} /> CV
              </a>
              <button onClick={(e) => { e.stopPropagation(); setIsContactOpen(true); }} className="flex-1 py-3 bg-white text-black font-medium text-sm rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                <Mail size={16} /> Contact
              </button>
            </div>
          </motion.div>

          {/* 2. ARCHITECTURE & TECH STACK CARD */}
          <motion.div variants={cardVariants} className="md:col-span-5 md:row-span-2 bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="text-white/70" size={20} />
              <h2 className="text-lg font-bold text-white">Software & Systems</h2>
            </div>
            <div className="space-y-3">
              {topProjects.map((proj, i) => (
                <div key={i} onClick={() => setDeepDiveItem(proj)} className="relative group flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all cursor-pointer shadow-lg">
                  <img src={proj.img} className="w-12 h-12 rounded-lg object-cover mr-4 opacity-70 group-hover:opacity-100 transition-opacity" alt={proj.title} />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{proj.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {proj.tags.slice(0, 3).map(t => <span key={t} className="text-[10px] text-gray-400 font-mono">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t border-white/10 relative">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers size={14} className="text-green-400" /> Core Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {techStackDetails.map((tech) => (
                  <div key={tech.name} className="relative group">

                    {/* The Visible Button */}
                    <span className="px-3 py-1.5 bg-white/15 hover:bg-white/30 border border-white/30 hover:border-green-400 rounded-lg text-[11px] text-white font-mono font-semibold transition-all cursor-default block shadow-sm">
                      {tech.name}
                    </span>

                    {/* The Hidden Glass Tooltip (Reveals on Hover) */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 bg-zinc-900/95 backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] scale-95 group-hover:scale-100 origin-bottom">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-lg">{tech.icon}</span>
                        <span className="text-white font-bold text-xs">{tech.name}</span>
                      </div>
                      <p className="text-gray-400 text-[10px] leading-relaxed">{tech.desc}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-white/20"></div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setIsEngineeringOpen(true)} className="mt-6 w-full py-3.5 bg-white/10 hover:bg-white/25 border border-white/30 hover:border-white/60 rounded-xl text-xs text-white font-extrabold transition-all uppercase tracking-[0.2em] shadow-lg">[ + View All 12 Projects ]</button>
          </motion.div>

          {/* 3. LOGISTICS TIMELINE */}
          <motion.div variants={cardVariants} className="md:col-span-3 md:row-span-4 bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-col relative h-full z-40">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="text-white/70" size={20} />
              <h2 className="text-lg font-bold text-white">Logistics Timeline</h2>
            </div>
            <div className="relative border-l border-white/10 ml-3 space-y-8 flex-1 py-4">
              {logisticsEvents.map((evt, i) => (
                <div key={i} className="relative pl-6 group cursor-pointer" onClick={() => setDeepDiveItem(evt)}>
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_12px_#22c55e]"></div>
                  <h3 className="text-white text-md font-bold group-hover:text-green-400 transition-colors">{evt.title}</h3>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{evt.desc}</p>

                  <div className="absolute right-full top-0 mr-4 w-56 bg-black border border-white/20 rounded-xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-2xl hidden lg:block">
                    <img src={evt.img} className="w-full h-32 object-cover rounded-lg mb-2" alt={evt.title} />
                    <p className="text-xs text-gray-300 font-bold">{evt.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setIsLeadershipOpen(true)} className="mt-6 w-full py-3.5 bg-white/10 hover:bg-white/25 border border-white/30 hover:border-white/60 rounded-xl text-xs text-white font-extrabold transition-all uppercase tracking-[0.2em] shadow-lg">[ + View All 13 Experiences ]</button>
          </motion.div>

          {/* 4. CREATIVE RUNTIME */}
          <motion.div variants={cardVariants} className="md:col-span-4 md:row-span-2 bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-center relative overflow-hidden group cursor-pointer z-10" onClick={() => setDeepDiveItem({ title: "Creative Arts", role: "Vocalist & Stage Actor", desc: "Active participant in University Arts.", longDesc: "Led main cast execution in The Merchant of Venice and handled vocalist duties alongside stage decor for Sakura 2025 and Mavisuru Ranga Sobha.", img: galleryImages[0] })}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent z-10"></div>
            <img src={galleryImages[0]} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="stage" />
            <div className="relative z-20">
              <h2 className="text-2xl font-bold text-white mb-4">Creative Runtime</h2>
              <div className="space-y-3">
                <p className="text-sm text-gray-200 font-medium border-l-2 border-green-500 pl-3">The Merchant of Venice <span className="block text-gray-400 text-xs mt-1">Main Cast Execution</span></p>
                <p className="text-sm text-gray-200 font-medium border-l-2 border-green-500 pl-3">Sakura Performance <span className="block text-gray-400 text-xs mt-1">Vocalist & Decor</span></p>
              </div>
            </div>
            <div className="absolute right-6 bottom-6 text-4xl text-white/20 z-20 font-serif">𝄢</div>
          </motion.div>

          {/* 5. MASSIVE PHOTO GALLERY */}
          <motion.div variants={cardVariants} className="md:col-span-5 md:row-span-2 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden relative group min-h-[300px] cursor-pointer z-10" onClick={() => setIsLeadershipOpen(true)}>
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                src={galleryImages[galleryIdx]}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Event & Project Gallery</h2>
                <p className="text-sm text-gray-300">Highlights from the last 3 semesters</p>
              </div>
            </div>
          </motion.div>

        </motion.div>

        <EngineeringModal isOpen={isEngineeringOpen} onClose={() => setIsEngineeringOpen(false)} onItemClick={setDeepDiveItem} />
        <LeadershipModal isOpen={isLeadershipOpen} onClose={() => setIsLeadershipOpen(false)} onItemClick={setDeepDiveItem} />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <ItemDetailModal item={deepDiveItem} onClose={() => setDeepDiveItem(null)} />
      </div>
    </div>
  );
}