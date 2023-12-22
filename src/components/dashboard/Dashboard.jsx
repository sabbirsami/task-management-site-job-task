import { Outlet } from "react-router-dom";
import SidebarNav from "./sidebar/SIdebar";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
    return (
        <section className="bg-[#091017]">
            <div className="flex">
                <SidebarNav />
                <Toaster />
                <Outlet />
            </div>
        </section>
    );
};

export default Dashboard;
