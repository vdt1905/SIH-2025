import React, { useState, useEffect, useRef } from 'react';
import { 
    Database, Activity, AlertTriangle, BarChart3, Waves, Thermometer,
    Search, Upload, Download, RefreshCw, Eye, Edit, Trash2, Plus,
    MapPin, Calendar, TrendingUp, TrendingDown, CheckCircle, XCircle,
    Filter, Settings, FileText, Zap, Globe, Droplets, Wind, Compass,
    Cloud, Sun, Moon, Navigation, Play, Pause, Map
} from 'lucide-react';
import * as d3 from 'd3';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';
import VarunAIAgent from '../components/VarunAIAgent';

// Fix for Leaflet default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom ocean station icon
const oceanStationIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.5 12.5 41 12.5 41C12.5 41 25 21.5 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="#3B82F6"/>
            <circle cx="12.5" cy="12.5" r="6" fill="white"/>
            <path d="M10 12.5L12 14.5L15 11" stroke="#3B82F6" stroke-width="2"/>
        </svg>
    `),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

export default function OceanographicPortal() {
    const [isVarunOpen, setIsVarunOpen] = useState(false);
    const [selectedParameter, setSelectedParameter] = useState('temperature');
    const [selectedRegion, setSelectedRegion] = useState('All Regions');
    const [timeFilter, setTimeFilter] = useState('last7days');
    const [depthFilter, setDepthFilter] = useState('surface');
    const [selectedStations, setSelectedStations] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isStreaming, setIsStreaming] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mapCenter, setMapCenter] = useState([15.0, 75.0]);
    const [mapZoom, setMapZoom] = useState(5);
    const [selectedStation, setSelectedStation] = useState(null);

    const temperatureChartRef = useRef(null);
    const salinityChartRef = useRef(null);
    const currentMapRef = useRef(null);
    const profileChartRef = useRef(null);

    // Enhanced oceanographic station data with coordinates
    const oceanStations = [
        {
            id: 'AS-001',
            name: 'Arabian Sea Deep',
            location: 'Arabian Sea',
            coordinates: [15.0000, 68.0000],
            depth: '2000m',
            lastUpdate: new Date().toISOString(),
            temperature: 26.8,
            salinity: 35.2,
            ph: 8.1,
            dissolvedOxygen: 6.8,
            chlorophyll: 0.8,
            turbidity: 2.1,
            pressure: 2000.5,
            status: 'active',
            dataQuality: 98.5,
            currentSpeed: 0.25,
            currentDirection: 135
        },
        {
            id: 'BB-003',
            name: 'Bay of Bengal Station',
            location: 'Bay of Bengal',
            coordinates: [13.0000, 85.0000],
            depth: '1500m',
            lastUpdate: new Date(Date.now() - 300000).toISOString(),
            temperature: 28.3,
            salinity: 34.1,
            ph: 8.0,
            dissolvedOxygen: 5.9,
            chlorophyll: 1.2,
            turbidity: 3.8,
            pressure: 1500.2,
            status: 'active',
            dataQuality: 96.2,
            currentSpeed: 0.18,
            currentDirection: 90
        },
        {
            id: 'LK-002',
            name: 'Lakshadweep Coral',
            location: 'Lakshadweep Sea',
            coordinates: [10.5667, 72.6417],
            depth: '50m',
            lastUpdate: new Date(Date.now() - 600000).toISOString(),
            temperature: 29.1,
            salinity: 35.8,
            ph: 8.3,
            dissolvedOxygen: 7.2,
            chlorophyll: 2.1,
            turbidity: 1.2,
            pressure: 50.1,
            status: 'maintenance',
            dataQuality: 89.7,
            currentSpeed: 0.31,
            currentDirection: 270
        },
        {
            id: 'WC-005',
            name: 'West Coast Shelf',
            location: 'Western Continental Shelf',
            coordinates: [11.2500, 75.0000],
            depth: '200m',
            lastUpdate: new Date(Date.now() - 120000).toISOString(),
            temperature: 27.6,
            salinity: 35.0,
            ph: 8.2,
            dissolvedOxygen: 6.5,
            chlorophyll: 1.8,
            turbidity: 2.9,
            pressure: 200.8,
            status: 'active',
            dataQuality: 94.1,
            currentSpeed: 0.22,
            currentDirection: 180
        },
        {
            id: 'EC-007',
            name: 'East Coast Current',
            location: 'Eastern Continental Shelf',
            coordinates: [16.0000, 82.0000],
            depth: '300m',
            lastUpdate: new Date(Date.now() - 180000).toISOString(),
            temperature: 25.9,
            salinity: 34.8,
            ph: 7.9,
            dissolvedOxygen: 6.1,
            chlorophyll: 0.9,
            turbidity: 2.3,
            pressure: 300.4,
            status: 'active',
            dataQuality: 97.8,
            currentSpeed: 0.28,
            currentDirection: 45
        }
    ];

    // Parameter configurations
    const parameters = {
        temperature: { name: 'Temperature', unit: '°C', color: '#ef4444', icon: Thermometer },
        salinity: { name: 'Salinity', unit: 'PSU', color: '#06b6d4', icon: Droplets },
        ph: { name: 'pH', unit: '', color: '#10b981', icon: Activity },
        dissolvedOxygen: { name: 'Dissolved Oxygen', unit: 'mg/L', color: '#8b5cf6', icon: Wind },
        chlorophyll: { name: 'Chlorophyll', unit: 'μg/L', color: '#84cc16', icon: Cloud },
        turbidity: { name: 'Turbidity', unit: 'NTU', color: '#f59e0b', icon: Waves }
    };

    // Time filter options
    const timeFilters = {
        last24hours: 'Last 24 Hours',
        last7days: 'Last 7 Days',
        last30days: 'Last 30 Days',
        custom: 'Custom Range'
    };

    useEffect(() => {
        initializeCharts();
        
        // Real-time data simulation
        const interval = setInterval(() => {
            setCurrentTime(new Date());
            if (isStreaming) {
                // Simulate data updates
                initializeCharts();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isStreaming]);

    const initializeCharts = () => {
        initializeTemperatureChart();
        initializeSalinityChart();
        initializeProfileChart();
    };

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

        // Generate realistic time series data
        const now = new Date();
        const tempData = d3.range(24).map(i => ({
            time: new Date(now.getTime() - (23-i) * 3600000),
            temperature: 26 + Math.sin(i * 0.5) * 2 + Math.random() * 0.5,
            depth_10m: 25.5 + Math.sin(i * 0.4) * 1.8 + Math.random() * 0.3,
            depth_50m: 24.2 + Math.sin(i * 0.6) * 1.5 + Math.random() * 0.2
        }));

        const xScale = d3.scaleTime()
            .domain(d3.extent(tempData, d => d.time))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([22, 30])
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x(d => xScale(d.time))
            .curve(d3.curveMonotoneX);

        // Add grid
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale)
                .tickSize(-height + margin.top + margin.bottom)
                .tickFormat("")
            )
            .style("stroke-dasharray", "3,3")
            .style("stroke", "#334155")
            .style("stroke-opacity", 0.5);

        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale)
                .tickSize(-width + margin.left + margin.right)
                .tickFormat("")
            )
            .style("stroke-dasharray", "3,3")
            .style("stroke", "#334155")
            .style("stroke-opacity", 0.5);

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
        const depths = [
            { data: tempData, key: 'temperature', color: '#ef4444', label: 'Surface' },
            { data: tempData, key: 'depth_10m', color: '#f97316', label: '10m' },
            { data: tempData, key: 'depth_50m', color: '#06b6d4', label: '50m' }
        ];

        depths.forEach(depth => {
            const depthLine = line.y(d => yScale(d[depth.key]));
            
            svg.append("path")
                .datum(depth.data)
                .attr("fill", "none")
                .attr("stroke", depth.color)
                .attr("stroke-width", 2)
                .attr("d", depthLine);
        });

        // Add legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - 120}, 30)`);

        legend.append("rect")
            .attr("width", 100)
            .attr("height", 80)
            .attr("fill", "#1e293b")
            .attr("stroke", "#334155")
            .attr("rx", 4);

        depths.forEach((depth, i) => {
            const yPos = 15 + i * 20;
            
            legend.append("line")
                .attr("x1", 10)
                .attr("x2", 25)
                .attr("y1", yPos)
                .attr("y2", yPos)
                .attr("stroke", depth.color)
                .attr("stroke-width", 2);
            
            legend.append("text")
                .attr("x", 30)
                .attr("y", yPos + 4)
                .attr("fill", "#94a3b8")
                .attr("font-size", "10px")
                .text(depth.label);
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
            salinity: 34.5 + (depth / 1000) * 2 + Math.sin(depth / 50) * 0.2
        }));

        const xScale = d3.scaleLinear()
            .domain([33.5, 36.5])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([500, 0])
            .range([margin.top, height - margin.bottom]);

        const line = d3.line()
            .x(d => xScale(d.salinity))
            .y(d => yScale(d.depth))
            .curve(d3.curveMonotoneX);

        // Add grid
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale)
                .tickSize(-height + margin.top + margin.bottom)
                .tickFormat("")
            )
            .style("stroke-dasharray", "3,3")
            .style("stroke", "#334155")
            .style("stroke-opacity", 0.5);

        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale)
                .tickSize(-width + margin.left + margin.right)
                .tickFormat("")
            )
            .style("stroke-dasharray", "3,3")
            .style("stroke", "#334155")
            .style("stroke-opacity", 0.5);

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
            .attr("stroke", "#06b6d4")
            .attr("stroke-width", 3)
            .attr("d", line);

        // Add points
        svg.selectAll(".point")
            .data(salinityProfile)
            .enter().append("circle")
            .attr("cx", d => xScale(d.salinity))
            .attr("cy", d => yScale(d.depth))
            .attr("r", 3)
            .attr("fill", "#06b6d4")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1);
    };

    const initializeProfileChart = () => {
        const container = profileChartRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 300;
        const height = 250;
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const waterMasses = [
            { name: 'Arabian Sea', temperature: 26.8, salinity: 35.2, density: 1024.1, volume: 45.2 },
            { name: 'Bay of Bengal', temperature: 28.3, salinity: 34.1, density: 1023.8, volume: 38.7 },
            { name: 'Deep Water', temperature: 4.2, salinity: 34.7, density: 1027.8, volume: 12.1 },
            { name: 'Coastal Mixed', temperature: 27.9, salinity: 34.9, density: 1024.0, volume: 4.0 }
        ];

        const xScale = d3.scaleBand()
            .domain(waterMasses.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.3);

        const yScale = d3.scaleLinear()
            .domain([0, 50])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Add grid
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale)
                .tickSize(-height + margin.top + margin.bottom)
                .tickFormat("")
            )
            .style("stroke-dasharray", "3,3")
            .style("stroke", "#334155")
            .style("stroke-opacity", 0.5);

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
            .attr("opacity", 0.8)
            .on("mouseover", function(event, d) {
                d3.select(this).attr("opacity", 1);
            })
            .on("mouseout", function(event, d) {
                d3.select(this).attr("opacity", 0.8);
            });

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
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsAnalyzing(false);
        setShowModal(true);
        setModalType('analysis_complete');
    };

    const getFilteredStations = () => {
        return oceanStations.filter(station => {
            const matchesSearch = searchTerm === '' || 
                station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                station.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRegion = selectedRegion === 'All Regions' || station.location.includes(selectedRegion);
            return matchesSearch && matchesRegion;
        });
    };

    const filteredStations = getFilteredStations();

    const handleStationClick = (station) => {
        setSelectedStation(station);
        setMapCenter(station.coordinates);
        setMapZoom(8);
    };

    const renderParameterMap = () => {
        const parameter = parameters[selectedParameter];
        
        return (
            <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                style={{ height: '400px', width: '100%', borderRadius: '12px' }}
                className="z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {filteredStations.map((station) => (
                    <Marker 
                        key={station.id} 
                        position={station.coordinates}
                        icon={oceanStationIcon}
                        eventHandlers={{
                            click: () => handleStationClick(station),
                        }}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-lg">{station.name}</h3>
                                <p className="text-sm text-gray-600">{station.location}</p>
                                <div className="mt-2 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Temperature:</span>
                                        <span className="font-semibold">{station.temperature}°C</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Salinity:</span>
                                        <span className="font-semibold">{station.salinity} PSU</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Depth:</span>
                                        <span className="font-semibold">{station.depth}</span>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Current vectors */}
                {filteredStations.map((station) => {
                    const angle = (station.currentDirection * Math.PI) / 180;
                    const length = station.currentSpeed * 10000;
                    const endLat = station.coordinates[0] + (Math.cos(angle) * length / 111320);
                    const endLng = station.coordinates[1] + (Math.sin(angle) * length / (111320 * Math.cos(station.coordinates[0] * Math.PI / 180)));
                    
                    return (
                        <Polyline
                            key={station.id + '-current'}
                            positions={[station.coordinates, [endLat, endLng]]}
                            color="#06b6d4"
                            weight={3}
                            opacity={0.8}
                        />
                    );
                })}
            </MapContainer>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-7">
            <Navbar />
            <VarunAIAgent 
                isOpen={isVarunOpen} 
                onToggle={() => setIsVarunOpen(!isVarunOpen)}
                currentPage="oceanography"
            />
            
            <div className="pt-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-6">
                        {/* Sidebar */}
                        <div className="w-64 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 h-fit sticky top-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-blue-500/20 rounded-xl">
                                    <Waves className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">Team DOMInators</div>
                                    <div className="text-slate-400 text-xs">Marine Analytics Platform</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="text-slate-300 text-sm font-medium mb-3">Real-time Status</div>
                                <div className="bg-slate-700/50 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 text-sm">Last Update</span>
                                        <span className="text-green-400 text-sm">{currentTime.toLocaleTimeString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                        <span className="text-slate-300 text-sm">
                                            {isStreaming ? 'Live Data Streaming' : 'Data Paused'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <StatCard label="Active Stations" value={filteredStations.length} trend="up" />
                                <StatCard label="Data Quality" value="96.8%" trend="stable" />
                                <StatCard label="Coverage Area" value="2.5M km²" trend="up" />
                            </div>

                            <div className="pt-4 border-t border-slate-700">
                                <button 
                                    onClick={initializeCharts}
                                    className="w-full px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh Data
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-xl">
                                            <Waves className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-white">Oceanographic Dashboard</h1>
                                            <p className="text-slate-300">Real-time marine parameter monitoring and analysis</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setIsStreaming(!isStreaming)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                                                isStreaming 
                                                    ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                                                    : 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30'
                                            }`}
                                        >
                                            {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                            {isStreaming ? 'Live' : 'Paused'}
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
                            </div>

                            {/* Interactive Map Section */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Map className="w-5 h-5 text-blue-400" />
                                        Ocean Parameter Map - {parameters[selectedParameter]?.name}
                                    </h3>
                                    
                                </div>
                                {renderParameterMap()}
                                {selectedStation && (
                                    <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
                                        <h4 className="font-semibold text-white mb-2">Selected Station: {selectedStation.name}</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-slate-400">Temperature: </span>
                                                <span className="text-white font-medium">{selectedStation.temperature}°C</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400">Salinity: </span>
                                                <span className="text-white font-medium">{selectedStation.salinity} PSU</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400">Current: </span>
                                                <span className="text-white font-medium">{selectedStation.currentSpeed} m/s</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400">Depth: </span>
                                                <span className="text-white font-medium">{selectedStation.depth}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Analysis Controls */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                                            <option value="surface">Surface (0-10m)</option>
                                            <option value="shallow">Shallow (10-50m)</option>
                                            <option value="medium">Medium (50-200m)</option>
                                            <option value="deep">Deep (200m+)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Time Period</label>
                                        <select 
                                            value={timeFilter}
                                            onChange={(e) => setTimeFilter(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white"
                                        >
                                            {Object.entries(timeFilters).map(([key, label]) => (
                                                <option key={key} value={key}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Data Quality</label>
                                        <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white">
                                            <option>All Quality Levels</option>
                                            <option>High (&gt;95%)</option>
                                            <option>Medium (90-95%)</option>
                                            <option>Low (&lt;90%)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Search Stations</label>
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
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Current</th>
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
                                                        <div className="font-medium">{station.name}</div>
                                                        <div className="text-xs text-slate-400">{station.location}</div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="text-white font-medium">{station.temperature}°C</div>
                                                        <div className="text-xs text-slate-400">Surface</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-white font-medium text-sm">{station.salinity} PSU</td>
                                                    <td className="px-4 py-3 text-white font-medium text-sm">{station.ph}</td>
                                                    <td className="px-4 py-3 text-white font-medium text-sm">{station.dissolvedOxygen} mg/L</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <Compass className="w-4 h-4 text-blue-400" />
                                                            <span className="text-white font-medium">{station.currentSpeed}m/s</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-2 h-2 rounded-full ${
                                                                station.dataQuality >= 95 ? 'bg-green-400' :
                                                                station.dataQuality >= 90 ? 'bg-yellow-400' : 'bg-orange-400'
                                                            }`}></div>
                                                            <span className="text-white">{station.dataQuality}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <StatusBadge status={station.status} />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => handleStationClick(station)}
                                                                className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                                                                title="View on Map"
                                                            >
                                                                <MapPin className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('view_station'); setSelectedStation(station);}}
                                                                className="p-1 text-slate-400 hover:text-green-400 transition-colors"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('download_station'); setSelectedStation(station);}}
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
                                        Temperature Time Series
                                    </h3>
                                    <div ref={temperatureChartRef} className="w-full"></div>
                                </div>

                                {/* Salinity Profile */}
                                <div className="col-span-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Droplets className="w-5 h-5 text-blue-400" />
                                        Salinity Depth Profile
                                    </h3>
                                    <div ref={salinityChartRef} className="w-full"></div>
                                </div>
                            </div>

                            {/* Water Mass Analysis */}
                            <div className="grid grid-cols-12 gap-6 mb-6">
                                <div className="col-span-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-purple-400" />
                                        Water Mass Distribution
                                    </h3>
                                    <div ref={profileChartRef} className="w-full"></div>
                                </div>

                                {/* Real-time Parameters */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-yellow-400" />
                                        Current Conditions
                                    </h3>
                                    <div className="space-y-4">
                                        {filteredStations.slice(0, 2).map((station) => (
                                            <div key={station.id} className="bg-slate-700/30 rounded-lg p-3">
                                                <h4 className="font-semibold text-white mb-2 text-sm">{station.name}</h4>
                                                <div className="space-y-2 text-xs">
                                                    <ParameterRow icon={Thermometer} label="Temperature" value={`${station.temperature}°C`} color="text-red-400" />
                                                    <ParameterRow icon={Droplets} label="Salinity" value={`${station.salinity} PSU`} color="text-blue-400" />
                                                    <ParameterRow icon={Activity} label="pH" value={station.ph} color="text-green-400" />
                                                    <ParameterRow icon={Wind} label="Current" value={`${station.currentSpeed} m/s`} color="text-purple-400" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Data Quality Metrics */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    System Performance
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <QualityMetric label="Data Completeness" value={94.2} color="text-green-400" />
                                    <QualityMetric label="Sensor Accuracy" value={96.8} color="text-blue-400" />
                                    <QualityMetric label="Network Uptime" value={99.1} color="text-cyan-400" />
                                    <QualityMetric label="Processing Speed" value={87.5} color="text-yellow-400" />
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
                                {modalType === 'view_station' && `Station Details: ${selectedStation?.name}`}
                                {modalType === 'export_data' && 'Export Ocean Data'}
                                {modalType === 'download_station' && `Download Data: ${selectedStation?.name}`}
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
                                            <label className="block text-sm font-medium mb-2">Data Type</label>
                                            <select className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white">
                                                <option>CTD Profiles</option>
                                                <option>Current Meter Data</option>
                                                <option>Water Samples</option>
                                                <option>Satellite Data</option>
                                            </select>
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
                                        <h4 className="text-xl font-semibold text-white mb-2">Analysis Complete</h4>
                                        <p className="text-slate-300">Oceanographic analysis completed successfully for {selectedStations.length} stations.</p>
                                    </div>
                                    <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold mb-3 text-white">Key Findings:</h5>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                                Temperature anomalies detected in 2 stations
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <TrendingDown className="w-4 h-4 text-red-400" />
                                                Salinity variations within normal ranges
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                                1 station requires maintenance attention
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {modalType === 'view_station' && selectedStation && (
                                <div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-slate-700/30 rounded-lg p-3">
                                            <div className="text-sm text-slate-400">Station ID</div>
                                            <div className="font-mono text-white">{selectedStation.id}</div>
                                        </div>
                                        <div className="bg-slate-700/30 rounded-lg p-3">
                                            <div className="text-sm text-slate-400">Location</div>
                                            <div className="text-white">{selectedStation.location}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        <ParameterCard label="Temperature" value={`${selectedStation.temperature}°C`} icon={Thermometer} />
                                        <ParameterCard label="Salinity" value={`${selectedStation.salinity} PSU`} icon={Droplets} />
                                        <ParameterCard label="Depth" value={selectedStation.depth} icon={Waves} />
                                    </div>
                                    <div className="bg-slate-700/30 rounded-lg p-4">
                                        <h5 className="font-semibold mb-2 text-white">Recent Measurements</h5>
                                        <div className="text-sm space-y-1">
                                            <div className="flex justify-between">
                                                <span>Last Update:</span>
                                                <span>{new Date(selectedStation.lastUpdate).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Data Quality:</span>
                                                <span>{selectedStation.dataQuality}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Current Speed:</span>
                                                <span>{selectedStation.currentSpeed} m/s</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(modalType === 'export_data' || modalType === 'download_station') && (
                                <div>
                                    <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold mb-2 text-white">Export Options</h5>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-2">
                                                <input type="checkbox" className="rounded" defaultChecked />
                                                <span>Time Series Data</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input type="checkbox" className="rounded" defaultChecked />
                                                <span>Depth Profiles</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input type="checkbox" className="rounded" />
                                                <span>Quality Flags</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <select className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white">
                                            <option>CSV Format</option>
                                            <option>NetCDF Format</option>
                                            <option>JSON Format</option>
                                        </select>
                                        <select className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white">
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                            <option>Custom Range</option>
                                        </select>
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
                            {(modalType === 'upload_data' || modalType === 'export_data' || modalType === 'download_station') && (
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors">
                                    {modalType === 'upload_data' ? 'Upload Data' : 'Download Data'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, trend }) {
    const trendIcon = trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-400" /> :
                     trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-400" /> :
                     <Activity className="w-4 h-4 text-blue-400" />;

    return (
        <div className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700/70 transition-colors">
            <div className="flex items-center justify-between mb-1">
                <div className="text-2xl font-bold text-white">{value}</div>
                {trendIcon}
            </div>
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
                <Icon className={`w-3 h-3 ${color}`} />
                <span className="text-slate-300">{label}</span>
            </div>
            <span className="text-white font-medium">{value}</span>
        </div>
    );
}

function ParameterCard({ label, value, icon: Icon }) {
    return (
        <div className="bg-slate-700/30 rounded-lg p-2 text-center">
            <Icon className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-slate-400">{label}</div>
            <div className="text-white font-medium text-sm">{value}</div>
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