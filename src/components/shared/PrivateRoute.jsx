import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    console.log(user);
    const location = useLocation();

    if (loading) {
        return <p>Loading..</p>;
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
