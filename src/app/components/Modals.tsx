import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Linkedin, Mail, Phone, Send } from 'lucide-react';

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

          {/* LIGHTER BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
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

            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center"><Mail size={20} /></div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-xs text-gray-500">ishakya@example.com</p> {/* Replace with your real email */}
                </div>
              </div>
            </div>

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

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">Your Name</label>
              <input type="text" placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">Your Email</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">Your Message</label>
              <textarea rows={4} placeholder="Write your message here..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500 transition-colors resize-none"></textarea>
            </div>
            <button className="w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex justify-center items-center gap-2">
              <Send size={18} /> Send Message
            </button>
          </form>
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
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
};

export const LeadershipModal = ({ isOpen, onClose, onItemClick }: Omit<ModalProps, 'title' | 'children'>) => {
  const experiences = [
    { title: "IEEE Open Week 2026", role: "Logistics Co-Lead", desc: "Managed end-to-end execution, large-scale venue layouts, and logistics.", longDesc: "Orchestrated the physical infrastructure including the installation of a 72-foot long display and managed the custom baby crocodile pique fabric merchandise production pipeline.", gallery: ["https://images.unsplash.com/photo-1665035212282-3e117d618b36?q=80&w=800", "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800"], img: "https://images.unsplash.com/photo-1665035212282-3e117d618b36?q=80&w=800" },
    { title: "MoraXtreme 10.0", role: "Logistics Committee Lead", desc: "Directed 24-hr continuous infrastructure for the flagship hackathon.", longDesc: "Led a dedicated team to ensure uninterrupted power delivery, network stability, and floor management for over 500 competitors throughout the 24-hour hackathon.", img: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?q=80&w=800" },
    { title: "CSE Batch '23 Rep", role: "Department Representative", desc: "Served across semesters 4, 5, and 6 as the primary liaison.", longDesc: "Acted as the bridge between student welfare and academic administration, managing stakeholder communication, rescheduling workflows, and representing the cohort.", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800" },
    { title: "CSESS Professional Events", role: "Committee Member", desc: "Drove initiatives bridging the gap between students and the tech industry.", img: "https://images.unsplash.com/photo-1515169065863-2216569116e2?q=80&w=800" },
    { title: "Mora Foresight 3.0", role: "Logistics Member", desc: "Organized island-wide awareness sessions and the Foresight Padura.", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800" },
    { title: "Hit the Grounds 2025", role: "Logistics Co-Lead", desc: "Directed operational setup and welcoming logistics for the CSE orientation.", img: "https://images.unsplash.com/photo-1523580494112-749862df4b82?q=80&w=800" },
    { title: "SLIoT Challenge 2026", role: "Delegate Handling OC", desc: "Managed national competitors and industry VIPs for the IoT challenge.", img: "https://images.unsplash.com/photo-1722332998970-f2335db8ab6d?q=80&w=800" },
    { title: "CSE Careers Day 2025", role: "Company Coordinating OC", desc: "Handled corporate coordination and relations with industry partners.", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800" },
    { title: "RoboGames & AIESEC", role: "Organizing Committee", desc: "Contributed to RoboGames 2026 execution and On the Map 3.0 initiatives.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" },
    { title: "The Merchant of Venice", role: "Main Cast", desc: "Took the stage in a leading role for the CSE Drama Fest.", longDesc: "Balanced rigorous engineering coursework with demanding rehearsal schedules to deliver a main cast performance.", img: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=800" },
    { title: "Sakura 2025", role: "Vocalist & Decor", desc: "Handled aesthetic design and performed as a live vocalist.", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800" },
    { title: "Mavisuru Ranga Sobha", role: "Organizer & Performer", desc: "Acted in a main role and handled coordination for the EFU festival.", img: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=800" },
    { title: "Batch '24 Inauguration", role: "Entertainment Coordinator", desc: "Coordinated live entertainment sessions for the incoming 24th CSE batch.", img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800" }
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Leadership, Logistics & Creative Execution">
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {experiences.map((exp, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col">
            <div className="h-48 relative bg-zinc-900 border-b border-white/10">
              <img src={exp.img} alt={exp.title} className="w-full h-full object-cover opacity-70" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-white font-bold text-lg mb-1">{exp.title}</h3>
              <p className="text-green-400 text-xs font-bold uppercase tracking-wide mb-3">{exp.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{exp.desc}</p>
              <button
                onClick={() => { onClose(); onItemClick && onItemClick(exp); }}
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

export const EngineeringModal = ({ isOpen, onClose, onItemClick }: Omit<ModalProps, 'title' | 'children'>) => {
  const projects = [
    { title: "SwiftDrop Flash Sales", tags: ["NGINX", "Node.js", "Redis", "ML"], desc: "2nd Runners-Up at BitCode 6.0.", longDesc: "High-concurrency system built to handle flash sale traffic spikes seamlessly using NGINX load balancing and ML-based bot detection.", github: "https://github.com/hasii-04/Bitcode-Flash-Sale-Platform.git", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800" },
    { title: "SkyNest Hotel System", tags: ["Node.js", "MySQL"], desc: "Database management system for multi-branch hotel operations.", longDesc: "Full-stack relational database project managing reservations, guest services, and complex billing utilizing strict ACID compliance.", github: "https://github.com/hiru616/hotel-management-system.git", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800" },
    { title: "PredictiveOps", tags: ["Machine Learning", "Python"], desc: "Machine learning part for software engineering project.", github: "https://github.com/PredictiveOps/Pred.git", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800" },
    { title: "Nano Processor Design", tags: ["Architecture", "Hardware"], desc: "Computer architecture project detailing instruction set execution.", github: "https://github.com/BimsaraU/Nanoprocessor-Design-Project", img: "https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=800" },
    { title: "IoT Hospital System", tags: ["IoT", "ESP32", "C++"], desc: "Chemical management tracking leveraging embedded controllers.", github: "https://github.com/hiru616/IOT_Health_System.git", img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800" },
    { title: "RPAL Interpreter", tags: ["Compilation", "C"], desc: "Implementation of a functional programming language interpreter.", github: "https://github.com/hiru616/RPAL-Interpreter.git", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800" },
    { title: "CaseTracker", tags: ["System Design", "Web"], desc: "Case tracking system deployed for the Matara Court Complex.", github: "https://github.com/hiru616/CaseTracker_Matara_Court_Complex.git", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800" },
    { title: "Stroke Prediction Model", tags: ["Data Science", "Kaggle"], desc: "Data science analysis utilizing patient telemetry metrics.", github: "https://www.kaggle.com/code/ishakyagamage/stroke-prediction", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800" },
    { title: "ExpenseFlow", tags: ["Full-Stack", "Web App"], desc: "Personal expense tracking and financial visualization application.", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800" },
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
              <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-70" />
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
                onClick={() => { onClose(); onItemClick && onItemClick(p); }}
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