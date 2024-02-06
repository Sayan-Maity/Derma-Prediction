
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPages/LandingPage";
import WrongPage from "../pages/LandingPages/WrongPage";
import Login from "../pages/authPages/Login";
import Register from "../pages/authPages/Register";
import Dashboard from "../pages/dashboardPages/Dashboard";
import DermaDetection from "../pages/dashboardPages/DermaDetection";
import Private from "../components/Private";
import PrivateRoutes from "./PrivateRoutes";
import ContactUS from "../pages/LandingPages/ContactUs";
import Developers from "../pages/LandingPages/Developers";
import SearchDisease from "../pages/dashboardPages/SearchDisease";
import SkinCare from "../pages/dashboardPages/SkinCare";
import HealthAnalytics from "../pages/dashboardPages/HealthAnalytics";
import CommunityForum from "../pages/dashboardPages/CommunityForum";
import UpgradePlan from "../pages/dashboardPages/UpgradePlan";
import PaymentSuccess from "../pages/dashboardPages/PaymentSuccess";
import DoctorConsultation from "../pages/dashboardPages/DoctorConsultation";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import Doctor from "../components/Doctor";

const CustomRoutes = () => {
  return (
    <Routes>
      {/* -----------------------  PUBLIC ROUTES  --------------------- */}
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/developers" element={<Developers />} />
      <Route exact path="/contact" element={<ContactUS />} />
      <Route exact path="/payment-success" element={<PaymentSuccess />} />

      <Route exact path="*" element={<WrongPage/>} />

      {/* -----------------------  PRIVATE ROUTES USER  --------------------- */}
      <Route exact path="/private" element={<PrivateRoutes element={Private} />}>
        <Route exact path="/private/search-disease" element={<PrivateRoutes element={SearchDisease} />} />
        <Route exact path="/private/skin-care" element={<PrivateRoutes element={SkinCare} />} />
        <Route exact path="/private/dashboard" element={<PrivateRoutes element={Dashboard} />} />
        <Route exact path="/private/derma-detection" element={<PrivateRoutes element={DermaDetection} />} />
        <Route exact path="/private/health-analytics" element={<PrivateRoutes element={HealthAnalytics} />} />
        <Route exact path="/private/community-forum" element={<PrivateRoutes element={CommunityForum} />} />
        <Route exact path="/private/upgrade" element={<PrivateRoutes element={UpgradePlan} />} />
      <Route exact path="/private/doctor-consultation" element={<DoctorConsultation />} />
      </Route>
      {/* -----------------------  PRIVATE ROUTES USER  --------------------- */}
      {/* -----------------------  PRIVATE ROUTES DOCTOR  --------------------- */}
      <Route exact path="/doctor" element={<PrivateRoutes element={Doctor} />}>
        <Route exact path="/doctor/doctor-dashboard" element={<PrivateRoutes element={DoctorDashboard} />} />
      {/* -----------------------  PRIVATE ROUTES DOCTOR  --------------------- */}
      </Route>

    </Routes>
  );
};

export default CustomRoutes;
