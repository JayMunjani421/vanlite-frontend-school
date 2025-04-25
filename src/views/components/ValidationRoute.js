import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isLoggedIn = sessionStorage.getItem("schoollogin");
    if (!isLoggedIn) {
        alert("Please login first!");
        return <Navigate to="/schoollogin" />;
    }
    return <Outlet />;  // Renders nested routes
};

export default PrivateRoute;
