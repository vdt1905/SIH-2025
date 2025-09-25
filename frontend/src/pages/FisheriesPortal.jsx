import React, { useState, useEffect, useRef } from 'react';
import { 
    Database, Activity, AlertTriangle, BarChart3, Fish, Ship,
    Search, Upload, Download, RefreshCw, Eye, Edit, Trash2, Plus,
    MapPin, Calendar, TrendingUp, TrendingDown, CheckCircle, XCircle,
    Filter, Settings, FileText, Zap, Globe, Navigation, Anchor,
    Users, Scale, Target, Camera, Bell, X, Wifi, WifiOff, Brain,
    Microscope, LineChart, PieChart, Monitor, Satellite, FlaskConical
} from 'lucide-react';
import Navbar from '../components/Navbar';
import VarunAIAgent from '../components/VarunAIAgent';

// Navbar Component


export default function FisheriesPortal() {
    const [selectedAnalysis, setSelectedAnalysis] = useState('Stock Assessment');
    const [isVarunOpen, setIsVarunOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState('Arabian Sea');
    const [timeFilter, setTimeFilter] = useState('Last 30 Days');
    const [vesselFilter, setVesselFilter] = useState('All Vessels');
    const [selectedCatches, setSelectedCatches] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isTracking, setIsTracking] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState('connected');
    const [alertCount, setAlertCount] = useState(3);

    // Mock fishing vessel data with enhanced CMLRE-specific attributes
    const fishingVessels = [
        {
            id: 'IND-KL-2341',
            name: 'Matsya Kiran',
            type: 'Trawler',
            location: 'Arabian Sea Sector AS-12',
            coordinates: '15.2500°N, 72.8500°E',
            lastCatch: '2024-04-26 08:30:00',
            captain: 'Capt. Ravi Kumar',
            crew: 12,
            totalCatch: 2480,
            primarySpecies: 'Yellowfin Tuna',
            status: 'fishing',
            license: 'Valid until 2025-03-15',
            compliance: 98.5,
            vesselLength: '24.5m',
            enginePower: '450HP',
            gearType: 'Long Line',
            homePort: 'Kochi',
            lastInspection: '2024-02-10',
            sustainabilityScore: 'A+',
            quotaUtilization: 62.3,
            ais_signal: 'strong',
            vms_status: 'active'
        },
        {
            id: 'IND-TN-1872',
            name: 'Ocean Pride',
            type: 'Purse Seiner',
            location: 'Bay of Bengal Sector BB-08',
            coordinates: '13.0800°N, 80.2700°E',
            lastCatch: '2024-04-26 07:45:00',
            captain: 'Capt. S. Murugan',
            crew: 18,
            totalCatch: 4250,
            primarySpecies: 'Oil Sardine',
            status: 'returning',
            license: 'Valid until 2024-12-20',
            compliance: 94.2,
            vesselLength: '32.0m',
            enginePower: '680HP',
            gearType: 'Purse Seine',
            homePort: 'Chennai',
            lastInspection: '2024-01-28',
            sustainabilityScore: 'A',
            quotaUtilization: 78.9,
            ais_signal: 'strong',
            vms_status: 'active'
        },
        {
            id: 'IND-GJ-0934',
            name: 'Sagar Ratna',
            type: 'Gillnetter',
            location: 'Gujarat Coast Sector GJ-03',
            coordinates: '22.4700°N, 68.7800°E',
            lastCatch: '2024-04-26 06:15:00',
            captain: 'Capt. Dhiraj Patel',
            crew: 8,
            totalCatch: 1650,
            primarySpecies: 'Silver Pomfret',
            status: 'fishing',
            license: 'Valid until 2025-06-10',
            compliance: 91.8,
            vesselLength: '18.2m',
            enginePower: '320HP',
            gearType: 'Gill Net',
            homePort: 'Veraval',
            lastInspection: '2024-03-05',
            sustainabilityScore: 'B+',
            quotaUtilization: 59.3,
            ais_signal: 'medium',
            vms_status: 'active'
        },
        {
            id: 'IND-KA-1456',
            name: 'Coastal Star',
            type: 'Long Liner',
            location: 'Karnataka Coast Sector KA-06',
            coordinates: '14.8500°N, 74.1200°E',
            lastCatch: '2024-04-26 09:20:00',
            captain: 'Capt. Santosh Rao',
            crew: 15,
            totalCatch: 1890,
            primarySpecies: 'Indian Mackerel',
            status: 'anchored',
            license: 'Renewal Due - 2024-05-01',
            compliance: 87.3,
            vesselLength: '22.8m',
            enginePower: '420HP',
            gearType: 'Long Line',
            homePort: 'Mangalore',
            lastInspection: '2023-11-15',
            sustainabilityScore: 'B',
            quotaUtilization: 45.7,
            ais_signal: 'weak',
            vms_status: 'intermittent'
        },
        {
            id: 'IND-WB-2198',
            name: 'Bay Explorer',
            type: 'Multi-day Trawler',
            location: 'West Bengal Coast Sector WB-11',
            coordinates: '21.6800°N, 88.1200°E',
            lastCatch: '2024-04-26 05:30:00',
            captain: 'Capt. Bijoy Das',
            crew: 22,
            totalCatch: 3420,
            primarySpecies: 'Hilsa Shad',
            status: 'fishing',
            license: 'Valid until 2025-01-25',
            compliance: 96.7,
            vesselLength: '28.5m',
            enginePower: '550HP',
            gearType: 'Trawl Net',
            homePort: 'Kolkata',
            lastInspection: '2024-02-20',
            sustainabilityScore: 'A',
            quotaUtilization: 77.5,
            ais_signal: 'strong',
            vms_status: 'active'
        }
    ];

    // Enhanced fish catch data with CMLRE scientific attributes
    const catchData = [
        {
            id: 'C-001',
            vesselId: 'IND-KL-2341',
            species: 'Yellowfin Tuna',
            scientificName: 'Thunnus albacares',
            weight: 450,
            length: 180,
            age: 8,
            sex: 'Female',
            catchTime: '2024-04-26 08:30:00',
            location: '15.2500°N, 72.8500°E',
            depth: '120m',
            method: 'Long Line',
            condition: 'Fresh',
            marketPrice: 850,
            sustainabilityRating: 'Moderate',
            quota: 2000,
            used: 1245,
            tissuesSampled: true,
            geneticSample: true,
            otolithExtracted: true,
            stomachContent: 'Analyzed',
            maturityStage: 'Adult',
            parasiteLoad: 'Low',
            lipidContent: '12.5%',
            proteinContent: '24.8%'
        },
        {
            id: 'C-002',
            vesselId: 'IND-TN-1872',
            species: 'Oil Sardine',
            scientificName: 'Sardinella longiceps',
            weight: 1200,
            length: 15,
            age: 2,
            sex: 'Mixed',
            catchTime: '2024-04-26 07:45:00',
            location: '13.0800°N, 80.2700°E',
            depth: '45m',
            method: 'Purse Seine',
            condition: 'Fresh',
            marketPrice: 180,
            sustainabilityRating: 'Good',
            quota: 5000,
            used: 3250,
            tissuesSampled: true,
            geneticSample: false,
            otolithExtracted: true,
            stomachContent: 'Plankton',
            maturityStage: 'Juvenile',
            parasiteLoad: 'Medium',
            lipidContent: '8.2%',
            proteinContent: '19.6%'
        },
        {
            id: 'C-003',
            vesselId: 'IND-GJ-0934',
            species: 'Silver Pomfret',
            scientificName: 'Pampus argenteus',
            weight: 680,
            length: 35,
            age: 5,
            sex: 'Male',
            catchTime: '2024-04-26 06:15:00',
            location: '22.4700°N, 68.7800°E',
            depth: '80m',
            method: 'Gill Net',
            condition: 'Fresh',
            marketPrice: 1200,
            sustainabilityRating: 'Moderate',
            quota: 1500,
            used: 890,
            tissuesSampled: true,
            geneticSample: true,
            otolithExtracted: true,
            stomachContent: 'Small fish',
            maturityStage: 'Adult',
            parasiteLoad: 'Low',
            lipidContent: '6.8%',
            proteinContent: '18.9%'
        },
        {
            id: 'C-004',
            vesselId: 'IND-KA-1456',
            species: 'Indian Mackerel',
            scientificName: 'Rastrelliger kanagurta',
            weight: 320,
            length: 22,
            age: 3,
            sex: 'Female',
            catchTime: '2024-04-26 09:20:00',
            location: '14.8500°N, 74.1200°E',
            depth: '35m',
            method: 'Purse Seine',
            condition: 'Fresh',
            marketPrice: 220,
            sustainabilityRating: 'Good',
            quota: 3000,
            used: 2100,
            tissuesSampled: false,
            geneticSample: false,
            otolithExtracted: true,
            stomachContent: 'Copepods',
            maturityStage: 'Mature',
            parasiteLoad: 'Medium',
            lipidContent: '7.5%',
            proteinContent: '20.1%'
        },
        {
            id: 'C-005',
            vesselId: 'IND-WB-2198',
            species: 'Hilsa Shad',
            scientificName: 'Tenualosa ilisha',
            weight: 180,
            length: 40,
            age: 6,
            sex: 'Female',
            catchTime: '2024-04-26 05:30:00',
            location: '21.6800°N, 88.1200°E',
            depth: '25m',
            method: 'Gill Net',
            condition: 'Fresh',
            marketPrice: 950,
            sustainabilityRating: 'Vulnerable',
            quota: 800,
            used: 620,
            tissuesSampled: true,
            geneticSample: true,
            otolithExtracted: true,
            stomachContent: 'Detritus',
            maturityStage: 'Spawning',
            parasiteLoad: 'High',
            lipidContent: '15.2%',
            proteinContent: '18.7%'
        }
    ];

    // Enhanced species stock data with MSY and ecosystem indicators
    const stockData = [
        { 
            species: 'Yellowfin Tuna', 
            currentStock: 85, 
            optimalStock: 100, 
            trend: 'declining', 
            msy: 1200, 
            bmsy: 8500,
            currentBiomass: 7225,
            fishingMortality: 0.45,
            naturalMortality: 0.18,
            recruitmentRate: 1.2,
            ecosystemRole: 'Top predator',
            threatenedStatus: 'Near Threatened'
        },
        { 
            species: 'Oil Sardine', 
            currentStock: 120, 
            optimalStock: 100, 
            trend: 'stable', 
            msy: 2500,
            bmsy: 12000,
            currentBiomass: 14400,
            fishingMortality: 0.32,
            naturalMortality: 0.55,
            recruitmentRate: 2.8,
            ecosystemRole: 'Forage fish',
            threatenedStatus: 'Least Concern'
        },
        { 
            species: 'Indian Mackerel', 
            currentStock: 95, 
            optimalStock: 100, 
            trend: 'stable', 
            msy: 1800,
            bmsy: 9500,
            currentBiomass: 9025,
            fishingMortality: 0.38,
            naturalMortality: 0.48,
            recruitmentRate: 1.9,
            ecosystemRole: 'Mid-level predator',
            threatenedStatus: 'Least Concern'
        },
        { 
            species: 'Silver Pomfret', 
            currentStock: 65, 
            optimalStock: 100, 
            trend: 'declining', 
            msy: 800,
            bmsy: 4200,
            currentBiomass: 2730,
            fishingMortality: 0.52,
            naturalMortality: 0.25,
            recruitmentRate: 0.8,
            ecosystemRole: 'Demersal predator',
            threatenedStatus: 'Vulnerable'
        },
        { 
            species: 'Hilsa Shad', 
            currentStock: 45, 
            optimalStock: 100, 
            trend: 'critical', 
            msy: 600,
            bmsy: 3500,
            currentBiomass: 1575,
            fishingMortality: 0.68,
            naturalMortality: 0.35,
            recruitmentRate: 0.6,
            ecosystemRole: 'Anadromous species',
            threatenedStatus: 'Endangered'
        }
    ];

    // Real-time alerts for fisheries management
    const fisheriesAlerts = [
        {
            id: 1,
            type: 'quota_exceeded',
            severity: 'high',
            species: 'Hilsa Shad',
            location: 'Bay of Bengal',
            message: 'Quota utilization at 77.5% - approaching limit',
            vessel: 'IND-WB-2198',
            timestamp: '2024-04-26 09:45:00',
            status: 'active',
            action_required: 'Reduce fishing effort'
        },
        {
            id: 2,
            type: 'license_renewal',
            severity: 'medium',
            species: 'All',
            location: 'Karnataka Coast',
            message: 'Vessel license renewal due in 5 days',
            vessel: 'IND-KA-1456',
            timestamp: '2024-04-26 08:20:00',
            status: 'pending',
            action_required: 'Submit renewal documents'
        },
        {
            id: 3,
            type: 'compliance_issue',
            severity: 'low',
            species: 'Silver Pomfret',
            location: 'Gujarat Coast',
            message: 'AIS signal strength below optimal - check equipment',
            vessel: 'IND-GJ-0934',
            timestamp: '2024-04-26 07:30:00',
            status: 'monitoring',
            action_required: 'Equipment inspection recommended'
        }
    ];

    // Effect hooks for real-time updates
    useEffect(() => {
        if (!isTracking) return;
        
        const interval = setInterval(() => {
            // Simulate real-time vessel position updates
            setTimeFilter(prev => prev);
        }, 15000);

        return () => clearInterval(interval);
    }, [isTracking]);

    useEffect(() => {
        // Simulate alert updates
        const alertInterval = setInterval(() => {
            setAlertCount(prev => Math.max(1, prev + (Math.random() > 0.7 ? 1 : -1)));
        }, 30000);

        return () => clearInterval(alertInterval);
    }, []);

    const handleCatchSelect = (id) => {
        setSelectedCatches(prev => 
            prev.includes(id) 
                ? prev.filter(catchId => catchId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAllCatches = () => {
        const filteredCatches = getFilteredCatches();
        if (selectedCatches.length === filteredCatches.length) {
            setSelectedCatches([]);
        } else {
            setSelectedCatches(filteredCatches.map(catch_ => catch_.id));
        }
    };

    const handleAnalyzeFisheries = async () => {
        setIsAnalyzing(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsAnalyzing(false);
        setShowModal(true);
        setModalType('analysis_complete');
    };

    const handleExportData = () => {
        const selectedData = selectedCatches.length > 0 
            ? catchData.filter(catch_ => selectedCatches.includes(catch_.id))
            : catchData;
            
        const csvContent = [
            Object.keys(selectedData[0]).join(','),
            ...selectedData.map(row => Object.values(row).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fisheries_data_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getFilteredCatches = () => {
        return catchData.filter(catch_ => {
            const matchesSearch = searchTerm === '' || 
                Object.values(catch_).some(value => 
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            return matchesSearch;
        });
    };

    const getFilteredVessels = () => {
        return fishingVessels.filter(vessel => {
            if (vesselFilter === 'All Vessels') return true;
            if (vesselFilter === 'Active') return vessel.status === 'fishing';
            if (vesselFilter === 'Returning') return vessel.status === 'returning';
            if (vesselFilter === 'Anchored') return vessel.status === 'anchored';
            return true;
        });
    };

    const getSustainabilityColor = (rating) => {
        switch (rating) {
            case 'Good': return 'text-green-400';
            case 'Moderate': return 'text-yellow-400';
            case 'Vulnerable': return 'text-orange-400';
            case 'Critical': return 'text-red-400';
            default: return 'text-slate-400';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'fishing': return 'text-green-400';
            case 'returning': return 'text-blue-400';
            case 'anchored': return 'text-yellow-400';
            default: return 'text-slate-400';
        }
    };

    const getAlertColor = (severity) => {
        switch (severity) {
            case 'high': return 'bg-red-500/20 border-red-500/30 text-red-400';
            case 'medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
            case 'low': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
            default: return 'bg-slate-500/20 border-slate-500/30 text-slate-400';
        }
    };

    const filteredCatches = getFilteredCatches();
    const filteredVessels = getFilteredVessels();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-7">
            <Navbar />
            <VarunAIAgent 
    isOpen={isVarunOpen} 
    onToggle={() => setIsVarunOpen(!isVarunOpen)}
    currentPage="fisheries" // or "oceanography", "edna", "digital_twin", etc.
/>
            
            <div className="pt-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-6">
                        {/* Enhanced Sidebar */}
                        <div className="w-64 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 h-fit">
                            <div className="flex items-center gap-3 mb-8">
                                
                                <div>
                                    <div className="text-white font-bold">Team DOMInators</div>
                                    <div className="text-slate-400 text-xs">CMLRE Fisheries Intelligence</div>
                                </div>
                            </div>

                            <div className="mb-8">
                                
                            </div>

                            <div className="space-y-4">
                                <StatCard label="Active Vessels" value={fishingVessels.filter(v => v.status === 'fishing').length} />
                                <StatCard label="Total Catch Today" value="12.5T" />
                                <StatCard label="Species Monitored" value={stockData.length} />
                                <StatCard label="Compliance Rate" value="94.3%" />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                    <div className="text-orange-400 text-sm font-medium">
                                        {connectionStatus === 'connected' ? 'Live Data Stream' : 'Offline Mode'}
                                    </div>
                                </div>
                                <div className="text-slate-400 text-xs mb-4">CMLRE Marine Data Platform</div>
                                <button 
                                    onClick={() => setConnectionStatus(connectionStatus === 'connected' ? 'disconnected' : 'connected')}
                                    className="w-full px-3 py-2 bg-orange-500/20 text-orange-300 rounded-lg text-xs hover:bg-orange-500/30 transition-colors flex items-center justify-center gap-2"
                                >
                                    {connectionStatus === 'connected' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                                    {connectionStatus === 'connected' ? 'Connected' : 'Reconnect'}
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Enhanced Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-500/20 rounded-xl">
                                            <Fish className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white">Fisheries Intelligence Portal</h1>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                                            <Bell className="w-4 h-4 text-yellow-400" />
                                            <span className="text-white text-sm">{alertCount} alerts</span>
                                        </div>
                                        <button 
                                            onClick={() => setIsTracking(!isTracking)}
                                            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                                                isTracking 
                                                    ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                                                    : 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30'
                                            }`}
                                        >
                                            {isTracking ? 'Live Tracking' : 'Paused'}
                                        </button>
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('settings');}}
                                            className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-slate-300">Integrated fisheries management and marine living resources assessment platform</p>
                                
                                <div className="mt-4 bg-slate-700 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">CMLRE • Ministry of Earth Sciences • {filteredCatches.length} catch records analyzed</div>
                            </div>

                            {/* Enhanced Control Panel */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Analysis Type</label>
                                        <select 
                                            value={selectedAnalysis}
                                            onChange={(e) => setSelectedAnalysis(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 transition-colors"
                                        >
                                            <option>Stock Assessment</option>
                                            <option>Vessel Tracking</option>
                                            <option>Catch Analysis</option>
                                            <option>Quota Management</option>
                                            <option>Compliance Monitoring</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Region</label>
                                        <select 
                                            value={selectedRegion}
                                            onChange={(e) => setSelectedRegion(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 transition-colors"
                                        >
                                            <option>Arabian Sea</option>
                                            <option>Bay of Bengal</option>
                                            <option>Lakshadweep Sea</option>
                                            <option>Andaman Sea</option>
                                            <option>All Regions</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Time Period</label>
                                        <select 
                                            value={timeFilter}
                                            onChange={(e) => setTimeFilter(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 transition-colors"
                                        >
                                            <option>Last 24 Hours</option>
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                            <option>Last Quarter</option>
                                            <option>Custom Range</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Vessel Filter</label>
                                        <select 
                                            value={vesselFilter}
                                            onChange={(e) => setVesselFilter(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 transition-colors"
                                        >
                                            <option>All Vessels</option>
                                            <option>Active</option>
                                            <option>Returning</option>
                                            <option>Anchored</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Search</label>
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Search vessels, species..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400 focus:border-orange-400 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Dashboard Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                {/* Stock Assessment Chart */}
                                <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-orange-400" />
                                            Stock Assessment Overview
                                        </h3>
                                        <button 
                                            onClick={handleAnalyzeFisheries}
                                            disabled={isAnalyzing}
                                            className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-lg text-sm hover:bg-orange-500/30 transition-colors disabled:opacity-50"
                                        >
                                            {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-5 gap-4 mb-4">
                                        {stockData.map((stock, index) => (
                                            <div key={index} className="text-center">
                                                <div className="text-xs text-slate-400 mb-1">{stock.species}</div>
                                                <div className={`text-2xl font-bold mb-1 ${
                                                    stock.currentStock < 50 ? 'text-red-400' : 
                                                    stock.currentStock < 80 ? 'text-yellow-400' : 'text-green-400'
                                                }`}>
                                                    {stock.currentStock}%
                                                </div>
                                                <div className="w-full bg-slate-700 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full transition-all duration-500 ${
                                                            stock.currentStock < 50 ? 'bg-red-400' : 
                                                            stock.currentStock < 80 ? 'bg-yellow-400' : 'bg-green-400'
                                                        }`}
                                                        style={{ width: `${stock.currentStock}%` }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-slate-400 mt-1">
                                                    {stock.trend === 'declining' ? '↘' : stock.trend === 'stable' ? '→' : '↗'} {stock.trend}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="text-xs text-slate-400 mb-2">Stock levels relative to Maximum Sustainable Yield (MSY)</div>
                                </div>

                                {/* Live Alerts */}
                                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                            Live Alerts
                                        </h3>
                                        <span className="text-xs text-slate-400">Real-time</span>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {fisheriesAlerts.map(alert => (
                                            <div key={alert.id} className={`p-3 rounded-lg border text-xs ${getAlertColor(alert.severity)}`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="font-medium">{alert.vessel}</div>
                                                    <div className="text-xs bg-black/20 px-2 py-1 rounded uppercase">
                                                        {alert.severity}
                                                    </div>
                                                </div>
                                                <div className="mb-2">{alert.message}</div>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</div>
                                                    <div className="text-xs opacity-80">{alert.action_required}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Vessel Tracking Dashboard */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                {/* Active Vessels */}
                                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Ship className="w-5 h-5 text-blue-400" />
                                            Active Vessels ({filteredVessels.length})
                                        </h3>
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('vessel_map');}}
                                            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                                        >
                                            Map View
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {filteredVessels.map(vessel => (
                                            <div key={vessel.id} className="bg-slate-700/30 rounded-lg p-3 cursor-pointer hover:bg-slate-700/50 transition-colors"
                                                onClick={() => {setShowModal(true); setModalType('vessel_detail'); window.selectedVessel = vessel;}}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="font-medium text-white">{vessel.name}</div>
                                                    <div className={`text-xs px-2 py-1 rounded ${
                                                        vessel.status === 'fishing' ? 'bg-green-500/20 text-green-400' :
                                                        vessel.status === 'returning' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                        {vessel.status}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                                                    <div>ID: {vessel.id}</div>
                                                    <div>Type: {vessel.type}</div>
                                                    <div>Catch: {vessel.totalCatch}kg</div>
                                                    <div>Species: {vessel.primarySpecies}</div>
                                                </div>
                                                <div className="text-xs text-slate-400 mt-2">
                                                    {vessel.coordinates} • Compliance: {vessel.compliance}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Species Composition */}
                                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <PieChart className="w-5 h-5 text-purple-400" />
                                            Species Composition
                                        </h3>
                                        <span className="text-xs text-slate-400">Today's catch</span>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {stockData.map((species, index) => {
                                            const percentage = ((species.currentBiomass / stockData.reduce((sum, s) => sum + s.currentBiomass, 0)) * 100);
                                            return (
                                                <div key={index} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-3 h-3 rounded-full ${
                                                            index === 0 ? 'bg-red-400' : 
                                                            index === 1 ? 'bg-blue-400' : 
                                                            index === 2 ? 'bg-green-400' : 
                                                            index === 3 ? 'bg-orange-400' : 'bg-purple-400'
                                                        }`}></div>
                                                        <span className="text-slate-300 text-sm">{species.species}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-white font-medium text-sm">{percentage.toFixed(1)}%</div>
                                                        <div className="text-xs text-slate-400">{species.msy}T MSY</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-slate-700">
                                        <div className="text-xs text-slate-400 mb-2">Sustainability Status</div>
                                        <div className="space-y-2">
                                            {stockData.map((species, index) => (
                                                <div key={index} className="flex items-center justify-between text-xs">
                                                    <span className="text-slate-300">{species.species}</span>
                                                    <span className={`font-medium ${
                                                        species.threatenedStatus === 'Least Concern' ? 'text-green-400' :
                                                        species.threatenedStatus === 'Near Threatened' ? 'text-yellow-400' :
                                                        species.threatenedStatus === 'Vulnerable' ? 'text-orange-400' :
                                                        'text-red-400'
                                                    }`}>
                                                        {species.threatenedStatus}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Catch Data Table */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-6">
                                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Database className="w-5 h-5 text-green-400" />
                                        Catch Records & Analysis
                                        <span className="text-sm font-normal text-slate-400">({filteredCatches.length} records)</span>
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={handleExportData}
                                            className="px-3 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-colors flex items-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Export ({selectedCatches.length || filteredCatches.length})
                                        </button>
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('scientific_analysis');}}
                                            className="px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm hover:bg-purple-500/30 transition-colors flex items-center gap-2"
                                        >
                                            <FlaskConical className="w-4 h-4" />
                                            Scientific Analysis
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-700/30">
                                            <tr>
                                                <th className="px-4 py-3 text-left">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedCatches.length === filteredCatches.length && filteredCatches.length > 0}
                                                        onChange={handleSelectAllCatches}
                                                        className="rounded border-slate-600 bg-slate-700 text-orange-500"
                                                    />
                                                </th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Vessel ID</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Species</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Scientific Name</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Weight (kg)</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Length (cm)</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Location</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Sustainability</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCatches.map((catch_, index) => (
                                                <tr key={catch_.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedCatches.includes(catch_.id)}
                                                            onChange={() => handleCatchSelect(catch_.id)}
                                                            className="rounded border-slate-600 bg-slate-700 text-orange-500"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm font-mono">{catch_.vesselId}</td>
                                                    <td className="px-4 py-3 text-white text-sm font-medium">{catch_.species}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm italic">{catch_.scientificName}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{catch_.weight}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{catch_.length}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{catch_.location}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`text-sm font-medium ${getSustainabilityColor(catch_.sustainabilityRating)}`}>
                                                            {catch_.sustainabilityRating}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => {
                                                                    setShowModal(true); 
                                                                    setModalType('catch_detail'); 
                                                                    window.selectedCatch = catch_;
                                                                }}
                                                                className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {
                                                                    setShowModal(true); 
                                                                    setModalType('morphometric_analysis'); 
                                                                    window.selectedCatch = catch_;
                                                                }}
                                                                className="p-1 text-slate-400 hover:text-purple-400 transition-colors"
                                                                title="Morphometric Analysis"
                                                            >
                                                                <Microscope className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {
                                                                    setShowModal(true); 
                                                                    setModalType('genetic_analysis'); 
                                                                    window.selectedCatch = catch_;
                                                                }}
                                                                className="p-1 text-slate-400 hover:text-green-400 transition-colors"
                                                                title="Genetic Analysis"
                                                            >
                                                                <FlaskConical className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700">
                                    <div className="text-sm text-slate-400">
                                        Showing {filteredCatches.length} of {catchData.length} catch records
                                        {selectedCatches.length > 0 && (
                                            <span className="ml-2 text-orange-400">
                                                ({selectedCatches.length} selected)
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-sm hover:bg-slate-600/50 transition-colors">
                                            Previous
                                        </button>
                                        <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded text-sm">1</span>
                                        <button className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-sm hover:bg-slate-600/50 transition-colors">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* CMLRE Footer */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('cmlre_info');}}>
                                    <div className="text-cyan-400 font-medium mb-1">CMLRE Integration</div>
                                    <div className="text-slate-400 text-sm">Centre for Marine Living Resources and Ecology</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('moes_info');}}>
                                    <div className="text-orange-400 font-medium mb-1">MoES Platform</div>
                                    <div className="text-slate-400 text-sm">Ministry of Earth Sciences Data Hub</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('api_docs');}}>
                                    <div className="text-green-400 font-medium mb-1">API Documentation</div>
                                    <div className="text-slate-400 text-sm">Developer Resources & Integration</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('team_dominators');}}>
                                    <div className="text-purple-400 font-medium mb-1">Team DOMInators</div>
                                    <div className="text-slate-400 text-sm">SIH 2024 Innovation Team</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Modal System */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                {modalType === 'analysis_complete' && 'Fisheries Analysis Complete'}
                                {modalType === 'vessel_detail' && 'Vessel Detailed Information'}
                                {modalType === 'catch_detail' && 'Catch Record Analysis'}
                                {modalType === 'morphometric_analysis' && 'Morphometric & Otolith Analysis'}
                                {modalType === 'genetic_analysis' && 'Genetic & eDNA Analysis'}
                                {modalType === 'scientific_analysis' && 'Scientific Data Processing'}
                                {modalType === 'vessel_map' && 'Live Vessel Tracking Map'}
                                {modalType === 'settings' && 'Portal Settings'}
                                {modalType === 'cmlre_info' && 'CMLRE Integration'}
                                {modalType === 'moes_info' && 'Ministry of Earth Sciences'}
                                {modalType === 'api_docs' && 'API Documentation'}
                                {modalType === 'team_dominators' && 'Team DOMInators'}
                                {modalType === 'data_portal' && 'Data Portal Access'}
                                {modalType === 'digital_twin' && 'Digital Twin Platform'}
                                {modalType === 'ai_analytics' && 'AI Analytics Engine'}
                            </h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="text-slate-300">
                            <ModalContent modalType={modalType} />
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-6">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Modal Content Component
function ModalContent({ modalType }) {
    const renderContent = () => {
        switch (modalType) {
            case 'analysis_complete':
                return (
                    <div>
                        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <div className="text-green-400 font-medium">Analysis Successfully Completed</div>
                            </div>
                            <div className="text-sm">Comprehensive fisheries assessment has been processed using CMLRE's advanced analytics engine.</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-cyan-400 font-medium mb-2">Stock Assessment Results</div>
                                <ul className="text-sm space-y-1">
                                    <li>• 3 species showing declining trends</li>
                                    <li>• 2 species within sustainable limits</li>
                                    <li>• Hilsa Shad requires immediate attention</li>
                                    <li>• Overall ecosystem health: 74%</li>
                                </ul>
                            </div>
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-orange-400 font-medium mb-2">Recommendations</div>
                                <ul className="text-sm space-y-1">
                                    <li>• Implement fishing moratorium for Hilsa</li>
                                    <li>• Adjust quota allocations by region</li>
                                    <li>• Increase observer coverage</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            case 'vessel_detail':
                const vessel = window.selectedVessel || {};
                return (
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-cyan-400 font-medium mb-2">Vessel Info</div>
                                <div className="text-sm space-y-1">
                                    <div>Name: {vessel.name}</div>
                                    <div>ID: {vessel.id}</div>
                                    <div>Type: {vessel.type}</div>
                                    <div>Captain: {vessel.captain}</div>
                                    <div>Status: {vessel.status}</div>
                                </div>
                            </div>
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-green-400 font-medium mb-2">Current Operation</div>
                                <div className="text-sm space-y-1">
                                    <div>Location: {vessel.coordinates}</div>
                                    <div>Catch: {vessel.totalCatch}kg</div>
                                    <div>Species: {vessel.primarySpecies}</div>
                                    <div>Compliance: {vessel.compliance}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'catch_detail':
                const catch_ = window.selectedCatch || {};
                return (
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-cyan-400 font-medium mb-2">Species Info</div>
                                <div className="text-sm space-y-1">
                                    <div>Species: {catch_.species}</div>
                                    <div>Scientific: {catch_.scientificName}</div>
                                    <div>Weight: {catch_.weight} kg</div>
                                    <div>Length: {catch_.length} cm</div>
                                    <div>Age: {catch_.age} years</div>
                                </div>
                            </div>
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-green-400 font-medium mb-2">Analysis Data</div>
                                <div className="text-sm space-y-1">
                                    <div>Sustainability: {catch_.sustainabilityRating}</div>
                                    <div>Quota Used: {((catch_.used/catch_.quota)*100).toFixed(1)}%</div>
                                    <div>Market Price: ₹{catch_.marketPrice}/kg</div>
                                    <div>Condition: {catch_.condition}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'morphometric_analysis':
                return (
                    <div>
                        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                            <div className="text-purple-400 font-medium mb-2">Otolith Analysis</div>
                            <div className="text-sm">AI-powered otolith morphometric analysis for age determination and species validation.</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-cyan-400 font-medium mb-2">Measurements</div>
                                <div className="text-sm space-y-1">
                                    <div>Length: 18.5 mm</div>
                                    <div>Width: 12.3 mm</div>
                                    <div>Area: 156.8 mm²</div>
                                    <div>Roundness: 0.73</div>
                                </div>
                            </div>
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-green-400 font-medium mb-2">Age Analysis</div>
                                <div className="text-sm space-y-1">
                                    <div>Estimated Age: 8 years</div>
                                    <div>Growth Rings: 8 rings</div>
                                    <div>Confidence: 94.2%</div>
                                    <div>Method: AI-assisted</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'genetic_analysis':
                return (
                    <div>
                        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                            <div className="text-green-400 font-medium mb-2">DNA Analysis</div>
                            <div className="text-sm">Comprehensive genetic analysis including DNA barcoding and population genetics.</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-cyan-400 font-medium mb-2">DNA Barcoding</div>
                                <div className="text-sm space-y-1">
                                    <div>Gene: COI</div>
                                    <div>Length: 658 bp</div>
                                    <div>Quality: 98.5%</div>
                                    <div>Match: 99.2%</div>
                                </div>
                            </div>
                            <div className="bg-slate-700/50 rounded-lg p-4">
                                <div className="text-purple-400 font-medium mb-2">Population Data</div>
                                <div className="text-sm space-y-1">
                                    <div>Population: Indian Ocean</div>
                                    <div>Diversity: 0.875</div>
                                    <div>Migration: 2.1 ind/gen</div>
                                    <div>Status: Healthy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div>
                        <p>This feature is under development for the complete SAGARA platform.</p>
                        <div className="mt-4 text-sm text-cyan-400">
                            Team DOMInators is building comprehensive marine data intelligence solutions for CMLRE.
                        </div>
                    </div>
                );
        }
    };

    return renderContent();
}

function SidebarLink({ icon: Icon, label, active = false, onClick }) {
    return (
        <div 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                active 
                    ? 'bg-orange-500/20 text-orange-400' 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
            onClick={onClick}
        >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{label}</span>
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700/70 transition-colors">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-slate-400 text-sm">{label}</div>
        </div>
    );
}