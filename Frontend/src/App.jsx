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

function App() {
  return (
    <Router>
      <Routes>
        {/* All routes that should include Navbar & Footer go inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/event-manager-register" element={<EventManagerRegister />} />
          <Route path="/choose-user" element={<ChooseUserPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
