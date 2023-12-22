import { Outlet } from "react-router-dom";
import SidebarNav from "./sidebar/SIdebar";

const Dashboard = () => {
    return (
        <section className="bg-[#091017]">
            <div className="flex">
                <SidebarNav />

                <Outlet />
            </div>
        </section>
    );
};

export default Dashboard;
