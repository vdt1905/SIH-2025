import React, { useState, useEffect, useRef } from 'react';
import { 
    MapPin, Calendar, TrendingUp, Fish, Satellite, Navigation,
    Waves, Thermometer, Clock, AlertTriangle, Database, Zap,
    Play, Pause, RefreshCw, Download, Filter, Search,
    Globe, Compass, Target, Route, BarChart3, Activity,
    Settings, Maximize2, Minimize2, Camera, Share
} from 'lucide-react';
import * as d3 from 'd3';
import Navbar from '../components/Navbar'
import VarunAIAgent from '../components/VarunAIAgent'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// Enhanced Navbar component


// Enhanced VARUN AI Agent component with more features


// Enhanced Leaflet Map Component
const LeafletMap = ({ whaleSharks, selectedShark, selectedLayer, movementHistory, environmentData }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markersRef = useRef({});
    const layersRef = useRef([]);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        if (!mapRef.current) return;

        // Load Leaflet CSS and JS if not already loaded
        if (!window.L) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => initializeMap();
            document.head.appendChild(script);
        } else {
            initializeMap();
        }

        function initializeMap() {
            const L = window.L;
            
            // Only initialize once
            if (isInitializedRef.current) {
                updateMapData();
                return;
            }

            // Clear any existing map instance properly
            if (mapInstance.current) {
                mapInstance.current.off();
                mapInstance.current.remove();
                mapInstance.current = null;
            }

            // Clear the container
            if (mapRef.current) {
                mapRef.current.innerHTML = '';
            }

            try {
                mapInstance.current = L.map(mapRef.current, {
                    zoomControl: false,
                    attributionControl: false
                }).setView([12.0, 75.0], 6);

                isInitializedRef.current = true;

                // Add tile layer with dark theme
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '© CartoDB',
                    maxZoom: 19
                }).addTo(mapInstance.current);

                // Add zoom control to top right
                L.control.zoom({ position: 'topright' }).addTo(mapInstance.current);

                // Add scale
                L.control.scale({ position: 'bottomleft' }).addTo(mapInstance.current);

                updateMapData();
            } catch (error) {
                console.error('Error initializing map:', error);
                // Fallback to simple visualization
                showMapFallback();
            }
        }

        function showMapFallback() {
            if (!mapRef.current) return;
            
            mapRef.current.innerHTML = `
                <div class="w-full h-96 bg-slate-900/50 rounded-lg border border-slate-700 flex items-center justify-center">
                    <div class="text-center text-slate-400">
                        <div class="text-lg font-medium mb-2">Interactive Map Loading...</div>
                        <div class="text-sm">Tracking ${whaleSharks.length} whale sharks in the Indian Ocean</div>
                        <div class="mt-4 grid grid-cols-1 gap-2 text-xs">
                            ${whaleSharks.map(shark => 
                                `<div class="flex items-center justify-center gap-2">
                                    <div class="w-3 h-3 rounded-full" style="background-color: ${shark.trackColor}"></div>
                                    <span>${shark.name} - ${shark.currentLocation.lat.toFixed(2)}°N, ${shark.currentLocation.lon.toFixed(2)}°E</span>
                                </div>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
        }

        function updateMapData() {
            const L = window.L;
            if (!mapInstance.current || !L) return;

            // Clear existing layers
            layersRef.current.forEach(layer => {
                if (mapInstance.current && mapInstance.current.hasLayer(layer)) {
                    mapInstance.current.removeLayer(layer);
                }
            });
            layersRef.current = [];

            // Clear existing markers
            Object.values(markersRef.current).forEach(marker => {
                if (mapInstance.current && mapInstance.current.hasLayer(marker)) {
                    mapInstance.current.removeLayer(marker);
                }
            });
            markersRef.current = {};

            // Add environmental layer
            addEnvironmentalLayer();

            // Add whale shark markers and tracks
            whaleSharks.forEach(shark => {
                addSharkToMap(shark);
            });
        }

        function addEnvironmentalLayer() {
            const L = window.L;
            
            if (selectedLayer === 'temperature') {
                addTemperatureLayer();
            } else if (selectedLayer === 'chlorophyll') {
                addChlorophyllLayer();
            } else if (selectedLayer === 'currents') {
                addCurrentsLayer();
            }
        }

        function addTemperatureLayer() {
            const L = window.L;
            
            // Add temperature gradient overlay
            const bounds = [[5, 65], [25, 95]];
            const temperatureOverlay = L.rectangle(bounds, {
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.2,
                weight: 1
            }).addTo(mapInstance.current);
            
            layersRef.current.push(temperatureOverlay);
            temperatureOverlay.bindPopup(`Sea Surface Temperature: ${environmentData.temperature.toFixed(1)}°C`);
        }

        function addChlorophyllLayer() {
            const L = window.L;
            
            // Add chlorophyll concentration overlay
            const bounds = [[5, 65], [25, 95]];
            const chlorophyllOverlay = L.rectangle(bounds, {
                color: '#10b981',
                fillColor: '#10b981',
                fillOpacity: 0.3,
                weight: 1
            }).addTo(mapInstance.current);
            
            layersRef.current.push(chlorophyllOverlay);
            chlorophyllOverlay.bindPopup(`Chlorophyll Concentration: ${environmentData.chlorophyll.toFixed(2)} mg/m³`);
        }

        function addCurrentsLayer() {
            const L = window.L;
            
            // Add current vectors
            for (let lat = 6; lat < 24; lat += 2) {
                for (let lng = 66; lng < 94; lng += 2) {
                    const startPoint = [lat, lng];
                    const endPoint = [
                        lat + Math.cos(environmentData.currentDirection * Math.PI / 180) * 0.5,
                        lng + Math.sin(environmentData.currentDirection * Math.PI / 180) * 0.5
                    ];
                    
                    const currentLine = L.polyline([startPoint, endPoint], {
                        color: '#3b82f6',
                        weight: 2,
                        opacity: 0.7
                    }).addTo(mapInstance.current);
                    
                    layersRef.current.push(currentLine);
                }
            }
        }

        function addSharkToMap(shark) {
            const L = window.L;
            
            // Add movement track
            const sharkHistory = movementHistory.find(h => h.sharkId === shark.id);
            if (sharkHistory && sharkHistory.data.length > 1) {
                const trackPoints = sharkHistory.data.map(point => [point.lat, point.lon]);
                
                const trackLine = L.polyline(trackPoints, {
                    color: shark.trackColor,
                    weight: 3,
                    opacity: 0.7,
                    smoothFactor: 1
                }).addTo(mapInstance.current);
                
                layersRef.current.push(trackLine);
            }

            // Custom shark icon
            const sharkIcon = L.divIcon({
                html: `
                    <div style="
                        width: 24px;
                        height: 24px;
                        background: ${shark.trackColor};
                        border: 2px solid white;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        animation: pulse 2s infinite;
                    ">
                        <div style="
                            width: 8px;
                            height: 8px;
                            background: white;
                            border-radius: 50%;
                        "></div>
                    </div>
                    <style>
                        @keyframes pulse {
                            0% { box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 0 ${shark.trackColor}40; }
                            50% { box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 10px ${shark.trackColor}00; }
                            100% { box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 0 ${shark.trackColor}00; }
                        }
                    </style>
                `,
                className: 'custom-shark-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const marker = L.marker([shark.currentLocation.lat, shark.currentLocation.lon], { icon: sharkIcon })
                .addTo(mapInstance.current);

            // Enhanced popup with real-time data
            const popupContent = `
                <div style="min-width: 200px; color: #1e293b; font-family: system-ui;">
                    <h4 style="margin: 0 0 8px 0; color: ${shark.trackColor}; font-weight: bold;">${shark.name} (${shark.id})</h4>
                    <div style="font-size: 12px; line-height: 1.4;">
                        <div><strong>Species:</strong> ${shark.species}</div>
                        <div><strong>Length:</strong> ${shark.length}m</div>
                        <div><strong>Age:</strong> ${shark.age}</div>
                        <div><strong>Current Depth:</strong> ${shark.depth.toFixed(1)}m</div>
                        <div><strong>Water Temp:</strong> ${shark.temperature.toFixed(1)}°C</div>
                        <div><strong>Speed:</strong> ${shark.speed.toFixed(1)} m/s</div>
                        <div><strong>Battery:</strong> ${shark.battery.toFixed(0)}%</div>
                        <div><strong>Status:</strong> <span style="color: ${shark.status === 'Active' ? 'green' : 'red'}">${shark.status}</span></div>
                        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e2e8f0;">
                            <small><strong>Last Update:</strong> ${shark.lastTransmission.toLocaleTimeString()}</small>
                        </div>
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent);
            markersRef.current[shark.id] = marker;

            // Highlight selected shark
            if (selectedShark && selectedShark.id === shark.id) {
                marker.openPopup();
                mapInstance.current.setView([shark.currentLocation.lat, shark.currentLocation.lon], 8);
            }
        }

        return () => {
            // Cleanup function
            if (mapInstance.current) {
                mapInstance.current.off();
                mapInstance.current.remove();
                mapInstance.current = null;
                isInitializedRef.current = false;
            }
        };
    }, [whaleSharks, selectedShark, selectedLayer, movementHistory, environmentData]);

    return (
        <div 
            ref={mapRef} 
            className="w-full h-96 bg-slate-900/50 rounded-lg border border-slate-700 relative"
        >
            <div className="absolute top-2 left-2 z-10 bg-slate-800/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-slate-300">
                Indian Ocean • Layer: {selectedLayer}
            </div>
            <div className="absolute top-2 right-2 z-10 bg-slate-800/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-slate-300">
                {whaleSharks.filter(s => s.status === 'Active').length} Active Sharks
            </div>
        </div>
    );
};


export default function WhaleSharkDigitalTwin() {
    const [selectedLayer, setSelectedLayer] = useState('movement');
    const [timeRange, setTimeRange] = useState('7d');
    const [isStreaming, setIsStreaming] = useState(true);
    const [isVarunOpen, setIsVarunOpen] = useState(false);
    const [selectedShark, setSelectedShark] = useState(null);
    const [simulationSpeed, setSimulationSpeed] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(true);

    const [environmentData, setEnvironmentData] = useState({
        temperature: 28.3,
        chlorophyll: 0.45,
        currentSpeed: 1.2,
        currentDirection: 145,
        planktonDensity: 'High'
    });

    // Enhanced whale shark data
    const [whaleSharks, setWhaleSharks] = useState([
        {
            id: 'WS001',
            name: 'Whale',
            species: 'Rhincodon typus',
            length: 8.2,
            weight: 12000,
            lastTransmission: new Date(),
            status: 'Active',
            battery: 87,
            currentLocation: { lat: 18.9204, lon: 72.8301 },
            trackColor: '#10b981',
            movementPattern: 'Migratory',
            age: 'Juvenile',
            taggedDate: '2024-01-15',
            depth: 25,
            temperature: 28.5,
            speed: 1.2,
            health: 'Good',
            lastFeedingTime: '6 hours ago'
        },
        {
            id: 'WS002',
            name: 'Shark',
            species: 'Rhincodon typus',
            length: 10.5,
            weight: 15000,
            lastTransmission: new Date(Date.now() - 3600000),
            status: 'Active',
            battery: 92,
            currentLocation: { lat: 9.9312, lon: 76.2673 },
            trackColor: '#3b82f6',
            movementPattern: 'Resident',
            age: 'Adult',
            taggedDate: '2023-11-20',
            depth: 18,
            temperature: 29.1,
            speed: 0.8,
            health: 'Excellent',
            lastFeedingTime: '2 hours ago'
        },
        {
            id: 'WS003',
            name: 'Dolphin',
            species: 'Rhincodon typus',
            length: 7.8,
            weight: 11000,
            lastTransmission: new Date(Date.now() - 7200000),
            status: 'Active',
            battery: 76,
            currentLocation: { lat: 13.0827, lon: 80.2707 },
            trackColor: '#f59e0b',
            movementPattern: 'Migratory',
            age: 'Juvenile',
            taggedDate: '2024-02-10',
            depth: 32,
            temperature: 27.8,
            speed: 1.5,
            health: 'Good',
            lastFeedingTime: '4 hours ago'
        }
    ]);

    const [movementHistory, setMovementHistory] = useState([]);
    const [animationFrame, setAnimationFrame] = useState(null);
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            type: 'warning',
            title: 'Monsoon Migration Pattern',
            message: 'Sharks showing increased northward movement. Monitor for aggregation events.',
            time: new Date(Date.now() - 7200000),
            priority: 'high'
        },
        {
            id: 2,
            type: 'info',
            title: 'High Plankton Concentration',
            message: 'Optimal feeding conditions detected near Lakshadweep islands.',
            time: new Date(Date.now() - 18000000),
            priority: 'medium'
        },
        {
            id: 3,
            type: 'success',
            title: 'Conservation Success',
            message: 'All tracked sharks within protected marine zones.',
            time: new Date(Date.now() - 86400000),
            priority: 'low'
        }
    ]);

    // Generate realistic movement history
    useEffect(() => {
        generateMovementHistory();
    }, [whaleSharks]);

    // Real-time simulation
    useEffect(() => {
        if (!isStreaming) return;

        let animationId;
        let lastUpdateTime = Date.now();

        const updateSimulation = () => {
            const currentTime = Date.now();
            const deltaTime = (currentTime - lastUpdateTime) * simulationSpeed;
            
            if (deltaTime > 5000) { // Update every 5 seconds (adjusted by speed)
                updateSharkPositions();
                updateEnvironmentData();
                lastUpdateTime = currentTime;
            }
            
            animationId = requestAnimationFrame(updateSimulation);
        };

        animationId = requestAnimationFrame(updateSimulation);
        setAnimationFrame(animationId);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isStreaming, simulationSpeed]);

    const generateMovementHistory = () => {
        const history = [];
        const now = new Date();
        
        whaleSharks.forEach(shark => {
            const sharkHistory = [];
            let currentLat = shark.currentLocation.lat;
            let currentLon = shark.currentLocation.lon;
            
            // Generate 48 hours of movement history
            for (let i = 48; i >= 0; i--) {
                const time = new Date(now.getTime() - i * 3600000);
                
                // Simulate realistic movement with ocean currents
                const currentInfluence = Math.sin(i * 0.1) * 0.05;
                currentLat += (Math.random() - 0.5 + currentInfluence) * 0.02;
                currentLon += (Math.random() - 0.5 + currentInfluence) * 0.02;
                
                // Keep within Indian Ocean bounds
                currentLat = Math.max(5, Math.min(25, currentLat));
                currentLon = Math.max(65, Math.min(95, currentLon));
                
                sharkHistory.push({
                    time,
                    lat: currentLat,
                    lon: currentLon,
                    depth: Math.max(5, 10 + Math.sin(i * 0.3) * 20 + Math.random() * 5),
                    temperature: 26 + Math.sin(i * 0.2) * 4 + Math.random() * 2,
                    speed: Math.max(0.1, 0.5 + Math.random() * 2)
                });
            }
            
            history.push({ sharkId: shark.id, data: sharkHistory });
        });
        
        setMovementHistory(history);
    };

    const updateSharkPositions = () => {
        setWhaleSharks(prevSharks => 
            prevSharks.map(shark => {
                // Realistic movement simulation
                const tempEffect = (shark.temperature - 27) * 0.001;
                const currentEffect = Math.sin(Date.now() * 0.001) * 0.01;
                
                const newLat = shark.currentLocation.lat + (Math.random() - 0.5 + tempEffect + currentEffect) * 0.005;
                const newLon = shark.currentLocation.lon + (Math.random() - 0.5 + tempEffect - currentEffect) * 0.005;
                const newDepth = Math.max(5, 10 + Math.sin(Date.now() * 0.001) * 20 + Math.random() * 5);
                const newTemp = 26 + Math.sin(Date.now() * 0.0005) * 4 + Math.random() * 2;
                const newSpeed = Math.max(0.1, 0.5 + Math.random() * 2);

                return {
                    ...shark,
                    currentLocation: {
                        lat: Math.max(5, Math.min(25, newLat)),
                        lon: Math.max(65, Math.min(95, newLon))
                    },
                    depth: newDepth,
                    temperature: newTemp,
                    speed: newSpeed,
                    lastTransmission: new Date(),
                    battery: Math.max(50, shark.battery - Math.random() * 0.1)
                };
            })
        );

        // Update movement history
        setMovementHistory(prev => 
            prev.map(sharkHistory => {
                const shark = whaleSharks.find(s => s.id === sharkHistory.sharkId);
                if (!shark) return sharkHistory;

                const newDataPoint = {
                    time: new Date(),
                    lat: shark.currentLocation.lat,
                    lon: shark.currentLocation.lon,
                    depth: shark.depth,
                    temperature: shark.temperature,
                    speed: shark.speed
                };

                return {
                    ...sharkHistory,
                    data: [...sharkHistory.data.slice(1), newDataPoint]
                };
            })
        );
    };

    const updateEnvironmentData = () => {
        setEnvironmentData(prev => ({
            temperature: Math.max(24, Math.min(35, prev.temperature + (Math.random() - 0.5) * 0.2)),
            chlorophyll: Math.max(0.1, Math.min(2, prev.chlorophyll + (Math.random() - 0.5) * 0.03)),
            currentSpeed: Math.max(0.1, Math.min(3, prev.currentSpeed + (Math.random() - 0.5) * 0.05)),
            currentDirection: (prev.currentDirection + (Math.random() - 0.5) * 2) % 360,
            planktonDensity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
        }));
    };

    // Prepare chart data
    const getDepthChartData = () => {
        const shark = selectedShark || whaleSharks[0];
        const sharkHistory = movementHistory.find(h => h.sharkId === shark?.id);
        if (!sharkHistory) return [];
        
        return sharkHistory.data.slice(-24).map(point => ({
            time: point.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            depth: point.depth,
            temperature: point.temperature
        }));
    };

    const getEnvironmentChartData = () => [
        { name: 'Temperature', value: environmentData.temperature, max: 35, color: '#ef4444' },
        { name: 'Chlorophyll', value: environmentData.chlorophyll, max: 2, color: '#10b981' },
        { name: 'Current Speed', value: environmentData.currentSpeed, max: 3, color: '#3b82f6' }
    ];

    const getPredictionData = () => {
        const baseProbability = 0.7 + (environmentData.temperature - 27) * 0.02;
        return Array.from({ length: 7 }, (_, i) => ({
            day: `Day ${i + 1}`,
            probability: Math.max(0.1, Math.min(0.9, baseProbability - i * 0.08 + Math.random() * 0.1)) * 100
        }));
    };

    const handleExportData = () => {
        const data = {
            whaleSharks,
            movementHistory,
            environmentData,
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `whale-shark-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
           <VarunAIAgent 
               isOpen={isVarunOpen} 
               onToggle={() => setIsVarunOpen(!isVarunOpen)}
               currentPage="general" // or "oceanography", "edna", "digital_twin", etc.
           />
            
            <div className="pt-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Enhanced Header */}
                    

                    <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'grid-cols-12'} gap-6`}>
                        {!isFullscreen && (
                            <div className="col-span-3 space-y-6">
                                {/* Simulation Controls */}
                                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-cyan-400" />
                                        Simulation Controls
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-slate-300 text-sm">Speed</span>
                                                <span className="text-cyan-400 text-sm font-mono">{simulationSpeed}x</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="5"
                                                step="0.5"
                                                value={simulationSpeed}
                                                onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                                            />
                                            <div className="flex justify-between text-xs text-slate-400 mt-1">
                                                <span>0.5x</span>
                                                <span>5x</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 text-sm mb-2">Environmental Layer</label>
                                            <select 
                                                value={selectedLayer}
                                                onChange={(e) => setSelectedLayer(e.target.value)}
                                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                                            >
                                                <option value="movement">Movement Tracks</option>
                                                <option value="temperature">Sea Temperature</option>
                                                <option value="chlorophyll">Chlorophyll</option>
                                                <option value="currents">Ocean Currents</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-slate-300 text-sm mb-2">Time Range</label>
                                            <select 
                                                value={timeRange}
                                                onChange={(e) => setTimeRange(e.target.value)}
                                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                                            >
                                                <option value="1h">Last 1 Hour</option>
                                                <option value="6h">Last 6 Hours</option>
                                                <option value="24h">Last 24 Hours</option>
                                                <option value="7d">Last 7 Days</option>
                                                <option value="30d">Last 30 Days</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Sharks List */}
                                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                        <Fish className="w-5 h-5 text-cyan-400" />
                                        Active Whale Sharks
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        {whaleSharks.map(shark => (
                                            <div 
                                                key={shark.id}
                                                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                                                    selectedShark?.id === shark.id 
                                                        ? 'bg-cyan-500/20 border-cyan-500/30 transform scale-105' 
                                                        : 'bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/50 hover:scale-102'
                                                }`}
                                                onClick={() => setSelectedShark(shark)}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            className="w-3 h-3 rounded-full"
                                                            style={{ backgroundColor: shark.trackColor }}
                                                        ></div>
                                                        <div className="text-white font-semibold">{shark.name}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            shark.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                                                        }`}></div>
                                                        <span className="text-xs text-slate-400">{shark.battery.toFixed(0)}%</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-xs text-slate-400 mb-1">{shark.id} • {shark.age}</div>
                                                
                                                <div className="text-xs text-slate-300">
                                                    {shark.currentLocation.lat.toFixed(3)}°N, {shark.currentLocation.lon.toFixed(3)}°E
                                                </div>
                                                
                                                <div className="flex justify-between text-xs text-slate-400 mt-2">
                                                    <span>Depth: {shark.depth.toFixed(0)}m</span>
                                                    <span>Temp: {shark.temperature.toFixed(1)}°C</span>
                                                </div>
                                                
                                                <div className="mt-2 text-xs">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-slate-400">Health:</span>
                                                        <span className={`font-medium ${
                                                            shark.health === 'Excellent' ? 'text-green-400' :
                                                            shark.health === 'Good' ? 'text-yellow-400' : 'text-red-400'
                                                        }`}>{shark.health}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span className="text-slate-400">Last Fed:</span>
                                                        <span className="text-slate-300">{shark.lastFeedingTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Statistics */}
                                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-cyan-400" />
                                        System Status
                                    </h3>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        <StatCard icon={Database} label="Data Points" value="24.7K" color="text-blue-400" />
                                        <StatCard icon={Zap} label="Update Rate" value="5s" color="text-green-400" />
                                        <StatCard icon={Target} label="Accuracy" value="98.2%" color="text-purple-400" />
                                        <StatCard icon={Satellite} label="Coverage" value="Indian Ocean" color="text-cyan-400" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Main Content Area */}
                        <div className={isFullscreen ? 'col-span-1' : 'col-span-9'}>
                            {/* Interactive Map */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Globe className="w-6 h-6 text-cyan-400" />
                                        Live Tracking Map
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-green-400">{whaleSharks.filter(s => s.status === 'Active').length} Active</span>
                                        </div>
                                        <div className="text-slate-400">
                                            Layer: <span className="text-cyan-400 capitalize">{selectedLayer}</span>
                                        </div>
                                        <button 
                                            onClick={() => generateMovementHistory()}
                                            className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center gap-1"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                            Refresh
                                        </button>
                                    </div>
                                </div>
                                
                                <LeafletMap 
                                    whaleSharks={whaleSharks}
                                    selectedShark={selectedShark}
                                    selectedLayer={selectedLayer}
                                    movementHistory={movementHistory}
                                    environmentData={environmentData}
                                />
                            </div>

                            {/* Analytics Dashboard */}
                            {showAnalytics && (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                    {/* Depth Profile Chart */}
                                    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <Route className="w-5 h-5 text-blue-400" />
                                            {selectedShark ? `${selectedShark.name}'s Depth` : 'Depth Profile'}
                                        </h3>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <AreaChart data={getDepthChartData()}>
                                                <defs>
                                                    <linearGradient id="depthGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis 
                                                    dataKey="time" 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                                />
                                                <YAxis 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                                />
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                                <Tooltip 
                                                    contentStyle={{
                                                        backgroundColor: '#1e293b',
                                                        border: '1px solid #475569',
                                                        borderRadius: '8px',
                                                        color: '#f1f5f9'
                                                    }}
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="depth" 
                                                    stroke="#06b6d4" 
                                                    strokeWidth={2}
                                                    fillOpacity={1} 
                                                    fill="url(#depthGradient)" 
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Environmental Conditions */}
                                    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <Waves className="w-5 h-5 text-green-400" />
                                            Environment
                                        </h3>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <BarChart data={getEnvironmentChartData()}>
                                                <XAxis 
                                                    dataKey="name" 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                                />
                                                <YAxis 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                                />
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                                <Tooltip 
                                                    contentStyle={{
                                                        backgroundColor: '#1e293b',
                                                        border: '1px solid #475569',
                                                        borderRadius: '8px',
                                                        color: '#f1f5f9'
                                                    }}
                                                />
                                                <Bar dataKey="value" fill="#10b981" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                        
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                                <div className="text-slate-300 text-xs">Current Direction</div>
                                                <div className="text-white font-bold text-sm">{environmentData.currentDirection.toFixed(0)}°</div>
                                            </div>
                                            <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                                <div className="text-slate-300 text-xs">Plankton Density</div>
                                                <div className="text-white font-bold text-sm">{environmentData.planktonDensity}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prediction Chart */}
                                    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-purple-400" />
                                            Encounter Probability
                                        </h3>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <LineChart data={getPredictionData()}>
                                                <XAxis 
                                                    dataKey="day" 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                                />
                                                <YAxis 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                                />
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                                <Tooltip 
                                                    contentStyle={{
                                                        backgroundColor: '#1e293b',
                                                        border: '1px solid #475569',
                                                        borderRadius: '8px',
                                                        color: '#f1f5f9'
                                                    }}
                                                    formatter={(value) => [`${value.toFixed(1)}%`, 'Probability']}
                                                />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="probability" 
                                                    stroke="#8b5cf6" 
                                                    strokeWidth={3}
                                                    strokeDasharray="5 5"
                                                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}

                            {/* Detailed Information Panel */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Selected Shark Details */}
                                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Target className="w-5 h-5 text-cyan-400" />
                                        {selectedShark ? `${selectedShark.name} Details` : 'Select a Shark for Details'}
                                    </h3>
                                    
                                    {selectedShark ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl">
                                                <div 
                                                    className="w-4 h-4 rounded-full"
                                                    style={{ backgroundColor: selectedShark.trackColor }}
                                                ></div>
                                                <div>
                                                    <div className="text-white font-bold text-lg">{selectedShark.name}</div>
                                                    <div className="text-slate-400 text-sm">{selectedShark.id} • {selectedShark.species}</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <DetailCard label="Length" value={`${selectedShark.length} meters`} />
                                                <DetailCard label="Weight" value={`${(selectedShark.weight / 1000).toFixed(1)} tons`} />
                                                <DetailCard label="Age Class" value={selectedShark.age} />
                                                <DetailCard label="Movement Pattern" value={selectedShark.movementPattern} />
                                                <DetailCard label="Tagged Date" value={new Date(selectedShark.taggedDate).toLocaleDateString()} />
                                                <DetailCard label="Health Status" value={selectedShark.health} />
                                            </div>

                                            <div className="p-4 bg-slate-700/30 rounded-xl">
                                                <h4 className="text-white font-medium mb-3">Current Status</h4>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="text-center p-2 bg-slate-600/30 rounded-lg">
                                                        <div className="text-slate-400 text-xs">Position</div>
                                                        <div className="text-white font-mono text-xs">
                                                            {selectedShark.currentLocation.lat.toFixed(4)}°N<br/>
                                                            {selectedShark.currentLocation.lon.toFixed(4)}°E
                                                        </div>
                                                    </div>
                                                    <div className="text-center p-2 bg-slate-600/30 rounded-lg">
                                                        <div className="text-slate-400 text-xs">Depth</div>
                                                        <div className="text-white font-bold">{selectedShark.depth.toFixed(1)}m</div>
                                                    </div>
                                                    <div className="text-center p-2 bg-slate-600/30 rounded-lg">
                                                        <div className="text-slate-400 text-xs">Water Temp</div>
                                                        <div className="text-white font-bold">{selectedShark.temperature.toFixed(1)}°C</div>
                                                    </div>
                                                    <div className="text-center p-2 bg-slate-600/30 rounded-lg">
                                                        <div className="text-slate-400 text-xs">Speed</div>
                                                        <div className="text-white font-bold">{selectedShark.speed.toFixed(1)} m/s</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        selectedShark.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                                                    }`}></div>
                                                    <span className="text-slate-300">Tag Status: {selectedShark.status}</span>
                                                </div>
                                                <div className="text-slate-300">
                                                    Battery: <span className="text-white font-bold">{selectedShark.battery.toFixed(0)}%</span>
                                                </div>
                                            </div>

                                            <div className="text-xs text-slate-400 text-center">
                                                Last transmission: {selectedShark.lastTransmission.toLocaleString()}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <Fish className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                            <div className="text-slate-400 text-lg mb-2">No shark selected</div>
                                            <div className="text-slate-500 text-sm">
                                                Click on a shark marker or select from the sidebar to view detailed information
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Conservation Alerts */}
                                <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                        Conservation Alerts
                                    </h3>
                                    
                                    <div className="space-y-3 max-h-80 overflow-y-auto">
                                        {alerts.map(alert => (
                                            <AlertCard key={alert.id} alert={alert} />
                                        ))}
                                        
                                        <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                                    <Database className="w-4 h-4 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium text-sm">Data Collection Update</h4>
                                                    <p className="text-slate-300 text-xs mt-1">
                                                        Collected {Math.floor(Math.random() * 100 + 200)} new data points in the last hour. 
                                                        All tracking systems operational.
                                                    </p>
                                                    <div className="text-slate-500 text-xs mt-2">
                                                        System Status • {new Date().toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            All Systems Operational
                                        </div>
                                        <div className="text-green-300/80 text-xs mt-1">
                                            Marine protected area coverage: 100% • Conservation status: Active monitoring
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-slate-400 text-sm border-t border-slate-700/50 pt-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Fish className="w-4 h-4" />
                            <span className="font-medium">VARUN - Whale Shark Conservation Digital Twin</span>
                        </div>
                        <div className="flex items-center justify-center gap-6 text-xs">
                            <span>Team DOMInators</span>
                            <span>•</span>
                            <span>Smart India Hackathon 2024</span>
                            <span>•</span>
                            <span>Powered by AI & Satellite Telemetry</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color = "text-cyan-400" }) {
    return (
        <div className="bg-slate-700/30 rounded-lg p-3 text-center hover:bg-slate-700/50 transition-all duration-300 hover:scale-105">
            <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
            <div className="text-white font-bold text-sm">{value}</div>
            <div className="text-slate-400 text-xs">{label}</div>
        </div>
    );
}

function DetailCard({ label, value }) {
    return (
        <div className="bg-slate-700/30 rounded-lg p-3 hover:bg-slate-700/50 transition-colors">
            <div className="text-slate-400 text-xs">{label}</div>
            <div className="text-white font-medium text-sm">{value}</div>
        </div>
    );
}

function AlertCard({ alert }) {
    const typeConfig = {
        warning: { 
            bg: 'bg-yellow-500/10', 
            border: 'border-yellow-500/30', 
            icon: 'text-yellow-400',
            iconBg: 'bg-yellow-500/20' 
        },
        info: { 
            bg: 'bg-blue-500/10', 
            border: 'border-blue-500/30', 
            icon: 'text-blue-400',
            iconBg: 'bg-blue-500/20' 
        },
        success: { 
            bg: 'bg-green-500/10', 
            border: 'border-green-500/30', 
            icon: 'text-green-400',
            iconBg: 'bg-green-500/20' 
        }
    };
    
    const config = typeConfig[alert.type] || typeConfig.info;
    const IconComponent = alert.type === 'warning' ? AlertTriangle : 
                         alert.type === 'success' ? Target : Database;
    
    return (
        <div className={`${config.bg} border ${config.border} rounded-xl p-4 hover:scale-102 transition-all duration-300`}>
            <div className="flex items-start gap-3">
                <div className={`p-2 ${config.iconBg} rounded-lg flex-shrink-0`}>
                    <IconComponent className={`w-4 h-4 ${config.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm ${config.icon} mb-1`}>{alert.title}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{alert.message}</div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="text-xs text-slate-500">
                            {alert.time.toLocaleString()}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                            alert.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                        }`}>
                            {alert.priority} priority
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}