import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, CheckCircle2 } from 'lucide-react';

export function ItemDetailModal({ item, onClose }: { item: any, onClose: () => void }) {
    const [currentImg, setCurrentImg] = useState(0);

    const gallery = item?.gallery || (item?.img ? [item.img, item.img] : []);

    useEffect(() => {
        if (!item || gallery.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentImg((prev) => (prev + 1) % gallery.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [item, gallery.length]);

    if (!item) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">

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
                    className="relative w-full max-w-6xl h-[90vh] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/50 hover:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-all"
                    >
                        <X size={20} />
                    </button>

                    {/* Left Side: Automated Image Gallery */}
                    <div className="w-full lg:w-1/2 h-64 lg:h-full relative bg-black/50 border-r border-white/10">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImg}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                src={gallery[currentImg]}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>

                        {gallery.length > 1 && (
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                                {gallery.map((_, idx) => (
                                    <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentImg ? 'bg-green-400 w-6' : 'bg-white/30'}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Side: Transparent Background for Glass Effect */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col bg-transparent">

                        <button onClick={onClose} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm mb-6 w-fit transition-colors">
                            ← Back to Dashboard
                        </button>

                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">{item.title}</h1>
                        <p className="text-gray-300 text-base leading-relaxed mb-8">{item.longDesc || item.desc}</p>

                        {item.overview && (
                            <div className="mb-10">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Project Overview</h3>
                                <div className="grid grid-cols-2 gap-6 bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                                    <div className="border-l-2 border-green-500 pl-4">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Project Type</p>
                                        <p className="text-sm font-semibold text-white">{item.overview.type}</p>
                                    </div>
                                    <div className="border-l-2 border-green-500 pl-4">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Year</p>
                                        <p className="text-sm font-semibold text-white">{item.overview.year}</p>
                                    </div>
                                    <div className="border-l-2 border-green-500 pl-4">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Focus</p>
                                        <p className="text-sm font-semibold text-white">{item.overview.focus}</p>
                                    </div>
                                    <div className="border-l-2 border-green-500 pl-4">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">My Role</p>
                                        <p className="text-sm font-semibold text-white">{item.overview.role || item.role}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {item.tags && (
                            <div className="mb-10">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {item.tags.map((tag: string, i: number) => (
                                        <span key={i} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-gray-200 transition-colors flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {item.contributions && (
                            <div className="mb-10 bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-6">
                                    <span className="text-blue-400">☆</span> My Contributions
                                </h3>
                                <ul className="space-y-4">
                                    {item.contributions.map((point: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-200 leading-relaxed">
                                            <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-white/10 flex gap-4">
                            {item.github && (
                                <a href={item.github} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/20 font-medium tracking-wide">
                                    <Github size={18} /> View Repository
                                </a>
                            )}
                            {item.link && (
                                <a href={item.link} target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center gap-2 py-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-colors border border-green-500/30 font-medium tracking-wide">
                                    <ExternalLink size={18} /> Live Deployment
                                </a>
                            )}
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}