import React, { useState, useEffect, useRef } from 'react';
import { 
    MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, 
    Brain, Fish, Waves, Database, BarChart3, FlaskConical,
    Microscope, Globe, Ship, AlertTriangle, CheckCircle,
    Loader2, User, Bot, Minimize2, Maximize2, Settings,
    Download, Upload, Search, Filter, Calendar, MapPin
} from 'lucide-react';

export default function VarunAIAgent({ isOpen, onToggle, currentPage = 'dashboard' }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [agentMode, setAgentMode] = useState('general'); // general, fisheries, oceanography, edna
    const [quickActions, setQuickActions] = useState([]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Initialize with context-aware welcome message
    useEffect(() => {
        if (messages.length === 0) {
            const welcomeMessage = getContextualWelcome(currentPage);
            setMessages([{
                id: 1,
                type: 'bot',
                content: welcomeMessage,
                timestamp: new Date(),
                category: 'welcome'
            }]);
            setQuickActions(getContextualQuickActions(currentPage));
        }
    }, [currentPage, messages.length]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Get contextual welcome message based on current page
    const getContextualWelcome = (page) => {
        const welcomeMessages = {
            'dashboard': "Hello! I'm Varun, your AI assistant for CMLRE's marine data platform. I can help you navigate oceanographic data, analyze fisheries information, process eDNA samples, or explain any marine research concepts. What would you like to explore today?",
            'fisheries': "Welcome to the Fisheries Intelligence portal! I'm Varun, and I specialize in fisheries management, stock assessments, and vessel monitoring. I can help you analyze catch data, interpret sustainability metrics, or explain fishing regulations. How can I assist with your fisheries research?",
            'oceanography': "Greetings from the Oceanographic Data section! I'm Varun, your marine data specialist. I can help you understand ocean parameters, analyze environmental trends, or interpret sensor data from across Indian maritime zones. What oceanographic insights do you need?",
            'edna': "Welcome to the eDNA Analysis portal! I'm Varun, and I can guide you through environmental DNA processing, species identification, and biodiversity assessments. Whether you need help with sample analysis or understanding genetic markers, I'm here to help!",
            'digital_twin': "Hello! You're viewing the Marine Digital Twin platform. I'm Varun, and I can help you navigate the real-time marine ecosystem models, interpret sensor networks, or understand predictive analytics. What aspect of the digital twin interests you?",
            'ai_analytics': "Welcome to the AI Analytics Engine! I'm Varun, your intelligent assistant for machine learning models, species classification, and predictive analytics. I can explain AI processes, help interpret results, or guide you through analysis workflows."
        };
        return welcomeMessages[page] || welcomeMessages['dashboard'];
    };

    // Get contextual quick actions
    const getContextualQuickActions = (page) => {
        const actions = {
            'dashboard': [
                { label: 'Data Overview', icon: BarChart3, action: 'show_data_overview' },
                { label: 'Recent Alerts', icon: AlertTriangle, action: 'show_alerts' },
                { label: 'System Status', icon: CheckCircle, action: 'show_status' },
                { label: 'Help Guide', icon: Brain, action: 'show_help' }
            ],
            'fisheries': [
                { label: 'Stock Assessment', icon: Fish, action: 'explain_stock_assessment' },
                { label: 'Vessel Tracking', icon: Ship, action: 'explain_vessel_tracking' },
                { label: 'Quota Analysis', icon: BarChart3, action: 'analyze_quotas' },
                { label: 'Sustainability Report', icon: CheckCircle, action: 'generate_sustainability_report' }
            ],
            'oceanography': [
                { label: 'Parameter Analysis', icon: Waves, action: 'analyze_ocean_parameters' },
                { label: 'Sensor Networks', icon: Globe, action: 'explain_sensor_networks' },
                { label: 'Water Quality', icon: FlaskConical, action: 'check_water_quality' },
                { label: 'Trend Analysis', icon: BarChart3, action: 'analyze_trends' }
            ],
            'edna': [
                { label: 'Species ID', icon: Microscope, action: 'identify_species' },
                { label: 'Sample Analysis', icon: FlaskConical, action: 'analyze_samples' },
                { label: 'Genetic Markers', icon: Database, action: 'explain_genetic_markers' },
                { label: 'Biodiversity Report', icon: BarChart3, action: 'generate_biodiversity_report' }
            ]
        };
        return actions[page] || actions['dashboard'];
    };

    // CMLRE-specific knowledge base responses
    const getAIResponse = (message, context) => {
        const lowerMessage = message.toLowerCase();
        
        // Marine species identification
        if (lowerMessage.includes('species') || lowerMessage.includes('fish') || lowerMessage.includes('identify')) {
            return {
                content: "I can help identify marine species using our integrated AI models. Our system processes morphometric data, genetic markers, and environmental DNA to achieve 94.7% species identification accuracy. For fish identification, we analyze otolith shapes, body measurements, and DNA barcoding. Would you like me to guide you through the identification process or explain our taxonomic classification system?",
                category: 'species_identification',
                suggestions: ['Show identification process', 'Explain DNA barcoding', 'View species database']
            };
        }

        // Stock assessment queries
        if (lowerMessage.includes('stock') || lowerMessage.includes('msy') || lowerMessage.includes('biomass')) {
            return {
                content: "Our stock assessment models integrate multiple data sources to evaluate fish population health. We calculate Maximum Sustainable Yield (MSY), current biomass levels, and fishing mortality rates. Currently monitoring 5 key species with real-time sustainability indicators. The system shows Hilsa Shad at critical levels (45% of optimal stock) requiring immediate management action. Would you like detailed analysis of any specific species?",
                category: 'stock_assessment',
                suggestions: ['View current stock levels', 'Explain MSY calculations', 'Generate sustainability report']
            };
        }

        // eDNA and genetic analysis
        if (lowerMessage.includes('edna') || lowerMessage.includes('dna') || lowerMessage.includes('genetic')) {
            return {
                content: "Our eDNA analysis pipeline processes environmental samples to detect marine species presence with 87.5% match rate. We use COI gene sequencing for species identification and analyze population genetics. The system maintains genetic databases with over 500 marine species from Indian waters. Recent analysis detected rare whale shark populations in Lakshadweep waters. What specific genetic analysis do you need help with?",
                category: 'genetic_analysis',
                suggestions: ['Process eDNA sample', 'View genetic database', 'Explain DNA extraction']
            };
        }

        // Oceanographic data queries
        if (lowerMessage.includes('ocean') || lowerMessage.includes('temperature') || lowerMessage.includes('salinity')) {
            return {
                content: "Our oceanographic monitoring network includes 847 active sensors across Indian maritime zones. Current data shows temperature range 19.3-29.2°C, salinity 33.9-35.1 PSU, and pH levels 7.85-8.07. We've detected a temperature anomaly in Arabian Sea sector AS-12 (+2.5°C above normal) that may affect fish migration patterns. Real-time data processing ensures 96% data quality with 150ms latency. Which parameters would you like to analyze?",
                category: 'oceanography',
                suggestions: ['View real-time data', 'Check anomalies', 'Analyze trends']
            };
        }

        // Vessel tracking and compliance
        if (lowerMessage.includes('vessel') || lowerMessage.includes('tracking') || lowerMessage.includes('compliance')) {
            return {
                content: "Currently tracking 5 active vessels with 94.3% average compliance rate. Vessel monitoring includes AIS/VMS integration, real-time position tracking, and automated compliance checking. IND-WB-2198 'Bay Explorer' shows 77.5% quota utilization for Hilsa Shad, approaching limit. IND-KA-1456 'Coastal Star' requires license renewal in 5 days. All vessels maintain required safety standards and fishing gear compliance. Which vessel information do you need?",
                category: 'vessel_tracking',
                suggestions: ['Show vessel locations', 'Check compliance status', 'View catch reports']
            };
        }

        // CMLRE and institutional queries
        if (lowerMessage.includes('cmlre') || lowerMessage.includes('ministry') || lowerMessage.includes('moes')) {
            return {
                content: "CMLRE (Centre for Marine Living Resources and Ecology) operates under the Ministry of Earth Sciences to promote sustainable ocean development in India. Our SAGARA platform addresses CMLRE's need for unified data integration across oceanography, fisheries, and molecular biodiversity research. The system supports ecosystem-based management, scientific surveys, and data-driven decision making for India's 2.02 million sq km EEZ. How can I help you understand our research programs?",
                category: 'institutional',
                suggestions: ['Learn about CMLRE', 'View research programs', 'Understand EEZ management']
            };
        }

        // Technical help and tutorials
        if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('tutorial')) {
            return {
                content: "I can guide you through any aspect of the SAGARA platform. Our system integrates heterogeneous marine datasets with AI-powered analytics for comprehensive ocean research. Key features include real-time data processing, automated species identification, stock assessments, and predictive modeling. The platform supports researchers, policymakers, and marine managers with evidence-based insights. What specific functionality would you like to learn about?",
                category: 'help',
                suggestions: ['Platform overview', 'Data analysis guide', 'API documentation']
            };
        }

        // Default intelligent response
        return {
            content: "I understand you're asking about marine research topics. As your CMLRE AI assistant, I can help with oceanographic data analysis, fisheries management, species identification, eDNA processing, vessel monitoring, and research methodology. Our platform integrates multiple data sources to support India's marine living resources research. Could you be more specific about what aspect of marine science you'd like to explore?",
            category: 'general',
            suggestions: ['Fisheries analysis', 'Ocean data', 'Species research', 'Platform help']
        };
    };

    // Handle quick action clicks
    const handleQuickAction = (action) => {
        const actionResponses = {
            'show_data_overview': "Here's your current data overview: 847 active sensors, 96% data quality, 5 species monitored, 12.5T total catch today. Recent highlights include temperature anomaly detection in Arabian Sea and successful eDNA analysis identifying 127 species. The system is operating at optimal performance with real-time processing capabilities.",
            'show_alerts': "Current alerts: 3 active notifications including Hilsa Shad quota utilization at 77.5%, vessel license renewal due for IND-KA-1456, and AIS signal weakness for IND-GJ-0934. All alerts have been prioritized with recommended actions for marine resource managers.",
            'explain_stock_assessment': "Stock assessment uses scientific models to evaluate fish population health. We calculate current biomass, fishing mortality, recruitment rates, and compare against Maximum Sustainable Yield (MSY). Our models integrate catch data, age structure analysis, and environmental factors to provide sustainability recommendations.",
            'analyze_ocean_parameters': "Current ocean parameters show optimal conditions in 73% of monitored zones. Temperature gradients indicate favorable upwelling patterns, supporting phytoplankton growth. Salinity levels are within normal ranges, and dissolved oxygen levels support healthy marine ecosystems.",
            'identify_species': "Species identification uses multiple approaches: morphometric analysis of physical characteristics, genetic DNA barcoding, and environmental DNA detection. Our AI models achieve 94.7% accuracy in species classification, supporting taxonomic research and biodiversity assessments."
        };

        const response = actionResponses[action] || "This feature is being processed by our AI systems. Please wait while I gather the relevant marine data for your request.";
        
        addMessage('user', `Quick Action: ${quickActions.find(a => a.action === action)?.label || action}`);
        setTimeout(() => {
            addMessage('bot', response, action);
        }, 800);
    };

    // Add message to conversation
    const addMessage = (type, content, category = 'general') => {
        const aiResponse = type === 'bot' && typeof content === 'string' ? 
            { content, category, suggestions: [] } : 
            (type === 'bot' ? content : { content, category: 'user', suggestions: [] });

        const newMessage = {
            id: Date.now(),
            type,
            content: aiResponse.content || content,
            category: aiResponse.category || category,
            suggestions: aiResponse.suggestions || [],
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    // Handle sending message
    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        addMessage('user', inputMessage);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI processing time
        setTimeout(() => {
            const response = getAIResponse(inputMessage, { page: currentPage, mode: agentMode });
            setIsTyping(false);
            addMessage('bot', response.content, response.category);
            
            // Add suggestions if available
            if (response.suggestions && response.suggestions.length > 0) {
                setTimeout(() => {
                    setQuickActions(response.suggestions.map(s => ({
                        label: s,
                        icon: Brain,
                        action: s.toLowerCase().replace(/\s+/g, '_')
                    })));
                }, 500);
            }
        }, 1500);
    };

    // Handle voice input (simulated)
    const toggleVoiceInput = () => {
        setIsListening(!isListening);
        if (!isListening) {
            // Simulate voice recognition
            setTimeout(() => {
                setInputMessage("What is the current status of Hilsa Shad stocks?");
                setIsListening(false);
            }, 3000);
        }
    };

    // Handle text-to-speech (simulated)
    const toggleSpeech = () => {
        setIsSpeaking(!isSpeaking);
        setTimeout(() => setIsSpeaking(false), 2000);
    };

    if (!isOpen) {
        return (
            <button
                onClick={onToggle}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-pulse"
            >
                <Bot className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
            <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-2xl shadow-2xl flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-600/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Varun AI</h3>
                            <p className="text-xs text-slate-400">CMLRE Marine Intelligence</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={onToggle}
                            className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Mode Selector */}
                        <div className="p-3 border-b border-slate-600/30">
                            <div className="flex gap-2">
                                {[
                                    { id: 'general', label: 'General', icon: Brain },
                                    { id: 'fisheries', label: 'Fisheries', icon: Fish },
                                    { id: 'oceanography', label: 'Ocean', icon: Waves },
                                    { id: 'edna', label: 'eDNA', icon: Microscope }
                                ].map(mode => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setAgentMode(mode.id)}
                                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors ${
                                            agentMode === mode.id 
                                                ? 'bg-blue-500/20 text-blue-400' 
                                                : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        <mode.icon className="w-3 h-3" />
                                        {mode.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.type === 'bot' && (
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[280px] p-3 rounded-2xl ${
                                            message.type === 'user'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-slate-700/50 text-slate-100'
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed">{message.content}</p>
                                        <div className="text-xs opacity-60 mt-2">
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    {message.type === 'user' && (
                                        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-slate-700/50 p-3 rounded-2xl">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {quickActions.length > 0 && (
                            <div className="p-3 border-t border-slate-600/30">
                                <div className="text-xs text-slate-400 mb-2">Quick Actions:</div>
                                <div className="flex flex-wrap gap-2">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickAction(action.action)}
                                            className="flex items-center gap-1 px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs hover:bg-slate-600/50 transition-colors"
                                        >
                                            <action.icon className="w-3 h-3" />
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t border-slate-600/50">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Ask about marine data, species, or research..."
                                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none text-sm"
                                    />
                                </div>
                                <button
                                    onClick={toggleVoiceInput}
                                    className={`p-2 rounded-lg transition-colors ${
                                        isListening 
                                            ? 'bg-red-500/20 text-red-400' 
                                            : 'bg-slate-700/50 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={toggleSpeech}
                                    className={`p-2 rounded-lg transition-colors ${
                                        isSpeaking 
                                            ? 'bg-blue-500/20 text-blue-400' 
                                            : 'bg-slate-700/50 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputMessage.trim() || isTyping}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}