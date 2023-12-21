import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/navbar/Navbar";
import { Toaster } from "react-hot-toast";

const Root = () => {
    return (
        <main className="text-white">
            <Navbar />
            <Outlet />
            <Toaster />
        </main>
    );
};

export default Root;
