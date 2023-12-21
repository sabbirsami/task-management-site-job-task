import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/shared/footer/Footer";

const Root = () => {
    return (
        <main className="text-white">
            <Navbar />
            <Outlet />
            <Footer />
            <Toaster />
        </main>
    );
};

export default Root;
