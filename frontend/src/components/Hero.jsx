import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Database, Zap, Globe, BarChart3, Brain, Shield } from 'lucide-react';
import Ocean from './Ocean';

export default function Hero() {
    const [currentStat, setCurrentStat] = useState(0);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const stats = [
        { value: "2.5M+", label: "Marine Datasets", icon: Database },
        { value: "15+", label: "Research Institutes", icon: Globe },
        { value: "93.7%", label: "Data Accuracy", icon: Shield },
        { value: "Real-time", label: "Analytics", icon: Zap }
    ];

    const features = [
        "Unified Marine Data Repository",
        "AI-Powered Species Classification", 
        "Real-time Ecosystem Monitoring",
        "eDNA Biodiversity Analysis"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative px-4 pt-20 pb-12 text-center text-white overflow-hidden min-h-screen flex items-center">
            {/* Dynamic Ocean Background */}
            <div className="absolute inset-0 z-0">
                <Ocean className="w-full h-full" style={{ position: 'absolute', inset: 0 }} />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/60" />
            </div>

            {/* Floating Data Particles */}
            {/* <div className="absolute inset-0 z-5">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div> */}

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Status Badge */}
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Ministry of Earth Sciences - National Marine Initiative
                </div> */}

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
                    Project S.A.G.A.R.
                </h1>
                
                {/* Subtitle */}
                <div className="text-xl md:text-2xl text-cyan-100 mb-2 font-light">
                    Smart Agentic Gateway for Aquatic Data, Marine Analytics and Research
                </div>
                <div className="text-lg text-cyan-200/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                    India's first AI-driven unified platform for oceanographic, fisheries, and molecular biodiversity data intelligence
                </div>

                {/* Key Features Ticker */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                        <div className="text-sm text-cyan-200">
                            🌊 {features[currentStat % features.length]}
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <button className="group px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 shadow-xl shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 hover:scale-105">
                        
                        Access VARUN AI
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    {/* <button 
                        onClick={() => setIsVideoModalOpen(true)}
                        className="group px-8 py-4 rounded-2xl font-bold text-cyan-100 border-2 border-cyan-400/40 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-cyan-400/60 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                    >
                        <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Platform Demo
                    </button> */}
                {/* </div>  */}

                {/* Live Statistics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div 
                                key={idx}
                                className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all duration-500 hover:scale-105 ${
                                    currentStat === idx 
                                        ? 'border-cyan-400/50 shadow-lg shadow-cyan-500/20' 
                                        : 'border-white/20'
                                }`}
                            >
                                <Icon className={`w-8 h-8 mx-auto mb-3 ${
                                    currentStat === idx ? 'text-cyan-300' : 'text-cyan-400/70'
                                }`} />
                                <div className={`text-2xl font-bold mb-1 ${
                                    currentStat === idx ? 'text-white' : 'text-cyan-200'
                                }`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-cyan-300/80">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Trusted By Section */}
                <div className="mt-16 text-center">
                    <div className="text-cyan-300/60 text-sm mb-4">Trusted by leading marine research institutions</div>
                    <div className="flex justify-center items-center gap-8 opacity-60">
                        {['CMLRE', 'INCOIS', 'NIO', 'FSI', 'ICAR'].map((org) => (
                            <div key={org} className="text-white font-semibold bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                {org}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Advanced Gradient Overlays */}
            <div className="absolute -inset-x-20 -top-40 h-96 bg-gradient-to-r from-cyan-400/20 via-blue-500/30 to-indigo-600/20 blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -inset-x-20 -bottom-40 h-96 bg-gradient-to-r from-blue-600/20 via-indigo-500/30 to-purple-600/20 blur-3xl pointer-events-none" />

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsVideoModalOpen(false)}>
                    <div className="bg-slate-900 rounded-3xl p-8 max-w-4xl w-full border border-cyan-400/30">
                        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center">
                            <div className="text-center text-cyan-200">
                                <Play className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                                <h3 className="text-xl font-bold mb-2">Platform Demo</h3>
                                <p className="text-sm opacity-80">Interactive walkthrough of S.A.G.A.R. capabilities</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}