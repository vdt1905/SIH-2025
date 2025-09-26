import React from 'react';
import { Globe, Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink, Shield, Award, Users, Database } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="relative mt-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
            {/* Wave animation at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-pulse"></div>
            
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            
                            <div>
                                <span className="font-black text-2xl text-white tracking-wide">S.A.G.A.R.</span>
                                <div className="text-xs text-cyan-300 font-medium">Marine Data Intelligence</div>
                            </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            India's pioneering AI-driven marine data platform, empowering sustainable ocean research and blue economy initiatives.
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                <div className="text-cyan-400 font-bold text-lg">2.5M+</div>
                                <div className="text-slate-400 text-xs">Datasets</div>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                <div className="text-emerald-400 font-bold text-lg">99.9%</div>
                                <div className="text-slate-400 text-xs">Uptime</div>
                            </div>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Database className="w-4 h-4 text-cyan-400" />
                            Platform
                        </h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="/data" text="Unified Data Hub" isNew /></li>
                            <li><FooterLink href="/oceanography" text="Oceanographic Analysis" /></li>
                            <li><FooterLink href="/fisheries" text="Fisheries Intelligence" /></li>
                            <li><FooterLink href="/edna" text="eDNA & Molecular Data" isNew /></li>
                            <li><FooterLink href="/marine" text="Marine Digital Twin" isNew /></li>
                            <li><FooterLink href="/analytics" text="VARUN AI Assistant" /></li>
                        </ul>
                    </div>

                    {/* Research & Collaboration */}
                    {/* <div>
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Users className="w-4 h-4 text-emerald-400" />
                            Research & Partners
                        </h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="#documentation" text="API Documentation" external /></li>
                            <li><FooterLink href="#research-papers" text="Research Publications" /></li>
                            <li><FooterLink href="#case-studies" text="Case Studies" /></li>
                            <li><FooterLink href="#collaborations" text="Institutional Partners" /></li>
                            <li><FooterLink href="#training" text="Training Programs" isNew /></li>
                            <li><FooterLink href="#support" text="Developer Support" /></li>
                        </ul>
                    </div> */}

                    {/* Contact & Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-400" />
                            Contact & Info
                        </h4>
                        
                        {/* Contact Information */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                <span>CMLRE, Kochi, Kerala, India</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <a href="mailto:sagar@cmlre.gov.in" className="hover:text-white transition-colors">
                                    sagar@cmlre.gov.in
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-300">
                                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                <span>+91-8140531884</span>
                            </div>
                        </div>

                        {/* Legal Links */}
                        
                    </div>
                </div>

                {/* Ministry & Certifications */}
                <div className="border-t border-slate-700/50 pt-8 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                Government of India Initiative
                            </h5>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                An official project under the Ministry of Earth Sciences, supporting India's Blue Economy 
                                vision and sustainable marine resource management through advanced AI and data science.
                            </p>
                        </div>
                        
                        {/* Certifications & Compliance */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <CertificationBadge icon={Shield} text="ISO 27001" color="emerald" />
                            <CertificationBadge icon={Award} text="GDPR Ready" color="blue" />
                            <CertificationBadge icon={Database} text="FAIR Data" color="cyan" />
                            <CertificationBadge icon={Globe} text="Open Science" color="indigo" />
                        </div>
                    </div>
                </div>

                {/* Social Media & Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-700/50">
                   
                    
                    <div className="text-center md:text-right">
                        <p className="text-slate-400 text-sm">
                            © {currentYear} Project S.A.G.A.R. | Ministry of Earth Sciences
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                            Powered by Centre for Marine Living Resources and Ecology (CMLRE)
                        </p>
                    </div>
                </div>

                {/* Innovation Badge */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm">
                        <Award className="w-4 h-4" />
                        National Innovation in Marine Data Science
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse ml-1"></div>
                    </div>
                </div>
            </div>

            {/* Animated background elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-indigo-500/10 animate-wave"></div>
                <div className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-400/10 via-indigo-500/10 to-purple-500/10 animate-wave" style={{animationDelay: '1s'}}></div>
            </div>

            <style>{`
                @keyframes wave {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-wave {
                    animation: wave 8s linear infinite;
                }
            `}</style>
        </footer>
    );
}

function FooterLink({ href, text, external, isNew }) {
    return (
        <a 
            href={href} 
            className="text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
        >
            {text}
            {external && <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />}
            {isNew && (
                <span className="bg-emerald-500/20 text-emerald-400 text-xs px-1.5 py-0.5 rounded-full font-medium">
                    New
                </span>
            )}
        </a>
    );
}

function SocialLink({ href, icon: Icon, label }) {
    return (
        <a 
            href={href} 
            className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400/50 hover:bg-slate-700 transition-all duration-300"
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}

function CertificationBadge({ icon: Icon, text, color }) {
    const colorClasses = {
        emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
        blue: 'border-blue-400/30 bg-blue-400/10 text-blue-400',
        cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-400',
        indigo: 'border-indigo-400/30 bg-indigo-400/10 text-indigo-400'
    };

    return (
        <div className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${colorClasses[color]} backdrop-blur-sm`}>
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{text}</span>
        </div>
    );
}