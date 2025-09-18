import React, { useState, useEffect } from 'react';
import { 
    Search, Database, Waves, Fish, Dna, Globe, Bell, User, Menu, X, 
    Download, Filter, RefreshCw, Activity, AlertTriangle, CheckCircle,
    Calendar, MapPin, Thermometer, Droplets, BarChart3, TrendingUp,
    FileDown, FileText, Settings, Eye, Edit, Trash2, Plus, Microscope,
    Brain, Cpu, Zap, Layers, GitBranch, Workflow, Network, Radar,
    Satellite, Camera, FlaskConical, LineChart, PieChart, Map, Play,
    Pause, RotateCcw, Maximize2, Monitor, Wifi, WifiOff, Radio
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function AIAnalyticsEngine() {
    const [selectedModule, setSelectedModule] = useState('AI Analytics');
    const [trainingProgress, setTrainingProgress] = useState(100);
    const [isTraining, setIsTraining] = useState(false);

    // AI Analytics Engine Data
    const aiAnalyticsData = {
        accuracy: 94.2,
        recentClassifications: [
            { image_id: 'OTO_001', species: 'Sardine', confidence: 0.98 },
            { image_id: 'OTO_002', species: 'Mackerel', confidence: 0.94 },
            { image_id: 'OTO_003', species: 'Anchovy', confidence: 0.97 },
            { image_id: 'OTO_004', species: 'Herring', confidence: 0.89 },
            { image_id: 'OTO_005', species: 'Tuna', confidence: 0.95 }
        ]
    };

    // eDNA Analysis Data
    const eDNAData = {
        matchRate: 87.5,
        recentMatches: [
            { sample_id: 'DNA_001', species: 'Thunnus alalunga', match_score: 0.94 },
            { sample_id: 'DNA_002', species: 'Seriola dumerili', match_score: 0.89 },
            { sample_id: 'DNA_003', species: 'Katsuwonus pelamis', match_score: 0.92 },
            { sample_id: 'DNA_004', species: 'Coryphaena hippurus', match_score: 0.87 },
            { sample_id: 'DNA_005', species: 'Euthynnus affinis', match_score: 0.96 }
        ]
    };

    // Habitat Prediction Data
    const habitatData = {
        accuracy: 91.3,
        habitatSuitability: [
            { region: 'Arabian Coast', suitability: 0.89 },
            { region: 'Malabar Coast', suitability: 0.76 },
            { region: 'Coromandel Coast', suitability: 0.84 },
            { region: 'Lakshadweep', suitability: 0.91 },
            { region: 'Andaman Islands', suitability: 0.72 }
        ]
    };

    // Model Training Status
    const modelStatus = {
        status: 'Model training completed successfully',
        trainingMetrics: [
            { epoch: 1, loss: 2.3, accuracy: 0.45 },
            { epoch: 2, loss: 1.8, accuracy: 0.62 },
            { epoch: 3, loss: 1.4, accuracy: 0.74 },
            { epoch: 4, loss: 1.1, accuracy: 0.82 },
            { epoch: 5, loss: 0.8, accuracy: 0.89 },
            { epoch: 6, loss: 0.6, accuracy: 0.92 },
            { epoch: 7, loss: 0.5, accuracy: 0.94 },
            { epoch: 8, loss: 0.4, accuracy: 0.95 },
            { epoch: 9, loss: 0.35, accuracy: 0.96 },
            { epoch: 10, loss: 0.32, accuracy: 0.96 }
        ]
    };

    const handleStartTraining = () => {
        setIsTraining(true);
        setTrainingProgress(0);
        
        const interval = setInterval(() => {
            setTrainingProgress(prev => {
                if (prev >= 100) {
                    setIsTraining(false);
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
    };

    return (
        
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Enhanced Header */}
            <div className='min-h-25'>
                <Navbar/>
            </div>
            

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar - Navigation */}
                    <div className="col-span-2 space-y-4">
                        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-4">
                            <div className="text-slate-400 text-sm font-medium mb-3">Navigation</div>
                            <div className="space-y-2">
                                <SidebarLink 
                                    icon={Brain} 
                                    label="AI Analytics" 
                                    active={selectedModule === 'AI Analytics'}
                                    onClick={() => setSelectedModule('AI Analytics')}
                                />
                                <SidebarLink icon={Database} label="System Status" />
                                <SidebarLink icon={Waves} label="Real-time Data Streaming" />
                                <SidebarLink 
                                    icon={AlertTriangle} 
                                    label="Data Quality Alerts" 
                                    active={selectedModule === 'Alerts'}
                                    onClick={() => setSelectedModule('Alerts')}
                                />
                                <SidebarLink icon={BarChart3} label="Quick Stats" />
                            </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-4">
                            <div className="text-slate-400 text-sm font-medium mb-3">Active Sensors</div>
                            <div className="text-2xl font-bold text-white mb-1">847</div>
                            
                            <div className="text-slate-400 text-sm font-medium mb-2 mt-4">Data Quality</div>
                            <div className="text-2xl font-bold text-cyan-400 mb-1">96.0%</div>
                            
                            <div className="text-slate-400 text-sm font-medium mb-2 mt-4">Service Tracked</div>
                            <div className="text-2xl font-bold text-white mb-1">156</div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-10">
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {/* AI Analytics Engine */}
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-white">AI Analytics Engine</h3>
                                </div>
                                
                                <div className="mb-4">
                                    <div className="text-slate-400 text-sm mb-1">Otolith Classification</div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span className="text-green-400 text-sm">Running</span>
                                    </div>
                                    
                                    <div className="text-slate-400 text-sm mb-1">Accuracy</div>
                                    <div className="text-3xl font-bold text-white mb-4">{aiAnalyticsData.accuracy}%</div>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                                        <div 
                                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${aiAnalyticsData.accuracy}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-slate-400 text-sm font-medium mb-3">Recent Classifications</div>
                                    <div className="space-y-2">
                                        {aiAnalyticsData.recentClassifications.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between text-xs">
                                                <span className="text-slate-300">{item.image_id}</span>
                                                <span className="text-slate-300">{item.species}</span>
                                                <span className="text-cyan-400">{item.confidence.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* eDNA Analysis */}
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-white">eDNA Analysis</h3>
                                </div>
                                
                                <div className="mb-4">
                                    <div className="text-slate-400 text-sm mb-1">Match Rate</div>
                                    <div className="text-3xl font-bold text-white mb-4">{eDNAData.matchRate}%</div>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                                        <div 
                                            className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${eDNAData.matchRate}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-slate-400 text-sm font-medium mb-3">Recent Matches</div>
                                    <div className="space-y-2">
                                        {eDNAData.recentMatches.map((item, index) => (
                                            <div key={index} className="text-xs">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-slate-300">{item.sample_id}</span>
                                                    <span className="text-cyan-400">{item.match_score.toFixed(2)}</span>
                                                </div>
                                                <div className="text-slate-400 text-xs italic">{item.species}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Habitat Prediction */}
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-white">Habitat Prediction</h3>
                                </div>
                                
                                <div className="mb-4">
                                    <div className="text-slate-400 text-sm mb-1">Accuracy</div>
                                    <div className="text-3xl font-bold text-white mb-4">{habitatData.accuracy}%</div>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                                        <div 
                                            className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${habitatData.accuracy}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-slate-400 text-sm font-medium mb-3">Habitat Suitability</div>
                                    <div className="space-y-2">
                                        {habitatData.habitatSuitability.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between text-xs">
                                                <span className="text-slate-300">{item.region}</span>
                                                <span className="text-cyan-400">{item.suitability.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Model Training Status */}
                        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-white">Model Training Status</h3>
                                </div>
                                <button 
                                    onClick={handleStartTraining}
                                    disabled={isTraining}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isTraining 
                                            ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                    }`}
                                >
                                    {isTraining ? 'Training...' : 'Start Training'}
                                </button>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-400 text-sm">Training Progress: {trainingProgress.toFixed(0)}%</span>
                                    <span className="text-slate-400 text-sm">Training Metrics</span>
                                </div>
                                
                                <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                                    <div 
                                        className={`h-3 rounded-full transition-all duration-300 ${
                                            isTraining 
                                                ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
                                                : 'bg-gradient-to-r from-green-400 to-green-600'
                                        }`}
                                        style={{ width: `${trainingProgress}%` }}
                                    ></div>
                                </div>
                                
                                <div className="flex items-center gap-2 mb-4">
                                    {!isTraining && (
                                        <>
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-green-400 text-sm">{modelStatus.status}</span>
                                        </>
                                    )}
                                    {isTraining && (
                                        <>
                                            <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                                            <span className="text-blue-400 text-sm">Training in progress...</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                            {/* Training Metrics Chart */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-white font-medium mb-3 text-sm">Training Metrics</h4>
                                    <div className="h-32 relative">
                                        <svg className="w-full h-full">
                                            <defs>
                                                <linearGradient id="lossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.1} />
                                                </linearGradient>
                                                <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                                                    <stop offset="100%" stopColor="#34d399" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            
                                            {/* Loss Line */}
                                            <polyline
                                                fill="none"
                                                stroke="#60a5fa"
                                                strokeWidth="2"
                                                points={modelStatus.trainingMetrics.map((point, index) => 
                                                    `${(index / (modelStatus.trainingMetrics.length - 1)) * 100}%,${100 - (point.loss / 2.5) * 100}%`
                                                ).join(' ')}
                                            />
                                            
                                            {/* Accuracy Line */}
                                            <polyline
                                                fill="none"
                                                stroke="#34d399"
                                                strokeWidth="2"
                                                points={modelStatus.trainingMetrics.map((point, index) => 
                                                    `${(index / (modelStatus.trainingMetrics.length - 1)) * 100}%,${100 - point.accuracy * 100}%`
                                                ).join(' ')}
                                            />
                                            
                                            {/* Data Points */}
                                            {modelStatus.trainingMetrics.map((point, index) => (
                                                <g key={index}>
                                                    <circle
                                                        cx={`${(index / (modelStatus.trainingMetrics.length - 1)) * 100}%`}
                                                        cy={`${100 - (point.loss / 2.5) * 100}%`}
                                                        r="2"
                                                        fill="#60a5fa"
                                                    />
                                                    <circle
                                                        cx={`${(index / (modelStatus.trainingMetrics.length - 1)) * 100}%`}
                                                        cy={`${100 - point.accuracy * 100}%`}
                                                        r="2"
                                                        fill="#34d399"
                                                    />
                                                </g>
                                            ))}
                                        </svg>
                                        
                                        {/* Y-axis labels */}
                                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 -ml-8">
                                            <span>2.5</span>
                                            <span>2.0</span>
                                            <span>1.5</span>
                                            <span>1.0</span>
                                            <span>0.5</span>
                                            <span>0.0</span>
                                        </div>
                                        
                                        {/* X-axis labels */}
                                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-slate-400 -mb-6">
                                            <span>1</span>
                                            <span>5</span>
                                            <span>10</span>
                                        </div>
                                    </div>
                                    
                                    {/* Legend */}
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-0.5 bg-blue-400"></div>
                                            <span className="text-xs text-slate-400">Loss</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-0.5 bg-green-400"></div>
                                            <span className="text-xs text-slate-400">Accuracy</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Latest Metrics */}
                                <div>
                                    <h4 className="text-white font-medium mb-3 text-sm">Latest Metrics</h4>
                                    <div className="space-y-3">
                                        <div className="bg-slate-700/50 rounded-lg p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-slate-400 text-sm">Final Loss</span>
                                                <span className="text-white text-sm font-medium">0.32</span>
                                            </div>
                                            <div className="w-full bg-slate-600 rounded-full h-1.5">
                                                <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '13%' }}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-700/50 rounded-lg p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-slate-400 text-sm">Final Accuracy</span>
                                                <span className="text-white text-sm font-medium">96%</span>
                                            </div>
                                            <div className="w-full bg-slate-600 rounded-full h-1.5">
                                                <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '96%' }}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-700/50 rounded-lg p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-slate-400 text-sm">Validation Score</span>
                                                <span className="text-white text-sm font-medium">94.2%</span>
                                            </div>
                                            <div className="w-full bg-slate-600 rounded-full h-1.5">
                                                <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-700/50 rounded-lg p-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400 text-sm">Training Time</span>
                                                <span className="text-white text-sm font-medium">2h 34m</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarLink({ icon: Icon, label, active = false, onClick }) {
    return (
        <div 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                active 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
            onClick={onClick}
        >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{label}</span>
        </div>
    );
}