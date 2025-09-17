import React, { useEffect, useRef } from "react";
import { Database, Globe, Brain, Activity, Microscope, Shield } from 'lucide-react';

export default function Features() {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const nodes = cardsRef.current.filter(Boolean);
    
    // Enhanced staggered animation with better timing
    nodes.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-8", "scale-95");
        el.classList.add("opacity-100", "translate-y-0", "scale-100");
      }, 150 + idx * 100);
    });

    return () => {
      cardsRef.current = [];
    };
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
      stats: "2.5M+ datasets • 99.9% accuracy",
      gradient: "from-blue-500 to-cyan-500"
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
      stats: "1km² resolution • 95% prediction accuracy",
      gradient: "from-emerald-500 to-teal-500"
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
      stats: "10K+ queries/day • 94% accuracy",
      gradient: "from-purple-500 to-indigo-500"
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
      stats: "500+ species • 15K+ vessels tracked",
      gradient: "from-orange-500 to-red-500"
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
      stats: "1M+ sequences • 10K+ species database",
      gradient: "from-pink-500 to-rose-500"
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
      stats: "1000+ sensors • 2.3M km² coverage",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative px-6 py-20 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header */}
        <div className="text-center mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            Ministry of Earth Sciences Initiative
          </div>
          
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Platform Capabilities
          </h2>
          
          <p className="text-slate-300 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
            Built for marine researchers, designed for India's Blue Economy and sustainable ocean management
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group relative rounded-3xl border border-slate-600/40 bg-slate-800/40 backdrop-blur-xl p-8 text-slate-50 transition-all duration-700 opacity-0 translate-y-8 scale-95 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400/60 overflow-hidden"
              >
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-5`}></div>
                </div>

                {/* Your beautiful wave animation - kept untouched */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-sky-400/10 to-transparent"></div>
                  <div
                    className="absolute bottom-0 left-0 w-full h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDIwMCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzNhYWZmIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0wLDEwMCBDMTUwLDUwIDMwMCwxNTAgNDUwLDEwMCBDNjAwLDUwIDc1MCwxNTAgMTAwMCwxMDAgVjIwMCBIMCIgLz48L3N2Zz4=')] bg-repeat-x bg-bottom animate-wave"
                    style={{ animationDuration: "14s" }}
                  ></div>
                  <div
                    className="absolute bottom-2 left-0 w-full h-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDIwMCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzNhYWZmIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0wLDEwMCBDMTUwLDUwIDMwMCwxNTAgNDUwLDEwMCBDNjAwLDUwIDc1MCwxNTAgMTAwMCwxMDAgVjIwMCBIMCIgLz48L3N2Zz4=')] bg-repeat-x bg-bottom animate-wave"
                    style={{ animationDuration: "11s", opacity: 0.7 }}
                  ></div>
                  <div
                    className="absolute bottom-4 left-0 w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDIwMCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzNhYWZmIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0wLDEwMCBDMTUwLDUwIDMwMCwxNTAgNDUwLDEwMCBDNjAwLDUwIDc1MCwxNTAgMTAwMCwxMDAgVjIwMCBIMCIgLz48L3N2Zz4=')] bg-repeat-x bg-bottom animate-wave"
                    style={{ animationDuration: "9s", opacity: 0.5 }}
                  ></div>
                </div>

                {/* Enhanced Icon and Title */}
                <div className="flex items-start gap-4 mb-6 relative">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${feat.gradient} shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {feat.title}
                    </h4>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full group-hover:w-20 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Enhanced Description */}
                <p className="text-slate-300 text-base leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-300">
                  {feat.medium}
                </p>

                {/* Enhanced Features List */}
                <ul className="space-y-3 mb-6">
                  {feat.small.map((point, pointIdx) => (
                    <li 
                      key={pointIdx} 
                      className="flex items-start gap-3 text-sm text-slate-400 transition-all duration-300 hover:text-slate-200 group-hover:translate-x-1"
                      style={{ transitionDelay: `${pointIdx * 30}ms` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Enhanced Stats */}
                <div className="pt-4 border-t border-slate-600/50 relative">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                    <div className="text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                      {feat.stats}
                    </div>
                  </div>
                </div>

                {/* Enhanced pulse effect */}
                <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400/5 to-blue-500/5 transform -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-1000 ease-out"></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Integration Note */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-8 px-10 py-6 rounded-3xl bg-slate-800/60 border border-slate-600/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-medium">ISO 19115 Compliant</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="font-medium">FAIR Data Standards</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-300">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="font-medium">International Integration</span>
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
          animation: wave linear infinite;
        }
      `}</style>
    </section>
  );
}