/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
