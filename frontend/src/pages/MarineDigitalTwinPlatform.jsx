import React, { useState, useEffect, useRef } from 'react';
import { 
    Database, Activity, AlertTriangle, BarChart3, Waves, Thermometer,
    Wind, Droplets, Eye, Settings, RefreshCw, MapPin, Calendar,
    TrendingUp, TrendingDown, Zap, Globe, Fish, Microscope
} from 'lucide-react';
import * as d3 from 'd3';
import Navbar from '../components/Navbar';



// Main Digital Twin Component
export default function MarineDigitalTwin() {
    const [selectedLayer, setSelectedLayer] = useState('Temperature');
    const [timeRange, setTimeRange] = useState('24h');
    const [isStreaming, setIsStreaming] = useState(true);
    const [currentConditions, setCurrentConditions] = useState({
        temperature: 26.3,
        waveHeight: 1.2,
        windSpeed: 15,
        visibility: 8.5,
        tide: 1.8
    });

    const mapRef = useRef(null);
    const chartRef = useRef(null);
    const ecosystemRef = useRef(null);

    // Real-time sensor data
    const sensorData = [
        { id: 'S001', name: 'Mumbai Station', lat: 19.0760, lon: 72.8777, status: 'Online', temperature: 26.8, salinity: 35.2, lastUpdate: '2 min ago', battery: 89 },
        { id: 'S002', name: 'Kochi Buoy', lat: 9.9312, lon: 76.2673, status: 'Online', temperature: 28.1, salinity: 34.8, lastUpdate: '1 min ago', battery: 94 },
        { id: 'S003', name: 'Chennai Deep', lat: 13.0827, lon: 80.2707, status: 'Online', temperature: 29.3, salinity: 35.1, lastUpdate: '3 min ago', battery: 76 },
        { id: 'S004', name: 'Goa Coastal', lat: 15.2993, lon: 74.1240, status: 'Offline', temperature: null, salinity: null, lastUpdate: '1 hour ago', battery: 23 },
        { id: 'S005', name: 'Vizag Port', lat: 17.6868, lon: 83.2185, status: 'Online', temperature: 27.6, salinity: 34.9, lastUpdate: '30 sec ago', battery: 88 },
        { id: 'S006', name: 'Kandla Station', lat: 23.0225, lon: 70.2208, status: 'Online', temperature: 24.2, salinity: 36.1, lastUpdate: '45 sec ago', battery: 91 },
    ];

    const ecosystemData = [
        { species: 'Phytoplankton', biomass: 2.8, trend: 'up', color: '#10b981' },
        { species: 'Zooplankton', biomass: 1.9, trend: 'stable', color: '#3b82f6' },
        { species: 'Small Fish', biomass: 0.8, trend: 'down', color: '#f59e0b' },
        { species: 'Large Fish', biomass: 0.4, trend: 'up', color: '#ef4444' },
        { species: 'Marine Mammals', biomass: 0.1, trend: 'stable', color: '#8b5cf6' }
    ];

    // Initialize D3 visualizations
    useEffect(() => {
        initializeMap();
        initializeChart();
        initializeEcosystemChart();
    }, []);

    // Update data every 30 seconds if streaming
    useEffect(() => {
        if (!isStreaming) return;
        
        const interval = setInterval(() => {
            setCurrentConditions(prev => ({
                ...prev,
                temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
                waveHeight: Math.max(0.1, prev.waveHeight + (Math.random() - 0.5) * 0.2),
                windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3),
                visibility: Math.max(1, Math.min(10, prev.visibility + (Math.random() - 0.5) * 0.5)),
                tide: prev.tide + (Math.random() - 0.5) * 0.1
            }));
        }, 30000);

        return () => clearInterval(interval);
    }, [isStreaming]);

    const initializeMap = () => {
        const container = mapRef.current;
        if (!container) return;

        // Clear previous content
        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 600;
        const height = 400;

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background", "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)")
            .style("border-radius", "12px");

        // Create projection for Indian Ocean
        const projection = d3.geoMercator()
            .center([77, 15])
            .scale(800)
            .translate([width/2, height/2]);

        // Add grid
        const xScale = d3.scaleLinear().domain([0, width]).range([0, width]);
        const yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

        svg.selectAll(".grid-line-x")
            .data(d3.range(0, width, 50))
            .enter()
            .append("line")
            .attr("class", "grid-line-x")
            .attr("x1", d => d)
            .attr("x2", d => d)
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke", "#334155")
            .attr("stroke-width", 0.5)
            .attr("opacity", 0.3);

        svg.selectAll(".grid-line-y")
            .data(d3.range(0, height, 50))
            .enter()
            .append("line")
            .attr("class", "grid-line-y")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", d => d)
            .attr("y2", d => d)
            .attr("stroke", "#334155")
            .attr("stroke-width", 0.5)
            .attr("opacity", 0.3);

        // Add sensors
        const sensors = svg.selectAll(".sensor")
            .data(sensorData)
            .enter()
            .append("g")
            .attr("class", "sensor")
            .attr("transform", d => {
                const [x, y] = projection([d.lon, d.lat]) || [0, 0];
                return `translate(${x}, ${y})`;
            });

        sensors.append("circle")
            .attr("r", 8)
            .attr("fill", d => d.status === 'Online' ? '#10b981' : '#ef4444')
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .on("mouseover", function(event, d) {
                // Show tooltip
                d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("position", "absolute")
                    .style("background", "#1e293b")
                    .style("color", "white")
                    .style("padding", "8px 12px")
                    .style("border-radius", "6px")
                    .style("font-size", "12px")
                    .style("pointer-events", "none")
                    .style("z-index", 1000)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px")
                    .html(`
                        <strong>${d.name}</strong><br/>
                        Status: ${d.status}<br/>
                        Temp: ${d.temperature || 'N/A'}°C<br/>
                        Salinity: ${d.salinity || 'N/A'} PSU<br/>
                        Battery: ${d.battery}%
                    `);
            })
            .on("mouseout", () => {
                d3.selectAll(".tooltip").remove();
            });

        // Add pulsing effect for online sensors
        sensors.filter(d => d.status === 'Online')
            .append("circle")
            .attr("r", 8)
            .attr("fill", "none")
            .attr("stroke", "#10b981")
            .attr("stroke-width", 2)
            .attr("opacity", 0.7)
            .transition()
            .duration(2000)
            .attr("r", 20)
            .attr("opacity", 0)
            .on("end", function() {
                d3.select(this).transition().duration(0).attr("r", 8).attr("opacity", 0.7);
            });

        // Add temperature heatmap overlay
        const heatmapData = [];
        for (let i = 0; i < width; i += 30) {
            for (let j = 0; j < height; j += 30) {
                heatmapData.push({
                    x: i,
                    y: j,
                    temperature: 24 + Math.random() * 8
                });
            }
        }

        const colorScale = d3.scaleSequential(d3.interpolateRdYlBu).domain([32, 24]);

        svg.selectAll(".heatmap")
            .data(heatmapData)
            .enter()
            .append("rect")
            .attr("class", "heatmap")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("width", 30)
            .attr("height", 30)
            .attr("fill", d => colorScale(d.temperature))
            .attr("opacity", 0.3);
    };

    const initializeChart = () => {
        const container = chartRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 400;
        const height = 200;
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Generate time series data
        const now = new Date();
        const data = d3.range(24).map(i => ({
            time: new Date(now.getTime() - (23-i) * 3600000),
            temperature: 26 + Math.sin(i * 0.5) * 3 + Math.random() * 2,
            salinity: 34.5 + Math.cos(i * 0.3) * 1.5 + Math.random() * 0.5
        }));

        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.time))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.temperature))
            .nice()
            .range([height - margin.bottom, margin.top]);

        const line = d3.line()
            .x(d => xScale(d.time))
            .y(d => yScale(d.temperature))
            .curve(d3.curveCardinal);

        // Add axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%H:%M")))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "11px");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "11px");

        // Add line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#06b6d4")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Add dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.time))
            .attr("cy", d => yScale(d.temperature))
            .attr("r", 3)
            .attr("fill", "#06b6d4");
    };

    const initializeEcosystemChart = () => {
        const container = ecosystemRef.current;
        if (!container) return;

        d3.select(container).selectAll("*").remove();

        const width = container.clientWidth || 300;
        const height = 250;
        const margin = { top: 20, right: 30, bottom: 60, left: 40 };

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const xScale = d3.scaleBand()
            .domain(ecosystemData.map(d => d.species))
            .range([margin.left, width - margin.right])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(ecosystemData, d => d.biomass)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Add bars
        svg.selectAll(".bar")
            .data(ecosystemData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.species))
            .attr("y", d => yScale(d.biomass))
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(0) - yScale(d.biomass))
            .attr("fill", d => d.color)
            .attr("opacity", 0.8);

        // Add trend indicators
        svg.selectAll(".trend")
            .data(ecosystemData)
            .enter()
            .append("text")
            .attr("class", "trend")
            .attr("x", d => xScale(d.species) + xScale.bandwidth()/2)
            .attr("y", d => yScale(d.biomass) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", d => d.trend === 'up' ? '#10b981' : d.trend === 'down' ? '#ef4444' : '#94a3b8')
            .attr("font-size", "16px")
            .text(d => d.trend === 'up' ? '↗' : d.trend === 'down' ? '↘' : '→');

        // Add axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "10px")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("fill", "#94a3b8")
            .style("font-size", "11px");
    };

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
                                <StatCard label="Active Sensors" value="847" />
                                <StatCard label="Data Quality" value="96%" />
                                <StatCard label="Sensors Tracked" value="156" />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-700">
                                <div className="text-cyan-400 text-sm font-medium mb-2">Team DOMInators</div>
                                <div className="text-slate-400 text-xs mb-2">Advanced Marine Analytics Platform</div>
                                <button 
                                    onClick={() => {
                                        initializeMap();
                                        initializeChart();
                                        initializeEcosystemChart();
                                    }}
                                    className="w-full px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs hover:bg-cyan-500/30 transition-colors"
                                >
                                    Refresh Your Core Data
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-cyan-500/20 rounded-xl">
                                            <Globe className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white">Marine Digital Twin Visualization</h1>
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
                                            {isStreaming ? 'Streaming' : 'Paused'}
                                        </button>
                                        <select 
                                            value={selectedLayer}
                                            onChange={(e) => setSelectedLayer(e.target.value)}
                                            className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"
                                        >
                                            <option>Temperature</option>
                                            <option>Salinity</option>
                                            <option>Current Flow</option>
                                            <option>Chlorophyll</option>
                                        </select>
                                    </div>
                                </div>
                                <p className="text-slate-300">Smart Agentic Gateway for Aquatic Data, Marine Analytics and Research</p>
                                
                                <div className="mt-4 bg-slate-700 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Team DOMInators • SIH 2024</div>
                            </div>

                            {/* Layer Controls */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-300 text-sm font-medium">View Layers:</span>
                                    <div className="flex gap-2">
                                        {['Temperature', 'Salinity', 'Current', 'Chlorophyll'].map((layer) => (
                                            <button
                                                key={layer}
                                                onClick={() => setSelectedLayer(layer)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                    selectedLayer === layer
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                                                }`}
                                            >
                                                {layer}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <span className="text-xs text-slate-400">Depth Range (m):</span>
                                        <select className="bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-white text-xs">
                                            <option>0-50</option>
                                            <option>50-200</option>
                                            <option>200-500</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Main Visualization Grid */}
                            <div className="grid grid-cols-12 gap-6 mb-6">
                                {/* Real-time Sensors */}
                                <div className="col-span-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                                    <div className="p-4 border-b border-slate-700">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-cyan-400" />
                                            Real-time Sensors
                                        </h3>
                                    </div>
                                    <div className="p-4">
                                        <div className="grid grid-cols-12 text-xs text-slate-400 mb-2 font-medium">
                                            <div className="col-span-2">Sensor ID</div>
                                            <div className="col-span-3">Name</div>
                                            <div className="col-span-2">Status</div>
                                            <div className="col-span-2">Last Update</div>
                                            <div className="col-span-2">Battery</div>
                                        </div>
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {sensorData.map((sensor) => (
                                                <div key={sensor.id} className="grid grid-cols-12 text-sm py-2 hover:bg-slate-700/30 rounded-lg px-2 transition-colors">
                                                    <div className="col-span-2 text-white font-mono">{sensor.id}</div>
                                                    <div className="col-span-3 text-slate-300">{sensor.name}</div>
                                                    <div className="col-span-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            sensor.status === 'Online' 
                                                                ? 'bg-green-500/20 text-green-400' 
                                                                : 'bg-red-500/20 text-red-400'
                                                        }`}>
                                                            {sensor.status}
                                                        </span>
                                                    </div>
                                                    <div className="col-span-2 text-slate-400">{sensor.lastUpdate}</div>
                                                    <div className="col-span-3 text-slate-300">{sensor.battery}%</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Current Conditions */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                                    <div className="p-4 border-b border-slate-700">
                                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                            <Waves className="w-5 h-5 text-cyan-400" />
                                            Current Conditions
                                        </h3>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <ConditionCard 
                                            icon={Thermometer} 
                                            label="Sea Surface Temp" 
                                            value={`${currentConditions.temperature.toFixed(1)}°C`}
                                            color="text-orange-400"
                                        />
                                        <ConditionCard 
                                            icon={Waves} 
                                            label="Wave Height" 
                                            value={`${currentConditions.waveHeight.toFixed(1)} m`}
                                            color="text-blue-400"
                                        />
                                        <ConditionCard 
                                            icon={Wind} 
                                            label="Wind Speed" 
                                            value={`${currentConditions.windSpeed.toFixed(0)} km/h`}
                                            color="text-green-400"
                                        />
                                        <ConditionCard 
                                            icon={Eye} 
                                            label="Visibility" 
                                            value={`${currentConditions.visibility.toFixed(1)} km`}
                                            color="text-purple-400"
                                        />
                                        <ConditionCard 
                                            icon={TrendingUp} 
                                            label="Tide" 
                                            value={`High (+${currentConditions.tide.toFixed(1)}m)`}
                                            color="text-cyan-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Interactive Map and Charts */}
                            <div className="grid grid-cols-12 gap-6 mb-6">
                                {/* Main Map */}
                                {/* <div className="col-span-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-white">Interactive Ocean Map</h3>
                                        <div className="text-xs text-slate-400">
                                            Current Layer: <span className="text-cyan-400">{selectedLayer}</span>
                                        </div>
                                    </div>
                                    <div ref={mapRef} className="w-full h-80 bg-slate-900/50 rounded-lg border border-slate-700"></div>
                                </div> */}

                                {/* Temperature Chart */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4">Temperature Trends</h3>
                                    <div ref={chartRef} className="w-full"></div>
                                </div>
                            </div>

                            {/* Ecosystem Modeling */}
                            <div className="grid grid-cols-12 gap-6">
                                {/* Ecosystem Chart */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Fish className="w-5 h-5 text-green-400" />
                                        Ecosystem Biomass
                                    </h3>
                                    <div ref={ecosystemRef} className="w-full"></div>
                                </div>

                                {/* Species Detection */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Microscope className="w-5 h-5 text-purple-400" />
                                        Species Detection
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { species: 'Dolphins', confidence: '94.2%', trend: 'stable', color: 'text-blue-400' },
                                            { species: 'Sea Turtles', confidence: '87.6%', trend: 'increasing', color: 'text-green-400' },
                                            { species: 'Whale Shark', confidence: '91.3%', trend: 'decreasing', color: 'text-yellow-400' },
                                            { species: 'Coral Polyps', confidence: '88.9%', trend: 'stable', color: 'text-pink-400' }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                                                <div>
                                                    <div className={`font-medium ${item.color}`}>{item.species}</div>
                                                    <div className="text-xs text-slate-400">Confidence: {item.confidence}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-xs font-medium ${
                                                        item.trend === 'increasing' ? 'text-green-400' :
                                                        item.trend === 'decreasing' ? 'text-red-400' : 'text-slate-400'
                                                    }`}>
                                                        {item.trend === 'increasing' ? '↗ +12%' :
                                                         item.trend === 'decreasing' ? '↘ -8%' : '→ Stable'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Environmental Impact */}
                                <div className="col-span-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                        Environmental Alerts
                                    </h3>
                                    <div className="space-y-3">
                                        <AlertCard 
                                            type="warning" 
                                            title="Temperature Anomaly" 
                                            message="Unusual warming detected in Arabian Sea sector AS-12" 
                                            time="2 hours ago"
                                        />
                                        <AlertCard 
                                            type="info" 
                                            title="Algal Bloom Detected" 
                                            message="Increased chlorophyll levels near Chennai coast" 
                                            time="4 hours ago"
                                        />
                                        <AlertCard 
                                            type="success" 
                                            title="Coral Recovery" 
                                            message="Positive growth indicators in Lakshadweep" 
                                            time="1 day ago"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                    <div className="text-cyan-400 font-medium mb-1">Team DOMInators</div>
                                    <div className="text-slate-400 text-sm">Advanced Marine Analytics Platform</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                    <div className="text-pink-400 font-medium mb-1">Support</div>
                                    <div className="text-slate-400 text-sm">24/7 Technical Support Available</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                    <div className="text-purple-400 font-medium mb-1">Integration</div>
                                    <div className="text-slate-400 text-sm">API Documentation Available</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarLink({ icon: Icon, label, active = false }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
            active 
                ? 'bg-emerald-500/20 text-emerald-400' 
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

function ConditionCard({ icon: Icon, label, value, color }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
            <Icon className={`w-5 h-5 ${color}`} />
            <div>
                <div className="text-slate-300 text-sm">{label}</div>
                <div className="text-white font-semibold">{value}</div>
            </div>
        </div>
    );
}

function AlertCard({ type, title, message, time }) {
    const typeConfig = {
        warning: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400' },
        info: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
        success: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400' }
    };
    
    const config = typeConfig[type] || typeConfig.info;
    
    return (
        <div className={`${config.bg} border ${config.border} rounded-lg p-3`}>
            <div className={`font-medium text-sm ${config.text}`}>{title}</div>
            <div className="text-xs text-slate-300 mt-1">{message}</div>
            <div className="text-xs text-slate-500 mt-2">{time}</div>
        </div>
    );
}