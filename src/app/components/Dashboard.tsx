import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Mail, Download, Calendar, Terminal, Layers, Trophy, ChevronDown } from 'lucide-react';
import { EngineeringModal, LeadershipModal, ContactModal, SkillsModal, HackathonsModal } from './Modals';
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
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const // smooth expo-out, no bounce
    }
  }
};

const cardHover = {
  y: -6,
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }
};

// --- MOBILE: scroll-triggered reveal wrapper ---
const Reveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
    className={className}
  >
    {children}
  </motion.section>
);

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
    const duration = 1200;
    let raf: number;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end]);
  return <span className="font-bold text-2xl text-white tabular-nums">{count}{suffix}</span>;
};

// --- DATA ARRAYS ---
const topProjects = [
  {
    title: "Sonora AI", tags: ["Python", "FastAPI", "Next.js", "GCP", "Gemini"],
    desc: "Genre-aware AI vocal production platform with DSP-driven auto-tune mastering.",
    longDesc: "A highly sophisticated artificial intelligence solution focused on advanced data processing and predictive capabilities for vocal production. Functions as a genre-aware 'auto-tune,' capable of both Western 12-tone tuning and Indian classical raga/microtonal tuning.",
    overview: { type: "Personal Project", year: "2026", focus: "AI-Powered Audio DSP", role: "Full-Stack & AI Systems Engineer (Solo)" },
    contributions: [
      "Integrated Google Gemini to analyze vocal tracks against a target genre, generating timestamped automation maps that drive block-based DSP mastering chains.",
      "Engineered AI pipelines using neural pitch tracking (CREPE), WORLD vocoder resynthesis, Demucs source separation, and Essentia tonic/scale detection.",
      "Secured the platform with a BFF pattern using OAuth2/OIDC + PKCE via WSO2 Asgardeo and RFC 7662 token introspection."
    ],
    github: "https://github.com/Sonora-AI",
    link: "https://sonora-ai-pwa.vercel.app/",
    img: "images/projects/sonora-1.jpg",
    gallery: ["images/projects/sonora-1.jpg", "images/projects/sonora-2.jpg"]
  },
  {
    title: "PredictiveOps", tags: ["Go", "Python", "Kafka", "MLflow"],
    desc: "Event-driven ML infrastructure predicting resource bottlenecks pre-impact.",
    longDesc: "An event-driven microservices architecture designed to analyze system telemetry data and predict resource bottlenecks before they impact performance.",
    overview: { type: "Software Engineering Project", year: "2026", focus: "Event-Driven ML Infrastructure", role: "ML Pipeline & Backend Developer" },
    contributions: [
      "Leveraged an asynchronous Kafka backbone for high-throughput, zero-data-loss telemetry stream processing.",
      "Architected an ML pipeline transitioning from unsupervised Isolation Forest detection to supervised XGBoost models.",
      "Integrated human-in-the-loop validation with weekly batch retraining through MLflow."
    ],
    github: "https://github.com/PredictiveOps/Pred.git",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800"
  },
  {
    title: "SoundScout AI", tags: ["Next.js", "Python", "Multi-Agent", "Vercel"],
    desc: "Multi-agent AV event logistics and vendor bidding marketplace.",
    longDesc: "An automated event logistics and vendor bidding platform powered by a complex multi-agent system.",
    overview: { type: "Platform Project", year: "2026", focus: "Multi-Agent Marketplace", role: "Full-Stack Engineer" },
    contributions: [
      "Built across a four-repository architecture spanning frontend, backend, AI reasoning engine, and a WhatsApp worker.",
      "Engineered an instant rental feature using Server-Sent Events (SSE) for live inventory updates.",
      "Implemented a custom Click-to-Verify WhatsApp authentication flow for secure vendor-client interactions."
    ],
    github: "https://github.com/sound-scout-dev",
    link: "https://sound-scout-frontend.vercel.app/",
    img: "images/projects/soundscout-1.jpg",
    gallery: ["images/projects/soundscout-1.jpg", "images/projects/soundscout-2.jpg"]
  }
];

const logisticsEvents = [
  { title: "CSE Batch '23 Rep", role: "Department Representative", desc: "Primary student liaison for the 2023 CSE intake across semesters 4-6.", img: "images/volunteering/BatchRep.jpg" },
  { title: "IEEE Student Branch, UoM", role: "Logistics Committee Co-Lead", desc: "Co-leading the branch's permanent logistics committee & SOPs.", img: "images/volunteering/SB1.jpg" },
  { title: "MoraXtreme 10.0", role: "Logistics Lead", desc: "Directed 24-hr continuous infrastructure & power delivery.", img: "images/volunteering/MoraXtreame1.jpg" },
  { title: "IEEE Open Week 2026", role: "Logistics Co-Lead", desc: "Managed 72-foot display & custom fabric merch production.", img: "images/volunteering/OpenWeek.jpg" },
  { title: "RoboGames 2026 (IESL)", role: "Organizing Committee", desc: "Live-stream technical support and competition arena setup.", img: "images/volunteering/RoboGames1.jpg" },
  { title: "SLIoT Challenge 2026", role: "Delegate Handling OC", desc: "End-to-end event execution workflows and VIP procurement.", img: "images/volunteering/SLIOT1.jpg" },
  { title: "Hit the Grounds 2025", role: "Logistics Co-Lead", desc: "Operational setup and welcoming logistics for flagship orientation.", img: "images/volunteering/HitTheGrounds1.jpg" },
  { title: "Mora Foresight 3.0", role: "Logistics Member", desc: "Organized island-wide awareness sessions and Foresight Padura.", img: "images/volunteering/foresight1.jpg" }
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

const techStackDetails = [
  { name: "Python", desc: "Core language for AI/ML pipelines, DSP, and backend services.", icon: "🐍" },
  { name: "TypeScript", desc: "Type-safe language powering modern frontend & Node.js backends.", icon: "🔷" },
  { name: "React.js", desc: "Component-based library for building interactive interfaces.", icon: "⚛️" },
  { name: "Next.js", desc: "Full-stack React framework for production-grade frontends.", icon: "▲" },
  { name: "Node.js", desc: "Server-side JS runtime for highly scalable backends.", icon: "🌐" },
  { name: "FastAPI", desc: "High-performance Python framework for AI/ML backend APIs.", icon: "⚡" },
  { name: "GCP", desc: "Cloud infrastructure provisioning, VMs, and deployment.", icon: "☁️" },
  { name: "PostgreSQL", desc: "Relational database for structured, time-series feature storage.", icon: "🐘" },
  { name: "Redis", desc: "In-memory caching for rapid session and data retrieval.", icon: "🧊" },
  { name: "Machine Learning", desc: "XGBoost, Isolation Forests, and predictive modeling pipelines.", icon: "🧠" },
  { name: "Kafka", desc: "Event-driven architecture for high-throughput data streaming.", icon: "📊" },
  { name: "OAuth 2.0 / OIDC", desc: "Secure identity flows with PKCE, JWT, and WSO2 Asgardeo.", icon: "🔐" },
  { name: "DSP", desc: "Digital signal processing for audio & vocal production pipelines.", icon: "🎚️" },
  { name: "IoT (ESP32)", desc: "Embedded systems and MQTT broker communications.", icon: "📡" }
];

const hackathonPlacements = [
  { icon: "🏆", title: "2nd Runners-Up", event: "BitCode v6.0" },
  { icon: "⭐", title: "National Finalist (Top 8)", event: "OctWave 2.0 Kaggle Challenge" },
  { icon: "🤖", title: "Grand Finale Finalist", event: "Sri Lankan Robotics Challenge 2026" },
  { icon: "🌍", title: "Global Competitor", event: "IEEEXtreme 19.0" }
];

const aboutMeData = {
  title: "Ishakya Gamage", role: "Software Engineer & Logistics Lead", tags: ["University of Moratuwa", "Batch Representative", "Full-Stack Dev"],
  desc: "Undergraduate in Computer Science & Engineering at the University of Moratuwa. I specialize in building highly scalable full-stack systems and orchestrating massive technical events and hackathons.",
  longDesc: "Most of my time goes into shipping end-to-end AI platforms like Sonora AI and SoundScout AI, and event-driven backend systems like PredictiveOps — architecting, building, and deploying every layer myself. Beyond the code, I'm deeply involved in student leadership as the CSE Batch '23 Rep and IEEE Student Branch logistics co-lead, and when I'm not shipping a project you'll find me performing as a vocalist and stage actor.",
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
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isHackathonsOpen, setIsHackathonsOpen] = useState(false);
  const [deepDiveItem, setDeepDiveItem] = useState<any | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setGalleryIdx((prev) => (prev + 1) % galleryImages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen text-white relative flex flex-col">
      <div className="fixed inset-0 w-full h-full z-0 bg-[#050505]">
        <img src="/images/bg1.jpeg" className="w-full h-full object-cover object-[8%_center] md:object-center opacity-70" alt="Background" />
      </div>

      {/* ================= MOBILE EXPERIENCE (scrolling, revealed on scroll) ================= */}
      <div className="md:hidden relative z-10 flex flex-col">

        {/* HERO */}
        <section className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full border-2 border-white/20 overflow-hidden bg-black mb-5 shadow-2xl">
              <img src={aboutMeData.img} alt="Ishakya" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Ishakya Gamage</h1>
            <p className="text-green-400 font-bold uppercase tracking-widest text-xs mb-7 h-4">
              <TypewriterText text="Software Engineer @ UoM CSE" />
            </p>
            <div className="flex gap-8 mb-9 bg-black/85 backdrop-blur-2xl transform-gpu border border-white/10 rounded-2xl px-7 py-4 shadow-2xl">
              <div>
                <AnimatedCounter end={12} suffix="+" />
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Projects</p>
              </div>
              <div>
                <AnimatedCounter end={13} suffix="+" />
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Events Led</p>
              </div>
              <div>
                <AnimatedCounter end={5} suffix="" />
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Semesters</p>
              </div>
            </div>
            <div className="flex gap-3 w-full max-w-xs">
              <motion.a whileTap={{ scale: 0.96 }} href="/cv.pdf" download className="flex-1 py-3.5 bg-black/70 backdrop-blur-2xl transform-gpu active:bg-black/50 text-white text-sm rounded-xl transition-colors border border-white/15 flex justify-center items-center gap-2 shadow-xl">
                <Download size={16} /> CV
              </motion.a>
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => setIsContactOpen(true)} className="flex-1 py-3.5 bg-white text-black font-medium text-sm rounded-xl active:bg-gray-200 transition-colors flex justify-center items-center gap-2 shadow-xl">
                <Mail size={16} /> Contact
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1, duration: 0.6 }, y: { delay: 1, duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute bottom-8 flex flex-col items-center gap-1 text-gray-500"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </section>

        {/* ABOUT */}
        <Reveal className="px-5 pb-14">
          <div className="bg-black/85 backdrop-blur-2xl transform-gpu rounded-3xl border border-white/10 p-6 shadow-2xl" onClick={() => setDeepDiveItem(aboutMeData)}>
            <h2 className="text-white font-bold text-lg mb-3">About Me</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{aboutMeData.desc}</p>
            <p className="text-green-400 text-xs font-bold mt-4 tracking-widest uppercase">Tap for full profile</p>
          </div>
        </Reveal>

        {/* SOFTWARE & SYSTEMS — pinterest masonry */}
        <Reveal className="px-5 pb-14">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
            <Terminal className="text-white/70" size={20} /> Software &amp; Systems
          </h2>
          <div className="columns-2 gap-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
            {topProjects.map((proj, i) => (
              <div key={i} onClick={() => setDeepDiveItem(proj)} className="rounded-2xl overflow-hidden bg-black/85 backdrop-blur-2xl transform-gpu border border-white/10 active:scale-[0.97] transition-transform shadow-xl">
                <img src={proj.img} loading="lazy" decoding="async" className="w-full h-auto block" alt={proj.title} />
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm leading-tight">{proj.title}</h3>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">{proj.tags.slice(0, 2).join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-black/85 backdrop-blur-2xl transform-gpu border border-white/10 rounded-3xl p-5 shadow-2xl">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Layers size={14} className="text-green-400" /> Core Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStackDetails.map((tech) => (
                <span key={tech.name} className="px-3 py-1.5 bg-white/15 border border-white/30 rounded-lg text-[11px] text-white font-mono font-semibold">
                  {tech.name}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => setIsEngineeringOpen(true)} className="flex-1 py-3.5 bg-white/10 active:bg-white/25 border border-white/30 rounded-xl text-xs text-white font-extrabold uppercase tracking-[0.15em]">[ + Projects ]</motion.button>
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => setIsSkillsOpen(true)} className="flex-1 py-3.5 bg-white/10 active:bg-white/25 border border-white/30 rounded-xl text-xs text-white font-extrabold uppercase tracking-[0.15em]">[ + Full Arsenal ]</motion.button>
            </div>
          </div>
        </Reveal>

        {/* LOGISTICS TIMELINE */}
        <Reveal className="px-5 pb-14">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
            <Calendar className="text-white/70" size={20} /> Logistics Timeline
          </h2>
          <div className="space-y-2.5">
            {logisticsEvents.map((evt, i) => (
              <div key={i} onClick={() => setDeepDiveItem(evt)} className="flex items-center gap-3 bg-black/85 backdrop-blur-2xl transform-gpu border border-white/10 rounded-2xl p-3 active:scale-[0.98] transition-transform shadow-xl">
                <img src={evt.img} loading="lazy" decoding="async" className="w-14 h-14 rounded-xl object-cover shrink-0" alt={evt.title} />
                <div className="min-w-0">
                  <h3 className="text-white text-sm font-bold truncate">{evt.title}</h3>
                  <p className="text-xs text-gray-400 truncate">{evt.role}</p>
                </div>
              </div>
            ))}
          </div>
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => setIsLeadershipOpen(true)} className="mt-4 w-full py-3.5 bg-black/85 backdrop-blur-2xl transform-gpu active:bg-black/60 border border-white/30 rounded-xl text-xs text-white font-extrabold uppercase tracking-[0.15em] shadow-xl">[ + View All 15 Experiences ]</motion.button>
        </Reveal>

        {/* HACKATHONS & AWARDS */}
        <Reveal className="px-5 pb-14">
          <div onClick={() => setIsHackathonsOpen(true)} className="bg-black/85 backdrop-blur-2xl transform-gpu rounded-3xl p-6 border border-white/10 active:scale-[0.98] transition-transform shadow-2xl">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <Trophy className="text-white/70" size={20} /> Hackathons &amp; Awards
            </h2>
            <div className="space-y-3">
              {hackathonPlacements.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl leading-none">{p.icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">{p.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{p.event}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mt-4 pt-4 border-t border-white/10">[ View Full Record ]</p>
          </div>
        </Reveal>

        {/* EVENT & PROJECT GALLERY — pinterest masonry */}
        <Reveal className="px-5 pb-16">
          <div className="mb-4 bg-black/85 backdrop-blur-2xl transform-gpu border border-white/10 rounded-2xl px-5 py-4 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-1">Event &amp; Project Gallery</h2>
            <p className="text-sm text-gray-300">Highlights from the last 3 semesters</p>
          </div>
          <div className="columns-2 gap-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
            {galleryImages.map((src, i) => (
              <img key={i} src={src} loading="lazy" decoding="async" className="w-full h-auto rounded-2xl border border-white/10" alt="" />
            ))}
          </div>
        </Reveal>

        <footer className="pb-10 flex justify-center">
          <p className="text-xs text-gray-300 tracking-widest bg-black/85 backdrop-blur-2xl border border-white/10 rounded-full px-5 py-2.5 shadow-xl">
            © {new Date().getFullYear()} Ishakya Gamage · <span className="text-white font-medium">@hiru616</span>
          </p>
        </footer>
      </div>

      {/* ================= DESKTOP EXPERIENCE (single-viewport bento grid) ================= */}
      <div className="hidden md:flex relative z-10 w-full max-w-[1400px] mx-auto p-4 md:p-5 flex-1 flex-col overflow-hidden lg:translate-x-[clamp(24px,6vw,130px)]">

        {/* THIS IS THE PARENT GRID MOTION DIV */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-3 auto-rows-[minmax(175px,auto)]"
        >

          {/* 1. HERO ANCHOR CARD */}
          <motion.div variants={cardVariants} whileHover={cardHover} className="md:col-span-4 md:row-span-2 bg-black/80 backdrop-blur-xl transform-gpu rounded-3xl border border-white/10 hover:border-white/25 transition-colors relative overflow-hidden group flex flex-col p-6 cursor-pointer" onClick={() => setDeepDiveItem(aboutMeData)}>
            <div className="flex-1 transition-opacity duration-500 group-hover:opacity-100 relative z-10">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 mb-3 overflow-hidden bg-black">
                <img src={aboutMeData.img} alt="Ishakya" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">Ishakya Gamage</h1>
              <p className="text-green-400 font-bold uppercase tracking-widest text-xs mb-3 h-4">
                <TypewriterText text="Software Engineer @ UoM CSE" />
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 mt-auto">
                <div>
                  <AnimatedCounter end={12} suffix="+" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Projects</p>
                </div>
                <div>
                  <AnimatedCounter end={13} suffix="+" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Events Led</p>
                </div>
                <div>
                  <AnimatedCounter end={5} suffix="" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Semesters</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 p-6 flex flex-col justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none bg-black/80 backdrop-blur-none group-hover:backdrop-blur-md">
              <h3 className="text-white font-bold text-xl mb-3">About Me</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{aboutMeData.desc}</p>
              <p className="text-green-400 text-xs font-bold mt-4 tracking-widest uppercase">Click for Full Profile</p>
            </div>

            <div className="mt-auto flex gap-3 z-30 relative pt-4">
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="/cv.pdf" download onClick={(e) => e.stopPropagation()} className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white text-sm rounded-xl transition-colors border border-white/10 flex justify-center items-center gap-2">
                <Download size={16} /> CV
              </motion.a>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={(e) => { e.stopPropagation(); setIsContactOpen(true); }} className="flex-1 py-3 bg-white text-black font-medium text-sm rounded-xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                <Mail size={16} /> Contact
              </motion.button>
            </div>
          </motion.div>

          {/* 2. ARCHITECTURE & TECH STACK CARD */}
          <motion.div variants={cardVariants} whileHover={cardHover} className="md:col-span-5 md:row-span-2 bg-black/80 backdrop-blur-xl transform-gpu rounded-3xl p-6 border border-white/10 hover:border-white/25 transition-colors flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="text-white/70" size={20} />
              <h2 className="text-lg font-bold text-white">Software & Systems</h2>
            </div>
            <div className="space-y-2.5">
              {topProjects.map((proj, i) => (
                <div key={i} onClick={() => setDeepDiveItem(proj)} className="relative group flex items-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all cursor-pointer shadow-lg">
                  <img src={proj.img} loading="lazy" decoding="async" className="w-11 h-11 rounded-lg object-cover mr-4 opacity-70 group-hover:opacity-100 transition-opacity" alt={proj.title} />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{proj.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {proj.tags.slice(0, 3).map(t => <span key={t} className="text-[10px] text-gray-400 font-mono">{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-white/10 relative">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-2">
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
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 bg-zinc-900/95 backdrop-blur-none group-hover:backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] scale-95 group-hover:scale-100 origin-bottom">
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
            <div className="mt-4 flex gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsEngineeringOpen(true)} className="flex-1 py-3.5 bg-white/10 hover:bg-white/25 border border-white/30 hover:border-white/60 rounded-xl text-xs text-white font-extrabold transition-all uppercase tracking-[0.2em] shadow-lg">[ + Projects ]</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsSkillsOpen(true)} className="flex-1 py-3.5 bg-white/10 hover:bg-white/25 border border-white/30 hover:border-white/60 rounded-xl text-xs text-white font-extrabold transition-all uppercase tracking-[0.2em] shadow-lg">[ + Full Arsenal ]</motion.button>
            </div>
          </motion.div>

          {/* 3. LOGISTICS TIMELINE */}
          <motion.div variants={cardVariants} whileHover={cardHover} className="md:col-span-3 md:row-span-4 bg-black/80 backdrop-blur-xl transform-gpu rounded-3xl p-6 border border-white/10 hover:border-white/25 transition-colors flex flex-col relative h-full z-40">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-white/70" size={20} />
              <h2 className="text-lg font-bold text-white">Logistics Timeline</h2>
            </div>
            <div className="relative border-l border-white/10 ml-3 space-y-4 flex-1 py-2">
              {logisticsEvents.map((evt, i) => (
                <div key={i} className="relative pl-6 group cursor-pointer" onClick={() => setDeepDiveItem(evt)}>
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_12px_#22c55e]"></div>
                  <h3 className="text-white text-sm font-bold group-hover:text-green-400 transition-colors">{evt.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{evt.desc}</p>

                  <div className="absolute right-full top-0 mr-4 w-56 bg-black border border-white/20 rounded-xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-2xl hidden lg:block">
                    <img src={evt.img} loading="lazy" decoding="async" className="w-full h-32 object-cover rounded-lg mb-2" alt={evt.title} />
                    <p className="text-xs text-gray-300 font-bold">{evt.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsLeadershipOpen(true)} className="mt-4 w-full py-3.5 bg-white/10 hover:bg-white/25 border border-white/30 hover:border-white/60 rounded-xl text-xs text-white font-extrabold transition-all uppercase tracking-[0.2em] shadow-lg">[ + View All 15 Experiences ]</motion.button>
          </motion.div>

          {/* 4. HACKATHONS & AWARDS */}
          <motion.div variants={cardVariants} whileHover={cardHover} className="md:col-span-4 md:row-span-2 bg-black/80 backdrop-blur-xl transform-gpu rounded-3xl p-6 border border-white/10 hover:border-white/25 transition-colors flex flex-col relative overflow-hidden group cursor-pointer z-10" onClick={() => setIsHackathonsOpen(true)}>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-white/70" size={20} />
              <h2 className="text-lg font-bold text-white">Hackathons & Awards</h2>
            </div>
            <div className="space-y-3 flex-1">
              {hackathonPlacements.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl leading-none">{p.icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">{p.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{p.event}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mt-3 pt-3 border-t border-white/10">[ View Full Record ]</p>
          </motion.div>

          {/* 5. MASSIVE PHOTO GALLERY */}
          <motion.div variants={cardVariants} whileHover={cardHover} className="md:col-span-5 md:row-span-2 bg-black/80 backdrop-blur-xl transform-gpu rounded-3xl border border-white/10 hover:border-white/25 transition-colors overflow-hidden relative group min-h-[260px] cursor-pointer z-10" onClick={() => setIsLeadershipOpen(true)}>
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
            <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Event & Project Gallery</h2>
                <p className="text-sm text-gray-300">Highlights from the last 3 semesters</p>
              </div>
            </div>
          </motion.div>

        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-auto pt-3 pb-2 border-t border-white/10 text-center"
        >
          <p className="text-xs text-gray-500 tracking-widest">
            © {new Date().getFullYear()} Ishakya Gamage · <span className="text-gray-400">@hiru616</span>
          </p>
        </motion.footer>

      </div>

      {/* Modals render outside the transformed/shifted container so their
          fixed positioning + backdrop blur is relative to the real viewport,
          not the translated grid wrapper (a CSS transform on an ancestor
          turns position:fixed descendants into ancestor-relative boxes). */}
      <EngineeringModal isOpen={isEngineeringOpen} onClose={() => setIsEngineeringOpen(false)} onItemClick={setDeepDiveItem} />
      <LeadershipModal isOpen={isLeadershipOpen} onClose={() => setIsLeadershipOpen(false)} onItemClick={setDeepDiveItem} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <SkillsModal isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />
      <HackathonsModal isOpen={isHackathonsOpen} onClose={() => setIsHackathonsOpen(false)} />
      <ItemDetailModal item={deepDiveItem} onClose={() => setDeepDiveItem(null)} />
    </div>
  );
}