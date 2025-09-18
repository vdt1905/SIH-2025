import React, { useState, useEffect, useRef } from 'react';
import { 
    Database, Activity, AlertTriangle, BarChart3, Waves, Thermometer,
    Search, Upload, Download, RefreshCw, Eye, Edit, Trash2, Plus,
    MapPin, Calendar, TrendingUp, TrendingDown, CheckCircle, XCircle,
    Filter, Settings, FileText, Zap, Globe, Droplets, Wind, Compass,
    Cloud, Sun, Moon, Navigation
} from 'lucide-react';
import * as d3 from 'd3';
import Navbar from '../components/Navbar';

// Navbar Component


export default function OceanographicPortal() {
    const [selectedParameter, setSelectedParameter] = useState('Temperature');
    const [selectedRegion, setSelectedRegion] = useState('Arabian Sea');
    const [timeFilter, setTimeFilter] = useState('Last 7 Days');
    const [depthFilter, setDepthFilter] = useState('Surface');
    const [selectedStations, setSelectedStations] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isStreaming, setIsStreaming] = useState(true);

    const temperatureChartRef = useRef(null);
    const salinityChartRef = useRef(null);
    const currentMapRef = useRef(null);
    const profileChartRef = useRef(null);

    // Mock oceanographic station data
    const oceanStations = [
        {
            id: 'AS-001',
            name: 'Arabian Sea Deep',
            location: 'Arabian Sea',
            coordinates: '15.0000, 68.0000',
            depth: '2000m',
            lastUpdate: '2024-04-26 14:30:00',
            temperature: 26.8,
            salinity: 35.2,
            ph: 8.1,
            dissolvedOxygen: 6.8,
            chlorophyll: 0.8,
            turbidity: 2.1,
            pressure: 2000.5,
            status: 'active',
            dataQuality: 98.5
        },
        {
            id: 'BB-003',
            name: 'Bay of Bengal Station',
            location: 'Bay of Bengal',
            coordinates: '13.0000, 85.0000',
            depth: '1500m',
            lastUpdate: '2024-04-26 14:25:00',
            temperature: 28.3,
            salinity: 34.1,
            ph: 8.0,
            dissolvedOxygen: 5.9,
            chlorophyll: 1.2,
            turbidity: 3.8,
            pressure: 1500.2,
            status: 'active',
            dataQuality: 96.2
        },
        {
            id: 'LK-002',
            name: 'Lakshadweep Coral',
            location: 'Lakshadweep Sea',
            coordinates: '10.5667, 72.6417',
            depth: '50m',
            lastUpdate: '2024-04-26 14:20:00',
            temperature: 29.1,
            salinity: 35.8,
            ph: 8.3,
            dissolvedOxygen: 7.2,
            chlorophyll: 2.1,
            turbidity: 1.2,
            pressure: 50.1,
            status: 'maintenance',
            dataQuality: 89.7
        },
        {
            id: 'WC-005',
            name: 'West Coast Shelf',
            location: 'Western Continental Shelf',
            coordinates: '11.2500, 75.0000',
            depth: '200m',
            lastUpdate: '2024-04-26 14:35:00',
            temperature: 27.6,
            salinity: 35.0,
            ph: 8.2,
            dissolvedOxygen: 6.5,
            chlorophyll: 1.8,
            turbidity: 2.9,
            pressure: 200.8,
            status: 'active',
            dataQuality: 94.1
        },
        {
            id: 'EC-007',
            name: 'East Coast Current',
            location: 'Eastern Continental Shelf',
            coordinates: '16.0000, 82.0000',
            depth: '300m',
            lastUpdate: '2024-04-26 14:15:00',
            temperature: 25.9,
            salinity: 34.8,
            ph: 7.9,
            dissolvedOxygen: 6.1,
            chlorophyll: 0.9,
            turbidity: 2.3,
            pressure: 300.4,
            status: 'active',
            dataQuality: 97.8
        }
    ];

    // Current measurements data
    const currentData = [
        { station: 'AS-001', speed: 0.25, direction: 135, depth: '10m' },
        { station: 'BB-003', speed: 0.18, direction: 90, depth: '10m' },
        { station: 'LK-002', speed: 0.31, direction: 270, depth: '10m' },
        { station: 'WC-005', speed: 0.22, direction: 180, depth: '10m' },
        { station: 'EC-007', speed: 0.28, direction: 45, depth: '10m' }
    ];

    // Water mass analysis data
    const waterMasses = [
        { name: 'Arabian Sea Water', temperature: 26.8, salinity: 35.2, density: 1024.1, volume: 45.2 },
        { name: 'Bay of Bengal Water', temperature: 28.3, salinity: 34.1, density: 1023.8, volume: 38.7 },
        { name: 'Indian Ocean Deep', temperature: 4.2, salinity: 34.7, density: 1027.8, volume: 12.1 },
        { name: 'Coastal Mixed', temperature: 27.9, salinity: 34.9, density: 1024.0, volume: 4.0 }
    ];

    useEffect(() => {
        initializeTemperatureChart();
        initializeSalinityChart();
        initializeCurrentMap();
        initializeProfileChart();
    }, []);

    // Update real-time data
    useEffect(() => {
        if (!isStreaming) return;
        
        const interval = setInterval(() => {
            // Simulate real-time updates
            setTimeFilter(prev => prev); // Trigger re-render
        }, 5000);

        return () => clearInterval(interval);
    }, [isStreaming]);

    const initializeTemperatureChart = () => {
        const container = temperatureChartRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 400;
        const height = 200;
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Generate time series temperature data
        const now = new Date();
        const tempData = d3.range(24).map(i => ({
            time: new Date(now.getTime() - (23-i) * 3600000),
            temperature: 26 + Math.sin(i * 0.5) * 2 + Math.random() * 1.5,
            depth_10m: 26.5 + Math.sin(i * 0.4) * 1.8 + Math.random() * 1.2,
            depth_50m: 25.2 + Math.sin(i * 0.6) * 1.5 + Math.random() * 1.0
        }));

        const xScale = d3.scaleTime()
            .domain(d3.extent(tempData, d => d.time))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent([...tempData.map(d => d.temperature), ...tempData.map(d => d.depth_50m)]))
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Lines for different depths
        const line = d3.line()
            .x(d => xScale(d.time))
            .curve(d3.curveCardinal);

        const surfaceLine = line.y(d => yScale(d.temperature));
        const depth10Line = line.y(d => yScale(d.depth_10m));
        const depth50Line = line.y(d => yScale(d.depth_50m));

        // Add axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%H:%M")))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "10px");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "10px");

        // Add lines
        svg.append("path")
            .datum(tempData)
            .attr("fill", "none")
            .attr("stroke", "#ef4444")
            .attr("stroke-width", 2)
            .attr("d", surfaceLine);

        svg.append("path")
            .datum(tempData)
            .attr("fill", "none")
            .attr("stroke", "#f97316")
            .attr("stroke-width", 2)
            .attr("d", depth10Line);

        svg.append("path")
            .datum(tempData)
            .attr("fill", "none")
            .attr("stroke", "#06b6d4")
            .attr("stroke-width", 2)
            .attr("d", depth50Line);

        // Legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - 120}, 30)`);

        legend.append("rect")
            .attr("width", 80)
            .attr("height", 60)
            .attr("fill", "#1e293b")
            .attr("stroke", "#334155")
            .attr("rx", 4);

        ['Surface', '10m', '50m'].forEach((label, i) => {
            const colors = ['#ef4444', '#f97316', '#06b6d4'];
            legend.append("line")
                .attr("x1", 5)
                .attr("x2", 20)
                .attr("y1", 12 + i * 15)
                .attr("y2", 12 + i * 15)
                .attr("stroke", colors[i])
                .attr("stroke-width", 2);
            
            legend.append("text")
                .attr("x", 25)
                .attr("y", 16 + i * 15)
                .attr("fill", "#94a3b8")
                .attr("font-size", "10px")
                .text(label);
        });
    };

    const initializeSalinityChart = () => {
        const container = salinityChartRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 400;
        const height = 200;
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Generate salinity profile data
        const depths = [0, 10, 20, 30, 50, 75, 100, 150, 200, 300, 500];
        const salinityProfile = depths.map(depth => ({
            depth: depth,
            salinity: 35.0 + (depth / 1000) * 0.5 + Math.sin(depth / 50) * 0.3
        }));

        const xScale = d3.scaleLinear()
            .domain(d3.extent(salinityProfile, d => d.salinity))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent(salinityProfile, d => d.depth))
            .range([margin.top, height - margin.bottom]);

        const line = d3.line()
            .x(d => xScale(d.salinity))
            .y(d => yScale(d.depth))
            .curve(d3.curveCardinal);

        // Add axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "10px");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "10px");

        // Add line
        svg.append("path")
            .datum(salinityProfile)
            .attr("fill", "none")
            .attr("stroke", "#10b981")
            .attr("stroke-width", 3)
            .attr("d", line);

        // Add points
        svg.selectAll(".point")
            .data(salinityProfile)
            .enter().append("circle")
            .attr("class", "point")
            .attr("cx", d => xScale(d.salinity))
            .attr("cy", d => yScale(d.depth))
            .attr("r", 3)
            .attr("fill", "#10b981");
    };

    const initializeCurrentMap = () => {
        const container = currentMapRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 500;
        const height = 300;

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background", "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)")
            .style("border-radius", "12px");

        // Add grid
        svg.selectAll(".grid-line-x")
            .data(d3.range(0, width, 40))
            .enter()
            .append("line")
            .attr("x1", d => d)
            .attr("x2", d => d)
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke", "#334155")
            .attr("stroke-width", 0.5)
            .attr("opacity", 0.3);

        svg.selectAll(".grid-line-y")
            .data(d3.range(0, height, 40))
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", d => d)
            .attr("y2", d => d)
            .attr("stroke", "#334155")
            .attr("stroke-width", 0.5)
            .attr("opacity", 0.3);

        // Plot current vectors
        currentData.forEach((current, i) => {
            const x = 100 + (i % 3) * 150;
            const y = 80 + Math.floor(i / 3) * 120;
            
            // Current vector
            const angle = (current.direction * Math.PI) / 180;
            const length = current.speed * 100;
            
            svg.append("line")
                .attr("x1", x)
                .attr("y1", y)
                .attr("x2", x + Math.cos(angle) * length)
                .attr("y2", y + Math.sin(angle) * length)
                .attr("stroke", "#06b6d4")
                .attr("stroke-width", 3)
                .attr("marker-end", "url(#arrowhead)");

            // Station marker
            svg.append("circle")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 6)
                .attr("fill", "#3b82f6")
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 2);

            // Label
            svg.append("text")
                .attr("x", x)
                .attr("y", y - 15)
                .attr("text-anchor", "middle")
                .attr("fill", "#e2e8f0")
                .attr("font-size", "10px")
                .attr("font-weight", "bold")
                .text(current.station);

            // Speed label
            svg.append("text")
                .attr("x", x + Math.cos(angle) * length + 10)
                .attr("y", y + Math.sin(angle) * length)
                .attr("fill", "#94a3b8")
                .attr("font-size", "9px")
                .text(`${current.speed}m/s`);
        });

        // Add arrow marker
        svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 8)
            .attr("refY", 0)
            .attr("markerWidth", 4)
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#06b6d4");
    };

    const initializeProfileChart = () => {
        const container = profileChartRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 300;
        const height = 250;
        const margin = { top: 20, right: 80, bottom: 40, left: 50 };

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const xScale = d3.scaleBand()
            .domain(waterMasses.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(waterMasses, d => d.volume)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Bars
        svg.selectAll(".bar")
            .data(waterMasses)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.name))
            .attr("y", d => yScale(d.volume))
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(0) - yScale(d.volume))
            .attr("fill", (d, i) => ['#ef4444', '#f97316', '#06b6d4', '#8b5cf6'][i])
            .attr("opacity", 0.8);

        // Labels
        svg.selectAll(".label")
            .data(waterMasses)
            .enter()
            .append("text")
            .attr("x", d => xScale(d.name) + xScale.bandwidth()/2)
            .attr("y", d => yScale(d.volume) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", "#e2e8f0")
            .attr("font-size", "10px")
            .text(d => `${d.volume}%`);

        // Axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "9px")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "10px");
    };

    const handleStationSelect = (id) => {
        setSelectedStations(prev => 
            prev.includes(id) 
                ? prev.filter(stationId => stationId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAllStations = () => {
        const filteredStations = getFilteredStations();
        if (selectedStations.length === filteredStations.length) {
            setSelectedStations([]);
        } else {
            setSelectedStations(filteredStations.map(station => station.id));
        }
    };

    const handleAnalyzeData = async () => {
        setIsAnalyzing(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsAnalyzing(false);
        setShowModal(true);
        setModalType('analysis_complete');
    };

    const getFilteredStations = () => {
        return oceanStations.filter(station => {
            const matchesSearch = searchTerm === '' || 
                Object.values(station).some(value => 
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            const matchesRegion = selectedRegion === 'All Regions' || station.location.includes(selectedRegion);
            return matchesSearch && matchesRegion;
        });
    };

    const filteredStations = getFilteredStations();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            
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
                                <StatCard label="Active Stations" value={filteredStations.length} />
                                <StatCard label="Parameters" value="12" />
                                <StatCard label="Data Quality" value="96.8%" />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-700">
                                <div className="text-blue-400 text-sm font-medium mb-2">Team DOMInators</div>
                                <div className="text-slate-400 text-xs mb-2">Oceanographic Research Platform</div>
                                <button 
                                    onClick={() => {
                                        initializeTemperatureChart();
                                        initializeSalinityChart();
                                        initializeCurrentMap();
                                        initializeProfileChart();
                                    }}
                                    className="w-full px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-xs hover:bg-blue-500/30 transition-colors"
                                >
                                    Refresh Ocean Data
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-xl">
                                            <Waves className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white">Oceanographic Analysis</h1>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setIsStreaming(!isStreaming)}
                                            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                                                isStreaming 
                                                    ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                                                    : 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30'
                                            }`}
                                        >
                                            {isStreaming ? 'Live Data' : 'Paused'}
                                        </button>
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('upload_data');}}
                                            className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload Data
                                        </button>
                                    </div>
                                </div>
                                <p className="text-slate-300">Physical, Chemical & Biological Ocean Parameter Analysis</p>
                                
                                <div className="mt-4 bg-slate-700 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Team DOMInators • SIH 2024 • {filteredStations.length} stations active</div>
                            </div>

                            {/* Analysis Controls */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Parameter</label>
                                        <select 
                                            value={selectedParameter}
                                            onChange={(e) => setSelectedParameter(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                        >
                                            <option>Temperature</option>
                                            <option>Salinity</option>
                                            <option>pH</option>
                                            <option>Dissolved Oxygen</option>
                                            <option>Chlorophyll</option>
                                            <option>Turbidity</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Region</label>
                                        <select 
                                            value={selectedRegion}
                                            onChange={(e) => setSelectedRegion(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                        >
                                            <option>All Regions</option>
                                            <option>Arabian Sea</option>
                                            <option>Bay of Bengal</option>
                                            <option>Lakshadweep Sea</option>
                                            <option>Western Continental Shelf</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Depth Range</label>
                                        <select 
                                            value={depthFilter}
                                            onChange={(e) => setDepthFilter(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                        >
                                            <option>Surface</option>
                                            <option>0-50m</option>
                                            <option>50-200m</option>
                                            <option>200-500m</option>
                                            <option>500m+</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Time Period</label>
                                        <select 
                                            value={timeFilter}
                                            onChange={(e) => setTimeFilter(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                        >
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                            <option>Last 90 Days</option>
                                            <option>Custom Range</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Search</label>
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Search stations..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ocean Station Data Table */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-6">
                                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Thermometer className="w-5 h-5 text-blue-400" />
                                        Ocean Monitoring Stations
                                        <span className="text-sm font-normal text-slate-400">({filteredStations.length} stations)</span>
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={handleAnalyzeData}
                                            disabled={selectedStations.length === 0 || isAnalyzing}
                                            className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    <Zap className="w-4 h-4" />
                                                    Analyze Selected ({selectedStations.length})
                                                </>
                                            )}
                                        </button>
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('export_data');}}
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
                                                        checked={selectedStations.length === filteredStations.length && filteredStations.length > 0}
                                                        onChange={handleSelectAllStations}
                                                        className="rounded border-slate-600 bg-slate-700 text-blue-500"
                                                    />
                                                </th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Station ID</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Location</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Temperature</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Salinity</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">pH</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">DO</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Quality</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Status</th>
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStations.map((station) => (
                                                <tr key={station.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedStations.includes(station.id)}
                                                            onChange={() => handleStationSelect(station.id)}
                                                            className="rounded border-slate-600 bg-slate-700 text-blue-500"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-white font-mono text-sm">{station.id}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">
                                                        <div>{station.name}</div>
                                                        <div className="text-xs text-slate-400">{station.coordinates}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{station.temperature}°C</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{station.salinity} PSU</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{station.ph}</td>
                                                    <td className="px-4 py-3 text-slate-300 text-sm">{station.dissolvedOxygen} mg/L</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-2 h-2 rounded-full ${
                                                                station.dataQuality >= 95 ? 'bg-green-400' :
                                                                station.dataQuality >= 90 ? 'bg-yellow-400' : 'bg-orange-400'
                                                            }`}></div>
                                                            {station.dataQuality}%
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <StatusBadge status={station.status} />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('view_station');}}
                                                                className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('analyze_station');}}
                                                                className="p-1 text-slate-400 hover:text-green-400 transition-colors"
                                                                title="Analyze Data"
                                                            >
                                                                <BarChart3 className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('download_station');}}
                                                                className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
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

                            {/* Visualization Dashboard */}
                            <div className="grid grid-cols-12 gap-6 mb-6">
                                {/* Temperature Time Series */}
                                <div className="col-span-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Thermometer className="w-5 h-5 text-red-400" />
                                        Temperature Profile
                                    </h3>
                                    <div ref={temperatureChartRef} className="w-full"></div>
                                </div>

                                {/* Salinity Profile */}
                                <div className="col-span-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Droplets className="w-5 h-5 text-green-400" />
                                        Salinity vs Depth
                                    </h3>
                                    <div ref={salinityChartRef} className="w-full"></div>
                                </div>
                            </div>

                            {/* Current Analysis & Water Mass */}
                            <div className="grid grid-cols-12 gap-6 mb-6">
                                {/* Ocean Current Map */}
                                <div className="col-span-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Navigation className="w-5 h-5 text-cyan-400" />
                                        Ocean Current Analysis
                                    </h3>
                                    <div ref={currentMapRef} className="w-full"></div>
                                </div>

                                {/* Water Mass Analysis */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-purple-400" />
                                        Water Masses
                                    </h3>
                                    <div ref={profileChartRef} className="w-full"></div>
                                </div>
                            </div>

                            {/* Environmental Parameters */}
                            <div className="grid grid-cols-12 gap-6 mb-6">
                                {/* Current Conditions */}
                                <div className="col-span-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-yellow-400" />
                                        Real-time Parameters
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {filteredStations.slice(0, 3).map((station) => (
                                            <div key={station.id} className="bg-slate-700/30 rounded-lg p-4">
                                                <h4 className="font-semibold text-white mb-2">{station.name}</h4>
                                                <div className="space-y-2 text-sm">
                                                    <ParameterRow icon={Thermometer} label="Temperature" value={`${station.temperature}°C`} color="text-red-400" />
                                                    <ParameterRow icon={Droplets} label="Salinity" value={`${station.salinity} PSU`} color="text-blue-400" />
                                                    <ParameterRow icon={Activity} label="pH" value={station.ph} color="text-green-400" />
                                                    <ParameterRow icon={Wind} label="Dissolved O₂" value={`${station.dissolvedOxygen} mg/L`} color="text-purple-400" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Data Quality Metrics */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        Quality Metrics
                                    </h3>
                                    <div className="space-y-4">
                                        <QualityMetric label="Data Completeness" value={94.2} color="text-green-400" />
                                        <QualityMetric label="Sensor Accuracy" value={96.8} color="text-blue-400" />
                                        <QualityMetric label="Network Uptime" value={99.1} color="text-cyan-400" />
                                        <QualityMetric label="Processing Speed" value={87.5} color="text-yellow-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('team');}}>
                                    <div className="text-blue-400 font-medium mb-1">Team DOMInators</div>
                                    <div className="text-slate-400 text-sm">Oceanographic Research Platform</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('support');}}>
                                    <div className="text-cyan-400 font-medium mb-1">Research Support</div>
                                    <div className="text-slate-400 text-sm">24/7 Technical Assistance</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('integration');}}>
                                    <div className="text-emerald-400 font-medium mb-1">Data Integration</div>
                                    <div className="text-slate-400 text-sm">Global Ocean Database Access</div>
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
                                {modalType === 'upload_data' && 'Upload Oceanographic Data'}
                                {modalType === 'analysis_complete' && 'Analysis Complete'}
                                {modalType === 'view_station' && 'Station Details'}
                                {modalType === 'analyze_station' && 'Station Analysis'}
                                {modalType === 'export_data' && 'Export Ocean Data'}
                                {modalType === 'download_station' && 'Download Station Data'}
                                {modalType === 'team' && 'Team DOMInators'}
                                {modalType === 'support' && 'Research Support'}
                                {modalType === 'integration' && 'Data Integration'}
                            </h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="text-slate-300">
                            {modalType === 'upload_data' && (
                                <div>
                                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mb-4">
                                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                        <p className="text-slate-300 mb-2">Upload oceanographic datasets</p>
                                        <p className="text-slate-400 text-sm">Supported formats: NetCDF, CSV, CTD, ADCP</p>
                                        <button className="mt-4 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
                                            Choose Files
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Station Location</label>
                                            <input type="text" className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white" placeholder="e.g., Arabian Sea Deep" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Measurement Date</label>
                                            <input type="datetime-local" className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modalType === 'analysis_complete' && (
                                <div>
                                    <div className="text-center mb-6">
                                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                        <h4 className="text-xl font-semibold text-white mb-2">Oceanographic Analysis Complete</h4>
                                        <p>Your ocean parameter analysis has been completed successfully.</p>
                                    </div>
                                    <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold mb-2">Analysis Results:</h5>
                                        <ul className="space-y-1 text-sm">
                                            <li>• {selectedStations.length} stations analyzed</li>
                                            <li>• 12 parameters processed across all depths</li>
                                            <li>• 3 anomalies detected requiring attention</li>
                                            <li>• Water mass classification updated</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {(modalType === 'view_station' || modalType === 'analyze_station' || modalType === 'export_data' || modalType === 'download_station' || modalType === 'team' || modalType === 'support' || modalType === 'integration') && (
                                <div>
                                    <p className="mb-4">This advanced oceanographic feature is under development by Team DOMInators.</p>
                                    <div className="bg-slate-700/50 rounded-lg p-4">
                                        <h5 className="font-semibold mb-2 text-blue-400">Coming Soon:</h5>
                                        <ul className="space-y-1 text-sm text-slate-300">
                                            <li>• Advanced water mass analysis</li>
                                            <li>• Real-time current modeling</li>
                                            <li>• Automated anomaly detection</li>
                                            <li>• Integration with global ocean databases</li>
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
                            {modalType === 'upload_data' && (
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors">
                                    Upload & Process
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
                ? 'bg-blue-500/20 text-blue-400' 
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
        active: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Active' },
        maintenance: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Maintenance' },
        offline: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Offline' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
}

function ParameterRow({ icon: Icon, label, value, color }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-slate-300">{label}</span>
            </div>
            <span className="text-white font-medium">{value}</span>
        </div>
    );
}

function QualityMetric({ label, value, color }) {
    return (
        <div className="bg-slate-700/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
                <div className="text-slate-400 text-sm">{label}</div>
                <div className={`text-lg font-bold ${color}`}>{value}%</div>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
                <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${
                        color.includes('green') ? 'from-green-500 to-green-400' :
                        color.includes('blue') ? 'from-blue-500 to-blue-400' :
                        color.includes('cyan') ? 'from-cyan-500 to-cyan-400' :
                        'from-yellow-500 to-yellow-400'
                    }`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
}