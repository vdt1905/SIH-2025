import React, { useState, useEffect } from 'react';
import { Search, Database, Waves, Fish, Dna, Globe, Bell, User, Menu, X, BotIcon } from 'lucide-react';
import logo from "../assets/DOMinators.jpg";
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="mx-auto max-w-7xl px-6">
                <nav className={`mt-3 flex items-center justify-between rounded-2xl border transition-all duration-500 px-6 py-3 ${isScrolled
                    ? 'border-cyan-400/30 bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-cyan-500/10'
                    : 'border-white/20 bg-slate-900/70 backdrop-blur-md'
                    }`}>
                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {/* Logo Image */}
                            <img
                                src={logo}
                                alt="Project Logo"
                                className="h-12 w-12 rounded-xl object-cover shadow-lg shadow-blue-500/50"
                            />

                            {/* Animated glow effect */}
                            {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-300 to-blue-400 opacity-0 animate-pulse" /> */}
                        </div>

                        <div>
                            <nav className=" p-4 cursor-pointer">
                                <span
                                    className="font-black text-xl text-white tracking-wide"
                                    onClick={() => navigate("/")}
                                >
                                    DOMinators
                                </span>
                            </nav>
                            {/* <div className="text-xs text-cyan-300 font-medium">Marine Data Intelligence</div> */}
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                   <div className="hidden lg:flex items-center gap-8">
  <NavLink icon={Database} href="/data" label="Data Hub" />
  <NavLink icon={Waves} href="/oceanography" label="Oceanography" />
  <NavLink icon={Fish} href="/fisheries" label="Fisheries" />
  <NavLink icon={Dna} href="/edna" label="eDNA Portal" />
  <NavLink icon={Globe} href="/marine" label="Digital Twin" />
  <NavLink icon={BotIcon} href="/analytics" label="VARUN" />

  {/* User Initial Avatar */}
  <a
  href="https://www.linkedin.com/in/nisarg-vashi-b05211282/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 text-white font-bold hover:bg-blue-700 transition"
>
  N
</a>
</div>



                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Global Search */}


                        {/* Notifications */}
                        {/* <div className="relative">
                            <Bell className="w-5 h-5 text-cyan-300 hover:text-white cursor-pointer transition-colors" />
                            {notifications > 0 && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                                    {notifications}
                                </div>
                            )}
                        </div> */}

                        {/* User Profile */}


                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/20 hover:border-cyan-400/50 transition-all"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-2 rounded-2xl border border-white/20 bg-slate-900/95 backdrop-blur-xl p-6 animate-in slide-in-from-top duration-300">
                        <div className="space-y-4">
                            <MobileNavLink icon={Database} href="/data" label="Data Hub" />
                            <MobileNavLink icon={Waves} href="/oceanography" label="Oceanography" />
                            <MobileNavLink icon={Fish} href="/fisheries" label="Fisheries" />
                            <MobileNavLink icon={Dna} href="/edna" label="eDNA Portal" />
                            <MobileNavLink icon={Globe} href="/marine" label="Digital Twin" />
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/20">
                            <button className="w-full px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25">
                                Access VARUN AI
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

function NavLink({ icon: Icon, href, label }) {
    return (
        <a
            href={href}
            className="flex items-center gap-2 text-cyan-200 hover:text-white transition-all duration-300 group"
        >
            <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">{label}</span>
        </a>
    );
}

function MobileNavLink({ icon: Icon, href, label }) {
    return (
        <a
            href={href}
            className="flex items-center gap-3 text-cyan-200 hover:text-white transition-all duration-300 group py-2"
        >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{label}</span>
        </a>
    );
}