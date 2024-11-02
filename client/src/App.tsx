import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import "./index.css";

import NotFound from "./components/NotFound";
import { AdminDashboard, ForgotPasswordForm, Login, StudentDashboard } from "./components";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login route */}
        <Route path  ="/reset-password" element={<ForgotPasswordForm />} />{" "}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />{" "}
        {/* Admin dashboard route */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />{" "}
        {/* Student dashboard route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
