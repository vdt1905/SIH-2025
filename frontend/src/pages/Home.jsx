import Features from '../components/Features'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VarunAIAgent from '../components/VarunAiAgent'
import { useState } from 'react'

function Home() {
    const [isVarunOpen, setIsVarunOpen] = useState(false);
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
            <VarunAIAgent 
    isOpen={isVarunOpen} 
    onToggle={() => setIsVarunOpen(!isVarunOpen)}
    currentPage="general" // or "oceanography", "edna", "digital_twin", etc.
/>
        </>


    )
}

export default Home
