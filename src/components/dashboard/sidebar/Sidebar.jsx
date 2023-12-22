import logo from "../../../assets/logo.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiViewBoards } from "react-icons/hi";
import { Dropdown, Sidebar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { FaPlus } from "react-icons/fa";

const SidebarNav = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <Sidebar
            className="bg-[#091017] sidebar-bg text-white border-e sticky top-0"
            aria-label="Sidebar with content separator example "
        >
            <Sidebar.Items className="flex flex-col  justify-between h-[96vh] w-full bg-[#091017] text-white p-4">
                <Sidebar.ItemGroup className="w-full">
                    <div className="pt-2">
                        <img className="h-10" src={logo} alt="" />
                    </div>
                    <li className="flex items-center gap-3 mt-8 pt-8 w-full">
                        <HiViewBoards className="text-2xl"></HiViewBoards>{" "}
                        <NavLink
                            to={"/management/manage-tasks"}
                            className={"w-full"}
                        >
                            Manage Task
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-3 mt-8 pt-8 w-full">
                        <FaPlus className="text-2xl"></FaPlus>{" "}
                        <NavLink
                            to={"/management/add-task"}
                            className={"w-full"}
                        >
                            Add New Task
                        </NavLink>
                    </li>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className="w-full border-0 mb-6">
                    <span className="flex gap-2 items-center">
                        <span className="p-1   w-full rounded-xl ">
                            <div className="grid grid-cols-9 justify-between items-center ">
                                <div className="col-span-2">
                                    <img
                                        className="w-10 h-10 object-cover rounded-full"
                                        src={user?.photoURL}
                                        alt=""
                                    />
                                </div>
                                <div className="col-span-6 ps-2">
                                    <p className="-mb-1">
                                        {user?.displayName?.split(" ")[0]}
                                    </p>
                                    <span className="text-sm text-white/60">
                                        {user?.email}
                                    </span>
                                </div>
                                <button className="col-span-1">
                                    <Dropdown
                                        className="right-0 z-50 bg-white"
                                        label=""
                                        dismissOnClick={false}
                                        renderTrigger={() => (
                                            <span>
                                                <BsThreeDotsVertical />
                                            </span>
                                        )}
                                    >
                                        <Dropdown.Item className="bg-white inline">
                                            Log Out
                                        </Dropdown.Item>
                                    </Dropdown>
                                </button>
                            </div>
                        </span>
                    </span>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default SidebarNav;
