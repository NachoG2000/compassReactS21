import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.jwtToken ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
}

export default RequireAuth;
