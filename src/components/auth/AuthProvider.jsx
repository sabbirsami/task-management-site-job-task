import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "../../../firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const user = false;

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const data = { user, signInWithGoogle };
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
};
