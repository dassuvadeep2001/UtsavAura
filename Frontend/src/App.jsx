import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./sections/Authentication/Login";
import UserRegister from "./sections/Authentication/UserRegister";
import ChooseUserPage from "./sections/Authentication/ChooseUser";
import Layout from "./layout/layout";
import About from "./sections/About/About";
import Contact from "./sections/Contact/Contact";
import Faq from "./sections/Explore/Faq";
import Blog from "./sections/Explore/Blog";
import PaymentInfo from "./sections/Explore/Payment";
import Legal from "./sections/Explore/Legal";
import Home from "./sections/Home/Home";

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
          <Route path="/choose-user" element={<ChooseUserPage />} />
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
