import PropTypes from "prop-types";
import { createContext, useState } from "react";
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../../firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const user = false;
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const data = {
        user,
        signInWithGoogle,
        signInUser,
        createUser,
        signOutUser,
    };
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
};
