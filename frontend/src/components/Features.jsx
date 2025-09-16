import React, { useEffect, useRef } from 'react';
import { Database, Globe, Brain, Activity, Microscope, Shield } from 'lucide-react';

export default function Features() {
    const cardsRef = useRef([]);

    useEffect(() => {
        const nodes = cardsRef.current.filter(Boolean);
        nodes.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.remove('opacity-0', 'translate-y-4');
                el.classList.add('opacity-100', 'translate-y-0');
            }, 120 + idx * 120);
        });
    }, []);

    const features = [
        {
            title: "Unified Data Hub & Governance",
            icon: Database,
            medium: "Comprehensive repository for oceanographic, fisheries, and eDNA datasets with AI-powered metadata management.",
            small: [
                "Multi-format data ingestion (NetCDF, CSV, JSON, Images)",
                "Automated metadata enrichment & quality scoring",
                "Role-based access control & data sovereignty",
                "Blockchain-based provenance tracking",
            ],
            stats: "2.5M+ datasets • 99.9% accuracy"
        },
        {
            title: "Marine Digital Twin & Visualization",
            icon: Globe,
            medium: "Interactive 4D marine ecosystem simulator with real-time visualization and predictive modeling capabilities.",
            small: [
                "Real-time 3D ocean visualization & geospatial mapping",
                "Predictive ecosystem modeling & climate simulation",
                "Multi-layered analysis with 50+ data streams",
                "Scenario exploration & what-if analysis tools",
            ],
            stats: "1km² resolution • 95% prediction accuracy"
        },
        {
            title: "VARUN AI - Intelligent Assistant",
            icon: Brain,
            medium: "Advanced AI that orchestrates workflows, enforces compliance, and provides contextual marine insights.",
            small: [
                "Natural language query processing in 12 languages",
                "Autonomous data pipeline orchestration",
                "Policy compliance monitoring & enforcement",
                "Automated research hypothesis generation",
            ],
            stats: "10K+ queries/day • 94% accuracy"
        },
        {
            title: "Fisheries Intelligence Suite",
            icon: Activity,
            medium: "Comprehensive fisheries management with AI-powered species identification and stock assessment.",
            small: [
                "Real-time catch reporting & validation",
                "AI species identification from images",
                "Stock assessment & quota optimization",
                "Vessel tracking & compliance monitoring",
            ],
            stats: "500+ species • 15K+ vessels tracked"
        },
        {
            title: "Molecular & eDNA Analytics",
            icon: Microscope,
            medium: "Advanced molecular biology platform for biodiversity assessment using environmental DNA analysis.",
            small: [
                "Automated DNA sequence analysis & species matching",
                "Water sample biodiversity identification",
                "Phylogenetic tree construction & population genetics",
                "Integration with global biodiversity databases",
            ],
            stats: "1M+ sequences • 10K+ species database"
        },
        {
            title: "Real-time Monitoring & Alerts",
            icon: Shield,
            medium: "Intelligent monitoring system with predictive alerts for ecosystem health and environmental changes.",
            small: [
                "Multi-parameter sensor network integration",
                "AI-powered anomaly detection algorithms",
                "Early warning system for marine events",
                "Automated compliance & sustainability reporting",
            ],
            stats: "1000+ sensors • 2.3M km² coverage"
        },
    ];

    return (
        <section id="features" className="relative px-5 py-16 bg-gradient-to-b from-slate-900/50 to-slate-800/80">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-4">
                        Ministry of Earth Sciences Initiative
                    </div>
                    <h2 className="text-cyan-300 text-3xl md:text-5xl font-extrabold tracking-wide mb-4">
                        Platform Capabilities
                    </h2>
                    <p className="text-slate-300 mt-3 max-w-3xl mx-auto text-lg leading-relaxed">
                        Built for marine researchers, designed for India's Blue Economy and sustainable ocean management.
                    </p>
                    <div className="mt-6 w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                            <div
                                key={feat.title}
                                ref={el => (cardsRef.current[idx] = el)}
                                className="group rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-6 text-slate-50 transition-all duration-500 opacity-0 translate-y-4 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 hover:border-cyan-500/50 relative overflow-hidden"
                            >
                                {/* Subtle wave background on hover */}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyan-400/5 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 animate-wave"></div>
                                </div>

                                {/* Icon and Title */}
                                <div className="flex items-center gap-3 mb-4 relative">
                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-lg font-bold text-white">{feat.title}</h4>
                                </div>

                                {/* Description */}
                                <p className="text-slate-300 text-sm leading-relaxed mb-4">{feat.medium}</p>

                                {/* Features List */}
                                <ul className="space-y-2 mb-4">
                                    {feat.small.map((point, pointIdx) => (
                                        <li key={pointIdx} className="flex items-start gap-2 text-sm text-slate-400 transition-all duration-300 hover:text-slate-200">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></div>
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                {/* Stats */}
                                <div className="pt-3 border-t border-slate-700 relative">
                                    <div className="text-xs text-cyan-400 font-medium">{feat.stats}</div>
                                </div>

                                {/* Subtle pulse effect */}
                                <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-cyan-400/5 transform -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Simple integration note */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Shield className="w-4 h-4 text-green-400" />
                            ISO 19115 Compliant
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Database className="w-4 h-4 text-blue-400" />
                            FAIR Data Standards
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Globe className="w-4 h-4 text-cyan-400" />
                            International Integration
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes wave {
                    0% { background-position-x: 0px; }
                    100% { background-position-x: 1000px; }
                }
                .animate-wave {
                    animation: wave 8s linear infinite;
                }
            `}</style>
        </section>
    );
}