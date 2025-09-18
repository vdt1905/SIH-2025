import React, { useState, useEffect, useRef } from 'react';
import { 
    Database, Activity, AlertTriangle, BarChart3, Microscope, Dna,
    Search, Upload, Download, RefreshCw, Eye, Edit, Trash2, Plus,
    MapPin, Calendar, TrendingUp, TrendingDown, CheckCircle, XCircle,
    Filter, Settings, FileText, Zap, Globe
} from 'lucide-react';
import * as d3 from 'd3';
import Navbar from '../components/Navbar';
import VarunAIAgent from '../components/VarunAIAgent';



export default function EDNAPortal() {
    const [selectedAnalysis, setSelectedAnalysis] = useState('Species Detection');
    const [selectedRegion, setSelectedRegion] = useState('Arabian Sea');
    const [timeFilter, setTimeFilter] = useState('Last 30 Days');
    const [confidenceFilter, setConfidenceFilter] = useState(80);
    const [selectedSamples, setSelectedSamples] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isVarunOpen, setIsVarunOpen] = useState(false);
    const phylogeneticRef = useRef(null);
    const biodiversityRef = useRef(null);
    const sequenceRef = useRef(null);

    // Mock eDNA sample data
    const ednaSamples = [
        {
            id: 'KOC-2024-001',
            location: 'Mumbai Coast',
            coordinates: '19.0760, 72.8777',
            collectionDate: '2024-04-25',
            waterDepth: '25m',
            speciesDetected: ['Dolphins', 'Tuna', 'Sardines'],
            totalSequences: 15234,
            confidence: 94.2,
            status: 'completed',
            analyst: 'Dr. Marine Singh'
        },
        {
            id: 'KOC-2024-002',
            location: 'Kochi Backwaters',
            coordinates: '9.9312, 76.2673',
            collectionDate: '2024-04-24',
            waterDepth: '12m',
            speciesDetected: ['Sea Turtles', 'Crabs', 'Shrimp'],
            totalSequences: 18567,
            confidence: 89.7,
            status: 'completed',
            analyst: 'Dr. Bio Research'
        },
        {
            id: 'KOC-2024-003',
            location: 'Chennai Deep Water',
            coordinates: '13.0827, 80.2707',
            collectionDate: '2024-04-23',
            waterDepth: '45m',
            speciesDetected: ['Whale Sharks', 'Rays', 'Grouper'],
            totalSequences: 12890,
            confidence: 91.3,
            status: 'processing',
            analyst: 'Dr. Seq Analysis'
        },
        {
            id: 'KOC-2024-004',
            location: 'Goa Continental Shelf',
            coordinates: '15.2993, 74.1240',
            collectionDate: '2024-04-22',
            waterDepth: '80m',
            speciesDetected: ['Deep Sea Fish', 'Squid', 'Jellyfish'],
            totalSequences: 20145,
            confidence: 87.8,
            status: 'completed',
            analyst: 'Dr. Marine Singh'
        },
        {
            id: 'KOC-2024-005',
            location: 'Lakshadweep Coral',
            coordinates: '10.5667, 72.6417',
            collectionDate: '2024-04-21',
            waterDepth: '15m',
            speciesDetected: ['Coral Polyps', 'Reef Fish', 'Sea Anemone'],
            totalSequences: 16782,
            confidence: 96.1,
            status: 'completed',
            analyst: 'Dr. Coral Expert'
        }
    ];

    // Species database with phylogenetic information
    const speciesDatabase = [
        { 
            species: 'Tursiops truncatus', 
            commonName: 'Bottlenose Dolphin', 
            kingdom: 'Animalia', 
            phylum: 'Chordata', 
            class: 'Mammalia',
            detectionCount: 45,
            confidence: 94.2,
            conservationStatus: 'Least Concern',
            habitat: 'Coastal Waters'
        },
        { 
            species: 'Thunnus albacares', 
            commonName: 'Yellowfin Tuna', 
            kingdom: 'Animalia', 
            phylum: 'Chordata', 
            class: 'Actinopterygii',
            detectionCount: 38,
            confidence: 91.8,
            conservationStatus: 'Near Threatened',
            habitat: 'Pelagic Waters'
        },
        { 
            species: 'Chelonia mydas', 
            commonName: 'Green Sea Turtle', 
            kingdom: 'Animalia', 
            phylum: 'Chordata', 
            class: 'Reptilia',
            detectionCount: 23,
            confidence: 89.7,
            conservationStatus: 'Endangered',
            habitat: 'Shallow Coastal'
        },
        { 
            species: 'Rhincodon typus', 
            commonName: 'Whale Shark', 
            kingdom: 'Animalia', 
            phylum: 'Chordata', 
            class: 'Chondrichthyes',
            detectionCount: 12,
            confidence: 91.3,
            conservationStatus: 'Endangered',
            habitat: 'Open Ocean'
        },
        { 
            species: 'Acropora digitifera', 
            commonName: 'Finger Coral', 
            kingdom: 'Animalia', 
            phylum: 'Cnidaria', 
            class: 'Anthozoa',
            detectionCount: 67,
            confidence: 96.1,
            conservationStatus: 'Vulnerable',
            habitat: 'Coral Reefs'
        }
    ];

    const biodiversityMetrics = {
        totalSpecies: 156,
        endemicSpecies: 23,
        threatenedSpecies: 12,
        shannonIndex: 3.42,
        simpsonIndex: 0.87,
        evenness: 0.92
    };

    useEffect(() => {
        initializePhylogeneticTree();
        initializeBiodiversityChart();
        initializeSequenceVisualization();
    }, []);

    const initializePhylogeneticTree = () => {
        const container = phylogeneticRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 400;
        const height = 300;

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Hierarchical data for phylogenetic tree
        const treeData = {
            name: "Marine Life",
            children: [
                {
                    name: "Chordata",
                    children: [
                        { name: "Mammalia", children: [{ name: "Dolphins" }, { name: "Whales" }] },
                        { name: "Actinopterygii", children: [{ name: "Tuna" }, { name: "Sardines" }] },
                        { name: "Reptilia", children: [{ name: "Sea Turtles" }] }
                    ]
                },
                {
                    name: "Cnidaria",
                    children: [
                        { name: "Anthozoa", children: [{ name: "Corals" }, { name: "Anemones" }] }
                    ]
                },
                {
                    name: "Arthropoda",
                    children: [
                        { name: "Crustacea", children: [{ name: "Crabs" }, { name: "Shrimp" }] }
                    ]
                }
            ]
        };

        const root = d3.hierarchy(treeData);
        const treeLayout = d3.tree().size([height - 40, width - 80]);
        treeLayout(root);

        // Links
        svg.selectAll(".link")
            .data(root.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y + 40)
                .y(d => d.x + 20)
            )
            .attr("fill", "none")
            .attr("stroke", "#64748b")
            .attr("stroke-width", 2);

        // Nodes
        const nodes = svg.selectAll(".node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y + 40}, ${d.x + 20})`);

        nodes.append("circle")
            .attr("r", 5)
            .attr("fill", d => d.children ? "#3b82f6" : "#10b981")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2);

        nodes.append("text")
            .attr("dx", d => d.children ? -8 : 8)
            .attr("dy", 3)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .attr("fill", "#e2e8f0")
            .attr("font-size", "11px")
            .attr("font-weight", d => d.children ? "bold" : "normal");
    };

    const initializeBiodiversityChart = () => {
        const container = biodiversityRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 400;
        const height = 250;
        const margin = { top: 20, right: 30, bottom: 60, left: 40 };

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const data = [
            { category: 'Fish', count: 89, color: '#3b82f6' },
            { category: 'Mammals', count: 12, color: '#10b981' },
            { category: 'Reptiles', count: 8, color: '#f59e0b' },
            { category: 'Corals', count: 34, color: '#ef4444' },
            { category: 'Crustaceans', count: 13, color: '#8b5cf6' }
        ];

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([margin.left, width - margin.right])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Bars
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.category))
            .attr("y", d => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(0) - yScale(d.count))
            .attr("fill", d => d.color)
            .attr("opacity", 0.8)
            .on("mouseover", function(event, d) {
                d3.select(this).attr("opacity", 1);
            })
            .on("mouseout", function(event, d) {
                d3.select(this).attr("opacity", 0.8);
            });

        // Labels
        svg.selectAll(".label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", d => xScale(d.category) + xScale.bandwidth()/2)
            .attr("y", d => yScale(d.count) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", "#e2e8f0")
            .attr("font-size", "12px")
            .text(d => d.count);

        // Axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "11px");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "11px");
    };

    const initializeSequenceVisualization = () => {
        const container = sequenceRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 500;
        const height = 150;

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Mock DNA sequence
        const sequence = "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG";
        const bases = sequence.split('');

        const colorMap = {
            'A': '#ff6b6b',
            'T': '#4ecdc4',
            'C': '#45b7d1',
            'G': '#96ceb4'
        };

        const baseWidth = width / bases.length;
        const baseHeight = height - 40;

        svg.selectAll(".base")
            .data(bases)
            .enter()
            .append("rect")
            .attr("class", "base")
            .attr("x", (d, i) => i * baseWidth)
            .attr("y", 20)
            .attr("width", baseWidth - 1)
            .attr("height", baseHeight)
            .attr("fill", d => colorMap[d])
            .attr("opacity", 0.8);

        svg.selectAll(".base-text")
            .data(bases)
            .enter()
            .append("text")
            .attr("class", "base-text")
            .attr("x", (d, i) => i * baseWidth + baseWidth/2)
            .attr("y", 20 + baseHeight/2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("fill", "#ffffff")
            .attr("font-size", "10px")
            .attr("font-weight", "bold")
            .text(d => d);
    };

    const handleSampleSelect = (id) => {
        setSelectedSamples(prev => 
            prev.includes(id) 
                ? prev.filter(sampleId => sampleId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAllSamples = () => {
        const filteredSamples = getFilteredSamples();
        if (selectedSamples.length === filteredSamples.length) {
            setSelectedSamples([]);
        } else {
            setSelectedSamples(filteredSamples.map(sample => sample.id));
        }
    };

    const handleAnalyzeSequences = async () => {
        setIsAnalyzing(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsAnalyzing(false);
        setShowModal(true);
        setModalType('analysis_complete');
    };

    const getFilteredSamples = () => {
        return ednaSamples.filter(sample => {
            const matchesSearch = searchTerm === '' || 
                Object.values(sample).some(value => 
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            const matchesConfidence = sample.confidence >= confidenceFilter;
            return matchesSearch && matchesConfidence;
        });
    };

    const filteredSamples = getFilteredSamples();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <VarunAIAgent 
    isOpen={isVarunOpen} 
    onToggle={() => setIsVarunOpen(!isVarunOpen)}
    currentPage="edna" // or "oceanography", "edna", "digital_twin", etc.
/>

            <div className="pt-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-6">
                        {/* Sidebar */}
                        <div className="w-64 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 h-fit">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">TD</span>
                                </div>
                                <div>
                                    <div className="text-white font-bold">Team DOMInators</div>
                                    <div className="text-slate-400 text-xs">Advanced Marine Analytics Platform</div>
                                </div>
                            </div>

                            <div className="mb-8">
                               
                            </div>

                            <div className="space-y-4">
                                <StatCard label="Total Samples" value={ednaSamples.length} />
                                <StatCard label="Species Detected" value={biodiversityMetrics.totalSpecies} />
                                <StatCard label="Endemic Species" value={biodiversityMetrics.endemicSpecies} />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-700">
                                <div className="text-purple-400 text-sm font-medium mb-2">Team DOMInators</div>
                                <div className="text-slate-400 text-xs mb-2">Molecular Biodiversity Platform</div>
                                <button 
                                    onClick={() => {
                                        initializePhylogeneticTree();
                                        initializeBiodiversityChart();
                                        initializeSequenceVisualization();
                                    }}
                                    className="w-full px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-xs hover:bg-purple-500/30 transition-colors"
                                >
                                    Refresh Analysis Data
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/20 rounded-xl">
                                            <Dna className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white">eDNA Portal</h1>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('upload_sample');}}
                                            className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm hover:bg-purple-500/30 transition-colors flex items-center gap-2"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload Sample
                                        </button>
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('settings');}}
                                            className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-slate-300">Environmental DNA Analysis for Marine Biodiversity Assessment</p>
                                
                                <div className="mt-4 bg-slate-700 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Team DOMInators • SIH 2024 • {filteredSamples.length} samples processed</div>
                            </div>

                            {/* Analysis Controls */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Analysis Type</label>
                                        <select 
                                            value={selectedAnalysis}
                                            onChange={(e) => setSelectedAnalysis(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                        >
                                            <option>Species Detection</option>
                                            <option>Phylogenetic Analysis</option>
                                            <option>Biodiversity Index</option>
                                            <option>Population Genetics</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Region</label>
                                        <select 
                                            value={selectedRegion}
                                            onChange={(e) => setSelectedRegion(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                        >
                                            <option>Arabian Sea</option>
                                            <option>Bay of Bengal</option>
                                            <option>Indian Ocean</option>
                                            <option>Coastal Waters</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Confidence Filter</label>
                                        <input
                                            type="range"
                                            min="50"
                                            max="100"
                                            value={confidenceFilter}
                                            onChange={(e) => setConfidenceFilter(parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <div className="text-xs text-slate-400 mt-1">{confidenceFilter}% minimum</div>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Search Samples</label>
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Search by location, species..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sample Analysis Table */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-6">
                                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Microscope className="w-5 h-5 text-purple-400" />
                                        eDNA Sample Analysis
                                        <span className="text-sm font-normal text-slate-400">({filteredSamples.length} samples)</span>
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={handleAnalyzeSequences}
                                            disabled={selectedSamples.length === 0 || isAnalyzing}
                                            className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm hover:bg-purple-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Zap className="w-4 h-4" />
                                                    Analyze Selected ({selectedSamples.length})
                                                </>
                                            )}
                                        </button>
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('export_results');}}
                                            className="px-3 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-colors flex items-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Export
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
                                                        checked={selectedSamples.length === filteredSamples.length && filteredSamples.length > 0}
                                                        onChange={handleSelectAllSamples}
                                                        className="rounded border-slate-600 bg-slate-700 text-purple-500"
                                                    />
                                                </th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Sample ID</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Location</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Collection Date</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Species Detected</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Sequences</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Confidence</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Status</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSamples.map((sample) => (
                                                <tr key={sample.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedSamples.includes(sample.id)}
                                                            onChange={() => handleSampleSelect(sample.id)}
                                                            className="rounded border-slate-600 bg-slate-700 text-purple-500"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-white font-mono text-sm">{sample.id}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">
                                                        <div>{sample.location}</div>
                                                        <div className="text-xs text-slate-400">{sample.coordinates}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{sample.collectionDate}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">
                                                        <div className="flex flex-wrap gap-1">
                                                            {sample.speciesDetected.slice(0, 2).map((species, idx) => (
                                                                <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                                                                    {species}
                                                                </span>
                                                            ))}
                                                            {sample.speciesDetected.length > 2 && (
                                                                <span className="text-xs text-slate-400">+{sample.speciesDetected.length - 2} more</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{sample.totalSequences.toLocaleString()}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-2 h-2 rounded-full ${
                                                                sample.confidence >= 95 ? 'bg-green-400' :
                                                                sample.confidence >= 90 ? 'bg-yellow-400' : 'bg-orange-400'
                                                            }`}></div>
                                                            {sample.confidence}%
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <StatusBadge status={sample.status} />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('view_sample');}}
                                                                className="p-1 text-slate-400 hover:text-purple-400 transition-colors"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('sequence_analysis');}}
                                                                className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                                                                title="Analyze Sequences"
                                                            >
                                                                <Dna className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('download_sample');}}
                                                                className="p-1 text-slate-400 hover:text-green-400 transition-colors"
                                                                title="Download Data"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Analysis Dashboard */}
                            <div className="grid grid-cols-12 gap-6 mb-6">
                                {/* Phylogenetic Tree */}
                                <div className="col-span-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-green-400" />
                                        Phylogenetic Tree
                                    </h3>
                                    <div ref={phylogeneticRef} className="w-full"></div>
                                </div>

                                {/* Biodiversity Analysis */}
                                <div className="col-span-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-blue-400" />
                                        Biodiversity Distribution
                                    </h3>
                                    <div ref={biodiversityRef} className="w-full"></div>
                                </div>
                            </div>

                            {/* Species Database & Sequence Visualization */}
                            <div className="grid grid-cols-12 gap-6 mb-6">
                                {/* Species Database */}
                                <div className="col-span-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Database className="w-5 h-5 text-cyan-400" />
                                        Species Database
                                    </h3>
                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {speciesDatabase.map((species, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                                                <div>
                                                    <div className="font-medium text-white">{species.species}</div>
                                                    <div className="text-sm text-slate-300">{species.commonName}</div>
                                                    <div className="text-xs text-slate-400">{species.class} • {species.habitat}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-medium text-cyan-400">{species.detectionCount} detections</div>
                                                    <div className="text-xs text-slate-400">{species.confidence}% confidence</div>
                                                    <ConservationBadge status={species.conservationStatus} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Biodiversity Metrics */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-yellow-400" />
                                        Diversity Indices
                                    </h3>
                                    <div className="space-y-4">
                                        <MetricCard label="Shannon Index" value={biodiversityMetrics.shannonIndex} color="text-green-400" />
                                        <MetricCard label="Simpson Index" value={biodiversityMetrics.simpsonIndex} color="text-blue-400" />
                                        <MetricCard label="Evenness" value={biodiversityMetrics.evenness} color="text-purple-400" />
                                        <MetricCard label="Threatened Species" value={biodiversityMetrics.threatenedSpecies} color="text-red-400" />
                                    </div>
                                </div>
                            </div>

                            {/* DNA Sequence Visualization */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4 mb-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Dna className="w-5 h-5 text-pink-400" />
                                    DNA Sequence Visualization
                                </h3>
                                <div ref={sequenceRef} className="w-full mb-4"></div>
                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-red-400 rounded"></div>
                                        <span className="text-slate-300">Adenine (A)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-teal-400 rounded"></div>
                                        <span className="text-slate-300">Thymine (T)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-400 rounded"></div>
                                        <span className="text-slate-300">Cytosine (C)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-green-400 rounded"></div>
                                        <span className="text-slate-300">Guanine (G)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('team');}}>
                                    <div className="text-purple-400 font-medium mb-1">Team DOMInators</div>
                                    <div className="text-slate-400 text-sm">Molecular Biodiversity Platform</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('support');}}>
                                    <div className="text-pink-400 font-medium mb-1">Research Support</div>
                                    <div className="text-slate-400 text-sm">Bioinformatics Assistance Available</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('database');}}>
                                    <div className="text-cyan-400 font-medium mb-1">Species Database</div>
                                    <div className="text-slate-400 text-sm">Global Marine Biodiversity Records</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Modal System */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full border border-slate-700 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                {modalType === 'upload_sample' && 'Upload New eDNA Sample'}
                                {modalType === 'analysis_complete' && 'Sequence Analysis Complete'}
                                {modalType === 'view_sample' && 'Sample Details'}
                                {modalType === 'sequence_analysis' && 'DNA Sequence Analysis'}
                                {modalType === 'export_results' && 'Export Analysis Results'}
                                {modalType === 'settings' && 'Analysis Settings'}
                                {modalType === 'team' && 'Team DOMInators'}
                                {modalType === 'support' && 'Research Support'}
                                {modalType === 'database' && 'Species Database Access'}
                                {modalType === 'download_sample' && 'Download Sample Data'}
                            </h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="text-slate-300">
                            {modalType === 'upload_sample' && (
                                <div>
                                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mb-4">
                                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                        <p className="text-slate-300 mb-2">Drag and drop your eDNA sample files here</p>
                                        <p className="text-slate-400 text-sm">Supported formats: FASTQ, FASTA, CSV</p>
                                        <button className="mt-4 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
                                            Choose Files
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Sample Location</label>
                                            <input type="text" className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white" placeholder="e.g., Mumbai Coast" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Collection Date</label>
                                            <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modalType === 'analysis_complete' && (
                                <div>
                                    <div className="text-center mb-6">
                                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                        <h4 className="text-xl font-semibold text-white mb-2">Analysis Completed Successfully</h4>
                                        <p>Your eDNA sequence analysis has been completed with high confidence results.</p>
                                    </div>
                                    <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold mb-2">Results Summary:</h5>
                                        <ul className="space-y-1 text-sm">
                                            <li>• {selectedSamples.length} samples analyzed</li>
                                            <li>• 23 species detected with '&gt;'90% confidence</li>
                                            <li>• 156,789 sequences processed</li>
                                            <li>• 2 new species candidates identified</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {(modalType === 'view_sample' || modalType === 'sequence_analysis' || modalType === 'settings' || modalType === 'team' || modalType === 'support' || modalType === 'database' || modalType === 'export_results' || modalType === 'download_sample') && (
                                <div>
                                    <p className="mb-4">This advanced feature is currently under development by Team DOMInators.</p>
                                    <div className="bg-slate-700/50 rounded-lg p-4">
                                        <h5 className="font-semibold mb-2 text-purple-400">Coming Soon:</h5>
                                        <ul className="space-y-1 text-sm text-slate-300">
                                            <li>• Advanced phylogenetic reconstruction</li>
                                            <li>• Real-time species identification</li>
                                            <li>• Automated biodiversity reporting</li>
                                            <li>• Integration with global databases</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex justify-end gap-2 mt-6">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                            >
                                Close
                            </button>
                            {modalType === 'upload_sample' && (
                                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400 transition-colors">
                                    Upload & Analyze
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SidebarLink({ icon: Icon, label, active = false }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
            active 
                ? 'bg-purple-500/20 text-purple-400' 
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
        }`}>
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

function StatusBadge({ status }) {
    const statusConfig = {
        completed: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Completed' },
        processing: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Processing' },
        failed: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Failed' }
    };
    
    const config = statusConfig[status] || statusConfig.processing;
    
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
}

function ConservationBadge({ status }) {
    const statusConfig = {
        'Least Concern': { bg: 'bg-green-500/20', text: 'text-green-400' },
        'Near Threatened': { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
        'Vulnerable': { bg: 'bg-orange-500/20', text: 'text-orange-400' },
        'Endangered': { bg: 'bg-red-500/20', text: 'text-red-400' },
        'Critically Endangered': { bg: 'bg-red-600/20', text: 'text-red-500' }
    };
    
    const config = statusConfig[status] || statusConfig['Least Concern'];
    
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {status}
        </span>
    );
}

function MetricCard({ label, value, color }) {
    return (
        <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="text-slate-400 text-sm mb-1">{label}</div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
        </div>
    );
}