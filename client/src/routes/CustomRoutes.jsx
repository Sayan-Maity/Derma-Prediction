
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPages/LandingPage";
import WrongPage from "../pages/LandingPages/WrongPage";
import Login from "../pages/authPages/Login";
import Register from "../pages/authPages/Register";
import Dashboard from "../pages/dashboardPages/Dashboard";
import DermaDetection from "../pages/dashboardPages/DermaDetection";
import Private from "../components/Private";
import PrivateUserRoute from "./PrivateUserRoute";
import PrivateDoctorRoute from "./PrivateDoctorRoute";
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
      {/* -----------------------  PUBLIC ROUTES  --------------------- */}

      {/* -----------------------  PRIVATE USER ROUTES USER  --------------------- */}
      <Route exact path="/private" element={<PrivateUserRoute element={Private} />}>
        <Route exact path="/private/search-disease" element={<PrivateUserRoute element={SearchDisease} />} />
        <Route exact path="/private/skin-care" element={<PrivateUserRoute element={SkinCare} />} />
        <Route exact path="/private/dashboard" element={<PrivateUserRoute element={Dashboard} />} />
        <Route exact path="/private/derma-detection" element={<PrivateUserRoute element={DermaDetection} />} />
        <Route exact path="/private/health-analytics" element={<PrivateUserRoute element={HealthAnalytics} />} />
        <Route exact path="/private/community-forum" element={<PrivateUserRoute element={CommunityForum} />} />
        <Route exact path="/private/upgrade" element={<PrivateUserRoute element={UpgradePlan} />} />
      <Route exact path="/private/doctor-consultation" element={<DoctorConsultation />} />
      </Route>
      {/* -----------------------  PRIVATE USER ROUTES USER  --------------------- */}

      {/* -----------------------  PRIVATE DOCTOR ROUTES DOCTOR  --------------------- */}
      <Route exact path="/doctor" element={<PrivateDoctorRoute element={Doctor} />}>
        <Route exact path="/doctor/doctor-dashboard" element={<PrivateDoctorRoute element={DoctorDashboard} />} />
      {/* -----------------------  PRIVATE DOCTOR ROUTES DOCTOR  --------------------- */}
      </Route>

    </Routes>
  );
};

export default CustomRoutes;
