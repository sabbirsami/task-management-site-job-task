import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    console.log(user);
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }
    if (user) {
        return children;
    }
    if (!user) {
        return (
            <Navigate
                state={{ comeFrom: location.pathname }}
                to={"/sign-in"}
            ></Navigate>
        );
    }
    return (
        <Navigate
            state={{
                comeFrom: location.pathname,
            }}
            to={"/sign-in"}
        ></Navigate>
    );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node,
};
