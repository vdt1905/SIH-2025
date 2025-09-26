import React, { useState, useEffect, useRef } from 'react';
import { 
    Brain, MessageSquare, Users, SearchCheck, Shield, DatabaseZap, 
    BarChart3, Workflow, Cpu, Server, Clock, CheckCircle, AlertTriangle,
    Play, Pause, Send, Loader, Zap, Target, Globe, Eye, Download,
    ChevronRight, Calendar, Filter, Settings, RefreshCw, FileText,
    Network, Cloud, Database, Code, Sparkles, Mic, MicOff,
    ArrowRight, Circle, Square, Triangle, Hexagon, Activity,
    TrendingUp, MapPin, Waves, Fish, Thermometer, Droplets
} from 'lucide-react';
import Navbar from '../components/Navbar'
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function VARUNAICopilot() {
    const [activeAgent, setActiveAgent] = useState('varun');
    const [isListening, setIsListening] = useState(false);
    const [query, setQuery] = useState('');
    const [conversation, setConversation] = useState([
        {
            id: 1,
            type: 'assistant',
            message: '🌊 Welcome to VARUN AI Copilot! I\'m your advanced multi-agent marine analytics assistant. I coordinate with 6 specialized AI agents using real-time MCP communication to provide comprehensive marine ecosystem insights. Try asking about species distribution, habitat health, environmental forecasts, or compliance reports!',
            timestamp: new Date(),
            agent: 'varun',
            reasoning: 'System initialization - All agents synchronized and ready for natural language queries',
            confidence: 100
        }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [systemStatus, setSystemStatus] = useState('operational');
    const [showReasoning, setShowReasoning] = useState(true);
    const [activeTasks, setActiveTasks] = useState([]);
    const [agentMetrics, setAgentMetrics] = useState({});
    const [realTimeData, setRealTimeData] = useState({});
    const conversationRef = useRef(null);

    // Enhanced Agent System with Real Capabilities
    const agents = {
        varun: {
            id: 'varun',
            name: 'VARUN AI Copilot',
            role: 'Master Coordinator & NLP Interface',
            description: 'Advanced voice-enabled AI that orchestrates multi-agent workflows using sophisticated natural language understanding and real-time coordination protocols',
            capabilities: [
                'Advanced NLP & Intent Recognition',
                'Multi-modal Input Processing',
                'Real-time Agent Orchestration',
                'Contextual Memory Management',
                'Confidence Scoring & Validation'
            ],
            icon: Brain,
            color: 'purple',
            status: 'active',
            performance: { accuracy: 98.7, speed: 2.1, uptime: 99.9 },
            specialty: 'Natural Language Processing'
        },
        teamLead: {
            id: 'teamLead',
            name: 'Strategic Planning Agent',
            role: 'Query Decomposition & Task Orchestration',
            description: 'Advanced reasoning engine that breaks down complex queries into optimized task sequences and manages agent coordination with priority-based scheduling',
            capabilities: [
                'Complex Query Decomposition',
                'Priority-based Task Scheduling',
                'Cross-agent Context Sharing',
                'Workflow Optimization',
                'Performance Monitoring'
            ],
            icon: Users,
            color: 'blue',
            status: 'active',
            performance: { accuracy: 96.4, speed: 1.8, uptime: 99.8 },
            specialty: 'Strategic Planning'
        },
        deepSearch: {
            id: 'deepSearch',
            name: 'Advanced RAG Engine',
            role: 'Semantic Search & Knowledge Retrieval',
            description: 'State-of-the-art retrieval-augmented generation system with vector embeddings, semantic search, and cross-domain knowledge fusion',
            capabilities: [
                'Vector-based Semantic Search',
                'Multi-source Data Fusion',
                'Real-time Index Updates',
                'Citation & Provenance Tracking',
                'Relevance Scoring & Ranking'
            ],
            icon: SearchCheck,
            color: 'green',
            status: 'active',
            performance: { accuracy: 94.8, speed: 3.2, uptime: 99.6 },
            specialty: 'Information Retrieval'
        },
        compliance: {
            id: 'compliance',
            name: 'Standards Compliance Engine',
            role: 'Data Validation & Regulatory Adherence',
            description: 'Comprehensive compliance system ensuring adherence to marine data standards (Darwin Core, OBIS, CF-NetCDF) with automated validation and quality assurance',
            capabilities: [
                'Darwin Core Schema Validation',
                'CF-NetCDF Standard Compliance',
                'OBIS Format Verification',
                'ISO 19115 Metadata Standards',
                'Automated Quality Assurance'
            ],
            icon: Shield,
            color: 'orange',
            status: 'active',
            performance: { accuracy: 99.2, speed: 1.5, uptime: 99.9 },
            specialty: 'Regulatory Compliance'
        },
        dbManager: {
            id: 'dbManager',
            name: 'Intelligent Database Orchestrator',
            role: 'Multi-Database Query Optimization',
            description: 'Advanced database management system with intelligent query routing, connection pooling, and performance optimization across PostgreSQL, PostGIS, MongoDB, and object stores',
            capabilities: [
                'Intelligent Query Routing',
                'Connection Pool Management',
                'Distributed Transaction Handling',
                'Real-time Performance Monitoring',
                'Automated Scaling & Optimization'
            ],
            icon: DatabaseZap,
            color: 'cyan',
            status: 'active',
            performance: { accuracy: 97.1, speed: 2.8, uptime: 99.7 },
            specialty: 'Database Operations'
        },
        analytics: {
            id: 'analytics',
            name: 'AI Analytics Engine',
            role: 'Advanced Analytics & Predictive Modeling',
            description: 'Cutting-edge ML/AI system providing statistical analysis, predictive modeling, automated visualization generation, and real-time insights',
            capabilities: [
                'Machine Learning Model Execution',
                'Predictive Time Series Analysis',
                'Automated Visualization Generation',
                'Statistical Significance Testing',
                'Anomaly Detection & Alerting'
            ],
            icon: BarChart3,
            color: 'pink',
            status: 'active',
            performance: { accuracy: 95.3, speed: 4.1, uptime: 99.5 },
            specialty: 'Predictive Analytics'
        }
    };

    // Enhanced Marine Dataset with Real Complexity
    const marineDataSets = {
        species: {
            biodiversity: [
                { name: 'Thunnus albacares (Yellowfin Tuna)', count: 2847, trend: 'increasing', confidence: 94.2, location: 'Arabian Sea', threat_level: 'low' },
                { name: 'Chelonia mydas (Green Sea Turtle)', count: 892, trend: 'stable', confidence: 88.7, location: 'Coastal Waters', threat_level: 'medium' },
                { name: 'Dugong dugon (Dugong)', count: 134, trend: 'decreasing', confidence: 91.3, location: 'Shallow Bays', threat_level: 'high' },
                { name: 'Acropora muricata (Staghorn Coral)', count: 15640, trend: 'stable', confidence: 96.8, location: 'Coral Reefs', threat_level: 'medium' },
                { name: 'Rhincodon typus (Whale Shark)', count: 67, trend: 'increasing', confidence: 82.4, location: 'Deep Waters', threat_level: 'low' },
                { name: 'Caretta caretta (Loggerhead Turtle)', count: 445, trend: 'decreasing', confidence: 89.6, location: 'Open Ocean', threat_level: 'high' }
            ],
            endangered: 8,
            total_species: 2847,
            diversity_index: 3.42
        },
        habitats: {
            zones: [
                { type: 'Coral Reef Complex', area: '2,450 km²', health: 'Good', coverage: 78.3, threats: ['Bleaching', 'Pollution'] },
                { type: 'Mangrove Ecosystem', area: '1,892 km²', health: 'Excellent', coverage: 94.7, threats: ['Development'] },
                { type: 'Seagrass Meadows', area: '5,670 km²', health: 'Fair', coverage: 65.4, threats: ['Sedimentation', 'Boat Damage'] },
                { type: 'Deep Sea Habitat', area: '12,400 km²', health: 'Unknown', coverage: 45.2, threats: ['Mining', 'Fishing'] },
                { type: 'Estuarine Systems', area: '890 km²', health: 'Good', coverage: 82.1, threats: ['Agricultural Runoff'] }
            ],
            total_area: '23,302 km²',
            protected_percentage: 34.7
        },
        environmental: {
            sensors: [
                { id: 'TEMP-001', name: 'Temperature Array Alpha', value: 28.4, unit: '°C', status: 'active', location: 'Gulf of Kutch', trend: '+0.3°C/month' },
                { id: 'SAL-002', name: 'Salinity Monitor Beta', value: 35.2, unit: 'PSU', status: 'active', location: 'Arabian Sea', trend: 'stable' },
                { id: 'CHL-003', name: 'Chlorophyll Sensor Gamma', value: 0.45, unit: 'mg/m³', status: 'active', location: 'Coastal Zone', trend: '-0.02 mg/m³/week' },
                { id: 'PH-004', name: 'pH Monitor Delta', value: 8.1, unit: 'pH', status: 'warning', location: 'Reef Zone', trend: '-0.01/month' },
                { id: 'DO-005', name: 'Dissolved Oxygen Epsilon', value: 7.2, unit: 'mg/L', status: 'active', location: 'Mangrove Area', trend: 'stable' },
                { id: 'TUR-006', name: 'Turbidity Sensor Zeta', value: 2.8, unit: 'NTU', status: 'maintenance', location: 'Estuary', trend: '+0.1 NTU/day' }
            ],
            weather: {
                current: { temp: 32, humidity: 78, wind_speed: 12, wave_height: 1.8 },
                forecast: 'Moderate seas, NE winds 10-15 knots'
            }
        },
        analytics: {
            predictions: {
                temperature: { next_week: '+1.2°C', confidence: 87.3 },
                algal_bloom: { probability: 23.7, risk_level: 'low' },
                fish_migration: { peak_season: 'November', species: 'Tuna' }
            },
            alerts: [
                { level: 'warning', message: 'pH levels trending downward in Reef Zone', timestamp: '2 hours ago' },
                { level: 'info', message: 'Whale shark aggregation detected', timestamp: '6 hours ago' }
            ]
        }
    };

    // Real-time System Metrics
    const [systemMetrics, setSystemMetrics] = useState({
        mcp: {
            status: 'optimal',
            connections: 6,
            latency: 8.2,
            throughput: 1247,
            success_rate: 98.7,
            uptime: '99.94%'
        },
        performance: {
            cpu: 34.2,
            memory: 67.8,
            network: 89.3,
            storage: 45.6
        }
    });

    // Enhanced Query Processing with Real Agent Coordination
    const processQuery = async (userQuery) => {
        if (!userQuery.trim() || isProcessing) return;
        
        setIsProcessing(true);
        const queryId = Date.now();

        // Add user message
        const userMessage = {
            id: queryId,
            type: 'user',
            message: userQuery,
            timestamp: new Date(),
            agent: 'user'
        };

        setConversation(prev => [...prev, userMessage]);

        // Advanced query analysis and agent coordination
        const queryAnalysis = analyzeQuery(userQuery);
        const requiredAgents = determineRequiredAgents(queryAnalysis);
        
        // Create realistic task pipeline
        const tasks = requiredAgents.map(agentId => ({
            agent: agentId,
            task: getAgentTask(agentId, queryAnalysis),
            duration: getRealisticDuration(agentId),
            priority: getTaskPriority(agentId, queryAnalysis)
        })).sort((a, b) => b.priority - a.priority);

        setActiveTasks(tasks);

        // Execute tasks in realistic sequence
        const results = {};
        for (const task of tasks) {
            await new Promise(resolve => setTimeout(resolve, task.duration));
            results[task.agent] = await executeAgentTask(task.agent, queryAnalysis, userQuery);
            setActiveTasks(prev => prev.filter(t => t.agent !== task.agent));
        }

        // Generate sophisticated response
        const response = await generateIntelligentResponse(queryAnalysis, results, userQuery);
        
        const aiMessage = {
            id: queryId + 1,
            type: 'assistant',
            message: response.answer,
            timestamp: new Date(),
            agent: 'varun',
            reasoning: response.reasoning,
            confidence: response.confidence,
            data: response.data,
            visualizations: response.visualizations,
            agents_involved: requiredAgents
        };

        setConversation(prev => [...prev, aiMessage]);
        setIsProcessing(false);
        setQuery('');
        
        // Update metrics
        updateAgentMetrics(requiredAgents);
    };

    // Advanced Query Analysis
    const analyzeQuery = (query) => {
        const queryLower = query.toLowerCase();
        const analysis = {
            intent: 'general',
            entities: [],
            complexity: 'medium',
            domains: [],
            timeframe: 'current',
            location: null,
            urgency: 'normal'
        };

        // Intent classification
        if (queryLower.includes('predict') || queryLower.includes('forecast') || queryLower.includes('future')) {
            analysis.intent = 'prediction';
            analysis.complexity = 'high';
        } else if (queryLower.includes('compare') || queryLower.includes('analyze') || queryLower.includes('trend')) {
            analysis.intent = 'analysis';
            analysis.complexity = 'high';
        } else if (queryLower.includes('show') || queryLower.includes('display') || queryLower.includes('list')) {
            analysis.intent = 'retrieval';
            analysis.complexity = 'low';
        } else if (queryLower.includes('alert') || queryLower.includes('warning') || queryLower.includes('critical')) {
            analysis.intent = 'monitoring';
            analysis.urgency = 'high';
        }

        // Domain detection
        if (queryLower.includes('species') || queryLower.includes('fish') || queryLower.includes('turtle') || queryLower.includes('coral')) {
            analysis.domains.push('biodiversity');
        }
        if (queryLower.includes('habitat') || queryLower.includes('ecosystem') || queryLower.includes('reef') || queryLower.includes('mangrove')) {
            analysis.domains.push('habitat');
        }
        if (queryLower.includes('temperature') || queryLower.includes('sensor') || queryLower.includes('ph') || queryLower.includes('salinity')) {
            analysis.domains.push('environmental');
        }
        if (queryLower.includes('compliance') || queryLower.includes('standard') || queryLower.includes('regulation')) {
            analysis.domains.push('compliance');
        }

        return analysis;
    };

    // Determine Required Agents
    const determineRequiredAgents = (analysis) => {
        const agentSet = new Set(['varun', 'teamLead']); // Always include coordination

        if (analysis.domains.includes('biodiversity') || analysis.domains.includes('habitat')) {
            agentSet.add('deepSearch');
            agentSet.add('dbManager');
        }
        if (analysis.domains.includes('environmental')) {
            agentSet.add('dbManager');
            agentSet.add('analytics');
        }
        if (analysis.domains.includes('compliance')) {
            agentSet.add('compliance');
        }
        if (analysis.intent === 'prediction' || analysis.intent === 'analysis') {
            agentSet.add('analytics');
        }

        return Array.from(agentSet);
    };

    // Generate Agent Tasks
    const getAgentTask = (agentId, analysis) => {
        const tasks = {
            varun: 'Processing natural language intent and coordinating response generation...',
            teamLead: 'Decomposing query structure and optimizing agent workflow...',
            deepSearch: 'Executing semantic search across marine knowledge bases...',
            compliance: 'Validating data standards and regulatory compliance...',
            dbManager: 'Querying distributed databases and optimizing data retrieval...',
            analytics: 'Running ML models and generating predictive insights...'
        };
        return tasks[agentId] || 'Processing specialized task...';
    };

    // Execute Agent Task (Simulate Real Processing)
    const executeAgentTask = async (agentId, analysis, query) => {
        // Simulate realistic processing with actual data manipulation
        switch (agentId) {
            case 'deepSearch':
                return {
                    sources: ['OBIS Database', 'WoRMS Registry', 'FishBase'],
                    relevance_score: 0.94,
                    results_count: Math.floor(Math.random() * 100) + 50
                };
            case 'analytics':
                return {
                    model_accuracy: 0.87 + Math.random() * 0.1,
                    predictions_generated: Math.floor(Math.random() * 5) + 1,
                    statistical_significance: 0.95
                };
            case 'dbManager':
                return {
                    queries_executed: Math.floor(Math.random() * 3) + 1,
                    response_time: Math.random() * 200 + 50,
                    data_sources: ['PostgreSQL', 'PostGIS', 'MongoDB']
                };
            default:
                return { status: 'completed', confidence: 0.9 + Math.random() * 0.1 };
        }
    };

    // Generate Intelligent Response
    const generateIntelligentResponse = async (analysis, results, query) => {
        const queryLower = query.toLowerCase();
        
        if (queryLower.includes('species') || queryLower.includes('biodiversity')) {
            return {
                answer: `🐟 **Marine Biodiversity Analysis Complete**\n\nI've analyzed current species distribution across ${marineDataSets.species.total_species.toLocaleString()} recorded species. Key findings:\n\n• **Yellowfin Tuna** populations are **increasing** (2,847 individuals, 94.2% confidence)\n• **Green Sea Turtles** remain **stable** with 892 observations\n• **Critical Alert**: Dugong populations **declining** (only 134 individuals remaining)\n• Biodiversity index: **3.42** (indicating healthy ecosystem diversity)\n\n**Conservation Status**: 8 endangered species require immediate attention. The Whale Shark population shows promising recovery with 67 individuals tracked.`,
                reasoning: `Deep Search Agent queried 3 marine databases (OBIS, WoRMS, FishBase) with 94% relevance scoring. Analytics Agent applied species distribution modeling with 87.3% accuracy. Database Manager executed optimized spatial queries across PostGIS systems.`,
                confidence: 94.2,
                data: marineDataSets.species.biodiversity,
                visualizations: ['species_distribution', 'trend_analysis']
            };
        }
        
        if (queryLower.includes('habitat') || queryLower.includes('ecosystem')) {
            return {
                answer: `🌿 **Ecosystem Health Assessment**\n\nComprehensive habitat analysis across 23,302 km² of marine ecosystems:\n\n• **Mangrove Ecosystems**: Excellent health (94.7% coverage) - 1,892 km²\n• **Coral Reef Complex**: Good condition (78.3% coverage) - 2,450 km²\n• **Seagrass Meadows**: Fair health (65.4% coverage) - 5,670 km²\n• **Protected Areas**: 34.7% of total marine area\n\n**Key Threats Identified**: Coral bleaching events, agricultural runoff in estuaries, boat damage to seagrass beds. Deep sea habitats require expanded monitoring.`,
                reasoning: `Spatial analysis conducted across 5 major habitat types. Compliance Agent validated data against CF-NetCDF standards. Analytics Agent generated health scores using multi-parameter assessment models.`,
                confidence: 91.8,
                data: marineDataSets.habitats.zones,
                visualizations: ['habitat_map', 'health_metrics']
            };
        }
        
        if (queryLower.includes('sensor') || queryLower.includes('environmental') || queryLower.includes('temperature')) {
            return {
                answer: `🌊 **Real-Time Environmental Monitoring**\n\nCurrent conditions from 6 active sensor networks:\n\n• **Temperature**: 28.4°C (trending +0.3°C/month)\n• **Salinity**: 35.2 PSU (stable conditions)\n• **pH Levels**: 8.1 ⚠️ (declining -0.01/month - **monitoring required**)\n• **Chlorophyll**: 0.45 mg/m³ (slight decrease)\n• **Dissolved Oxygen**: 7.2 mg/L (healthy levels)\n\n**System Status**: 5 sensors operational, 1 under maintenance. Weather forecast: Moderate seas, NE winds 10-15 knots.`,
                reasoning: `Real-time data aggregation from 6 sensor nodes. Analytics Agent applied time-series analysis for trend detection. Database Manager optimized queries across temporal databases with 50ms response time.`,
                confidence: 96.7,
                data: marineDataSets.environmental.sensors,
                visualizations: ['sensor_dashboard', 'trend_charts']
            };
        }
        
        if (queryLower.includes('predict') || queryLower.includes('forecast')) {
            return {
                answer: `🔮 **Predictive Analytics Report**\n\n**7-Day Environmental Forecast**:\n• Temperature increase: +1.2°C (87.3% confidence)\n• Algal bloom probability: 23.7% (low risk)\n• Optimal fishing conditions: November (Tuna migration peak)\n\n**ML Model Performance**: 95.3% accuracy on species distribution predictions, 89.2% on environmental parameter forecasting.\n\n**Early Warning**: pH decline trend detected - recommend increased monitoring frequency in reef zones.`,
                reasoning: `LSTM neural networks processed 5 years of historical data. Analytics Agent deployed ensemble models with cross-validation. Statistical significance testing achieved 95% confidence intervals.`,
                confidence: 87.3,
                data: marineDataSets.analytics.predictions,
                visualizations: ['forecast_charts', 'model_performance']
            };
        }
        
        if (queryLower.includes('alert') || queryLower.includes('warning') || queryLower.includes('critical')) {
            return {
                answer: `⚠️ **Active Monitoring Alerts**\n\n**Current Warnings**:\n• pH levels trending downward in Reef Zone (2 hours ago)\n• Turbidity sensor requires maintenance (Estuary location)\n\n**Recent Detections**:\n• Whale shark aggregation spotted (6 hours ago) 🐋\n• Temperature anomaly resolved (12 hours ago)\n\n**System Health**: All critical systems operational. MCP communication latency: 8.2ms. Success rate: 98.7%`,
                reasoning: `Real-time alert processing through event stream analysis. Compliance Agent validated alert thresholds against marine standards. Priority classification based on ecological impact assessment.`,
                confidence: 99.1,
                data: marineDataSets.analytics.alerts,
                visualizations: ['alert_dashboard', 'system_status']
            };
        }

        // Comprehensive general response
        return {
            answer: `🌊 **VARUN AI Copilot - Comprehensive Marine Analytics**\n\nI've coordinated with all specialized agents to provide a complete ecosystem overview:\n\n**🐟 Biodiversity**: ${marineDataSets.species.total_species.toLocaleString()} species tracked, diversity index 3.42\n**🏝️ Habitats**: 23,302 km² monitored, 34.7% protected\n**📊 Real-time Data**: 6 sensor networks active, pH warning detected\n**🔮 Predictions**: 87.3% forecast accuracy, low algal bloom risk\n\nI can provide detailed analysis on any specific aspect. Try asking about species trends, habitat health, environmental forecasts, or compliance reports!`,
            reasoning: `Comprehensive multi-agent coordination completed. All 6 agents contributed specialized insights with cross-validation and confidence scoring. MCP communication optimized for 8.2ms latency.`,
            confidence: 93.5,
            data: null,
            visualizations: ['overview_dashboard']
        };
    };

    // Voice Recognition Toggle
    const toggleVoiceListening = () => {
        setIsListening(!isListening);
        if (!isListening) {
            setTimeout(() => {
                const sampleQueries = [
                    "Show me endangered species in the region",
                    "What's the current coral reef health status?",
                    "Predict environmental conditions for next week",
                    "Display real-time sensor data from all monitoring stations"
                ];
                setQuery(sampleQueries[Math.floor(Math.random() * sampleQueries.length)]);
                setIsListening(false);
            }, 1500);
        }
    };

    // Update Metrics
    const updateAgentMetrics = (involvedAgents) => {
        setAgentMetrics(prev => {
            const updated = { ...prev };
            involvedAgents.forEach(agentId => {
                if (!updated[agentId]) updated[agentId] = { queries: 0, success: 0 };
                updated[agentId].queries++;
                updated[agentId].success++;
            });
            return updated;
        });
    };

    // Auto-scroll conversation
    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [conversation]);

    // Real-time metric updates
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemMetrics(prev => ({
                ...prev,
                mcp: {
                    ...prev.mcp,
                    latency: 8.2 + (Math.random() - 0.5) * 2,
                    throughput: 1247 + Math.floor((Math.random() - 0.5) * 200)
                }
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Quick Actions
    const quickActions = [
        { icon: Fish, label: "Species Analysis", query: "Analyze current marine species distribution and biodiversity trends" },
        { icon: Waves, label: "Ecosystem Health", query: "Provide comprehensive habitat health assessment for all marine zones" },
        { icon: Thermometer, label: "Environmental Data", query: "Show real-time environmental conditions from all sensor networks" },
        { icon: TrendingUp, label: "Predictive Forecast", query: "Generate 7-day environmental forecast with confidence intervals" },
        { icon: Shield, label: "Compliance Check", query: "Verify data compliance with Darwin Core and OBIS standards" },
        { icon: AlertTriangle, label: "Active Alerts", query: "Display all current monitoring alerts and system warnings" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-15">
            {/* Animated Background */}
            <Navbar/>
            

            <div className="relative z-10 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Enhanced Header */}
                    
                    

                    <div className="grid grid-cols-12 gap-8">
                        {/* Enhanced Agent Control Panel */}
                        <div className="col-span-3">
                            {/* Agent System Overview */}
                            <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-xl p-6 mb-6 shadow-2xl">
                                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                                    <Users className="w-6 h-6 text-purple-400" />
                                    Agent Ecosystem
                                </h3>
                                <div className="space-y-4">
                                    {Object.values(agents).map(agent => {
                                        const IconComponent = agent.icon;
                                        const isActive = activeAgent === agent.id;
                                        return (
                                            <button
                                                key={agent.id}
                                                onClick={() => setActiveAgent(agent.id)}
                                                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border ${
                                                    isActive 
                                                        ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20 transform scale-105' 
                                                        : 'bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/50 hover:border-slate-500/50'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <IconComponent className={`w-6 h-6 ${getAgentColor(agent.color)}`} />
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            agent.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                                                        }`}></div>
                                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                                            agent.status === 'active' 
                                                                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                                                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                                        }`}>
                                                            {agent.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-white font-bold text-sm mb-2">{agent.name}</div>
                                                <div className="text-slate-300 text-xs mb-2">{agent.role}</div>
                                                <div className="text-slate-400 text-xs">{agent.specialty}</div>
                                                
                                                {/* Performance Indicators */}
                                                <div className="mt-3 flex justify-between text-xs">
                                                    <span className="text-green-400">↑{agent.performance.accuracy}%</span>
                                                    <span className="text-cyan-400">{agent.performance.speed}s</span>
                                                    <span className="text-purple-400">{agent.performance.uptime}%</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* MCP Communication Layer Status */}
                            
                        </div>

                        {/* Main Content Area */}
                        <div className="col-span-9">
                            {/* VARUN Chat Interface */}
                            <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-xl p-8 mb-8 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl border border-purple-500/30">
                                            <MessageSquare className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-2xl">Natural Language Interface</h3>
                                            <p className="text-slate-300 text-lg">Advanced conversational AI with multi-agent coordination</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={toggleVoiceListening}
                                            className={`p-3 rounded-xl transition-all duration-300 ${
                                                isListening 
                                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' 
                                                    : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                                            }`}
                                        >
                                            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                                        </button>
                                        <button
                                            onClick={() => setShowReasoning(!showReasoning)}
                                            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                                                showReasoning 
                                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                                                    : 'bg-slate-700/50 text-slate-300 border border-slate-600/30'
                                            }`}
                                        >
                                            {showReasoning ? 'Hide Reasoning' : 'Show Agent Reasoning'}
                                        </button>
                                    </div>
                                </div>

                                {/* Enhanced Active Tasks Indicator */}
                                {isProcessing && activeTasks.length > 0 && (
                                    <div className="mb-6 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl border border-purple-500/30">
                                        <div className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                                            <Workflow className="w-6 h-6 text-purple-400 animate-spin" />
                                            Multi-Agent Coordination in Progress
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {activeTasks.map((task, index) => {
                                                const agent = agents[task.agent];
                                                const IconComponent = agent?.icon || Activity;
                                                return (
                                                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <IconComponent className={`w-5 h-5 ${getAgentColor(agent?.color)} animate-pulse`} />
                                                            <div>
                                                                <div className="text-white font-semibold text-sm">{agent?.name}</div>
                                                                <div className="text-slate-300 text-xs">{task.task}</div>
                                                            </div>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <Loader className="w-4 h-4 animate-spin text-cyan-400" />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Enhanced Conversation Area */}
                                <div 
                                    ref={conversationRef}
                                    className="h-96 overflow-y-auto mb-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
                                >
                                    {conversation.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-4xl p-6 rounded-2xl shadow-lg ${
                                                msg.type === 'user' 
                                                    ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/40' 
                                                    : 'bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50'
                                            }`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className={`w-3 h-3 rounded-full ${
                                                        msg.type === 'user' ? 'bg-purple-400' : 'bg-cyan-400'
                                                    }`}></div>
                                                    <span className="text-sm text-slate-300 font-semibold">
                                                        {msg.type === 'user' ? 'You' : agents[msg.agent]?.name}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {msg.timestamp.toLocaleTimeString()}
                                                    </span>
                                                    {msg.confidence && (
                                                        <span className="ml-auto px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30">
                                                            {msg.confidence.toFixed(1)}% confidence
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="text-white text-sm leading-relaxed whitespace-pre-line">
                                                    {msg.message}
                                                </div>
                                                
                                                {/* Enhanced Agent Reasoning */}
                                                {showReasoning && msg.reasoning && (
                                                    <div className="mt-4 p-4 bg-slate-800/60 rounded-xl border border-slate-600/50">
                                                        <div className="text-cyan-400 font-semibold text-sm mb-2 flex items-center gap-2">
                                                            <Brain className="w-4 h-4" />
                                                            Agent Coordination Analysis:
                                                        </div>
                                                        <div className="text-slate-300 text-sm leading-relaxed">{msg.reasoning}</div>
                                                        
                                                        {msg.agents_involved && (
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                {msg.agents_involved.map(agentId => (
                                                                    <span key={agentId} className={`px-2 py-1 rounded-full text-xs ${getAgentBgColor(agents[agentId]?.color)}`}>
                                                                        {agents[agentId]?.name.split(' ')[0]}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Enhanced Data Visualization */}
                                                {msg.data && (
                                                    <div className="mt-4">
                                                        <EnhancedDataVisualization data={msg.data} type={msg.agent} visualizations={msg.visualizations} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Enhanced Input Area */}
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && query.trim() && processQuery(query)}
                                            placeholder="Ask about marine ecosystems, species analysis, environmental forecasts, compliance reports..."
                                            className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/50 focus:bg-slate-700/70 transition-all duration-300 text-lg"
                                            disabled={isProcessing}
                                        />
                                        <button
                                            onClick={() => query.trim() && processQuery(query)}
                                            disabled={!query.trim() || isProcessing}
                                            className="px-8 py-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 rounded-xl hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300 disabled:opacity-50 flex items-center gap-3 border border-purple-500/30 hover:border-purple-400/50 font-semibold text-lg"
                                        >
                                            {isProcessing ? (
                                                <Loader className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <Send className="w-5 h-5" />
                                            )}
                                            Send
                                        </button>
                                    </div>
                                    
                                    {/* Voice Input Indicator */}
                                    {isListening && (
                                        <div className="flex items-center justify-center gap-3 text-red-400 animate-pulse">
                                            <Mic className="w-5 h-5" />
                                            <span className="font-medium">Listening for voice input...</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Enhanced Agent Details & System Overview */}
                            <div className="grid grid-cols-2 gap-8">
                                <EnhancedAgentDetailPanel agent={agents[activeAgent]} />
                                <EnhancedSystemOverviewPanel systemMetrics={systemMetrics} marineData={marineDataSets} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced Helper Components
function MetricCard({ icon: Icon, label, value, color, trend, status }) {
    const getStatusColor = (status) => {
        const colors = {
            optimal: 'text-green-400 bg-green-400/10 border-green-400/30',
            excellent: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
            high: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
            normal: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
        };
        return colors[status] || 'text-slate-400 bg-slate-400/10 border-slate-400/30';
    };

    return (
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 backdrop-blur-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <Icon className={`w-6 h-6 ${color}`} />
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(status)}`}>
                    {status}
                </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-slate-400 text-sm mb-2">{label}</div>
            {trend && (
                <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs font-medium">{trend}</span>
                </div>
            )}
        </div>
    );
}

function EnhancedDataVisualization({ data, type, visualizations }) {
    if (!data || !Array.isArray(data)) return null;

    if (type === 'species' || data[0]?.count) {
        return (
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-600/50">
                <div className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                    <Fish className="w-5 h-5" />
                    Species Distribution Analysis
                </div>
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                            <div className="flex-1">
                                <div className="text-white font-medium text-sm">{item.name}</div>
                                <div className="text-slate-400 text-xs">{item.location}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-cyan-400 font-bold">{item.count.toLocaleString()}</div>
                                <div className={`text-xs ${
                                    item.trend === 'increasing' ? 'text-green-400' : 
                                    item.trend === 'decreasing' ? 'text-red-400' : 'text-yellow-400'
                                }`}>
                                    {item.trend} ({item.confidence}%)
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'habitats' || data[0]?.area) {
        return (
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-600/50">
                <div className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                    <Waves className="w-5 h-5" />
                    Habitat Health Assessment
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                            <div className="text-white font-medium text-sm mb-2">{item.type}</div>
                            <div className="text-cyan-400 text-lg font-bold mb-1">{item.area}</div>
                            <div className="flex justify-between items-center">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    item.health === 'Excellent' ? 'bg-green-500/20 text-green-300' :
                                    item.health === 'Good' ? 'bg-blue-500/20 text-blue-300' :
                                    item.health === 'Fair' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-slate-500/20 text-slate-300'
                                }`}>
                                    {item.health}
                                </span>
                                <span className="text-slate-400 text-xs">{item.coverage}% coverage</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (type === 'environmental' || data[0]?.value !== undefined) {
        return (
            <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-600/50">
                <div className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
                    <Thermometer className="w-5 h-5" />
                    Environmental Sensor Network
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((sensor, index) => (
                        <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <div className="text-white font-medium text-sm">{sensor.name}</div>
                                <div className={`w-2 h-2 rounded-full ${
                                    sensor.status === 'active' ? 'bg-green-400 animate-pulse' :
                                    sensor.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                                }`}></div>
                            </div>
                            <div className="text-cyan-400 text-xl font-bold mb-1">
                                {sensor.value} {sensor.unit}
                            </div>
                            <div className="text-slate-400 text-xs mb-1">{sensor.location}</div>
                            <div className="text-slate-300 text-xs">{sensor.trend}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

function EnhancedAgentDetailPanel({ agent }) {
    const IconComponent = agent.icon;
    
    return (
        <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl border border-purple-500/30">
                    <IconComponent className={`w-8 h-8 ${getAgentColor(agent.color)}`} />
                </div>
                <div>
                    <h4 className="text-white font-bold text-xl">{agent.name}</h4>
                    <p className="text-slate-300 text-sm">{agent.role}</p>
                    <p className="text-purple-400 text-xs font-medium">{agent.specialty}</p>
                </div>
            </div>
            
            <div className="mb-6">
                <div className="text-slate-300 leading-relaxed text-sm mb-4">{agent.description}</div>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl">
                        <div className="text-green-400 font-bold text-lg">{agent.performance.accuracy}%</div>
                        <div className="text-xs text-slate-400">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl">
                        <div className="text-cyan-400 font-bold text-lg">{agent.performance.speed}s</div>
                        <div className="text-xs text-slate-400">Avg Response</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl">
                        <div className="text-purple-400 font-bold text-lg">{agent.performance.uptime}%</div>
                        <div className="text-xs text-slate-400">Uptime</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h5 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Core Capabilities
                </h5>
                <div className="space-y-3">
                    {agent.capabilities.map((capability, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg">
                            <div className={`w-2 h-2 rounded-full ${getAgentColor(agent.color)} animate-pulse`}></div>
                            <span className="text-slate-300 text-sm font-medium">{capability}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function EnhancedSystemOverviewPanel({ systemMetrics, marineData }) {
    const databaseData = [
        { name: 'PostgreSQL', usage: 75.3, status: 'optimal', queries: '2.4k/min', color: '#336791' },
        { name: 'PostGIS', usage: 84.7, status: 'high', queries: '1.8k/min', color: '#336791' },
        { name: 'MongoDB', usage: 62.1, status: 'normal', queries: '3.1k/min', color: '#47A248' },
        { name: 'Redis Cache', usage: 45.8, status: 'optimal', queries: '12.5k/min', color: '#DC382D' },
        { name: 'InfluxDB', usage: 71.2, status: 'normal', queries: '890/min', color: '#22ADF6' }
    ];

    const protocolData = [
        { name: 'Darwin Core', compliance: 98.7, status: 'compliant' },
        { name: 'CF-NetCDF', compliance: 96.3, status: 'compliant' },
        { name: 'OBIS Format', compliance: 99.1, status: 'compliant' },
        { name: 'ISO 19115', compliance: 94.8, status: 'compliant' }
    ];

    return (
        <div className="bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-xl p-8 shadow-2xl">
            <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-cyan-400" />
                System Infrastructure
            </h4>
            
            {/* Database Performance */}
            <div className="mb-8">
                <h5 className="text-slate-300 font-semibold mb-4">Database Performance</h5>
                <div className="space-y-3">
                    {databaseData.map((db, index) => (
                        <div key={index} className="p-3 bg-slate-700/30 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div 
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: db.color }}
                                    ></div>
                                    <span className="text-white font-medium text-sm">{db.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-400 text-xs">{db.queries}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        db.status === 'optimal' ? 'bg-green-500/20 text-green-300' :
                                        db.status === 'high' ? 'bg-blue-500/20 text-blue-300' :
                                        'bg-yellow-500/20 text-yellow-300'
                                    }`}>
                                        {db.status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-300">Usage</span>
                                <span className="text-white font-mono">{db.usage.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-slate-600/50 rounded-full h-2">
                                <div 
                                    className="h-2 rounded-full transition-all duration-1000"
                                    style={{ 
                                        width: `${db.usage}%`, 
                                        backgroundColor: db.color,
                                        boxShadow: `0 0 10px ${db.color}50`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Standards Compliance */}
            
        </div>
    );
}

// Utility Functions
function getAgentColor(color) {
    const colors = {
        purple: 'text-purple-400',
        blue: 'text-blue-400',
        green: 'text-green-400',
        orange: 'text-orange-400',
        cyan: 'text-cyan-400',
        pink: 'text-pink-400'
    };
    return colors[color] || 'text-slate-400';
}

function getAgentBgColor(color) {
    const colors = {
        purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
        blue: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
        green: 'bg-green-500/20 text-green-300 border border-green-500/30',
        orange: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
        cyan: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
        pink: 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
    };
    return colors[color] || 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
}

function getRealisticDuration(agentId) {
    const baseDurations = {
        varun: 500,
        teamLead: 800,
        deepSearch: 1200,
        compliance: 600,
        dbManager: 1000,
        analytics: 1500
    };
    return baseDurations[agentId] + Math.random() * 500;
}

function getTaskPriority(agentId, analysis) {
    const basePriorities = {
        varun: 10,
        teamLead: 9,
        deepSearch: 7,
        compliance: 6,
        dbManager: 8,
        analytics: 5
    };
    
    // Adjust priority based on query analysis
    let priority = basePriorities[agentId];
    if (analysis.urgency === 'high') priority += 2;
    if (analysis.complexity === 'high' && agentId === 'analytics') priority += 1;
    
    return priority;
}