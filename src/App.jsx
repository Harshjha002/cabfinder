import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";
import SignupPage from "./Pages/SignupPage";
import CabFinderForm from "./Pages/CabFinderForm";
import CabListPage from "./Pages/CabListPage";
import ContactOwnerFormPage from "./Pages/ContactOwnerFormPage";
import OwnerDashboardPage from "./Pages/OwnerDashboardPage";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./Context/ThemeContext";
import { UserProvider, useUser } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import BecomeOwnerForm from "./Pages/BecomeOwnerForm";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const { user } = useUser(); // Get user from context

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/cab-finder" element={<CabFinderForm />} />
      <Route
        path="/cab-list/:params"
        element={
          <ProtectedRoute>
            <CabListPage />
          </ProtectedRoute>
        }
      />
      <Route path="/contact-owner/:id" element={<ContactOwnerFormPage />} />

      {/* ✅ Protected owner dashboard */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute>
            {user?.isOwner ? <OwnerDashboardPage /> : <BecomeOwnerForm />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner-dashboard/:id"
        element={
          <ProtectedRoute>
            <OwnerDashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
