import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, Database, Waves, Fish, Dna, Globe, Bell, User, Menu, X, 
    Download, Filter, RefreshCw, Activity, AlertTriangle, CheckCircle,
    Calendar, MapPin, Thermometer, Droplets, BarChart3, TrendingUp,
    FileDown, FileText, Settings, Eye, Edit, Trash2, Plus
} from 'lucide-react';
import Navbar from '../components/Navbar';

// Enhanced Navbar Component



export default function DataPortal() {
    const [selectedDataSource, setSelectedDataSource] = useState('Oceanographic Data');
    const [timeRange, setTimeRange] = useState('Last 7 Days');
    const [qualityFilter, setQualityFilter] = useState('All Data');
    const [selectedRows, setSelectedRows] = useState([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    // Enhanced mock data with more variety
    const allData = {
        'Oceanographic Data': [
            { id: '3041', timestamp: '2024-04-26 00:00:00', temperature: '19.3456', salinity: '34.2893', ph: '8.0341', dissolvedOxygen: '7.2889', chlorophyll: '4.2845', status: 'validated' },
            { id: '3047', timestamp: '2024-04-26 00:00:00', temperature: '18.948', salinity: '34.2893', ph: '8.0341', dissolvedOxygen: '7.2889', chlorophyll: '4.6592', status: 'validated' },
            { id: '3051', timestamp: '2024-04-26 00:00:00', temperature: '21.5145', salinity: '34.6651', ph: '8.0421', dissolvedOxygen: '7.1439', chlorophyll: '3.5597', status: 'pending' },
            { id: '3055', timestamp: '2024-04-26 00:00:00', temperature: '21.5653', salinity: '34.342', ph: '7.959', dissolvedOxygen: '7.3413', chlorophyll: null, status: 'validated' },
            { id: '3110', timestamp: '2024-04-27 00:00:00', temperature: '22.845', salinity: '34.2593', ph: '7.8853', dissolvedOxygen: '7.8662', chlorophyll: '5.1234', status: 'error' },
            { id: '3115', timestamp: '2024-04-28 00:00:00', temperature: '23.6847', salinity: '34.1789', ph: '8.0723', dissolvedOxygen: '8.0451', chlorophyll: '3.9876', status: 'validated' },
            { id: '7102', timestamp: '2024-04-28 00:00:00', temperature: '20.2683', salinity: '34.2307', ph: '8.0421', dissolvedOxygen: '6.3485', chlorophyll: '4.5432', status: 'validated' },
            { id: '7103', timestamp: '2024-04-28 00:00:00', temperature: '18.8156', salinity: '34.6893', ph: '7.8729', dissolvedOxygen: '8.6729', chlorophyll: '2.8765', status: 'pending' },
        ],
        'Fisheries Data': [
            { id: 'F001', timestamp: '2024-04-26 08:30:00', species: 'Tuna', catch_weight: '150.5', vessel_id: 'IND-2341', location: '12.9716, 77.5946', status: 'validated' },
            { id: 'F002', timestamp: '2024-04-26 09:15:00', species: 'Sardine', catch_weight: '89.2', vessel_id: 'IND-2342', location: '12.2958, 76.6394', status: 'validated' },
            { id: 'F003', timestamp: '2024-04-26 10:45:00', species: 'Mackerel', catch_weight: '67.8', vessel_id: 'IND-2343', location: '11.0168, 76.9558', status: 'pending' },
        ],
        'eDNA Analysis': [
            { id: 'DNA001', timestamp: '2024-04-25 14:20:00', sample_id: 'KOC-2024-001', species_detected: 'Dolphins', confidence: '94.2%', location: 'Arabian Sea', status: 'validated' },
            { id: 'DNA002', timestamp: '2024-04-25 15:30:00', sample_id: 'KOC-2024-002', species_detected: 'Sea Turtles', confidence: '87.6%', location: 'Bay of Bengal', status: 'validated' },
            { id: 'DNA003', timestamp: '2024-04-25 16:45:00', sample_id: 'KOC-2024-003', species_detected: 'Whale Shark', confidence: '91.3%', location: 'Lakshadweep Sea', status: 'pending' },
        ],
        'Weather Data': [
            { id: 'W001', timestamp: '2024-04-26 12:00:00', wind_speed: '15.6', wave_height: '2.3', air_temp: '28.4', humidity: '78.5', pressure: '1013.2', status: 'validated' },
            { id: 'W002', timestamp: '2024-04-26 18:00:00', wind_speed: '12.8', wave_height: '1.9', air_temp: '26.7', humidity: '82.1', pressure: '1014.8', status: 'validated' },
            { id: 'W003', timestamp: '2024-04-27 00:00:00', wind_speed: '18.2', wave_height: '2.7', air_temp: '25.3', humidity: '85.6', pressure: '1012.4', status: 'pending' },
        ]
    };

    const getCurrentData = () => {
        let data = allData[selectedDataSource] || [];
        
        // Apply search filter
        if (searchTerm) {
            data = data.filter(row => 
                Object.values(row).some(value => 
                    value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        
        // Apply quality filter
        if (qualityFilter !== 'All Data') {
            const filterMap = {
                'High Quality Only': 'validated',
                'Medium Quality': 'pending',
                'Needs Review': 'error'
            };
            data = data.filter(row => row.status === filterMap[qualityFilter]);
        }
        
        // Apply sorting
        if (sortField) {
            data = [...data].sort((a, b) => {
                const aVal = a[sortField] || '';
                const bVal = b[sortField] || '';
                const comparison = aVal.toString().localeCompare(bVal.toString(), undefined, { numeric: true });
                return sortDirection === 'asc' ? comparison : -comparison;
            });
        }
        
        return data;
    };

    const qualityMetrics = {
        completeness: 98.5,
        accuracy: 97.8,
        consistency: 99.1,
        timeliness: 95.4
    };

    const sidebarStats = {
        dataSensors: 847,
        dataQuality: 96.0,
        alerts: 156
    };

    const handleRowSelect = (id) => {
        setSelectedRows(prev => 
            prev.includes(id) 
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        const currentData = getCurrentData();
        if (selectedRows.length === currentData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(currentData.map(row => row.id));
        }
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        // Simulate download process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const currentData = getCurrentData();
        const selectedData = selectedRows.length > 0 
            ? currentData.filter(row => selectedRows.includes(row.id))
            : currentData;
            
        // Create CSV content
        const headers = Object.keys(selectedData[0] || {});
        const csvContent = [
            headers.join(','),
            ...selectedData.map(row => headers.map(header => row[header] || '').join(','))
        ].join('\n');
        
        // Download file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedDataSource.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        setIsDownloading(false);
        setShowModal(true);
        setModalType('download');
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsRefreshing(false);
        setShowModal(true);
        setModalType('refresh');
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getColumnHeaders = () => {
        const dataTypeHeaders = {
            'Oceanographic Data': ['ID', 'Timestamp', 'Temperature (°C)', 'Salinity (PSU)', 'pH', 'Dissolved Oxygen (mg/L)', 'Chlorophyll (μg/L)', 'Status'],
            'Fisheries Data': ['ID', 'Timestamp', 'Species', 'Catch Weight (kg)', 'Vessel ID', 'Location', 'Status'],
            'eDNA Analysis': ['ID', 'Timestamp', 'Sample ID', 'Species Detected', 'Confidence', 'Location', 'Status'],
            'Weather Data': ['ID', 'Timestamp', 'Wind Speed (m/s)', 'Wave Height (m)', 'Air Temperature (°C)', 'Humidity (%)', 'Pressure (hPa)', 'Status']
        };
        return dataTypeHeaders[selectedDataSource] || ['ID', 'Timestamp', 'Data', 'Status'];
    };

    const currentData = getCurrentData();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            
            <div className="pt-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-6">
                        {/* Enhanced Sidebar */}
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
                                <StatCard label="Data Sensors" value={sidebarStats.dataSensors} />
                                <StatCard label="Data Quality" value={`${sidebarStats.dataQuality}%`} />
                                <StatCard label="Active Alerts" value={sidebarStats.alerts} />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-700">
                                <div className="text-cyan-400 text-sm font-medium mb-2">Team DOMInators</div>
                                <div className="text-slate-400 text-xs mb-2">Advanced Marine Analytics Platform</div>
                                <button 
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                    className="w-full px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isRefreshing ? (
                                        <>
                                            <RefreshCw className="w-3 h-3 animate-spin" />
                                            Refreshing...
                                        </>
                                    ) : (
                                        'Refresh Core Data'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Enhanced Main Content */}
                        <div className="flex-1">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-cyan-500/20 rounded-xl">
                                            <Database className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-white">Unified Data Portal</h1>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('settings');}}
                                            className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('help');}}
                                            className="px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                                        >
                                            Help
                                        </button>
                                    </div>
                                </div>
                                <p className="text-slate-300">Smart Agentic Gateway for Aquatic Data, Marine Analytics and Research</p>
                                
                                <div className="mt-4 bg-slate-700 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">Team DOMInators • SIH 2024 • {currentData.length} records loaded</div>
                            </div>

                            {/* Enhanced Filters */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Data Source</label>
                                        <select 
                                            value={selectedDataSource}
                                            onChange={(e) => setSelectedDataSource(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
                                        >
                                            <option>Oceanographic Data</option>
                                            <option>Fisheries Data</option>
                                            <option>eDNA Analysis</option>
                                            <option>Weather Data</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Time Range</label>
                                        <select 
                                            value={timeRange}
                                            onChange={(e) => setTimeRange(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
                                        >
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                            <option>Last 90 Days</option>
                                            <option>Custom Range</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Quality Filter</label>
                                        <select 
                                            value={qualityFilter}
                                            onChange={(e) => setQualityFilter(e.target.value)}
                                            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
                                        >
                                            <option>All Data</option>
                                            <option>High Quality Only</option>
                                            <option>Medium Quality</option>
                                            <option>Needs Review</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-slate-300 text-sm font-medium mb-2 block">Search</label>
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Search records..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400 focus:border-cyan-400 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Data Table */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-6">
                                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Thermometer className="w-5 h-5 text-cyan-400" />
                                        {selectedDataSource}
                                        <span className="text-sm font-normal text-slate-400">({currentData.length} records)</span>
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => {setShowModal(true); setModalType('export');}}
                                            className="px-3 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-colors flex items-center gap-2"
                                        >
                                            <FileText className="w-4 h-4" />
                                            Export
                                        </button>
                                        <button 
                                            onClick={handleDownload}
                                            disabled={isDownloading}
                                            className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isDownloading ? (
                                                <>
                                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                                    Downloading...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="w-4 h-4" />
                                                    Download ({selectedRows.length || currentData.length})
                                                </>
                                            )}
                                        </button>
                                        <button 
                                            onClick={handleRefresh}
                                            disabled={isRefreshing}
                                            className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors disabled:opacity-50"
                                        >
                                            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
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
                                                        checked={selectedRows.length === currentData.length && currentData.length > 0}
                                                        onChange={handleSelectAll}
                                                        className="rounded border-slate-600 bg-slate-700 text-cyan-500"
                                                    />
                                                </th>
                                                {getColumnHeaders().map((header, index) => (
                                                    <th 
                                                        key={index}
                                                        className="px-4 py-3 text-left text-slate-300 font-medium text-sm cursor-pointer hover:text-white transition-colors"
                                                        onClick={() => handleSort(Object.keys(currentData[0] || {})[index])}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {header}
                                                            {sortField === Object.keys(currentData[0] || {})[index] && (
                                                                <span className="text-xs">
                                                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </th>
                                                ))}
                                                <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentData.map((row) => (
                                                <tr key={row.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedRows.includes(row.id)}
                                                            onChange={() => handleRowSelect(row.id)}
                                                            className="rounded border-slate-600 bg-slate-700 text-cyan-500"
                                                        />
                                                    </td>
                                                    {Object.entries(row).map(([key, value], index) => (
                                                        key !== 'status' ? (
                                                            <td key={index} className="px-4 py-3 text-slate-300 text-sm">
                                                                {key === 'id' ? (
                                                                    <span className="font-mono text-white">{value}</span>
                                                                ) : (
                                                                    value || '-'
                                                                )}
                                                            </td>
                                                        ) : (
                                                            <td key={index} className="px-4 py-3">
                                                                <StatusBadge status={value} />
                                                            </td>
                                                        )
                                                    ))}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('view');}}
                                                                className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('edit');}}
                                                                className="p-1 text-slate-400 hover:text-yellow-400 transition-colors"
                                                                title="Edit Record"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => {setShowModal(true); setModalType('delete');}}
                                                                className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                                                                title="Delete Record"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Pagination */}
                                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700">
                                    <div className="text-sm text-slate-400">
                                        Showing {currentData.length} of {allData[selectedDataSource]?.length || 0} records
                                        {selectedRows.length > 0 && (
                                            <span className="ml-2 text-cyan-400">
                                                ({selectedRows.length} selected)
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-sm hover:bg-slate-600/50 transition-colors">
                                            Previous
                                        </button>
                                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-sm">1</span>
                                        <button className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-sm hover:bg-slate-600/50 transition-colors">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Data Quality Metrics */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        Data Quality Metrics
                                    </h3>
                                    <button 
                                        onClick={() => {setShowModal(true); setModalType('quality');}}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        View Details →
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <QualityMetric label="Completeness" value={qualityMetrics.completeness} />
                                    <QualityMetric label="Accuracy" value={qualityMetrics.accuracy} />
                                    <QualityMetric label="Consistency" value={qualityMetrics.consistency} />
                                    <QualityMetric label="Timeliness" value={qualityMetrics.timeliness} />
                                </div>
                            </div>

                            {/* Enhanced Footer */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('team');}}>
                                    <div className="text-cyan-400 font-medium mb-1">Team DOMInators</div>
                                    <div className="text-slate-400 text-sm">Advanced Marine Analytics Platform</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('support');}}>
                                    <div className="text-pink-400 font-medium mb-1">Support</div>
                                    <div className="text-slate-400 text-sm">24/7 Technical Support Available</div>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
                                     onClick={() => {setShowModal(true); setModalType('integration');}}>
                                    <div className="text-purple-400 font-medium mb-1">Integration</div>
                                    <div className="text-slate-400 text-sm">API Documentation Available</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                {modalType === 'download' && 'Download Complete'}
                                {modalType === 'refresh' && 'Data Refreshed'}
                                {modalType === 'system' && 'System Status'}
                                {modalType === 'streaming' && 'Real-time Streaming'}
                                {modalType === 'alerts' && 'Quality Alerts'}
                                {modalType === 'stats' && 'Quick Statistics'}
                                {modalType === 'settings' && 'Portal Settings'}
                                {modalType === 'help' && 'Help & Documentation'}
                                {modalType === 'export' && 'Export Options'}
                                {modalType === 'view' && 'Record Details'}
                                {modalType === 'edit' && 'Edit Record'}
                                {modalType === 'delete' && 'Confirm Delete'}
                                {modalType === 'quality' && 'Quality Report'}
                                {modalType === 'team' && 'Team Information'}
                                {modalType === 'support' && 'Support Center'}
                                {modalType === 'integration' && 'API Integration'}
                            </h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="text-slate-300">
                            {modalType === 'download' && (
                                <div>
                                    <p className="mb-4">Your data has been successfully downloaded as CSV format.</p>
                                    <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
                                        <div className="text-sm">
                                            <div>Records: {selectedRows.length || currentData.length}</div>
                                            <div>Format: CSV</div>
                                            <div>Source: {selectedDataSource}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modalType === 'refresh' && (
                                <div>
                                    <p>Data has been refreshed successfully. Latest marine data is now available.</p>
                                    <div className="mt-4 text-sm text-green-400">
                                        ✓ {currentData.length} records updated
                                    </div>
                                </div>
                            )}
                            {modalType === 'system' && (
                                <div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span>Data Ingestion Service</span>
                                            <span className="text-green-400">Online</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Quality Validation</span>
                                            <span className="text-green-400">Active</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>API Gateway</span>
                                            <span className="text-green-400">Healthy</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Database Cluster</span>
                                            <span className="text-yellow-400">Maintenance Mode</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modalType === 'streaming' && (
                                <div>
                                    <p className="mb-4">Real-time data streaming from marine sensors:</p>
                                    <div className="bg-slate-700/50 rounded-lg p-3">
                                        <div className="text-sm space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                Arabian Sea Buoy #AS-001: Active
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                Bay of Bengal Station #BB-003: Active
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                Lakshadweep Sensor #LK-002: Intermittent
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modalType === 'alerts' && (
                                <div>
                                    <div className="space-y-3">
                                        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                                            <div className="text-red-400 font-medium">High Priority</div>
                                            <div className="text-sm">Temperature anomaly detected in sector AS-12</div>
                                        </div>
                                        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                                            <div className="text-yellow-400 font-medium">Medium Priority</div>
                                            <div className="text-sm">Missing chlorophyll data in 3 records</div>
                                        </div>
                                        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                                            <div className="text-blue-400 font-medium">Info</div>
                                            <div className="text-sm">Scheduled maintenance at 02:00 UTC</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modalType === 'help' && (
                                <div>
                                    <p className="mb-4">Quick help for using the Data Portal:</p>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Use filters to narrow down your data search</li>
                                        <li>• Click column headers to sort data</li>
                                        <li>• Select rows to download specific records</li>
                                        <li>• Quality indicators show data validation status</li>
                                    </ul>
                                </div>
                            )}
                            {(modalType === 'stats' || modalType === 'quality' || modalType === 'team' || modalType === 'support' || modalType === 'integration' || modalType === 'export' || modalType === 'view' || modalType === 'edit' || modalType === 'delete' || modalType === 'settings') && (
                                <div>
                                    <p>Feature coming soon! This functionality will be available in the next update.</p>
                                    <div className="mt-4 text-sm text-cyan-400">
                                        Stay tuned for more advanced features from Team DOMInators.
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
                            {(modalType === 'delete') && (
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors">
                                    Confirm Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SidebarLink({ icon: Icon, label, active = false, onClick }) {
    return (
        <div 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                active 
                    ? 'bg-emerald-500/20 text-emerald-400' 
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

function QualityMetric({ label, value }) {
    const getColor = (val) => {
        if (val >= 98) return 'text-emerald-400';
        if (val >= 95) return 'text-cyan-400';
        if (val >= 90) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="text-center hover:scale-105 transition-transform cursor-pointer">
            <div className={`text-3xl font-bold mb-1 ${getColor(value)}`}>{value}%</div>
            <div className="text-slate-400 text-sm">{label}</div>
        </div>
    );
}

function StatusBadge({ status }) {
    const statusConfig = {
        validated: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Validated' },
        pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
        error: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Error' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
}