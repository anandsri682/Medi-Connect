import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./pages/Footer";

import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import OrganizationLogin from "./pages/OrganizationLogin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ClinicDashboard from "./pages/ClinicDashboard";
import BookAppointment from "./pages/BookAppointment";

import { ChatProvider } from "./pages/ChatContext";
import ChatBot from "./components/Navbar/ChatBot";
import FloatingButton from "./components/Navbar/FloatingButton";
import HealthSlider from "./pages/HealthSlider";

function App() {

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <ChatProvider>

        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/organizationlogin" element={<OrganizationLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
          <Route path="/clinic/:id" element={<ClinicDashboard />} />
          <Route path="/clinic/:id/book" element={<BookAppointment />} />
        </Routes>

        <Footer />

        <FloatingButton toggle={() => setIsChatOpen(!isChatOpen)} />
        <ChatBot
          isOpen={isChatOpen}
          toggle={() => setIsChatOpen(false)}
        />

      </ChatProvider>
     
    </Router>
  );
}

export default App;