import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";
import SignupPage from "./Pages/SignupPage";
import CabFinderForm from "./Pages/CabFinderForm";
import CabListPage from "./Pages/CabListPage";
import ContactOwnerFormPage from "./Pages/ContactOwnerFormPage";
import OwnerDashboardPage from "./Pages/OwnerDashboardPage";
// import UserDashboardPage from "./Pages/UserDashboardPage";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./Context/ThemeContext";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/cab-finder" element={<CabFinderForm />} />
            <Route path="/cab-list/:params" element={<CabListPage />} />
            <Route path="/contact-owner/:id" element={<ContactOwnerFormPage />} />
            <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />


            {/* ✅ Protect these routes */}
            <Route
              path="/owner-dashboard/:id"
              element={
                <ProtectedRoute>
                  <OwnerDashboardPage />
                </ProtectedRoute>} />

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
