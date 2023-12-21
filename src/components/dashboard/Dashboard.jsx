import { Outlet } from "react-router-dom";
import SidebarNav from "./sidebar/SIdebar";

const Dashboard = () => {
    return (
        <section className="">
            <div className="flex">
                <SidebarNav />
                <Outlet />
            </div>
        </section>
    );
};

export default Dashboard;
