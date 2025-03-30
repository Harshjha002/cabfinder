/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useUser();

    if (user === null) {
        return <div>Loading...</div>; // Avoid redirecting before user data loads
    }

    if (!user) return <Navigate to="/sign-in" replace />;
    if (role === "owner" && !user.isOwner) return <Navigate to="/become-owner" replace />;

    return children;
};


export default ProtectedRoute;
