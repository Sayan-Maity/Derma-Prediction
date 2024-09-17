
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "../components/loader/PageLoader";
import Private from "../components/Private";
import PrivateUserRoute from "./PrivateUserRoute";
import Doctor from "../components/Doctor";
import PrivateDoctorRoute from "./PrivateDoctorRoute";
import PageTransitionWrapper from "../components/loader/PageTransitionWrapper";

const LandingPage = lazy(() => import("../pages/LandingPages/LandingPage"));
const WrongPage = lazy(() => import("../pages/LandingPages/WrongPage"));
const Login = lazy(() => import("../pages/authPages/Login"));
const Register = lazy(() => import("../pages/authPages/Register"));
const Dashboard = lazy(() => import("../pages/dashboardPages/dashboard/Dashboard"));
const DermaDetection = lazy(() => import("../pages/dashboardPages/dermaDetection/DermaDetection"));
const ContactUS = lazy(() => import("../pages/LandingPages/ContactUs"));
const SearchDisease = lazy(() => import("../pages/dashboardPages/searchDisease/SearchDisease"));
const SkinCare = lazy(() => import("../pages/dashboardPages/skinCare/SkinCare"));
const HealthAnalytics = lazy(() => import("../pages/dashboardPages/healthAnalytics/HealthAnalytics"));
const CommunityForum = lazy(() => import("../pages/dashboardPages/communityForum/CommunityForum"));
const UpgradePlan = lazy(() => import("../pages/dashboardPages/upgradePlan/UpgradePlan"));
const PaymentSuccess = lazy(() => import("../pages/dashboardPages/upgradePlan/paymentStatus/PaymentSuccess"));
const DoctorConsultation = lazy(() => import("../pages/dashboardPages/doctorConsultation/DoctorConsultation"));
const DoctorDashboard = lazy(() => import("../pages/doctor/DoctorDashboard"));

const CustomRoutes = () => {
  return (
    <PageTransitionWrapper>
     {/*  <Suspense fallback={<PageLoader />} > */}
        <Routes>
          {/* -----------------------  PUBLIC ROUTES  --------------------- */}
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/loader" element={<PageLoader />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/contact" element={<ContactUS />} />
          <Route exact path="/payment-success" element={<PaymentSuccess />} />
          <Route exact path="*" element={<WrongPage />} />
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
      {/* </Suspense>*/}
    </PageTransitionWrapper>
     
  );
};

export default CustomRoutes;
