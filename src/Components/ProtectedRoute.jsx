/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();

    return user ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
