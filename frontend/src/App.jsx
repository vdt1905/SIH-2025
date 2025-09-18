import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DataPortal from "./pages/DataPortal";
import MarineDigitalTwinPlatform from "./pages/MarineDigitalTwinPlatform";
import AIAnalyticsEngine from "./pages/AIAnalyticsEngine"
import EDNAPortal from "./pages/EDNAportal";
import OceanographicPortal from "./pages/OceanographicPortal";
import FisheriesPortal from "./pages/FisheriesPortal";
function App() {
  return (
    <Router>
      <div className="min-h-dvh bg-gradient-to-b from-[#020916] via-[#041126] to-[#031024] text-sky-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<DataPortal />} />
          <Route path="/marine" element={<MarineDigitalTwinPlatform />} />
          <Route path="/aianalytics" element={<AIAnalyticsEngine />} />
          <Route path="/edna" element={<EDNAPortal />} />
          <Route path="/oceanography" element={<OceanographicPortal />} />
          <Route path="/fisheries" element={<FisheriesPortal />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
