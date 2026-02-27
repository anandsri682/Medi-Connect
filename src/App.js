import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import OrganizationLogin from "./pages/OrganizationLogin";
  import About from "./pages/About";
  import Contact from "./pages/Contact";
  import OrganizationDashboard from "./pages/OrganizationDashboard"; 
 import Navbar from "./components/Navbar/Navbar";
  import PatientDashboard from "./pages/PatientDashboard";
  import ClinicDashboard from "./pages/ClinicDashboard";
import Footer from "./pages/Footer";
function App() {
  return (
    <Router>
       {/* ✅ Only here */}
      <Navbar/>
      <div className="main-content">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/organizationlogin" element={<OrganizationLogin/>} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        <Route path="/clinic/:id" element={<ClinicDashboard />} />
        


      </Routes>
      <Footer/>
      </div>
    </Router>
    
  );
}

export default App;