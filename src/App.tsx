import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import User from "./pages/User";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//context
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoutes } from "./utils/PrivateRoutes";

function App() {
  return (
    <div className=" max-w-full max-h-full text-slate-400">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="" element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/my-user" element={<User />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
