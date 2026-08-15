import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Linkedin, Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  onItemClick?: (item: any) => void;
}

const ModalWrapper = ({ isOpen, onClose, title, children, maxWidth = "max-w-[1200px]" }: ModalProps & { maxWidth?: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

          {/* FULL-SCREEN BLURRED BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-lg"
            onClick={onClose}
          />

          {/* GLASSMORPHIC MODAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidth} h-[85vh] bg-black/60 backdrop-blur-2xl border border-white/15 rounded-[24px] flex flex-col overflow-hidden shadow-2xl`}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
              <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- NEW CONTACT MODAL ---
export const ContactModal = ({ isOpen, onClose }: Omit<ModalProps, 'title' | 'children'>) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/ishakyaranhiru@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio message from ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Contact Me" maxWidth="max-w-[1000px]">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Get in Touch</h1>
        <p className="text-gray-400">Got a question? Send me a message, and I'll get back to you soon.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Connect Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Connect With Me</h3>
          <div className="space-y-4">
            <a href="https://www.linkedin.com/in/ishakya-gamage-71765b349/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#0077b5]/20 text-[#0077b5] rounded-lg flex items-center justify-center"><Linkedin size={20} /></div>
                <div>
                  <p className="text-white font-medium">Let's Connect</p>
                  <p className="text-xs text-gray-500">on LinkedIn</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>

            <a href="https://github.com/hiru616" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center"><Github size={20} /></div>
                <div>
                  <p className="text-white font-medium">GitHub</p>
                  <p className="text-xs text-gray-500">@hiru616</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>

            <a href="mailto:ishakyaranhiru@gmail.com" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center"><Mail size={20} /></div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-xs text-gray-500">ishakyaranhiru@gmail.com</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>

            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center"><Phone size={20} /></div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-xs text-gray-500">+94 7X XXX XXXX</p> {/* Replace with your real phone */}
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-6">Open to collaborations, internships, and research conversations.</p>
        </div>

        {/* Right: Direct Message Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
          <h3 className="text-lg font-bold text-white mb-2">Send a Message</h3>
          <p className="text-sm text-gray-400 mb-6">Have something to discuss? Let's talk.</p>

          {status === 'sent' ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <CheckCircle2 size={40} className="text-green-400 mb-4" />
              <p className="text-white font-semibold mb-1">Message sent!</p>
              <p className="text-sm text-gray-400">Thanks for reaching out — I'll get back to you soon.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-xs text-green-400 font-bold uppercase tracking-widest hover:text-green-300 transition-colors">
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">Your Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">Your Email</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">Your Message</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Write your message here..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors resize-none"></textarea>
              </div>
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle size={14} /> Something went wrong — please try again or email me directly.
                </div>
              )}
              <button type="submit" disabled={status === 'sending'} className="w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex justify-center items-center gap-2">
                <Send size={18} /> {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300 } }
};

export const LeadershipModal = ({ isOpen, onClose, onItemClick }: Omit<ModalProps, 'title' | 'children'>) => {
  const experiences = [
    // Academic Representation & Student Leadership
    { title: "CSE Batch '23 Rep", role: "Department Representative", period: "Jan 2026 – Present · 8 mos", desc: "Primary student leader and representative for the 2023 CSE intake across semesters 4, 5, and 6.", longDesc: "Serve as the primary academic liaison between the student body and faculty administration — coordinating academic schedules, managing strict deadlines including rescheduled sessions, and advocating for student welfare. Manage batch-wide projects, cross-cohort communications, and logistical tracking for major student initiatives.", img: "images/volunteering/BatchRep.jpg" },

    // Logistics, Operations & Infrastructure
    { title: "IEEE Student Branch, UoM", role: "Logistics Committee Co-Lead", period: "Jan 2026 – Present · 8 mos", desc: "Co-leading the branch's permanent logistics committee overseeing inventory, vendors, and SOPs.", longDesc: "Currently co-lead the permanent logistics committee for the university's IEEE branch, supervising critical inventory, vendor databases, and operational frameworks. Delegate tasks and mentor junior volunteer committees to establish and maintain standard operating procedures (SOPs) for all branch events.", gallery: ["images/volunteering/SB1.jpg", "images/volunteering/SB2.jpg"], img: "images/volunteering/SB1.jpg" },
    { title: "IEEE Open Week 2026", role: "Logistics Committee Co-Lead", period: "Mar 2026 – May 2026 · 3 mos", desc: "Managed end-to-end execution, large-scale venue layouts, and logistics.", longDesc: "Co-led the logistics committee for the flagship IEEE Open Week, directing overall event operations and massive physical infrastructure setups — including overseeing the installation of a 72-foot long visual display and managing the end-to-end production pipeline for custom baby crocodile pique fabric merchandise.", img: "images/volunteering/OpenWeek.jpg" },
    { title: "MoraXtreme 10.0", role: "Logistics Committee Lead", period: "Oct 2025 – Jan 2026 · 4 mos", desc: "Directed 24-hr continuous infrastructure for the flagship hackathon.", longDesc: "Spearheaded the physical infrastructure and timeline execution for MoraXtreme 10.0, a flagship 24-hour hackathon serving as the ultimate practice ground for the global IEEEXtreme competition.", gallery: ["images/volunteering/MoraXtreame1.jpg", "images/volunteering/MoraXtreame2.jpg"], img: "images/volunteering/MoraXtreame1.jpg" },
    { title: "RoboGames 2026 (IESL)", role: "Organizing Committee Member", period: "Apr 2026 · 1 mo", desc: "Contributed to operational planning, live-stream support, and technical arena setup.", longDesc: "Contributed to high-stakes operational planning, managed live-stream technical support on competition day, and engineered the technical arena setup for the national robotics competition.", gallery: ["images/volunteering/RoboGames1.jpg", "images/volunteering/RoboGames2.jpg"], img: "images/volunteering/RoboGames1.jpg" },
    { title: "Hit the Grounds 2025", role: "Logistics Committee Co-Lead", period: "Nov 2025 – Jan 2026 · 3 mos", desc: "Directed operational setup and welcoming logistics for the CSE orientation.", longDesc: "Co-led comprehensive logistical workflows and assisted with strategic publicity campaigns for the university's flagship orientation program.", gallery: ["images/volunteering/HitTheGrounds1.jpg", "images/volunteering/HitTheGrounds2.jpg"], img: "images/volunteering/HitTheGrounds1.jpg" },

    // Corporate Relations & Delegate Management
    { title: "SLIoT Challenge 2026", role: "Delegate Handling Committee Member", period: "Jan 2026 – Apr 2026 · 4 mos", desc: "Managed communications, registration, and hospitality for national-level contestants.", longDesc: "Managed end-to-end communications, registration verification, and hospitality for national-level contestants across both University and Open categories. Served as the primary point of contact and handler for top tech industry professionals, expert judges, and VIP delegates throughout the competition.", gallery: ["images/volunteering/SLIOT1.jpg", "images/volunteering/SLIOT2.jpg"], img: "images/volunteering/SLIOT1.jpg" },
    { title: "CSE Careers Day 2025", role: "Company Coordinating OC Member", period: "Jan 2026 · 1 mo", desc: "Handled corporate coordination and relations with industry partners.", longDesc: "Acted as the direct corporate liaison for top-tier tech companies participating in the annual career fair. Coordinated interview booth allocations, managed tight corporate schedules, and resolved real-time operational requests from visiting company representatives.", img: "images/volunteering/CarreersDay.jpg" },
    { title: "CSESS Professional Events", role: "Committee Member", period: "Aug 2025 – Present · 1 yr 1 mo", desc: "Drives initiatives bridging the gap between students and the tech industry.", longDesc: "Collaborate within the professional events committee to conceptualize, plan, and execute corporate networking sessions, industry tech talks, and professional development workshops — actively engaging industry leaders, corporate partners, and alumni to bridge academic studies and real-world tech trends.", img: "images/volunteering/CSESS.jpg" },
    { title: "On the Map 3.0 (AIESEC)", role: "Organizing Committee Member", period: "Apr 2024 – Jun 2024 · 3 mos", desc: "Planned event marketing and local logistics for the AIESEC community project.", longDesc: "Worked within a cross-functional team to plan and execute event marketing and local logistical workflows, tracking delegate engagement to support community project milestones.", gallery: ["images/volunteering/OnTheMap1.jpg", "images/volunteering/OnTheMap2.jpg"], img: "images/volunteering/OnTheMap1.jpg" },

    // Creative Direction & Cultural Arts
    { title: "The Merchant of Venice", role: "Cast Member (Main Character)", period: "Jan 2026 – Feb 2026 · 2 mos", desc: "Cast in a leading role for the CSE Drama Fest production.", longDesc: "Cast in a leading role as a main character in the departmental production of The Merchant of Venice. Dedicated extensive hours to script mastery, character development, and rigorous team rehearsals to deliver a high-quality dramatic production.", gallery: ["images/volunteering/DramaFest1.jpg", "images/volunteering/DramaFest2.jpg"], img: "images/volunteering/DramaFest1.jpg" },
    { title: "Batch '24 Inauguration", role: "Entertainment Coordinator", period: "Sep 2025 · 1 mo", desc: "Curated and coordinated live entertainment for the welcome ceremony.", longDesc: "Curated, organized, and coordinated the live entertainment segments for the official welcome ceremony of the 24th CSE intake — managing live stage transitions, complex technical audio-visual setups, and strict performer schedules.", gallery: ["images/volunteering/Innaugeration1.jpg", "images/volunteering/Innaugeration2.jpg"], img: "images/volunteering/Innaugeration1.jpg" },
    { title: "Mora Foresight 3.0", role: "Logistics & Cultural Segment Lead", period: "Feb 2025 – Aug 2025 · 7 mos", desc: "Organized island-wide school outreach and led the cultural segment, Foresight Padura.", longDesc: "Organized and conducted island-wide school awareness sessions to promote technical literacy. Planned and executed the specialized logistics for 'Foresight Padura,' the event's dedicated cultural and musical segment, alongside managing daily event operations and volunteer tracking.", gallery: ["images/volunteering/foresight1.jpg", "images/volunteering/foresight2.jpg"], img: "images/volunteering/foresight1.jpg" },
    { title: "Sakura 2025", role: "Decor & Performance Committee Member", period: "Mar 2025 – Apr 2025 · 2 mos", desc: "Designed themed decorations and performed as a live vocalist.", longDesc: "Designed and executed themed physical decorations and stage backgrounds for the department's highly anticipated cultural evening. Contributed directly to the musical lineup as a live vocalist during the main event.", gallery: ["images/volunteering/Sakura1.jpg", "images/volunteering/Sakura2.jpg"], img: "images/volunteering/Sakura1.jpg" },
    { title: "Mavisuru Ranga Sobha", role: "Organizing Committee Member & Performer", period: "Aug 2025 · 1 mo", desc: "Contributed to backstage management and decoration while performing on stage.", longDesc: "Contributed to intense backstage management and decoration committees while participating directly as a performer on stage.", img: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=800" }
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Leadership, Logistics & Creative Execution">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {experiences.map((exp, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col">
            <div className="h-48 relative bg-zinc-900 border-b border-white/10">
              <img src={exp.img} alt={exp.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-70" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-lg mb-1">{exp.title}</h3>
              <p className="text-green-400 text-xs font-bold uppercase tracking-wide mb-1">{exp.role}</p>
              <p className="text-gray-500 text-[11px] font-mono mb-3">{exp.period}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{exp.desc}</p>
              <button
                onClick={() => onItemClick && onItemClick(exp)}
                className="mt-auto w-full py-3 bg-white/5 hover:bg-white/20 border border-white/10 rounded-xl text-sm text-white font-medium transition-all"
              >
                More Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </ModalWrapper>
  );
};

export const SkillsModal = ({ isOpen, onClose }: Omit<ModalProps, 'title' | 'children' | 'onItemClick'>) => {
  const skillCategories = [
    { category: "Core Languages", icon: "💻", skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL"] },
    { category: "Frontend Engineering", icon: "🎨", skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"] },
    { category: "Backend & APIs", icon: "🔧", skills: ["Node.js", "Express.js", "FastAPI", "NestJS", "REST API Design"] },
    { category: "Cloud & Deployment", icon: "☁️", skills: ["Google Cloud Platform (GCP)", "Vercel", "NGINX", "Ubuntu Linux", "Caddy TLS", "systemd"] },
    { category: "Databases & Caching", icon: "🗄️", skills: ["MySQL", "PostgreSQL", "Redis"] },
    { category: "Advanced Domains", icon: "🧠", skills: ["Digital Signal Processing (DSP)", "Machine Learning (XGBoost, Isolation Forests)", "Multi-Agentic Systems", "Hardware/IoT (ESP32, MQTT)"] },
    { category: "Security & Identity", icon: "🔐", skills: ["WSO2 Asgardeo", "OAuth 2.0", "OIDC with PKCE", "Backend-for-Frontend (BFF)", "JWT", "RFC 7662 Token Introspection"] },
    { category: "DevOps & Architecture", icon: "⚙️", skills: ["Git", "Kafka (Event-Driven Architecture)", "MLflow", "Microservices"] }
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Technical Arsenal">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="text-lg">{cat.icon}</span> {cat.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-green-400 rounded-lg text-xs text-gray-200 font-mono transition-all">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </ModalWrapper>
  );
};

export const HackathonsModal = ({ isOpen, onClose }: Omit<ModalProps, 'title' | 'children' | 'onItemClick'>) => {
  const placements = [
    { icon: "🏆", title: "2nd Runners-Up", event: "BitCode v6.0", desc: "Competed as Team Algostrom representing the University of Moratuwa in the national-level coding contest organized by Rajarata University." },
    { icon: "⭐", title: "National Finalist (Top 8)", event: "OctWave 2.0 Kaggle Challenge", desc: "Demonstrated advanced data science, AI, and ML prowess competing as Team OW-74 Byte Squad in the challenge organized by IEEE IAS UoM." },
    { icon: "🤖", title: "Grand Finale Finalist", event: "Sri Lankan Robotics Challenge (SLRC) 2026", desc: "Selected to compete in the ultimate robotics showdown arena organized by ENTC UoM, featuring high-intensity hardware and software integration." },
    { icon: "🌍", title: "Global Competitor", event: "IEEEXtreme 19.0", desc: "Endured and competed in the globally recognized 24-hour algorithmic coding marathon." }
  ];

  const activeSubmissions = [
    { name: "IDEALIZE 2026", org: "AIESEC UoM", status: "Prototype Submitted" },
    { name: "LAUNCH'26", org: "IEEE CS UoK", status: "Phase 1 Cleared" },
    { name: "AI Challenge Sri Lanka", org: "IEEE YP", status: "AI Buildathon Active" },
    { name: "DHack'26", org: "USJ", status: "Round 1 Cleared" },
    { name: "GENESIZ '26", org: "KDU", status: "In Progress" },
    { name: "CodeSplash '26", org: "UoK", status: "In Progress" },
    { name: "CodeRally 7.0", org: "IIT", status: "In Progress" }
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Hackathons, Competitions & Awards">
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Major Placements & Finals</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {placements.map((p, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 items-start hover:bg-white/10 transition-colors">
              <span className="text-3xl leading-none">{p.icon}</span>
              <div>
                <h4 className="text-white font-bold text-base">{p.title}</h4>
                <p className="text-green-400 text-xs font-bold uppercase tracking-wide mb-2">{p.event}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Active Submissions & Innovation Challenges (2026)</h3>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeSubmissions.map((s, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <p className="text-white font-semibold text-sm">{s.name}</p>
              <p className="text-gray-500 text-xs mb-2">{s.org}</p>
              <span className="inline-block px-2.5 py-1 bg-green-500/15 text-green-400 border border-green-500/30 rounded-md text-[10px] font-mono uppercase tracking-wide">{s.status}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ModalWrapper>
  );
};

export const EngineeringModal = ({ isOpen, onClose, onItemClick }: Omit<ModalProps, 'title' | 'children'>) => {
  const projects = [
    {
      title: "Sonora AI", tags: ["Python", "FastAPI", "TypeScript", "Next.js", "GCP", "WSO2 Asgardeo", "Gemini"],
      desc: "AI-powered vocal production platform with genre-aware, microtonal-capable auto-tune.",
      longDesc: "A highly sophisticated artificial intelligence solution focused on advanced data processing and predictive capabilities for vocal production. Functions as a genre-aware 'auto-tune,' capable of both Western 12-tone tuning and Indian classical raga/microtonal tuning.",
      overview: { type: "Personal Project", year: "2026", focus: "AI-Powered Audio DSP", role: "Full-Stack & AI Systems Engineer (Solo)" },
      contributions: [
        "Integrated Google Gemini to analyze vocal tracks alongside a target genre, dynamically generating structured, timestamped automation maps that drive block-based DSP mastering chains (compressor, reverb, EQ) across the song's evolving structure.",
        "Engineered robust backend AI pipelines using neural pitch tracking (CREPE), the WORLD vocoder for resynthesis, Demucs for neural source separation (karaoke/vocal extraction), and Essentia (MIR) for tonic/scale detection.",
        "Implemented a secure Backend-for-Frontend (BFF) pattern using OAuth2/OIDC with PKCE via WSO2 Asgardeo, validated via RFC 7662 token introspection, ensuring access tokens live strictly in httpOnly cookies.",
        "Provisioned and hardened a GCP Compute Engine VM (Ubuntu) running as a systemd service behind a Caddy reverse proxy for automatic HTTPS/TLS termination, communicating with a Vercel-hosted frontend."
      ],
      github: "https://github.com/Sonora-AI",
      link: "https://sonora-ai-pwa.vercel.app/",
      img: "images/projects/sonora-1.jpg",
      gallery: ["images/projects/sonora-1.jpg", "images/projects/sonora-2.jpg"]
    },
    {
      title: "PredictiveOps", tags: ["Go", "Python", "Kafka", "MLflow", "PostgreSQL", "FastAPI"],
      desc: "Event-driven ML infrastructure predicting system resource bottlenecks before they hit.",
      longDesc: "An event-driven microservices architecture designed to analyze system telemetry data and predict resource bottlenecks before they impact performance.",
      overview: { type: "Software Engineering Project", year: "2026", focus: "Event-Driven ML Infrastructure", role: "ML Pipeline & Backend Developer" },
      contributions: [
        "Leveraged an asynchronous Kafka backbone for high-throughput, zero-data-loss telemetry stream processing, handling edge ingestion via MQTT/HTTP with sub-millisecond latency.",
        "Architected an end-to-end ML pipeline transitioning from unsupervised Isolation Forest anomaly detection (bootstrapping unlabeled data) to supervised XGBoost models.",
        "Integrated a human-in-the-loop validation system requiring expert review for pending predictions, managing weekly batch retraining through MLflow and persisting time-series feature vectors in PostgreSQL."
      ],
      github: "https://github.com/PredictiveOps/Pred.git",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800"
    },
    {
      title: "SoundScout AI", tags: ["Next.js", "Python", "Multi-Agentic Systems", "Vercel", "WhatsApp API"],
      desc: "Automated AV event logistics and vendor bidding platform powered by a multi-agent system.",
      longDesc: "An automated event logistics and vendor bidding platform powered by a complex multi-agent system.",
      overview: { type: "Platform Project", year: "2026", focus: "Multi-Agent Marketplace", role: "Full-Stack Engineer" },
      contributions: [
        "Built across a four-repository architecture encompassing the frontend, backend, AI reasoning engine, and a dedicated WhatsApp worker.",
        "Engineered an instant rental feature utilizing Server-Sent Events (SSE) for live inventory updates.",
        "Implemented a custom Click-to-Verify WhatsApp authentication flow to prevent unsolicited message drops and ensure secure vendor-client interactions."
      ],
      github: "https://github.com/sound-scout-dev",
      link: "https://sound-scout-frontend.vercel.app/",
      img: "images/projects/soundscout-1.jpg",
      gallery: ["images/projects/soundscout-1.jpg", "images/projects/soundscout-2.jpg"]
    },
    {
      title: "Another Home", tags: ["Node.js", "MySQL", "WSO2 Asgardeo", "REST API"],
      desc: "Enterprise hostel management backend for university/private hostel allocations.",
      longDesc: "A comprehensive, scalable backend infrastructure to manage university/private hostel allocations, user lifecycles, and facility administration.",
      overview: { type: "Backend Infrastructure", year: "2025", focus: "Identity & Facility Management", role: "Backend Developer" },
      contributions: [
        "Scaffolded a dedicated authentication microservice managing a highly secure, normalized MySQL user schema distinct to warden and student roles.",
        "Implemented enterprise-grade security and identity management using OAuth2/OIDC via WSO2 Asgardeo.",
        "Designed and implemented global API versioning and strict API contract integrations for future-proof scalability."
      ],
      github: "https://github.com/another-home-dev",
      img: "images/projects/anotherhome-1.jpg",
      gallery: ["images/projects/anotherhome-1.jpg", "images/projects/anotherhome-2.jpg"]
    },
    {
      title: "SwiftDrop Flash Sales", tags: ["Node.js", "NGINX", "Redis", "MySQL", "Machine Learning"],
      desc: "2nd Runners-Up at BitCode v6.0 — high-concurrency flash sales platform.",
      longDesc: "A scalable e-commerce backend built specifically to survive massive, sudden traffic spikes during flash sales, with a strong focus on performance, security, and system reliability.",
      overview: { type: "Team Project · Competition", year: "2025", focus: "High-Concurrency Backend", role: "Backend Architecture & ML" },
      contributions: [
        "Engineered multi-node NGINX load balancing architecture to seamlessly distribute severe traffic spikes across backend instances.",
        "Integrated machine learning-based bot detection algorithms to prevent automated purchasing, secured by robust JWT authentication.",
        "Utilized Redis caching for rapid session retrieval to minimize database latency during peak loads."
      ],
      github: "https://github.com/hasii-04/Bitcode-Flash-Sale-Platform.git",
      img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800"
    },
    {
      title: "Case Tracker Matara", tags: ["Full-Stack Web", "Vercel"],
      desc: "Specialized case tracking system for the Matara Court Complex.",
      longDesc: "A specialized, localized case tracking system customized exclusively for the Matara Court Complex to support highly sensitive legal tracking operations.",
      overview: { type: "Personal Project", year: "2025", focus: "Legal Operations Platform", role: "Full-Stack Developer (Solo)" },
      contributions: [
        "Designed and built the end-to-end case tracking system tailored to the Matara Court Complex's operational workflow.",
        "Handled end-to-end CI/CD and production deployment workflows via Vercel."
      ],
      github: "https://github.com/hiru616/CaseTracker_Matara_Court_Complex",
      link: "https://case-tracker-matara-court-complex-rhp98xxm7.vercel.app/",
      img: "images/projects/casetracker-1.jpg"
    },
    {
      title: "SkyNest Hotel System", tags: ["Node.js", "MySQL", "React"],
      desc: "Distributed multi-branch hotel management ecosystem.",
      longDesc: "A full-stack distributed system managing multi-branch hotel ecosystems, focusing on hotel reservations, guest services, and complex billing schemas.",
      overview: { type: "Database Assignment", year: "2025", focus: "Database Management Systems", role: "Full-Stack Developer" },
      contributions: [
        "Architected complex ACID-compliant relational MySQL database schemas handling real-time reservations, dynamic guest services, and concurrent billing generation.",
        "Developed secure backend REST APIs using Node.js to manage booking logic across branches.",
        "Implemented ACID-compliant database transactions to ensure booking integrity during concurrent access."
      ],
      github: "https://github.com/hiru616/hotel-management-system.git",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800"
    },
    { title: "Nano Processor Design", tags: ["Architecture", "Hardware"], desc: "Computer architecture project detailing instruction set execution.", github: "https://github.com/BimsaraU/Nanoprocessor-Design-Project", img: "https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=800" },
    { title: "IoT Hospital System", tags: ["IoT", "ESP32", "C++"], desc: "Chemical management tracking leveraging embedded controllers.", github: "https://github.com/hiru616/IOT_Health_System.git", img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800" },
    { title: "RPAL Interpreter", tags: ["Compilation", "C"], desc: "Implementation of a functional programming language interpreter.", github: "https://github.com/hiru616/RPAL-Interpreter.git", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800" },
    { title: "Stroke Prediction Model", tags: ["Data Science", "Kaggle"], desc: "Data science analysis utilizing patient telemetry metrics.", github: "https://www.kaggle.com/code/ishakyagamage/stroke-prediction", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800" },
    { title: "ExpenseFlow", tags: ["Full-Stack", "Web App"], desc: "Personal expense tracking and financial visualization application.", github: "https://github.com/hiru616/ExpenseFlow", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800" },
    { title: "IEEEXtreme 19.0", tags: ["Competitive Prog", "Algorithms"], desc: "Global competitor in the 24-hour IEEE coding competition.", github: "https://github.com/nilum2002/IEEE-Xtream19.git", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800" },
    { title: "SLIIT Micro Mouse", tags: ["Robotics", "Hardware"], desc: "Hardware and algorithm design for maze-solving robotics.", github: "https://github.com/thevinufernando/mm-micromouse.git", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800" },
    { title: "SLRC 2025", tags: ["Robotics", "Competition"], desc: "Participated in the Sri Lankan Robotics Challenge.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" }
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Engineering Repository & Competitions">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col">
            <div className="aspect-video relative bg-zinc-900 border-b border-white/10">
              <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-70" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-lg mb-3 leading-tight">{p.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-1 rounded border border-white/10">{tag}</span>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6">{p.desc}</p>
              <button
                onClick={() => onItemClick && onItemClick(p)}
                className="mt-auto w-full py-3 bg-white/5 hover:bg-white/20 border border-white/10 rounded-xl text-sm text-white font-medium transition-all"
              >
                More Details
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </ModalWrapper>
  );
};