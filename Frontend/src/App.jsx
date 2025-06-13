import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import UserRegister from "./pages/Authentication/UserRegister";
import ChooseUserPage from "./pages/Authentication/ChooseUser";
import Layout from "./layout/layout";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Faq from "./pages/Explore/Faq";
import Blog from "./pages/Explore/Blog";
import PaymentInfo from "./pages/Explore/Payment";
import Legal from "./pages/Explore/Legal";
import Home from "./pages/Home/Home";
import ForgotPasswordPage from "./pasword/forgetPassword";
import ResetPasswordPage from "./pasword/resetPassword";
import NotFoundPage from "./pnf/pageNotFound";
import EventManagerRegister from "./pages/Authentication/EventManagerRegister";
import Profile from "./pages/profile/profile";
import ManageAccount from "./pages/profile/manageAccount";
import User from "./pages/admin/user";
import Queries from "./pages/admin/queries";
import Category from "./pages/admin/category";
import VerifyEmail from "./pages/Authentication/verifyEmail";
import Services from "./pages/Services/Services";
import EventManagerDetails from "./pages/Services/EventManagerDetails";
import ScrollToTop from "./layout/scroll";
import UpdateProfile from "./pages/profile/updateProfile";

function App() {
  return (
    <Router>
      {/* ScrollToTop component can be added here if needed */}
      <ScrollToTop />
      <Routes>
        {/* All routes that should include Navbar & Footer go inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/choose-user" element={<ChooseUserPage />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route
            path="/event-manager-register"
            element={<EventManagerRegister />}
          />
          <Route path="/services/:categoryId" element={<Services />} />
          <Route
            path="/event-manager-details/:id"
            element={<EventManagerDetails />}
          />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/manageAccount" element={<ManageAccount />} />
          <Route path="/admin/users" element={<User />} />
          <Route path="/admin/queries" element={<Queries />} />
          <Route path="/admin/categories" element={<Category />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
