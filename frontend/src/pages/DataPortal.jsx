// import React, { useState, useEffect, useRef } from 'react';
// import { 
//     Search, Database, Waves, Fish, Dna, Globe, Bell, User, Menu, X, 
//     Download, Filter, RefreshCw, Activity, AlertTriangle, CheckCircle,
//     Calendar, MapPin, Thermometer, Droplets, BarChart3, TrendingUp,
//     FileDown, FileText, Settings, Eye, Edit, Trash2, Plus
// } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import VarunAIAgent from '../components/VarunAIAgent';

// // Enhanced Navbar Component



// export default function DataPortal() {
//     const [selectedDataSource, setSelectedDataSource] = useState('Oceanographic Data');
//     const [isVarunOpen, setIsVarunOpen] = useState(false);
//     const [timeRange, setTimeRange] = useState('Last 7 Days');
//     const [qualityFilter, setQualityFilter] = useState('All Data');
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [isDownloading, setIsDownloading] = useState(false);
//     const [isRefreshing, setIsRefreshing] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [modalType, setModalType] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortField, setSortField] = useState('');
//     const [sortDirection, setSortDirection] = useState('asc');

//     // Enhanced mock data with more variety
//     const allData = {
//         'Oceanographic Data': [
//             { id: '3041', timestamp: '2024-04-26 00:00:00', temperature: '19.3456', salinity: '34.2893', ph: '8.0341', dissolvedOxygen: '7.2889', chlorophyll: '4.2845', status: 'validated' },
//             { id: '3047', timestamp: '2024-04-26 00:00:00', temperature: '18.948', salinity: '34.2893', ph: '8.0341', dissolvedOxygen: '7.2889', chlorophyll: '4.6592', status: 'validated' },
//             { id: '3051', timestamp: '2024-04-26 00:00:00', temperature: '21.5145', salinity: '34.6651', ph: '8.0421', dissolvedOxygen: '7.1439', chlorophyll: '3.5597', status: 'pending' },
//             { id: '3055', timestamp: '2024-04-26 00:00:00', temperature: '21.5653', salinity: '34.342', ph: '7.959', dissolvedOxygen: '7.3413', chlorophyll: null, status: 'validated' },
//             { id: '3110', timestamp: '2024-04-27 00:00:00', temperature: '22.845', salinity: '34.2593', ph: '7.8853', dissolvedOxygen: '7.8662', chlorophyll: '5.1234', status: 'error' },
//             { id: '3115', timestamp: '2024-04-28 00:00:00', temperature: '23.6847', salinity: '34.1789', ph: '8.0723', dissolvedOxygen: '8.0451', chlorophyll: '3.9876', status: 'validated' },
//             { id: '7102', timestamp: '2024-04-28 00:00:00', temperature: '20.2683', salinity: '34.2307', ph: '8.0421', dissolvedOxygen: '6.3485', chlorophyll: '4.5432', status: 'validated' },
//             { id: '7103', timestamp: '2024-04-28 00:00:00', temperature: '18.8156', salinity: '34.6893', ph: '7.8729', dissolvedOxygen: '8.6729', chlorophyll: '2.8765', status: 'pending' },
//         ],
//         'Fisheries Data': [
//             { id: 'F001', timestamp: '2024-04-26 08:30:00', species: 'Tuna', catch_weight: '150.5', vessel_id: 'IND-2341', location: '12.9716, 77.5946', status: 'validated' },
//             { id: 'F002', timestamp: '2024-04-26 09:15:00', species: 'Sardine', catch_weight: '89.2', vessel_id: 'IND-2342', location: '12.2958, 76.6394', status: 'validated' },
//             { id: 'F003', timestamp: '2024-04-26 10:45:00', species: 'Mackerel', catch_weight: '67.8', vessel_id: 'IND-2343', location: '11.0168, 76.9558', status: 'pending' },
//         ],
//         'eDNA Analysis': [
//             { id: 'DNA001', timestamp: '2024-04-25 14:20:00', sample_id: 'KOC-2024-001', species_detected: 'Dolphins', confidence: '94.2%', location: 'Arabian Sea', status: 'validated' },
//             { id: 'DNA002', timestamp: '2024-04-25 15:30:00', sample_id: 'KOC-2024-002', species_detected: 'Sea Turtles', confidence: '87.6%', location: 'Bay of Bengal', status: 'validated' },
//             { id: 'DNA003', timestamp: '2024-04-25 16:45:00', sample_id: 'KOC-2024-003', species_detected: 'Whale Shark', confidence: '91.3%', location: 'Lakshadweep Sea', status: 'pending' },
//         ],
//         'Weather Data': [
//             { id: 'W001', timestamp: '2024-04-26 12:00:00', wind_speed: '15.6', wave_height: '2.3', air_temp: '28.4', humidity: '78.5', pressure: '1013.2', status: 'validated' },
//             { id: 'W002', timestamp: '2024-04-26 18:00:00', wind_speed: '12.8', wave_height: '1.9', air_temp: '26.7', humidity: '82.1', pressure: '1014.8', status: 'validated' },
//             { id: 'W003', timestamp: '2024-04-27 00:00:00', wind_speed: '18.2', wave_height: '2.7', air_temp: '25.3', humidity: '85.6', pressure: '1012.4', status: 'pending' },
//         ]
//     };

//     const getCurrentData = () => {
//         let data = allData[selectedDataSource] || [];
        
//         // Apply search filter
//         if (searchTerm) {
//             data = data.filter(row => 
//                 Object.values(row).some(value => 
//                     value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//                 )
//             );
//         }
        
//         // Apply quality filter
//         if (qualityFilter !== 'All Data') {
//             const filterMap = {
//                 'High Quality Only': 'validated',
//                 'Medium Quality': 'pending',
//                 'Needs Review': 'error'
//             };
//             data = data.filter(row => row.status === filterMap[qualityFilter]);
//         }
        
//         // Apply sorting
//         if (sortField) {
//             data = [...data].sort((a, b) => {
//                 const aVal = a[sortField] || '';
//                 const bVal = b[sortField] || '';
//                 const comparison = aVal.toString().localeCompare(bVal.toString(), undefined, { numeric: true });
//                 return sortDirection === 'asc' ? comparison : -comparison;
//             });
//         }
        
//         return data;
//     };

//     const qualityMetrics = {
//         completeness: 98.5,
//         accuracy: 97.8,
//         consistency: 99.1,
//         timeliness: 95.4
//     };

//     const sidebarStats = {
//         dataSensors: 847,
//         dataQuality: 96.0,
//         alerts: 156
//     };

//     const handleRowSelect = (id) => {
//         setSelectedRows(prev => 
//             prev.includes(id) 
//                 ? prev.filter(rowId => rowId !== id)
//                 : [...prev, id]
//         );
//     };

//     const handleSelectAll = () => {
//         const currentData = getCurrentData();
//         if (selectedRows.length === currentData.length) {
//             setSelectedRows([]);
//         } else {
//             setSelectedRows(currentData.map(row => row.id));
//         }
//     };

//     const handleDownload = async () => {
//         setIsDownloading(true);
//         // Simulate download process
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         const currentData = getCurrentData();
//         const selectedData = selectedRows.length > 0 
//             ? currentData.filter(row => selectedRows.includes(row.id))
//             : currentData;
            
//         // Create CSV content
//         const headers = Object.keys(selectedData[0] || {});
//         const csvContent = [
//             headers.join(','),
//             ...selectedData.map(row => headers.map(header => row[header] || '').join(','))
//         ].join('\n');
        
//         // Download file
//         const blob = new Blob([csvContent], { type: 'text/csv' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `${selectedDataSource.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`;
//         a.click();
//         window.URL.revokeObjectURL(url);
        
//         setIsDownloading(false);
//         setShowModal(true);
//         setModalType('download');
//     };

//     const handleRefresh = async () => {
//         setIsRefreshing(true);
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         setIsRefreshing(false);
//         setShowModal(true);
//         setModalType('refresh');
//     };

//     const handleSort = (field) => {
//         if (sortField === field) {
//             setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortField(field);
//             setSortDirection('asc');
//         }
//     };

//     const getColumnHeaders = () => {
//         const dataTypeHeaders = {
//             'Oceanographic Data': ['ID', 'Timestamp', 'Temperature (°C)', 'Salinity (PSU)', 'pH', 'Dissolved Oxygen (mg/L)', 'Chlorophyll (μg/L)', 'Status'],
//             'Fisheries Data': ['ID', 'Timestamp', 'Species', 'Catch Weight (kg)', 'Vessel ID', 'Location', 'Status'],
//             'eDNA Analysis': ['ID', 'Timestamp', 'Sample ID', 'Species Detected', 'Confidence', 'Location', 'Status'],
//             'Weather Data': ['ID', 'Timestamp', 'Wind Speed (m/s)', 'Wave Height (m)', 'Air Temperature (°C)', 'Humidity (%)', 'Pressure (hPa)', 'Status']
//         };
//         return dataTypeHeaders[selectedDataSource] || ['ID', 'Timestamp', 'Data', 'Status'];
//     };

//     const currentData = getCurrentData();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-7">
//             <Navbar />
//             <VarunAIAgent 
//     isOpen={isVarunOpen} 
//     onToggle={() => setIsVarunOpen(!isVarunOpen)}
//     currentPage="general" // or "oceanography", "edna", "digital_twin", etc.
// />
            
//             <div className="pt-24 px-4">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="flex gap-6">
//                         {/* Enhanced Sidebar */}
//                         <div className="w-64 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 h-fit">
//                             <div className="flex items-center gap-3 mb-8">
                                
//                                 <div>
//                                     <div className="text-white font-bold">Team DOMInators</div>
//                                     <div className="text-slate-400 text-xs">Advanced Marine Analytics Platform</div>
//                                 </div>
//                             </div>

//                             <div className="mb-8">
                                
//                             </div>

//                             <div className="space-y-4">
//                                 <StatCard label="Data Sensors" value={sidebarStats.dataSensors} />
//                                 <StatCard label="Data Quality" value={`${sidebarStats.dataQuality}%`} />
//                                 <StatCard label="Active Alerts" value={sidebarStats.alerts} />
//                             </div>

//                             <div className="mt-8 pt-6 border-t border-slate-700">
//                                 <div className="text-cyan-400 text-sm font-medium mb-2">Team DOMInators</div>
//                                 <div className="text-slate-400 text-xs mb-2">Advanced Marine Analytics Platform</div>
//                                 <button 
//                                     onClick={handleRefresh}
//                                     disabled={isRefreshing}
//                                     className="w-full px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                                 >
//                                     {isRefreshing ? (
//                                         <>
//                                             <RefreshCw className="w-3 h-3 animate-spin" />
//                                             Refreshing...
//                                         </>
//                                     ) : (
//                                         'Refresh Core Data'
//                                     )}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Enhanced Main Content */}
//                         <div className="flex-1">
//                             <div className="mb-6">
//                                 <div className="flex items-center justify-between mb-2">
//                                     <div className="flex items-center gap-3">
//                                         <div className="p-2 bg-cyan-500/20 rounded-xl">
//                                             <Database className="w-6 h-6 text-cyan-400" />
//                                         </div>
//                                         <h1 className="text-2xl font-bold text-white">Unified Data Portal</h1>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <button 
//                                             onClick={() => {setShowModal(true); setModalType('settings');}}
//                                             className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
//                                         >
//                                             <Settings className="w-4 h-4" />
//                                         </button>
//                                         <button 
//                                             onClick={() => {setShowModal(true); setModalType('help');}}
//                                             className="px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
//                                         >
//                                             Help
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <p className="text-slate-300">Smart Agentic Gateway for Aquatic Data, Marine Analytics and Research</p>
                                
//                                 <div className="mt-4 bg-slate-700 rounded-full h-2">
//                                     <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
//                                 </div>
//                                 <div className="text-xs text-slate-400 mt-1">Team DOMInators • SIH 2024 • {currentData.length} records loaded</div>
//                             </div>

//                             {/* Enhanced Filters */}
//                             <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                                     <div>
//                                         <label className="text-slate-300 text-sm font-medium mb-2 block">Data Source</label>
//                                         <select 
//                                             value={selectedDataSource}
//                                             onChange={(e) => setSelectedDataSource(e.target.value)}
//                                             className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
//                                         >
//                                             <option>Oceanographic Data</option>
//                                             <option>Fisheries Data</option>
//                                             <option>eDNA Analysis</option>
//                                             <option>Weather Data</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="text-slate-300 text-sm font-medium mb-2 block">Time Range</label>
//                                         <select 
//                                             value={timeRange}
//                                             onChange={(e) => setTimeRange(e.target.value)}
//                                             className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
//                                         >
//                                             <option>Last 7 Days</option>
//                                             <option>Last 30 Days</option>
//                                             <option>Last 90 Days</option>
//                                             <option>Custom Range</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="text-slate-300 text-sm font-medium mb-2 block">Quality Filter</label>
//                                         <select 
//                                             value={qualityFilter}
//                                             onChange={(e) => setQualityFilter(e.target.value)}
//                                             className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
//                                         >
//                                             <option>All Data</option>
//                                             <option>High Quality Only</option>
//                                             <option>Medium Quality</option>
//                                             <option>Needs Review</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="text-slate-300 text-sm font-medium mb-2 block">Search</label>
//                                         <div className="relative">
//                                             <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//                                             <input
//                                                 type="text"
//                                                 placeholder="Search records..."
//                                                 value={searchTerm}
//                                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                                 className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400 focus:border-cyan-400 transition-colors"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Enhanced Data Table */}
//                             <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-6">
//                                 <div className="flex items-center justify-between p-6 border-b border-slate-700">
//                                     <h3 className="text-lg font-semibold text-white flex items-center gap-2">
//                                         <Thermometer className="w-5 h-5 text-cyan-400" />
//                                         {selectedDataSource}
//                                         <span className="text-sm font-normal text-slate-400">({currentData.length} records)</span>
//                                     </h3>
//                                     <div className="flex items-center gap-2">
//                                         <button 
//                                             onClick={() => {setShowModal(true); setModalType('export');}}
//                                             className="px-3 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-colors flex items-center gap-2"
//                                         >
//                                             <FileText className="w-4 h-4" />
//                                             Export
//                                         </button>
//                                         <button 
//                                             onClick={handleDownload}
//                                             disabled={isDownloading}
//                                             className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
//                                         >
//                                             {isDownloading ? (
//                                                 <>
//                                                     <RefreshCw className="w-4 h-4 animate-spin" />
//                                                     Downloading...
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <Download className="w-4 h-4" />
//                                                     Download ({selectedRows.length || currentData.length})
//                                                 </>
//                                             )}
//                                         </button>
//                                         <button 
//                                             onClick={handleRefresh}
//                                             disabled={isRefreshing}
//                                             className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors disabled:opacity-50"
//                                         >
//                                             <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="overflow-x-auto">
//                                     <table className="w-full">
//                                         <thead className="bg-slate-700/30">
//                                             <tr>
//                                                 <th className="px-4 py-3 text-left">
//                                                     <input 
//                                                         type="checkbox" 
//                                                         checked={selectedRows.length === currentData.length && currentData.length > 0}
//                                                         onChange={handleSelectAll}
//                                                         className="rounded border-slate-600 bg-slate-700 text-cyan-500"
//                                                     />
//                                                 </th>
//                                                 {getColumnHeaders().map((header, index) => (
//                                                     <th 
//                                                         key={index}
//                                                         className="px-4 py-3 text-left text-slate-300 font-medium text-sm cursor-pointer hover:text-white transition-colors"
//                                                         onClick={() => handleSort(Object.keys(currentData[0] || {})[index])}
//                                                     >
//                                                         <div className="flex items-center gap-2">
//                                                             {header}
//                                                             {sortField === Object.keys(currentData[0] || {})[index] && (
//                                                                 <span className="text-xs">
//                                                                     {sortDirection === 'asc' ? '↑' : '↓'}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </th>
//                                                 ))}
//                                                 <th className="px-4 py-3 text-left text-slate-300 font-medium text-sm">Actions</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {currentData.map((row) => (
//                                                 <tr key={row.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
//                                                     <td className="px-4 py-3">
//                                                         <input 
//                                                             type="checkbox" 
//                                                             checked={selectedRows.includes(row.id)}
//                                                             onChange={() => handleRowSelect(row.id)}
//                                                             className="rounded border-slate-600 bg-slate-700 text-cyan-500"
//                                                         />
//                                                     </td>
//                                                     {Object.entries(row).map(([key, value], index) => (
//                                                         key !== 'status' ? (
//                                                             <td key={index} className="px-4 py-3 text-slate-300 text-sm">
//                                                                 {key === 'id' ? (
//                                                                     <span className="font-mono text-white">{value}</span>
//                                                                 ) : (
//                                                                     value || '-'
//                                                                 )}
//                                                             </td>
//                                                         ) : (
//                                                             <td key={index} className="px-4 py-3">
//                                                                 <StatusBadge status={value} />
//                                                             </td>
//                                                         )
//                                                     ))}
//                                                     <td className="px-4 py-3">
//                                                         <div className="flex items-center gap-2">
//                                                             <button 
//                                                                 onClick={() => {setShowModal(true); setModalType('view');}}
//                                                                 className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
//                                                                 title="View Details"
//                                                             >
//                                                                 <Eye className="w-4 h-4" />
//                                                             </button>
//                                                             <button 
//                                                                 onClick={() => {setShowModal(true); setModalType('edit');}}
//                                                                 className="p-1 text-slate-400 hover:text-yellow-400 transition-colors"
//                                                                 title="Edit Record"
//                                                             >
//                                                                 <Edit className="w-4 h-4" />
//                                                             </button>
//                                                             <button 
//                                                                 onClick={() => {setShowModal(true); setModalType('delete');}}
//                                                                 className="p-1 text-slate-400 hover:text-red-400 transition-colors"
//                                                                 title="Delete Record"
//                                                             >
//                                                                 <Trash2 className="w-4 h-4" />
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
                                
//                                 {/* Pagination */}
//                                 <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700">
//                                     <div className="text-sm text-slate-400">
//                                         Showing {currentData.length} of {allData[selectedDataSource]?.length || 0} records
//                                         {selectedRows.length > 0 && (
//                                             <span className="ml-2 text-cyan-400">
//                                                 ({selectedRows.length} selected)
//                                             </span>
//                                         )}
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <button className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-sm hover:bg-slate-600/50 transition-colors">
//                                             Previous
//                                         </button>
//                                         <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-sm">1</span>
//                                         <button className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-sm hover:bg-slate-600/50 transition-colors">
//                                             Next
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Enhanced Data Quality Metrics */}
//                             <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-lg font-semibold text-white flex items-center gap-2">
//                                         <CheckCircle className="w-5 h-5 text-green-400" />
//                                         Data Quality Metrics
//                                     </h3>
//                                     <button 
//                                         onClick={() => {setShowModal(true); setModalType('quality');}}
//                                         className="text-sm text-slate-400 hover:text-white transition-colors"
//                                     >
//                                         View Details →
//                                     </button>
//                                 </div>
//                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                                     <QualityMetric label="Completeness" value={qualityMetrics.completeness} />
//                                     <QualityMetric label="Accuracy" value={qualityMetrics.accuracy} />
//                                     <QualityMetric label="Consistency" value={qualityMetrics.consistency} />
//                                     <QualityMetric label="Timeliness" value={qualityMetrics.timeliness} />
//                                 </div>
//                             </div>

//                             {/* Enhanced Footer */}
//                             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//                                 <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
//                                      onClick={() => {setShowModal(true); setModalType('team');}}>
//                                     <div className="text-cyan-400 font-medium mb-1">Team DOMInators</div>
//                                     <div className="text-slate-400 text-sm">Advanced Marine Analytics Platform</div>
//                                 </div>
//                                 <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
//                                      onClick={() => {setShowModal(true); setModalType('support');}}>
//                                     <div className="text-pink-400 font-medium mb-1">Support</div>
//                                     <div className="text-slate-400 text-sm">24/7 Technical Support Available</div>
//                                 </div>
//                                 <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors cursor-pointer"
//                                      onClick={() => {setShowModal(true); setModalType('integration');}}>
//                                     <div className="text-purple-400 font-medium mb-1">Integration</div>
//                                     <div className="text-slate-400 text-sm">API Documentation Available</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Enhanced Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
//                     <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700" onClick={(e) => e.stopPropagation()}>
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-lg font-semibold text-white">
//                                 {modalType === 'download' && 'Download Complete'}
//                                 {modalType === 'refresh' && 'Data Refreshed'}
//                                 {modalType === 'system' && 'System Status'}
//                                 {modalType === 'streaming' && 'Real-time Streaming'}
//                                 {modalType === 'alerts' && 'Quality Alerts'}
//                                 {modalType === 'stats' && 'Quick Statistics'}
//                                 {modalType === 'settings' && 'Portal Settings'}
//                                 {modalType === 'help' && 'Help & Documentation'}
//                                 {modalType === 'export' && 'Export Options'}
//                                 {modalType === 'view' && 'Record Details'}
//                                 {modalType === 'edit' && 'Edit Record'}
//                                 {modalType === 'delete' && 'Confirm Delete'}
//                                 {modalType === 'quality' && 'Quality Report'}
//                                 {modalType === 'team' && 'Team Information'}
//                                 {modalType === 'support' && 'Support Center'}
//                                 {modalType === 'integration' && 'API Integration'}
//                             </h3>
//                             <button 
//                                 onClick={() => setShowModal(false)}
//                                 className="text-slate-400 hover:text-white transition-colors"
//                             >
//                                 <X className="w-5 h-5" />
//                             </button>
//                         </div>
                        
//                         <div className="text-slate-300">
//                             {modalType === 'download' && (
//                                 <div>
//                                     <p className="mb-4">Your data has been successfully downloaded as CSV format.</p>
//                                     <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
//                                         <div className="text-sm">
//                                             <div>Records: {selectedRows.length || currentData.length}</div>
//                                             <div>Format: CSV</div>
//                                             <div>Source: {selectedDataSource}</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             {modalType === 'refresh' && (
//                                 <div>
//                                     <p>Data has been refreshed successfully. Latest marine data is now available.</p>
//                                     <div className="mt-4 text-sm text-green-400">
//                                         ✓ {currentData.length} records updated
//                                     </div>
//                                 </div>
//                             )}
//                             {modalType === 'system' && (
//                                 <div>
//                                     <div className="space-y-3">
//                                         <div className="flex items-center justify-between">
//                                             <span>Data Ingestion Service</span>
//                                             <span className="text-green-400">Online</span>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <span>Quality Validation</span>
//                                             <span className="text-green-400">Active</span>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <span>API Gateway</span>
//                                             <span className="text-green-400">Healthy</span>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <span>Database Cluster</span>
//                                             <span className="text-yellow-400">Maintenance Mode</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             {modalType === 'streaming' && (
//                                 <div>
//                                     <p className="mb-4">Real-time data streaming from marine sensors:</p>
//                                     <div className="bg-slate-700/50 rounded-lg p-3">
//                                         <div className="text-sm space-y-2">
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                                                 Arabian Sea Buoy #AS-001: Active
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                                                 Bay of Bengal Station #BB-003: Active
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
//                                                 Lakshadweep Sensor #LK-002: Intermittent
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             {modalType === 'alerts' && (
//                                 <div>
//                                     <div className="space-y-3">
//                                         <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
//                                             <div className="text-red-400 font-medium">High Priority</div>
//                                             <div className="text-sm">Temperature anomaly detected in sector AS-12</div>
//                                         </div>
//                                         <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
//                                             <div className="text-yellow-400 font-medium">Medium Priority</div>
//                                             <div className="text-sm">Missing chlorophyll data in 3 records</div>
//                                         </div>
//                                         <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
//                                             <div className="text-blue-400 font-medium">Info</div>
//                                             <div className="text-sm">Scheduled maintenance at 02:00 UTC</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             {modalType === 'help' && (
//                                 <div>
//                                     <p className="mb-4">Quick help for using the Data Portal:</p>
//                                     <ul className="space-y-2 text-sm">
//                                         <li>• Use filters to narrow down your data search</li>
//                                         <li>• Click column headers to sort data</li>
//                                         <li>• Select rows to download specific records</li>
//                                         <li>• Quality indicators show data validation status</li>
//                                     </ul>
//                                 </div>
//                             )}
//                             {(modalType === 'stats' || modalType === 'quality' || modalType === 'team' || modalType === 'support' || modalType === 'integration' || modalType === 'export' || modalType === 'view' || modalType === 'edit' || modalType === 'delete' || modalType === 'settings') && (
//                                 <div>
//                                     <p>Feature coming soon! This functionality will be available in the next update.</p>
//                                     <div className="mt-4 text-sm text-cyan-400">
//                                         Stay tuned for more advanced features from Team DOMInators.
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
                        
//                         <div className="flex justify-end gap-2 mt-6">
//                             <button 
//                                 onClick={() => setShowModal(false)}
//                                 className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
//                             >
//                                 Close
//                             </button>
//                             {(modalType === 'delete') && (
//                                 <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors">
//                                     Confirm Delete
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// function SidebarLink({ icon: Icon, label, active = false, onClick }) {
//     return (
//         <div 
//             className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
//                 active 
//                     ? 'bg-emerald-500/20 text-emerald-400' 
//                     : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
//             }`}
//             onClick={onClick}
//         >
//             <Icon className="w-4 h-4" />
//             <span className="text-sm">{label}</span>
//         </div>
//     );
// }

// function StatCard({ label, value }) {
//     return (
//         <div className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700/70 transition-colors">
//             <div className="text-2xl font-bold text-white">{value}</div>
//             <div className="text-slate-400 text-sm">{label}</div>
//         </div>
//     );
// }

// function QualityMetric({ label, value }) {
//     const getColor = (val) => {
//         if (val >= 98) return 'text-emerald-400';
//         if (val >= 95) return 'text-cyan-400';
//         if (val >= 90) return 'text-yellow-400';
//         return 'text-red-400';
//     };

//     return (
//         <div className="text-center hover:scale-105 transition-transform cursor-pointer">
//             <div className={`text-3xl font-bold mb-1 ${getColor(value)}`}>{value}%</div>
//             <div className="text-slate-400 text-sm">{label}</div>
//         </div>
//     );
// }

// function StatusBadge({ status }) {
//     const statusConfig = {
//         validated: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Validated' },
//         pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
//         error: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Error' }
//     };
    
//     const config = statusConfig[status] || statusConfig.pending;
    
//     return (
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
//             {config.label}
//         </span>
//     );
// }
// import React, { useState, useEffect } from 'react';
// import { 
//     Search, Database, Waves, Fish, Dna, Globe, Download, Filter, 
//     RefreshCw, Eye, MapPin, Calendar, FileText, Settings, HelpCircle,
//     Lock, Unlock, BarChart3, TrendingUp, ExternalLink, Play,
//     ChevronDown, ChevronUp, Info, DownloadCloud, Server, Clock,
//     Users, Shield, Zap, Layers, Map
// } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import VarunAIAgent from '../components/VarunAIAgent';

// export default function DataHub() {
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [isVarunOpen, setIsVarunOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedDatasets, setSelectedDatasets] = useState([]);
//     const [sortBy, setSortBy] = useState('name');
//     const [sortDirection, setSortDirection] = useState('asc');
//     const [previewDataset, setPreviewDataset] = useState(null);
//     const [activeFilters, setActiveFilters] = useState({
//         domain: [],
//         access: [],
//         format: [],
//         status: []
//     });

//     // Enhanced dataset catalog with rich metadata
//     const datasets = [
//         {
//             id: 'oce-001',
//             name: 'Arabian Sea Temperature Profiles',
//             type: 'Oceanographic',
//             domain: 'oceanography',
//             description: 'High-resolution temperature measurements from Arabian Sea buoys and ARGO floats',
//             format: 'NetCDF',
//             size: '2.4 GB',
//             timeRange: '2018-2024',
//             frequency: 'Daily',
//             access: 'public',
//             quality: 98.5,
//             variables: ['temperature', 'salinity', 'pressure'],
//             location: 'Arabian Sea',
//             institution: 'National Institute of Oceanography',
//             license: 'CC BY 4.0',
//             lastUpdated: '2024-04-26',
//             sampleSize: '15M records',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/oce-001',
//             icon: Waves,
//             color: 'cyan'
//         },
//         {
//             id: 'fish-002',
//             name: 'Indian Ocean Fisheries Catch Data',
//             type: 'Fisheries',
//             domain: 'fisheries',
//             description: 'Commercial fishing catch data with species identification and vessel tracking',
//             format: 'CSV',
//             size: '850 MB',
//             timeRange: '2020-2024',
//             frequency: 'Monthly',
//             access: 'restricted',
//             quality: 95.2,
//             variables: ['species', 'catch_weight', 'vessel_id', 'location'],
//             location: 'Indian Ocean EEZ',
//             institution: 'Fisheries Survey of India',
//             license: 'Restricted - Requires Approval',
//             lastUpdated: '2024-04-25',
//             sampleSize: '2.4M records',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/fish-002',
//             icon: Fish,
//             color: 'emerald'
//         },
//         {
//             id: 'edna-003',
//             name: 'Marine eDNA Biodiversity Survey',
//             type: 'eDNA',
//             domain: 'molecular',
//             description: 'Environmental DNA sequencing data for marine biodiversity assessment',
//             format: 'FASTA',
//             size: '15.2 GB',
//             timeRange: '2023-2024',
//             frequency: 'Quarterly',
//             access: 'public',
//             quality: 97.8,
//             variables: ['species_detected', 'confidence', 'location', 'sample_id'],
//             location: 'Lakshadweep Islands',
//             institution: 'CSIR-NIO',
//             license: 'CC BY-NC 4.0',
//             lastUpdated: '2024-04-24',
//             sampleSize: '45,000 sequences',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/edna-003',
//             icon: Dna,
//             color: 'violet'
//         },
//         {
//             id: 'img-004',
//             name: 'Coral Reef Satellite Imagery',
//             type: 'Imagery',
//             domain: 'remote_sensing',
//             description: 'High-resolution satellite imagery for coral reef monitoring and analysis',
//             format: 'GeoTIFF',
//             size: '45.8 GB',
//             timeRange: '2022-2024',
//             frequency: 'Weekly',
//             access: 'public',
//             quality: 96.3,
//             variables: ['reflectance', 'ndvi', 'water_quality'],
//             location: 'Gulf of Mannar',
//             institution: 'ISRO',
//             license: 'Open Data',
//             lastUpdated: '2024-04-23',
//             sampleSize: '1,200 images',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/img-004',
//             icon: Map,
//             color: 'amber'
//         },
//         {
//             id: 'tax-005',
//             name: 'Marine Species Taxonomy Database',
//             type: 'Taxonomy',
//             domain: 'biodiversity',
//             description: 'Comprehensive taxonomic database of marine species with phylogenetic data',
//             format: 'JSON',
//             size: '320 MB',
//             timeRange: '1758-2024',
//             frequency: 'Annual',
//             access: 'public',
//             quality: 99.1,
//             variables: ['species', 'classification', 'distribution', 'conservation_status'],
//             location: 'Global',
//             institution: 'WoRMS',
//             license: 'CC0 1.0',
//             lastUpdated: '2024-04-22',
//             sampleSize: '240,000 species',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/tax-005',
//             icon: Users,
//             color: 'blue'
//         },
//         {
//             id: 'wave-006',
//             name: 'Coastal Wave Height Monitoring',
//             type: 'Wave Data',
//             domain: 'oceanography',
//             description: 'Real-time wave height and direction data from coastal monitoring stations',
//             format: 'CSV',
//             size: '1.2 GB',
//             timeRange: '2023-2024',
//             frequency: 'Hourly',
//             access: 'restricted',
//             quality: 94.7,
//             variables: ['wave_height', 'wave_period', 'direction', 'water_level'],
//             location: 'Indian Coastline',
//             institution: 'INCOIS',
//             license: 'Research Use Only',
//             lastUpdated: '2024-04-26',
//             sampleSize: '8.7M records',
//             previewAvailable: false,
//             apiEndpoint: '/api/datasets/wave-006',
//             icon: TrendingUp,
//             color: 'indigo'
//         }
//     ];

//     // Filter and sort datasets
//     const filteredDatasets = datasets
//         .filter(dataset => {
//             // Category filter
//             if (selectedCategory !== 'all' && dataset.domain !== selectedCategory) return false;
            
//             // Search filter
//             if (searchTerm && !dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//                 !dataset.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            
//             // Active filters
//             if (activeFilters.domain.length > 0 && !activeFilters.domain.includes(dataset.domain)) return false;
//             if (activeFilters.access.length > 0 && !activeFilters.access.includes(dataset.access)) return false;
//             if (activeFilters.format.length > 0 && !activeFilters.format.includes(dataset.format)) return false;
//             if (activeFilters.status.length > 0) {
//                 if (activeFilters.status.includes('preview') && !dataset.previewAvailable) return false;
//                 if (activeFilters.status.includes('recent') && !isRecent(dataset.lastUpdated)) return false;
//             }
            
//             return true;
//         })
//         .sort((a, b) => {
//             let aVal = a[sortBy];
//             let bVal = b[sortBy];
            
//             if (sortBy === 'lastUpdated') {
//                 aVal = new Date(aVal);
//                 bVal = new Date(bVal);
//             }
            
//             if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
//             if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
//             return 0;
//         });

//     const isRecent = (date) => {
//         const diffTime = Math.abs(new Date() - new Date(date));
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays <= 30;
//     };

//     const handleSort = (field) => {
//         if (sortBy === field) {
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortBy(field);
//             setSortDirection('asc');
//         }
//     };

//     const toggleFilter = (filterType, value) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             [filterType]: prev[filterType].includes(value)
//                 ? prev[filterType].filter(v => v !== value)
//                 : [...prev[filterType], value]
//         }));
//     };

//     const handleDatasetSelect = (id) => {
//         setSelectedDatasets(prev =>
//             prev.includes(id)
//                 ? prev.filter(datasetId => datasetId !== id)
//                 : [...prev, id]
//         );
//     };

//     const handleSelectAll = () => {
//         if (selectedDatasets.length === filteredDatasets.length) {
//             setSelectedDatasets([]);
//         } else {
//             setSelectedDatasets(filteredDatasets.map(d => d.id));
//         }
//     };

//     const handlePreview = (dataset) => {
//         setPreviewDataset(dataset);
//     };

//     const handleDownload = async (dataset = null) => {
//         const datasetsToDownload = dataset ? [dataset.id] : selectedDatasets;
//         // Simulate download process
//         console.log('Downloading datasets:', datasetsToDownload);
//     };

//     const getIconColor = (color) => {
//         const colors = {
//             cyan: 'text-cyan-400',
//             emerald: 'text-emerald-400',
//             violet: 'text-violet-400',
//             amber: 'text-amber-400',
//             blue: 'text-blue-400',
//             indigo: 'text-indigo-400'
//         };
//         return colors[color] || 'text-slate-400';
//     };

//     const getBgColor = (color) => {
//         const colors = {
//             cyan: 'bg-cyan-500/20',
//             emerald: 'bg-emerald-500/20',
//             violet: 'bg-violet-500/20',
//             amber: 'bg-amber-500/20',
//             blue: 'bg-blue-500/20',
//             indigo: 'bg-indigo-500/20'
//         };
//         return colors[color] || 'bg-slate-500/20';
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-7">
//             <Navbar />
//             <VarunAIAgent 
//                 isOpen={isVarunOpen} 
//                 onToggle={() => setIsVarunOpen(!isVarunOpen)}
//                 currentPage="data_hub"
//             />
            
//             <div className="pt-24 px-4">
//                 <div className="max-w-7xl mx-auto">
//                     {/* Enhanced Header */}
//                     <div className="mb-8 text-center">
//                         <div className="flex items-center justify-center gap-3 mb-4">
//                             <div className="p-3 bg-cyan-500/20 rounded-2xl">
//                                 <Database className="w-8 h-8 text-cyan-400" />
//                             </div>
//                             <h1 className="text-4xl font-bold text-white">Data Hub</h1>
//                         </div>
//                         <p className="text-xl text-slate-300 max-w-3xl mx-auto">
//                             Unified Marine Dataset Catalog — Explore metadata, access controls, and preview marine datasets 
//                             (oceanography, eDNA, fisheries, biodiversity, and more)
//                         </p>
//                         <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-400">
//                             <div className="flex items-center gap-1">
//                                 <Server className="w-4 h-4" />
//                                 {datasets.length} curated datasets
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 <Shield className="w-4 h-4" />
//                                 Secure access controls
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 <Zap className="w-4 h-4" />
//                                 Real-time previews
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex gap-6">
//                         {/* Enhanced Filters Sidebar */}
//                         <div className="w-80 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 h-fit">
//                             <div className="mb-6">
//                                 <div className="relative">
//                                     <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search datasets..."
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                         className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400 focus:border-cyan-400 transition-colors"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-6">
//                                 {/* Quick Categories */}
//                                 <div>
//                                     <h3 className="text-white font-medium mb-3 flex items-center gap-2">
//                                         <Layers className="w-4 h-4" />
//                                         Data Categories
//                                     </h3>
//                                     <div className="space-y-2">
//                                         {['all', 'oceanography', 'fisheries', 'molecular', 'remote_sensing', 'biodiversity'].map(category => (
//                                             <button
//                                                 key={category}
//                                                 onClick={() => setSelectedCategory(category)}
//                                                 className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
//                                                     selectedCategory === category
//                                                         ? 'bg-cyan-500/20 text-cyan-400'
//                                                         : 'text-slate-300 hover:bg-slate-700/50'
//                                                 }`}
//                                             >
//                                                 {category === 'all' ? 'All Datasets' : category.replace('_', ' ')}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Access Level Filter */}
//                                 <div>
//                                     <h3 className="text-white font-medium mb-3">Access Level</h3>
//                                     <div className="space-y-2">
//                                         {['public', 'restricted'].map(access => (
//                                             <label key={access} className="flex items-center gap-2 text-slate-300 cursor-pointer">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={activeFilters.access.includes(access)}
//                                                     onChange={() => toggleFilter('access', access)}
//                                                     className="rounded border-slate-600 bg-slate-700 text-cyan-500"
//                                                 />
//                                                 <span className="flex items-center gap-1">
//                                                     {access === 'public' ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
//                                                     {access === 'public' ? 'Public Access' : 'Restricted'}
//                                                 </span>
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Dataset Status */}
//                                 <div>
//                                     <h3 className="text-white font-medium mb-3">Dataset Status</h3>
//                                     <div className="space-y-2">
//                                         <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={activeFilters.status.includes('preview')}
//                                                 onChange={() => toggleFilter('status', 'preview')}
//                                                 className="rounded border-slate-600 bg-slate-700 text-cyan-500"
//                                             />
//                                             Preview Available
//                                         </label>
//                                         <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={activeFilters.status.includes('recent')}
//                                                 onChange={() => toggleFilter('status', 'recent')}
//                                                 className="rounded border-slate-600 bg-slate-700 text-cyan-500"
//                                             />
//                                             Recently Updated
//                                         </label>
//                                     </div>
//                                 </div>

//                                 {/* Results Summary */}
//                                 <div className="pt-4 border-t border-slate-700">
//                                     <div className="text-sm text-slate-400">
//                                         Showing {filteredDatasets.length} of {datasets.length} datasets
//                                         {selectedDatasets.length > 0 && (
//                                             <span className="text-cyan-400 ml-1">
//                                                 ({selectedDatasets.length} selected)
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Main Content Area */}
//                         <div className="flex-1">
//                             {/* Action Bar */}
//                             <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <button
//                                             onClick={handleSelectAll}
//                                             className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
//                                         >
//                                             {selectedDatasets.length === filteredDatasets.length ? 'Deselect All' : 'Select All'}
//                                         </button>
                                        
//                                         <select 
//                                             value={sortBy}
//                                             onChange={(e) => handleSort(e.target.value)}
//                                             className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
//                                         >
//                                             <option value="name">Sort by Name</option>
//                                             <option value="lastUpdated">Sort by Recent</option>
//                                             <option value="quality">Sort by Quality</option>
//                                             <option value="size">Sort by Size</option>
//                                         </select>
//                                     </div>

//                                     <div className="flex items-center gap-3">
//                                         <button 
//                                             onClick={() => handleDownload()}
//                                             disabled={selectedDatasets.length === 0}
//                                             className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
//                                         >
//                                             <DownloadCloud className="w-4 h-4" />
//                                             Download Selected ({selectedDatasets.length})
//                                         </button>
                                        
//                                         <button className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors">
//                                             <Settings className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Dataset Grid */}
//                             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                                 {filteredDatasets.map(dataset => {
//                                     const IconComponent = dataset.icon;
//                                     return (
//                                         <div key={dataset.id} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
//                                             <div className="flex items-start justify-between mb-4">
//                                                 <div className={`p-3 rounded-xl ${getBgColor(dataset.color)}`}>
//                                                     <IconComponent className={`w-6 h-6 ${getIconColor(dataset.color)}`} />
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedDatasets.includes(dataset.id)}
//                                                         onChange={() => handleDatasetSelect(dataset.id)}
//                                                         className="rounded border-slate-600 bg-slate-700 text-cyan-500"
//                                                     />
//                                                     {dataset.access === 'restricted' && (
//                                                         <Lock className="w-4 h-4 text-amber-400" />
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <h3 className="text-white font-semibold mb-2 line-clamp-2">{dataset.name}</h3>
//                                             <p className="text-slate-400 text-sm mb-4 line-clamp-2">{dataset.description}</p>

//                                             <div className="space-y-3 mb-4">
//                                                 <div className="flex items-center justify-between text-sm">
//                                                     <span className="text-slate-500">Format:</span>
//                                                     <span className="text-slate-300">{dataset.format}</span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between text-sm">
//                                                     <span className="text-slate-500">Size:</span>
//                                                     <span className="text-slate-300">{dataset.size}</span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between text-sm">
//                                                     <span className="text-slate-500">Time Range:</span>
//                                                     <span className="text-slate-300">{dataset.timeRange}</span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between text-sm">
//                                                     <span className="text-slate-500">Quality:</span>
//                                                     <span className="text-slate-300">{dataset.quality}%</span>
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center justify-between pt-4 border-t border-slate-700">
//                                                 <button
//                                                     onClick={() => handlePreview(dataset)}
//                                                     className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm"
//                                                 >
//                                                     <Eye className="w-4 h-4" />
//                                                     Preview
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDownload(dataset)}
//                                                     disabled={dataset.access === 'restricted'}
//                                                     className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 text-sm"
//                                                 >
//                                                     <Download className="w-4 h-4" />
//                                                     {dataset.access === 'restricted' ? 'Request Access' : 'Download'}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>

//                             {filteredDatasets.length === 0 && (
//                                 <div className="text-center py-12">
//                                     <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
//                                     <p className="text-slate-400">No datasets found matching your criteria.</p>
//                                     <button 
//                                         onClick={() => {
//                                             setSearchTerm('');
//                                             setActiveFilters({ domain: [], access: [], format: [], status: [] });
//                                             setSelectedCategory('all');
//                                         }}
//                                         className="mt-2 text-cyan-400 hover:text-cyan-300 transition-colors"
//                                     >
//                                         Clear all filters
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Dataset Preview Modal */}
//             {previewDataset && (
//                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setPreviewDataset(null)}>
//                     <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e) => e.stopPropagation()}>
//                         <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
//                             <div className="flex items-center gap-3">
//                                 <div className={`p-2 rounded-lg ${getBgColor(previewDataset.color)}`}>
//                                     {React.createElement(previewDataset.icon, { className: `w-5 h-5 ${getIconColor(previewDataset.color)}` })}
//                                 </div>
//                                 <div>
//                                     <h3 className="text-white font-semibold text-lg">{previewDataset.name}</h3>
//                                     <p className="text-slate-400 text-sm">{previewDataset.type} • {previewDataset.domain.replace('_', ' ')}</p>
//                                 </div>
//                             </div>
//                             <button 
//                                 onClick={() => setPreviewDataset(null)}
//                                 className="text-slate-400 hover:text-white transition-colors"
//                             >
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>
                        
//                         <div className="p-6">
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                                 <div>
//                                     <h4 className="text-white font-medium mb-3">Dataset Overview</h4>
//                                     <div className="space-y-3">
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Description:</span>
//                                             <span className="text-slate-300 text-right">{previewDataset.description}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Institution:</span>
//                                             <span className="text-slate-300">{previewDataset.institution}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">License:</span>
//                                             <span className="text-slate-300">{previewDataset.license}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Last Updated:</span>
//                                             <span className="text-slate-300">{previewDataset.lastUpdated}</span>
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 <div>
//                                     <h4 className="text-white font-medium mb-3">Technical Details</h4>
//                                     <div className="space-y-3">
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Sample Size:</span>
//                                             <span className="text-slate-300">{previewDataset.sampleSize}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Frequency:</span>
//                                             <span className="text-slate-300">{previewDataset.frequency}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Data Quality:</span>
//                                             <span className="text-slate-300">{previewDataset.quality}%</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">API Endpoint:</span>
//                                             <span className="text-slate-300 font-mono text-sm">{previewDataset.apiEndpoint}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <div className="mb-6">
//                                 <h4 className="text-white font-medium mb-3">Variables & Parameters</h4>
//                                 <div className="flex flex-wrap gap-2">
//                                     {previewDataset.variables.map((variable, index) => (
//                                         <span key={index} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm">
//                                             {variable}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
                            
//                             <div className="flex gap-3">
//                                 <button
//                                     onClick={() => handleDownload(previewDataset)}
//                                     disabled={previewDataset.access === 'restricted'}
//                                     className="flex-1 px-4 py-3 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                                 >
//                                     <Download className="w-5 h-5" />
//                                     {previewDataset.access === 'restricted' ? 'Request Access' : 'Download Dataset'}
//                                 </button>
//                                 <button className="px-4 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors flex items-center gap-2">
//                                     <ExternalLink className="w-5 h-5" />
//                                     API Documentation
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import { 
//     Search, Database, Waves, Fish, Dna, Globe, Download, Filter, 
//     RefreshCw, Eye, MapPin, Calendar, FileText, Settings, HelpCircle,
//     Lock, Unlock, BarChart3, TrendingUp, ExternalLink, Play,
//     ChevronDown, ChevronUp, Info, DownloadCloud, Server, Clock,
//     Users, Shield, Zap, Layers, Map, PieChart, Activity, Thermometer,
//     Navigation, Wind, Cloud, AlertCircle, CheckCircle, X
// } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import VarunAIAgent from '../components/VarunAIAgent';

// export default function DataHub() {
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [isVarunOpen, setIsVarunOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedDatasets, setSelectedDatasets] = useState([]);
//     const [sortBy, setSortBy] = useState('name');
//     const [sortDirection, setSortDirection] = useState('asc');
//     const [previewDataset, setPreviewDataset] = useState(null);
//     const [activeFilters, setActiveFilters] = useState({
//         domain: [],
//         access: [],
//         format: [],
//         status: []
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [downloadProgress, setDownloadProgress] = useState({});
//     const [notifications, setNotifications] = useState([]);

//     // Enhanced dataset catalog with rich metadata and sample data
//     const datasets = [
//         {
//             id: 'oce-001',
//             name: 'Arabian Sea Temperature Profiles',
//             type: 'Oceanographic',
//             domain: 'oceanography',
//             description: 'High-resolution temperature measurements from Arabian Sea buoys and ARGO floats with depth profiles and seasonal variations',
//             format: 'NetCDF',
//             size: '2.4 GB',
//             timeRange: '2018-2024',
//             frequency: 'Daily',
//             access: 'public',
//             quality: 98.5,
//             variables: ['temperature', 'salinity', 'pressure', 'depth', 'timestamp'],
//             location: 'Arabian Sea',
//             institution: 'National Institute of Oceanography',
//             license: 'CC BY 4.0',
//             lastUpdated: '2024-04-26',
//             sampleSize: '15M records',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/oce-001',
//             icon: Thermometer,
//             color: 'cyan',
//             tags: ['real-time', 'climate', 'monitoring'],
//             sampleData: [
//                 { depth: '0m', temp: 28.5, salinity: 35.2, pressure: 1013 },
//                 { depth: '10m', temp: 27.8, salinity: 35.3, pressure: 1023 },
//                 { depth: '50m', temp: 25.2, salinity: 35.5, pressure: 1523 },
//                 { depth: '100m', temp: 22.1, salinity: 35.8, pressure: 2033 }
//             ]
//         },
//         {
//             id: 'fish-002',
//             name: 'Indian Ocean Fisheries Catch Data',
//             type: 'Fisheries',
//             domain: 'fisheries',
//             description: 'Commercial fishing catch data with species identification, vessel tracking, and environmental conditions',
//             format: 'CSV',
//             size: '850 MB',
//             timeRange: '2020-2024',
//             frequency: 'Monthly',
//             access: 'restricted',
//             quality: 95.2,
//             variables: ['species', 'catch_weight', 'vessel_id', 'location', 'timestamp', 'gear_type'],
//             location: 'Indian Ocean EEZ',
//             institution: 'Fisheries Survey of India',
//             license: 'Restricted - Requires Approval',
//             lastUpdated: '2024-04-25',
//             sampleSize: '2.4M records',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/fish-002',
//             icon: Fish,
//             color: 'emerald',
//             tags: ['commercial', 'species', 'tracking'],
//             sampleData: [
//                 { species: 'Tuna', weight: 2450, vessel: 'IND-FV-001', location: '12.5N, 73.2E' },
//                 { species: 'Mackerel', weight: 1800, vessel: 'IND-FV-003', location: '11.8N, 72.9E' },
//                 { species: 'Sardine', weight: 3200, vessel: 'IND-FV-007', location: '13.1N, 73.5E' }
//             ]
//         },
//         {
//             id: 'edna-003',
//             name: 'Marine eDNA Biodiversity Survey',
//             type: 'eDNA',
//             domain: 'molecular',
//             description: 'Environmental DNA sequencing data for marine biodiversity assessment and species detection',
//             format: 'FASTA',
//             size: '15.2 GB',
//             timeRange: '2023-2024',
//             frequency: 'Quarterly',
//             access: 'public',
//             quality: 97.8,
//             variables: ['species_detected', 'confidence', 'location', 'sample_id', 'sequence_length'],
//             location: 'Lakshadweep Islands',
//             institution: 'CSIR-NIO',
//             license: 'CC BY-NC 4.0',
//             lastUpdated: '2024-04-24',
//             sampleSize: '45,000 sequences',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/edna-003',
//             icon: Dna,
//             color: 'violet',
//             tags: ['biodiversity', 'sequencing', 'conservation'],
//             sampleData: [
//                 { species: 'Acropora muricata', confidence: 0.98, location: '11.7N, 72.2E' },
//                 { species: 'Thunnus albacares', confidence: 0.95, location: '11.6N, 72.3E' },
//                 { species: 'Dugong dugon', confidence: 0.92, location: '11.8N, 72.1E' }
//             ]
//         },
//         {
//             id: 'img-004',
//             name: 'Coral Reef Satellite Imagery',
//             type: 'Imagery',
//             domain: 'remote_sensing',
//             description: 'High-resolution satellite imagery for coral reef monitoring, bleaching detection, and habitat mapping',
//             format: 'GeoTIFF',
//             size: '45.8 GB',
//             timeRange: '2022-2024',
//             frequency: 'Weekly',
//             access: 'public',
//             quality: 96.3,
//             variables: ['reflectance', 'ndvi', 'water_quality', 'chlorophyll', 'turbidity'],
//             location: 'Gulf of Mannar',
//             institution: 'ISRO',
//             license: 'Open Data',
//             lastUpdated: '2024-04-23',
//             sampleSize: '1,200 images',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/img-004',
//             icon: Map,
//             color: 'amber',
//             tags: ['satellite', 'monitoring', 'habitat'],
//             sampleData: [
//                 { date: '2024-04-01', area: 'North Reef', health: 85, chlorophyll: 0.32 },
//                 { date: '2024-04-08', area: 'South Reef', health: 78, chlorophyll: 0.45 },
//                 { date: '2024-04-15', area: 'East Atoll', health: 92, chlorophyll: 0.28 }
//             ]
//         },
//         {
//             id: 'tax-005',
//             name: 'Marine Species Taxonomy Database',
//             type: 'Taxonomy',
//             domain: 'biodiversity',
//             description: 'Comprehensive taxonomic database of marine species with phylogenetic relationships and distribution data',
//             format: 'JSON',
//             size: '320 MB',
//             timeRange: '1758-2024',
//             frequency: 'Annual',
//             access: 'public',
//             quality: 99.1,
//             variables: ['species', 'classification', 'distribution', 'conservation_status', 'habitat'],
//             location: 'Global',
//             institution: 'WoRMS',
//             license: 'CC0 1.0',
//             lastUpdated: '2024-04-22',
//             sampleSize: '240,000 species',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/tax-005',
//             icon: Users,
//             color: 'blue',
//             tags: ['taxonomy', 'phylogeny', 'global'],
//             sampleData: [
//                 { species: 'Carcharodon carcharias', family: 'Lamnidae', status: 'Vulnerable' },
//                 { species: 'Chelonia mydas', family: 'Cheloniidae', status: 'Endangered' },
//                 { species: 'Manta birostris', family: 'Mobulidae', status: 'Vulnerable' }
//             ]
//         },
//         {
//             id: 'wave-006',
//             name: 'Coastal Wave Height Monitoring',
//             type: 'Wave Data',
//             domain: 'oceanography',
//             description: 'Real-time wave height and direction data from coastal monitoring stations and buoys',
//             format: 'CSV',
//             size: '1.2 GB',
//             timeRange: '2023-2024',
//             frequency: 'Hourly',
//             access: 'restricted',
//             quality: 94.7,
//             variables: ['wave_height', 'wave_period', 'direction', 'water_level', 'timestamp'],
//             location: 'Indian Coastline',
//             institution: 'INCOIS',
//             license: 'Research Use Only',
//             lastUpdated: '2024-04-26',
//             sampleSize: '8.7M records',
//             previewAvailable: false,
//             apiEndpoint: '/api/datasets/wave-006',
//             icon: TrendingUp,
//             color: 'indigo',
//             tags: ['real-time', 'coastal', 'safety'],
//             sampleData: [
//                 { station: 'GOA-001', height: 2.3, period: 8.5, direction: 145 },
//                 { station: 'KER-002', height: 1.8, period: 7.2, direction: 120 },
//                 { station: 'TN-003', height: 2.1, period: 9.1, direction: 135 }
//             ]
//         },
//         {
//             id: 'curr-007',
//             name: 'Ocean Current Patterns',
//             type: 'Current Data',
//             domain: 'oceanography',
//             description: 'Surface and subsurface current velocity data from ADCP measurements and satellite altimetry',
//             format: 'NetCDF',
//             size: '3.1 GB',
//             timeRange: '2021-2024',
//             frequency: '6-hourly',
//             access: 'public',
//             quality: 96.8,
//             variables: ['u_velocity', 'v_velocity', 'depth', 'timestamp', 'quality_flag'],
//             location: 'Bay of Bengal',
//             institution: 'NIOT',
//             license: 'CC BY 4.0',
//             lastUpdated: '2024-04-20',
//             sampleSize: '12.5M records',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/curr-007',
//             icon: Navigation,
//             color: 'cyan',
//             tags: ['currents', 'velocity', 'circulation'],
//             sampleData: [
//                 { depth: '0m', u_vel: 0.45, v_vel: 0.32, speed: 0.55 },
//                 { depth: '50m', u_vel: 0.32, v_vel: 0.28, speed: 0.43 },
//                 { depth: '100m', u_vel: 0.18, v_vel: 0.15, speed: 0.23 }
//             ]
//         },
//         {
//             id: 'qual-008',
//             name: 'Coastal Water Quality',
//             type: 'Water Quality',
//             domain: 'environmental',
//             description: 'Comprehensive water quality parameters including nutrients, pollutants, and biological indicators',
//             format: 'CSV',
//             size: '650 MB',
//             timeRange: '2020-2024',
//             frequency: 'Monthly',
//             access: 'public',
//             quality: 93.4,
//             variables: ['ph', 'do', 'nutrients', 'turbidity', 'heavy_metals'],
//             location: 'Coastal India',
//             institution: 'CPCB',
//             license: 'Open Government Data',
//             lastUpdated: '2024-04-18',
//             sampleSize: '1.8M records',
//             previewAvailable: true,
//             apiEndpoint: '/api/datasets/qual-008',
//             icon: Activity,
//             color: 'emerald',
//             tags: ['quality', 'pollution', 'monitoring'],
//             sampleData: [
//                 { location: 'Mumbai Coast', ph: 7.8, do: 6.2, turbidity: 12.5 },
//                 { location: 'Chennai Coast', ph: 8.1, do: 5.8, turbidity: 15.2 },
//                 { location: 'Kolkata Coast', ph: 7.9, do: 6.0, turbidity: 18.7 }
//             ]
//         }
//     ];

//     // Add notification
//     const addNotification = (message, type = 'info') => {
//         const id = Date.now();
//         const notification = { id, message, type };
//         setNotifications(prev => [...prev, notification]);
//         setTimeout(() => {
//             setNotifications(prev => prev.filter(n => n.id !== id));
//         }, 5000);
//     };

//     // Simulate download with progress
//     const simulateDownload = (datasetId) => {
//         setIsLoading(true);
//         setDownloadProgress(prev => ({ ...prev, [datasetId]: 0 }));
        
//         const interval = setInterval(() => {
//             setDownloadProgress(prev => {
//                 const newProgress = prev[datasetId] + Math.random() * 15;
//                 if (newProgress >= 100) {
//                     clearInterval(interval);
//                     setIsLoading(false);
//                     addNotification(`Download completed: ${datasets.find(d => d.id === datasetId)?.name}`, 'success');
//                     return { ...prev, [datasetId]: 100 };
//                 }
//                 return { ...prev, [datasetId]: newProgress };
//             });
//         }, 200);
//     };

//     // Filter and sort datasets
//     const filteredDatasets = datasets
//         .filter(dataset => {
//             if (selectedCategory !== 'all' && dataset.domain !== selectedCategory) return false;
            
//             if (searchTerm && !dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//                 !dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
//                 !dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
            
//             if (activeFilters.domain.length > 0 && !activeFilters.domain.includes(dataset.domain)) return false;
//             if (activeFilters.access.length > 0 && !activeFilters.access.includes(dataset.access)) return false;
//             if (activeFilters.format.length > 0 && !activeFilters.format.includes(dataset.format)) return false;
//             if (activeFilters.status.length > 0) {
//                 if (activeFilters.status.includes('preview') && !dataset.previewAvailable) return false;
//                 if (activeFilters.status.includes('recent') && !isRecent(dataset.lastUpdated)) return false;
//             }
            
//             return true;
//         })
//         .sort((a, b) => {
//             let aVal = a[sortBy];
//             let bVal = b[sortBy];
            
//             if (sortBy === 'lastUpdated') {
//                 aVal = new Date(aVal);
//                 bVal = new Date(bVal);
//             }
            
//             if (sortBy === 'quality' || sortBy === 'size') {
//                 aVal = parseFloat(aVal);
//                 bVal = parseFloat(bVal);
//             }
            
//             if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
//             if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
//             return 0;
//         });

//     const isRecent = (date) => {
//         const diffTime = Math.abs(new Date() - new Date(date));
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         return diffDays <= 30;
//     };

//     const handleSort = (field) => {
//         if (sortBy === field) {
//             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//         } else {
//             setSortBy(field);
//             setSortDirection('asc');
//         }
//     };

//     const toggleFilter = (filterType, value) => {
//         setActiveFilters(prev => ({
//             ...prev,
//             [filterType]: prev[filterType].includes(value)
//                 ? prev[filterType].filter(v => v !== value)
//                 : [...prev[filterType], value]
//         }));
//     };

//     const handleDatasetSelect = (id) => {
//         setSelectedDatasets(prev =>
//             prev.includes(id)
//                 ? prev.filter(datasetId => datasetId !== id)
//                 : [...prev, id]
//         );
//     };

//     const handleSelectAll = () => {
//         if (selectedDatasets.length === filteredDatasets.length) {
//             setSelectedDatasets([]);
//         } else {
//             setSelectedDatasets(filteredDatasets.map(d => d.id));
//         }
//     };

//     const handlePreview = (dataset) => {
//         setPreviewDataset(dataset);
//         addNotification(`Previewing dataset: ${dataset.name}`, 'info');
//     };

//     const handleDownload = async (dataset = null) => {
//         const datasetsToDownload = dataset ? [dataset.id] : selectedDatasets;
        
//         if (datasetsToDownload.length === 0) {
//             addNotification('Please select at least one dataset to download', 'warning');
//             return;
//         }

//         datasetsToDownload.forEach(datasetId => {
//             const dataset = datasets.find(d => d.id === datasetId);
//             if (dataset.access === 'restricted') {
//                 addNotification(`Access requested for: ${dataset.name}. Approval required.`, 'warning');
//             } else {
//                 simulateDownload(datasetId);
//             }
//         });
//     };

//     const clearAllFilters = () => {
//         setSearchTerm('');
//         setSelectedCategory('all');
//         setActiveFilters({ domain: [], access: [], format: [], status: [] });
//         setSelectedDatasets([]);
//         addNotification('All filters cleared', 'info');
//     };

//     const getIconColor = (color) => {
//         const colors = {
//             cyan: 'text-cyan-400',
//             emerald: 'text-emerald-400',
//             violet: 'text-violet-400',
//             amber: 'text-amber-400',
//             blue: 'text-blue-400',
//             indigo: 'text-indigo-400'
//         };
//         return colors[color] || 'text-slate-400';
//     };

//     const getBgColor = (color) => {
//         const colors = {
//             cyan: 'bg-cyan-500/20',
//             emerald: 'bg-emerald-500/20',
//             violet: 'bg-violet-500/20',
//             amber: 'bg-amber-500/20',
//             blue: 'bg-blue-500/20',
//             indigo: 'bg-indigo-500/20'
//         };
//         return colors[color] || 'bg-slate-500/20';
//     };

//     const getDomainIcon = (domain) => {
//         const icons = {
//             oceanography: Waves,
//             fisheries: Fish,
//             molecular: Dna,
//             remote_sensing: Map,
//             biodiversity: Users,
//             environmental: Activity
//         };
//         return icons[domain] || Database;
//     };

//     return (
//         <div className="min-h-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-7">
//             <Navbar />
//             <VarunAIAgent 
//                 isOpen={isVarunOpen} 
//                 onToggle={() => setIsVarunOpen(!isVarunOpen)}
//                 currentPage="data_hub"
//             />
            
//             {/* Notifications */}
//             <div className="fixed top-20 right-4 z-50 space-y-2">
//                 {notifications.map(notification => (
//                     <div
//                         key={notification.id}
//                         className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
//                             notification.type === 'success'
//                                 ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
//                                 : notification.type === 'warning'
//                                 ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
//                                 : 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
//                         }`}
//                     >
//                         {notification.type === 'success' ? (
//                             <CheckCircle className="w-4 h-4" />
//                         ) : notification.type === 'warning' ? (
//                             <AlertCircle className="w-4 h-4" />
//                         ) : (
//                             <Info className="w-4 h-4" />
//                         )}
//                         <span className="text-sm">{notification.message}</span>
//                         <button
//                             onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
//                             className="text-slate-400 hover:text-white"
//                         >
//                             <X className="w-3 h-3" />
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             <div className="pt-24 px-4">
//                 <div className="max-w-7xl mx-auto">
//                     {/* Enhanced Header */}
//                     <div className="mb-8 text-center">
//                         <div className="flex items-center justify-center gap-3 mb-4">
//                             <div className="p-3 bg-cyan-500/20 rounded-2xl">
//                                 <Database className="w-8 h-8 text-cyan-400" />
//                             </div>
//                             <h1 className="text-4xl font-bold text-white">Data Hub</h1>
//                         </div>
//                         <p className="text-xl text-slate-300 max-w-3xl mx-auto">
//                             Unified Marine Dataset Catalog — Explore metadata, access controls, and preview marine datasets 
//                             (oceanography, eDNA, fisheries, biodiversity, and more)
//                         </p>
//                         <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-400">
//                             <div className="flex items-center gap-1">
//                                 <Server className="w-4 h-4" />
//                                 {datasets.length} curated datasets
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 <Shield className="w-4 h-4" />
//                                 Secure access controls
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 <Zap className="w-4 h-4" />
//                                 Real-time previews
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex gap-6">
//                         {/* Enhanced Filters Sidebar */}
//                         <div className="w-80 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 h-fit sticky top-24">
//                             <div className="mb-6">
//                                 <div className="relative">
//                                     <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search datasets..."
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                         className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400 focus:border-cyan-400 transition-colors"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-6">
//                                 {/* Quick Categories */}
//                                 <div>
//                                     <h3 className="text-white font-medium mb-3 flex items-center gap-2">
//                                         <Layers className="w-4 h-4" />
//                                         Data Categories
//                                     </h3>
//                                     <div className="space-y-2">
//                                         {['all', 'oceanography', 'fisheries', 'molecular', 'remote_sensing', 'biodiversity', 'environmental'].map(category => {
//                                             const IconComponent = getDomainIcon(category === 'all' ? 'all' : category);
//                                             return (
//                                                 <button
//                                                     key={category}
//                                                     onClick={() => setSelectedCategory(category)}
//                                                     className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
//                                                         selectedCategory === category
//                                                             ? 'bg-cyan-500/20 text-cyan-400'
//                                                             : 'text-slate-300 hover:bg-slate-700/50'
//                                                     }`}
//                                                 >
//                                                     <IconComponent className="w-4 h-4" />
//                                                     {category === 'all' ? 'All Datasets' : category.replace('_', ' ')}
//                                                     <span className="ml-auto text-xs text-slate-500">
//                                                         {category === 'all' ? datasets.length : datasets.filter(d => d.domain === category).length}
//                                                     </span>
//                                                 </button>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>

//                                 {/* Access Level Filter */}
//                                 <div>
//                                     <h3 className="text-white font-medium mb-3">Access Level</h3>
//                                     <div className="space-y-2">
//                                         {['public', 'restricted'].map(access => (
//                                             <label key={access} className="flex items-center gap-2 text-slate-300 cursor-pointer">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={activeFilters.access.includes(access)}
//                                                     onChange={() => toggleFilter('access', access)}
//                                                     className="rounded border-slate-600 bg-slate-700 text-cyan-500"
//                                                 />
//                                                 <span className="flex items-center gap-1">
//                                                     {access === 'public' ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
//                                                     {access === 'public' ? 'Public Access' : 'Restricted'}
//                                                 </span>
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Dataset Status */}
                               

//                                 {/* Clear Filters */}
//                                 <button
//                                     onClick={clearAllFilters}
//                                     className="w-full px-3 py-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm border border-slate-700 rounded-lg hover:border-cyan-400/30"
//                                 >
//                                     Clear All Filters
//                                 </button>

//                                 {/* Results Summary */}
//                                 <div className="pt-4 border-t border-slate-700">
//                                     <div className="text-sm text-slate-400">
//                                         Showing {filteredDatasets.length} of {datasets.length} datasets
//                                         {selectedDatasets.length > 0 && (
//                                             <span className="text-cyan-400 ml-1">
//                                                 ({selectedDatasets.length} selected)
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Main Content Area */}
//                         <div className="flex-1">
//                             {/* Action Bar */}
//                             <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center gap-4">
//                                         <button
//                                             onClick={handleSelectAll}
//                                             className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
//                                         >
//                                             {selectedDatasets.length === filteredDatasets.length ? 'Deselect All' : 'Select All'}
//                                         </button>
                                        
//                                         <select 
//                                             value={sortBy}
//                                             onChange={(e) => handleSort(e.target.value)}
//                                             className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
//                                         >
//                                             <option value="name">Sort by Name</option>
//                                             <option value="lastUpdated">Sort by Recent</option>
//                                             <option value="quality">Sort by Quality</option>
//                                             <option value="size">Sort by Size</option>
//                                         </select>

//                                         <div className="flex items-center gap-2 text-slate-400 text-sm">
//                                             <span>Sort:</span>
//                                             <button
//                                                 onClick={() => handleSort(sortBy)}
//                                                 className="p-1 hover:text-cyan-400 transition-colors"
//                                             >
//                                                 {sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-3">
//                                         <button 
//                                             onClick={() => handleDownload()}
//                                             disabled={selectedDatasets.length === 0 || isLoading}
//                                             className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
//                                         >
//                                             {isLoading ? (
//                                                 <RefreshCw className="w-4 h-4 animate-spin" />
//                                             ) : (
//                                                 <DownloadCloud className="w-4 h-4" />
//                                             )}
//                                             Download Selected ({selectedDatasets.length})
//                                         </button>
                                        
//                                         <button 
//                                             onClick={() => addNotification('Settings panel opened', 'info')}
//                                             className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
//                                         >
//                                             <Settings className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Dataset Grid */}
//                             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                                 {filteredDatasets.map(dataset => {
//                                     const IconComponent = dataset.icon;
//                                     const progress = downloadProgress[dataset.id] || 0;
                                    
//                                     return (
//                                         <div key={dataset.id} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105 group">
//                                             {/* Download Progress Bar */}
//                                             {progress > 0 && progress < 100 && (
//                                                 <div className="mb-4">
//                                                     <div className="flex justify-between text-xs text-slate-400 mb-1">
//                                                         <span>Downloading...</span>
//                                                         <span>{Math.round(progress)}%</span>
//                                                     </div>
//                                                     <div className="w-full bg-slate-700 rounded-full h-2">
//                                                         <div 
//                                                             className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
//                                                             style={{ width: `${progress}%` }}
//                                                         ></div>
//                                                     </div>
//                                                 </div>
//                                             )}

//                                             <div className="flex items-start justify-between mb-4">
//                                                 <div className={`p-3 rounded-xl ${getBgColor(dataset.color)}`}>
//                                                     <IconComponent className={`w-6 h-6 ${getIconColor(dataset.color)}`} />
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedDatasets.includes(dataset.id)}
//                                                         onChange={() => handleDatasetSelect(dataset.id)}
//                                                         className="rounded border-slate-600 bg-slate-700 text-cyan-500"
//                                                     />
//                                                     {dataset.access === 'restricted' && (
//                                                         <Lock className="w-4 h-4 text-amber-400" />
//                                                     )}
//                                                     {progress === 100 && (
//                                                         <CheckCircle className="w-4 h-4 text-emerald-400" />
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">{dataset.name}</h3>
//                                             <p className="text-slate-400 text-sm mb-4 line-clamp-2">{dataset.description}</p>

//                                             {/* Tags */}
//                                             <div className="flex flex-wrap gap-1 mb-4">
//                                                 {dataset.tags.map((tag, index) => (
//                                                     <span key={index} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-md text-xs">
//                                                         {tag}
//                                                     </span>
//                                                 ))}
//                                             </div>

//                                             <div className="space-y-3 mb-4">
//                                                 <div className="flex items-center justify-between text-sm">
//                                                     <span className="text-slate-500">Format:</span>
//                                                     <span className="text-slate-300">{dataset.format}</span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between text-sm">
//                                                     <span className="text-slate-500">Size:</span>
//                                                     <span className="text-slate-300">{dataset.size}</span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between text-sm">
//                                                     <span className="text-slate-500">Time Range:</span>
//                                                     <span className="text-slate-300">{dataset.timeRange}</span>
//                                                 </div>
//                                                 <div className="flex items-center justify-between text-sm">
//                                                     <span className="text-slate-500">Quality:</span>
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="w-16 bg-slate-700 rounded-full h-1.5">
//                                                             <div 
//                                                                 className="bg-emerald-500 h-1.5 rounded-full"
//                                                                 style={{ width: `${dataset.quality}%` }}
//                                                             ></div>
//                                                         </div>
//                                                         <span className="text-slate-300">{dataset.quality}%</span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="flex items-center justify-between pt-4 border-t border-slate-700">
//                                                 <button
//                                                     onClick={() => handlePreview(dataset)}
//                                                     className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm"
//                                                 >
//                                                     <Eye className="w-4 h-4" />
//                                                     Preview
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDownload(dataset)}
//                                                     disabled={dataset.access === 'restricted' || isLoading}
//                                                     className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 text-sm"
//                                                 >
//                                                     <Download className="w-4 h-4" />
//                                                     {dataset.access === 'restricted' ? 'Request Access' : 'Download'}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>

//                             {filteredDatasets.length === 0 && (
//                                 <div className="text-center py-12">
//                                     <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
//                                     <p className="text-slate-400">No datasets found matching your criteria.</p>
//                                     <button 
//                                         onClick={clearAllFilters}
//                                         className="mt-2 text-cyan-400 hover:text-cyan-300 transition-colors"
//                                     >
//                                         Clear all filters
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Dataset Preview Modal */}
//             {previewDataset && (
//                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setPreviewDataset(null)}>
//                     <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e) => e.stopPropagation()}>
//                         <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
//                             <div className="flex items-center gap-3">
//                                 <div className={`p-2 rounded-lg ${getBgColor(previewDataset.color)}`}>
//                                     {React.createElement(previewDataset.icon, { className: `w-5 h-5 ${getIconColor(previewDataset.color)}` })}
//                                 </div>
//                                 <div>
//                                     <h3 className="text-white font-semibold text-lg">{previewDataset.name}</h3>
//                                     <p className="text-slate-400 text-sm">{previewDataset.type} • {previewDataset.domain.replace('_', ' ')}</p>
//                                 </div>
//                             </div>
//                             <button 
//                                 onClick={() => setPreviewDataset(null)}
//                                 className="text-slate-400 hover:text-white transition-colors"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>
                        
//                         <div className="p-6">
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                                 <div>
//                                     <h4 className="text-white font-medium mb-3">Dataset Overview</h4>
//                                     <div className="space-y-3">
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Description:</span>
//                                             <span className="text-slate-300 text-right">{previewDataset.description}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Institution:</span>
//                                             <span className="text-slate-300">{previewDataset.institution}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">License:</span>
//                                             <span className="text-slate-300">{previewDataset.license}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Last Updated:</span>
//                                             <span className="text-slate-300">{previewDataset.lastUpdated}</span>
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 <div>
//                                     <h4 className="text-white font-medium mb-3">Technical Details</h4>
//                                     <div className="space-y-3">
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Sample Size:</span>
//                                             <span className="text-slate-300">{previewDataset.sampleSize}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Frequency:</span>
//                                             <span className="text-slate-300">{previewDataset.frequency}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">Data Quality:</span>
//                                             <span className="text-slate-300">{previewDataset.quality}%</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-slate-400">API Endpoint:</span>
//                                             <span className="text-slate-300 font-mono text-sm">{previewDataset.apiEndpoint}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             {/* Sample Data Preview */}
//                             <div className="mb-6">
//                                 <h4 className="text-white font-medium mb-3">Sample Data Preview</h4>
//                                 <div className="bg-slate-900/50 rounded-lg p-4">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                         {previewDataset.sampleData.slice(0, 3).map((sample, index) => (
//                                             <div key={index} className="bg-slate-800/30 rounded-lg p-3">
//                                                 {Object.entries(sample).map(([key, value]) => (
//                                                     <div key={key} className="flex justify-between text-sm mb-1">
//                                                         <span className="text-slate-400 capitalize">{key}:</span>
//                                                         <span className="text-slate-300">{value}</span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <div className="mb-6">
//                                 <h4 className="text-white font-medium mb-3">Variables & Parameters</h4>
//                                 <div className="flex flex-wrap gap-2">
//                                     {previewDataset.variables.map((variable, index) => (
//                                         <span key={index} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm">
//                                             {variable}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
                            
//                             <div className="flex gap-3">
//                                 <button
//                                     onClick={() => handleDownload(previewDataset)}
//                                     disabled={previewDataset.access === 'restricted' || isLoading}
//                                     className="flex-1 px-4 py-3 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                                 >
//                                     <Download className="w-5 h-5" />
//                                     {previewDataset.access === 'restricted' ? 'Request Access' : 'Download Dataset'}
//                                 </button>
//                                 <button 
//                                     onClick={() => addNotification('API documentation opened', 'info')}
//                                     className="px-4 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors flex items-center gap-2"
//                                 >
//                                     <ExternalLink className="w-5 h-5" />
//                                     API Documentation
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { 
    Search, Database, Waves, Fish, Dna, Globe, Download, Filter, 
    RefreshCw, Eye, MapPin, Calendar, FileText, Settings, HelpCircle,
    Lock, Unlock, BarChart3, TrendingUp, ExternalLink, Play,
    ChevronDown, ChevronUp, Info, DownloadCloud, Server, Clock,
    Users, Shield, Zap, Layers, Map, PieChart, Activity, Thermometer,
    Navigation, Wind, Cloud, AlertCircle, CheckCircle, X, FileJson,
    FileSpreadsheet, Archive, Image, Code, Loader
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function DataHub() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDatasets, setSelectedDatasets] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [previewDataset, setPreviewDataset] = useState(null);
    const [activeFilters, setActiveFilters] = useState({
        domain: [],
        access: [],
        format: [],
        status: []
    });
    const [downloadQueue, setDownloadQueue] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [isGeneratingFile, setIsGeneratingFile] = useState(false);

    // Enhanced dataset catalog with downloadable content
    const datasets = [
        {
            id: 'oce-001',
            name: 'Arabian Sea Temperature Profiles',
            type: 'Oceanographic',
            domain: 'oceanography',
            description: 'High-resolution temperature measurements from Arabian Sea buoys and ARGO floats with depth profiles and seasonal variations',
            format: 'CSV',
            size: '2.4 MB',
            timeRange: '2018-2024',
            frequency: 'Daily',
            access: 'public',
            quality: 98.5,
            variables: ['temperature', 'salinity', 'pressure', 'depth', 'timestamp'],
            location: 'Arabian Sea',
            institution: 'National Institute of Oceanography',
            license: 'CC BY 4.0',
            lastUpdated: '2024-04-26',
            sampleSize: '15K records',
            previewAvailable: true,
            apiEndpoint: '/api/datasets/oce-001',
            icon: Thermometer,
            color: 'cyan',
            tags: ['real-time', 'climate', 'monitoring'],
            sampleData: [
                { depth: '0m', temp: 28.5, salinity: 35.2, pressure: 1013, timestamp: '2024-04-26T08:00:00Z' },
                { depth: '10m', temp: 27.8, salinity: 35.3, pressure: 1023, timestamp: '2024-04-26T08:00:00Z' },
                { depth: '50m', temp: 25.2, salinity: 35.5, pressure: 1523, timestamp: '2024-04-26T08:00:00Z' },
                { depth: '100m', temp: 22.1, salinity: 35.8, pressure: 2033, timestamp: '2024-04-26T08:00:00Z' },
                { depth: '200m', temp: 18.9, salinity: 36.1, pressure: 3033, timestamp: '2024-04-26T08:00:00Z' }
            ]
        },
        {
            id: 'fish-002',
            name: 'Indian Ocean Fisheries Catch Data',
            type: 'Fisheries',
            domain: 'fisheries',
            description: 'Commercial fishing catch data with species identification, vessel tracking, and environmental conditions',
            format: 'JSON',
            size: '850 KB',
            timeRange: '2020-2024',
            frequency: 'Monthly',
            access: 'restricted',
            quality: 95.2,
            variables: ['species', 'catch_weight', 'vessel_id', 'location', 'timestamp', 'gear_type'],
            location: 'Indian Ocean EEZ',
            institution: 'Fisheries Survey of India',
            license: 'Restricted - Requires Approval',
            lastUpdated: '2024-04-25',
            sampleSize: '2.4K records',
            previewAvailable: true,
            apiEndpoint: '/api/datasets/fish-002',
            icon: Fish,
            color: 'emerald',
            tags: ['commercial', 'species', 'tracking'],
            sampleData: [
                { species: 'Yellowfin Tuna', weight: 2450, vessel: 'IND-FV-001', location: '12.5N, 73.2E', timestamp: '2024-04-01', gear: 'longline' },
                { species: 'Indian Mackerel', weight: 1800, vessel: 'IND-FV-003', location: '11.8N, 72.9E', timestamp: '2024-04-01', gear: 'purse_seine' },
                { species: 'Oil Sardine', weight: 3200, vessel: 'IND-FV-007', location: '13.1N, 73.5E', timestamp: '2024-04-01', gear: 'ring_net' },
                { species: 'Pomfret', weight: 890, vessel: 'IND-FV-012', location: '14.2N, 74.1E', timestamp: '2024-04-01', gear: 'trawl' }
            ]
        },
        {
            id: 'edna-003',
            name: 'Marine eDNA Biodiversity Survey',
            type: 'eDNA',
            domain: 'molecular',
            description: 'Environmental DNA sequencing data for marine biodiversity assessment and species detection',
            format: 'FASTA',
            size: '1.2 MB',
            timeRange: '2023-2024',
            frequency: 'Quarterly',
            access: 'public',
            quality: 97.8,
            variables: ['species_detected', 'confidence', 'location', 'sample_id', 'sequence_length'],
            location: 'Lakshadweep Islands',
            institution: 'CSIR-NIO',
            license: 'CC BY-NC 4.0',
            lastUpdated: '2024-04-24',
            sampleSize: '450 sequences',
            previewAvailable: true,
            apiEndpoint: '/api/datasets/edna-003',
            icon: Dna,
            color: 'violet',
            tags: ['biodiversity', 'sequencing', 'conservation'],
            sampleData: [
                { species: 'Acropora muricata', confidence: 0.98, location: '11.7N, 72.2E', sequence_length: 658, sample_id: 'LK001' },
                { species: 'Thunnus albacares', confidence: 0.95, location: '11.6N, 72.3E', sequence_length: 702, sample_id: 'LK002' },
                { species: 'Dugong dugon', confidence: 0.92, location: '11.8N, 72.1E', sequence_length: 634, sample_id: 'LK003' },
                { species: 'Chelonia mydas', confidence: 0.89, location: '11.5N, 72.4E', sequence_length: 681, sample_id: 'LK004' }
            ]
        },
        {
            id: 'img-004',
            name: 'Coral Reef Satellite Imagery',
            type: 'Imagery',
            domain: 'remote_sensing',
            description: 'High-resolution satellite imagery for coral reef monitoring, bleaching detection, and habitat mapping',
            format: 'ZIP',
            size: '4.8 MB',
            timeRange: '2022-2024',
            frequency: 'Weekly',
            access: 'public',
            quality: 96.3,
            variables: ['reflectance', 'ndvi', 'water_quality', 'chlorophyll', 'turbidity'],
            location: 'Gulf of Mannar',
            institution: 'ISRO',
            license: 'Open Data',
            lastUpdated: '2024-04-23',
            sampleSize: '120 images',
            previewAvailable: true,
            apiEndpoint: '/api/datasets/img-004',
            icon: Map,
            color: 'amber',
            tags: ['satellite', 'monitoring', 'habitat'],
            sampleData: [
                { date: '2024-04-01', area: 'North Reef', health: 85, chlorophyll: 0.32, ndvi: 0.45, lat: 9.15, lon: 79.12 },
                { date: '2024-04-08', area: 'South Reef', health: 78, chlorophyll: 0.45, ndvi: 0.52, lat: 8.95, lon: 78.98 },
                { date: '2024-04-15', area: 'East Atoll', health: 92, chlorophyll: 0.28, ndvi: 0.48, lat: 9.25, lon: 79.28 },
                { date: '2024-04-22', area: 'West Bank', health: 67, chlorophyll: 0.58, ndvi: 0.41, lat: 8.88, lon: 78.75 }
            ]
        },
        {
            id: 'whale-005',
            name: 'Whale Shark Movement Data',
            type: 'Telemetry',
            domain: 'marine_biology',
            description: 'Satellite tracking data from tagged whale sharks showing migration patterns and diving behavior',
            format: 'CSV',
            size: '3.1 MB',
            timeRange: '2019-2024',
            frequency: 'Hourly',
            access: 'public',
            quality: 94.7,
            variables: ['shark_id', 'latitude', 'longitude', 'depth', 'temperature', 'timestamp'],
            location: 'Indian Ocean',
            institution: 'Wildlife Conservation Society',
            license: 'CC BY 4.0',
            lastUpdated: '2024-04-20',
            sampleSize: '8.2K records',
            previewAvailable: true,
            apiEndpoint: '/api/datasets/whale-005',
            icon: Fish,
            color: 'blue',
            tags: ['migration', 'conservation', 'telemetry'],
            sampleData: [
                { shark_id: 'WS001', latitude: 18.92, longitude: 72.83, depth: 15.2, temperature: 28.5, timestamp: '2024-04-20T06:00:00Z' },
                { shark_id: 'WS001', latitude: 18.94, longitude: 72.85, depth: 22.8, temperature: 27.9, timestamp: '2024-04-20T07:00:00Z' },
                { shark_id: 'WS002', latitude: 9.93, longitude: 76.27, depth: 8.5, temperature: 29.1, timestamp: '2024-04-20T06:00:00Z' },
                { shark_id: 'WS002', latitude: 9.95, longitude: 76.29, depth: 12.3, temperature: 28.8, timestamp: '2024-04-20T07:00:00Z' }
            ]
        },
        {
            id: 'water-006',
            name: 'Water Quality Monitoring Data',
            type: 'Environmental',
            domain: 'water_quality',
            description: 'Multi-parameter water quality measurements from coastal monitoring stations',
            format: 'JSON',
            size: '1.8 MB',
            timeRange: '2020-2024',
            frequency: 'Daily',
            access: 'public',
            quality: 96.8,
            variables: ['ph', 'dissolved_oxygen', 'turbidity', 'nitrates', 'phosphates', 'coliform'],
            location: 'West Coast Monitoring Stations',
            institution: 'Central Pollution Control Board',
            license: 'Open Government Data',
            lastUpdated: '2024-04-19',
            sampleSize: '12K records',
            previewAvailable: true,
            apiEndpoint: '/api/datasets/water-006',
            icon: Waves,
            color: 'indigo',
            tags: ['pollution', 'monitoring', 'quality'],
            sampleData: [
                { station: 'MUM01', ph: 8.1, dissolved_oxygen: 6.8, turbidity: 4.2, nitrates: 0.15, phosphates: 0.08, date: '2024-04-19' },
                { station: 'GOA01', ph: 8.3, dissolved_oxygen: 7.2, turbidity: 2.8, nitrates: 0.12, phosphates: 0.06, date: '2024-04-19' },
                { station: 'KOC01', ph: 8.0, dissolved_oxygen: 6.5, turbidity: 5.1, nitrates: 0.18, phosphates: 0.09, date: '2024-04-19' },
                { station: 'CHE01', ph: 7.9, dissolved_oxygen: 6.9, turbidity: 3.5, nitrates: 0.14, phosphates: 0.07, date: '2024-04-19' }
            ]
        }
    ];

    // Generate realistic file content based on dataset format
    const generateFileContent = (dataset) => {
        const generateMoreData = (sampleData, targetSize = 100) => {
            const expandedData = [...sampleData];
            while (expandedData.length < targetSize) {
                const randomSample = { ...sampleData[Math.floor(Math.random() * sampleData.length)] };
                
                // Add some variation to the data
                Object.keys(randomSample).forEach(key => {
                    if (typeof randomSample[key] === 'number') {
                        const variation = (Math.random() - 0.5) * 0.1 * randomSample[key];
                        randomSample[key] = Number((randomSample[key] + variation).toFixed(2));
                    } else if (key === 'timestamp' || key === 'date') {
                        const date = new Date(randomSample[key]);
                        date.setDate(date.getDate() + Math.floor(Math.random() * 30));
                        randomSample[key] = date.toISOString();
                    } else if (key.includes('id') || key === 'station') {
                        const num = Math.floor(Math.random() * 999) + 1;
                        randomSample[key] = randomSample[key].replace(/\d+/, num.toString().padStart(3, '0'));
                    }
                });
                
                expandedData.push(randomSample);
            }
            return expandedData;
        };

        const expandedData = generateMoreData(dataset.sampleData, 50);

        switch (dataset.format.toLowerCase()) {
            case 'csv':
                const headers = Object.keys(expandedData[0]).join(',');
                const rows = expandedData.map(row => 
                    Object.values(row).map(val => typeof val === 'string' && val.includes(',') ? `"${val}"` : val).join(',')
                ).join('\n');
                return `# ${dataset.name}\n# Generated on: ${new Date().toISOString()}\n# Institution: ${dataset.institution}\n# License: ${dataset.license}\n${headers}\n${rows}`;
            
            case 'json':
                return JSON.stringify({
                    metadata: {
                        name: dataset.name,
                        description: dataset.description,
                        institution: dataset.institution,
                        license: dataset.license,
                        lastUpdated: dataset.lastUpdated,
                        variables: dataset.variables,
                        format: dataset.format,
                        timeRange: dataset.timeRange,
                        location: dataset.location,
                        quality: dataset.quality,
                        generated: new Date().toISOString()
                    },
                    count: expandedData.length,
                    data: expandedData
                }, null, 2);
            
            case 'fasta':
                const sequences = [
                    'ATCGATCGATCGATCGATCGATCGATCGATCGATCG',
                    'GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT',
                    'TTAACCGGTTAACCGGTTAACCGGTTAACCGGTT',
                    'CGGAATCCGGAATCCGGAATCCGGAATCCGGAAT'
                ];
                return expandedData.map((item, index) => {
                    const baseSeq = sequences[index % sequences.length];
                    const seqLength = item.sequence_length || 650;
                    const sequence = baseSeq.repeat(Math.ceil(seqLength / baseSeq.length)).substring(0, seqLength);
                    return `>sequence_${index + 1}|${item.species || 'Unknown'}|confidence:${item.confidence || 0.95}|sample:${item.sample_id || `S${index + 1}`}\n${sequence}`;
                }).join('\n');
            
            case 'zip':
                // For ZIP files, create a metadata file content
                return JSON.stringify({
                    archive_info: {
                        name: dataset.name,
                        description: "This would be a ZIP archive containing multiple files",
                        contents: [
                            "imagery_metadata.csv",
                            "processing_parameters.json",
                            "quality_control_report.txt",
                            "sample_images/"
                        ],
                        total_files: 120,
                        compressed_size: dataset.size
                    },
                    sample_metadata: expandedData
                }, null, 2);
            
            default:
                return JSON.stringify({
                    dataset_info: dataset,
                    sample_data: expandedData,
                    generated_at: new Date().toISOString()
                }, null, 2);
        }
    };

    // Real download function
    const downloadFile = async (dataset) => {
        if (dataset.access === 'restricted') {
            addNotification(`Access requested for: ${dataset.name}. Please contact administrator for approval.`, 'warning');
            return;
        }

        setIsGeneratingFile(true);
        setDownloadQueue(prev => ({ ...prev, [dataset.id]: { progress: 0, status: 'preparing' } }));

        try {
            // Simulate file generation with realistic progress
            const steps = ['Querying database...', 'Processing data...', 'Generating file...', 'Finalizing...'];
            
            for (let i = 0; i <= 100; i += 5) {
                await new Promise(resolve => setTimeout(resolve, 50));
                const stepIndex = Math.floor((i / 100) * steps.length);
                const status = i === 100 ? 'complete' : steps[stepIndex] || 'processing';
                
                setDownloadQueue(prev => ({ 
                    ...prev, 
                    [dataset.id]: { progress: i, status } 
                }));
            }

            // Generate file content
            const content = generateFileContent(dataset);
            const mimeTypes = {
                'csv': 'text/csv',
                'json': 'application/json',
                'fasta': 'text/plain',
                'zip': 'application/json' // Simulated as JSON for demo
            };
            
            const mimeType = mimeTypes[dataset.format.toLowerCase()] || 'text/plain';
            const fileExtension = dataset.format.toLowerCase() === 'zip' ? 'json' : dataset.format.toLowerCase();

            // Create and download file
            const blob = new Blob([content], { type: mimeType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${dataset.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}.${fileExtension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            addNotification(`Successfully downloaded: ${dataset.name} (${content.length} bytes)`, 'success');
            
            // Clean up after delay
            setTimeout(() => {
                setDownloadQueue(prev => {
                    const updated = { ...prev };
                    delete updated[dataset.id];
                    return updated;
                });
            }, 3000);

        } catch (error) {
            addNotification(`Download failed: ${dataset.name} - ${error.message}`, 'error');
            setDownloadQueue(prev => {
                const updated = { ...prev };
                delete updated[dataset.id];
                return updated;
            });
        } finally {
            setIsGeneratingFile(false);
        }
    };

    // Batch download function
    const downloadSelectedDatasets = async () => {
        if (selectedDatasets.length === 0) {
            addNotification('Please select at least one dataset to download', 'warning');
            return;
        }

        const publicDatasets = selectedDatasets
            .map(id => datasets.find(d => d.id === id))
            .filter(d => d && d.access === 'public');

        const restrictedCount = selectedDatasets.length - publicDatasets.length;

        if (restrictedCount > 0) {
            addNotification(`${restrictedCount} restricted dataset(s) require approval. Downloading ${publicDatasets.length} public dataset(s).`, 'info');
        }

        for (const dataset of publicDatasets) {
            await downloadFile(dataset);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Stagger downloads
        }
    };

    // Add notification
    const addNotification = (message, type = 'info') => {
        const id = Date.now() + Math.random();
        const notification = { id, message, type, timestamp: new Date().toLocaleTimeString() };
        setNotifications(prev => [notification, ...prev].slice(0, 5)); // Keep only 5 recent notifications
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    };

    // Filter and sort datasets
    const filteredDatasets = datasets
        .filter(dataset => {
            if (selectedCategory !== 'all' && dataset.domain !== selectedCategory) return false;
            
            if (searchTerm && !dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
            
            if (activeFilters.access.length > 0 && !activeFilters.access.includes(dataset.access)) return false;
            if (activeFilters.format.length > 0 && !activeFilters.format.includes(dataset.format)) return false;
            
            return true;
        })
        .sort((a, b) => {
            let aVal = a[sortBy];
            let bVal = b[sortBy];
            
            if (sortBy === 'lastUpdated') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }
            
            if (sortBy === 'quality') {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }
            
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    const toggleFilter = (filterType, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter(v => v !== value)
                : [...prev[filterType], value]
        }));
    };

    const handleDatasetSelect = (id) => {
        setSelectedDatasets(prev =>
            prev.includes(id)
                ? prev.filter(datasetId => datasetId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedDatasets.length === filteredDatasets.length) {
            setSelectedDatasets([]);
        } else {
            setSelectedDatasets(filteredDatasets.map(d => d.id));
        }
    };

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setActiveFilters({ domain: [], access: [], format: [], status: [] });
        setSelectedDatasets([]);
        addNotification('All filters cleared', 'info');
    };

    const getIconColor = (color) => {
        const colors = {
            cyan: 'text-cyan-400',
            emerald: 'text-emerald-400',
            violet: 'text-violet-400',
            amber: 'text-amber-400',
            blue: 'text-blue-400',
            indigo: 'text-indigo-400'
        };
        return colors[color] || 'text-slate-400';
    };

    const getBgColor = (color) => {
        const colors = {
            cyan: 'bg-cyan-500/20',
            emerald: 'bg-emerald-500/20',
            violet: 'bg-violet-500/20',
            amber: 'bg-amber-500/20',
            blue: 'bg-blue-500/20',
            indigo: 'bg-indigo-500/20'
        };
        return colors[color] || 'bg-slate-500/20';
    };

    const getFormatIcon = (format) => {
        const icons = {
            'CSV': FileSpreadsheet,
            'JSON': FileJson,
            'ZIP': Archive,
            'FASTA': Code,
            'GeoTIFF': Image
        };
        return icons[format] || FileText;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-40">
            <Navbar/>
            {/* Notifications */}
            <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`flex items-start gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 shadow-lg ${
                            notification.type === 'success'
                                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                                : notification.type === 'warning'
                                ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                                : notification.type === 'error'
                                ? 'bg-red-500/20 border-red-500/30 text-red-300'
                                : 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
                        }`}
                    >
                        {notification.type === 'success' ? (
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        ) : notification.type === 'warning' ? (
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        ) : notification.type === 'error' ? (
                            <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        ) : (
                            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                            <div className="text-sm font-medium">{notification.message}</div>
                            <div className="text-xs opacity-75 mt-1">{notification.timestamp}</div>
                        </div>
                        <button
                            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                            className="text-slate-400 hover:text-white ml-2 flex-shrink-0"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-cyan-500/20 rounded-2xl">
                            <Database className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h1 className="text-4xl font-bold text-white">Marine Data Hub</h1>
                    </div>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-4">
                        Discover, preview, and download marine datasets from oceanography, fisheries, eDNA, and biodiversity research
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <Server className="w-4 h-4" />
                            {datasets.length} Curated Datasets
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Secure Access
                        </div>
                        <div className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Instant Downloads
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    <div className="w-80 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 h-fit sticky top-6">
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search datasets..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Categories */}
                            <div>
                                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                                    <Layers className="w-4 h-4" />
                                    Categories
                                </h3>
                                <div className="space-y-1">
                                    {['all', 'oceanography', 'fisheries', 'molecular', 'remote_sensing', 'marine_biology', 'water_quality'].map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                                                selectedCategory === category
                                                    ? 'bg-cyan-500/20 text-cyan-400'
                                                    : 'text-slate-300 hover:bg-slate-700/50'
                                            }`}
                                        >
                                            {category === 'all' ? 'All Datasets' : category.replace('_', ' ')}
                                            <span className="ml-auto float-right text-xs text-slate-500">
                                                {category === 'all' ? datasets.length : datasets.filter(d => d.domain === category).length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Access Level */}
                            <div>
                                <h3 className="text-white font-medium mb-3">Access Level</h3>
                                <div className="space-y-2">
                                    {['public', 'restricted'].map(access => (
                                        <label key={access} className="flex items-center gap-2 text-slate-300 cursor-pointer text-sm">
                                            <input
                                                type="checkbox"
                                                checked={activeFilters.access.includes(access)}
                                                onChange={() => toggleFilter('access', access)}
                                                className="rounded border-slate-600 bg-slate-700 text-cyan-500"
                                            />
                                            <span className="flex items-center gap-1">
                                                {access === 'public' ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                                {access === 'public' ? 'Public' : 'Restricted'}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Format Filter */}
                            <div>
                                <h3 className="text-white font-medium mb-3">File Format</h3>
                                <div className="space-y-2">
                                    {['CSV', 'JSON', 'FASTA', 'ZIP'].map(format => (
                                        <label key={format} className="flex items-center gap-2 text-slate-300 cursor-pointer text-sm">
                                            <input
                                                type="checkbox"
                                                checked={activeFilters.format.includes(format)}
                                                onChange={() => toggleFilter('format', format)}
                                                className="rounded border-slate-600 bg-slate-700 text-cyan-500"
                                            />
                                            <span className="flex items-center gap-1">
                                                {React.createElement(getFormatIcon(format), { className: "w-3 h-3" })}
                                                {format}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={clearAllFilters}
                                className="w-full px-3 py-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm border border-slate-700 rounded-lg hover:border-cyan-400/30"
                            >
                                Clear All Filters
                            </button>

                            <div className="pt-4 border-t border-slate-700">
                                <div className="text-sm text-slate-400">
                                    {filteredDatasets.length} of {datasets.length} datasets
                                    {selectedDatasets.length > 0 && (
                                        <div className="text-cyan-400 mt-1">
                                            {selectedDatasets.length} selected
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Action Bar */}
                        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleSelectAll}
                                        className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
                                    >
                                        {selectedDatasets.length === filteredDatasets.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                    
                                    <select 
                                        value={sortBy}
                                        onChange={(e) => handleSort(e.target.value)}
                                        className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 transition-colors"
                                    >
                                        <option value="name">Sort by Name</option>
                                        <option value="lastUpdated">Sort by Date</option>
                                        <option value="quality">Sort by Quality</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={downloadSelectedDatasets}
                                        disabled={selectedDatasets.length === 0 || isGeneratingFile}
                                        className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isGeneratingFile ? (
                                            <Loader className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <DownloadCloud className="w-4 h-4" />
                                        )}
                                        Download ({selectedDatasets.length})
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dataset Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredDatasets.map(dataset => {
                                const IconComponent = dataset.icon;
                                const FormatIcon = getFormatIcon(dataset.format);
                                const downloadStatus = downloadQueue[dataset.id];
                                
                                return (
                                    <div key={dataset.id} className="bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 hover:border-slate-600/50 transition-all duration-300 group">
                                        {/* Download Progress */}
                                        {downloadStatus && (
                                            <div className="mb-4">
                                                <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                    <span className="capitalize">{downloadStatus.status}</span>
                                                    <span>{Math.round(downloadStatus.progress)}%</span>
                                                </div>
                                                <div className="w-full bg-slate-700 rounded-full h-2">
                                                    <div 
                                                        className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${downloadStatus.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl ${getBgColor(dataset.color)}`}>
                                                <IconComponent className={`w-6 h-6 ${getIconColor(dataset.color)}`} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedDatasets.includes(dataset.id)}
                                                    onChange={() => handleDatasetSelect(dataset.id)}
                                                    className="rounded border-slate-600 bg-slate-700 text-cyan-500"
                                                />
                                                {dataset.access === 'restricted' && (
                                                    <Lock className="w-4 h-4 text-amber-400" />
                                                )}
                                                <FormatIcon className="w-4 h-4 text-slate-400" />
                                                {downloadStatus?.status === 'complete' && (
                                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                )}
                                            </div>
                                        </div>

                                        <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">{dataset.name}</h3>
                                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{dataset.description}</p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {dataset.tags.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                            {dataset.tags.length > 3 && (
                                                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded text-xs">
                                                    +{dataset.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Format:</span>
                                                <span className="text-slate-300 flex items-center gap-1">
                                                    <FormatIcon className="w-3 h-3" />
                                                    {dataset.format}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Size:</span>
                                                <span className="text-slate-300">{dataset.size}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Quality:</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-12 bg-slate-700 rounded-full h-1.5">
                                                        <div 
                                                            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                                                            style={{ width: `${dataset.quality}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-slate-300 text-xs">{dataset.quality}%</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Updated:</span>
                                                <span className="text-slate-300 text-xs">{new Date(dataset.lastUpdated).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                                            <button
                                                onClick={() => setPreviewDataset(dataset)}
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors text-sm"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Preview
                                            </button>
                                            <button
                                                onClick={() => downloadFile(dataset)}
                                                disabled={isGeneratingFile || downloadStatus}
                                                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                                                    dataset.access === 'restricted' 
                                                        ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' 
                                                        : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30'
                                                } disabled:opacity-50`}
                                            >
                                                {downloadStatus ? (
                                                    <Loader className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Download className="w-4 h-4" />
                                                )}
                                                {dataset.access === 'restricted' ? 'Request' : 'Download'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filteredDatasets.length === 0 && (
                            <div className="text-center py-12">
                                <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">No datasets found</h3>
                                <p className="text-slate-400 mb-4">Try adjusting your search criteria or filters.</p>
                                <button 
                                    onClick={clearAllFilters}
                                    className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Dataset Preview Modal */}
            {previewDataset && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setPreviewDataset(null)}>
                    <div className="bg-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${getBgColor(previewDataset.color)}`}>
                                    {React.createElement(previewDataset.icon, { className: `w-5 h-5 ${getIconColor(previewDataset.color)}` })}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg">{previewDataset.name}</h3>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <span>{previewDataset.type}</span>
                                        <span>•</span>
                                        <span>{previewDataset.format}</span>
                                        <span>•</span>
                                        <span>{previewDataset.size}</span>
                                        {previewDataset.access === 'restricted' && (
                                            <>
                                                <span>•</span>
                                                <Lock className="w-3 h-3 text-amber-400" />
                                                <span className="text-amber-400">Restricted</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setPreviewDataset(null)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {/* Dataset Overview */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                            <Info className="w-4 h-4" />
                                            Overview
                                        </h4>
                                        <p className="text-slate-300 text-sm leading-relaxed">{previewDataset.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-white font-medium mb-2">Institution</h4>
                                        <p className="text-slate-300 text-sm">{previewDataset.institution}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-white font-medium mb-2">License</h4>
                                        <p className="text-slate-300 text-sm">{previewDataset.license}</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Temporal Coverage
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Time Range:</span>
                                                <span className="text-slate-300">{previewDataset.timeRange}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Frequency:</span>
                                                <span className="text-slate-300">{previewDataset.frequency}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Last Updated:</span>
                                                <span className="text-slate-300">{new Date(previewDataset.lastUpdated).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4" />
                                            Data Metrics
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Sample Size:</span>
                                                <span className="text-slate-300">{previewDataset.sampleSize}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Quality Score:</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-700 rounded-full h-1.5">
                                                        <div 
                                                            className="bg-emerald-500 h-1.5 rounded-full"
                                                            style={{ width: `${previewDataset.quality}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-slate-300">{previewDataset.quality}%</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-400">Location:</span>
                                                <span className="text-slate-300">{previewDataset.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Variables */}
                            <div className="mb-6">
                                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                    <Code className="w-4 h-4" />
                                    Variables & Parameters
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {previewDataset.variables.map((variable, index) => (
                                        <div key={index} className="px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg text-sm font-mono">
                                            {variable}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Sample Data Preview */}
                            <div className="mb-6">
                                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Sample Data Preview
                                </h4>
                                <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {previewDataset.sampleData.map((sample, index) => (
                                            <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                                                <div className="text-xs text-slate-400 mb-2">Record {index + 1}</div>
                                                {Object.entries(sample).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between text-sm mb-1">
                                                        <span className="text-slate-400 font-mono">{key}:</span>
                                                        <span className="text-slate-300 font-mono">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Tags */}
                            <div className="mb-6">
                                <h4 className="text-white font-medium mb-3">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {previewDataset.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => downloadFile(previewDataset)}
                                    disabled={isGeneratingFile}
                                    className={`flex-1 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                                        previewDataset.access === 'restricted'
                                            ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                                            : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30'
                                    } disabled:opacity-50`}
                                >
                                    {isGeneratingFile ? (
                                        <Loader className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Download className="w-5 h-5" />
                                    )}
                                    {previewDataset.access === 'restricted' ? 'Request Access' : 'Download Dataset'}
                                </button>
                                <button 
                                    onClick={() => addNotification('API documentation accessed', 'info')}
                                    className="px-4 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors flex items-center gap-2"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    API Docs
                                </button>
                                <button 
                                    onClick={() => addNotification('Dataset shared successfully', 'success')}
                                    className="px-4 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-colors"
                                >
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}