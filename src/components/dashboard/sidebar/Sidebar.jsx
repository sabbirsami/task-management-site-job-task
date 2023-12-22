import logo from "../../../assets/logo.png";
import logoTab from "../../../assets/logoCopy.png";
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
            className="bg-[#091017] sidebar-bg text-white border-e sticky top-0 lg:w-72 w-16"
            aria-label="Sidebar with content separator example "
        >
            <Sidebar.Items className="flex flex-col  justify-between h-[96vh] w-full bg-[#091017] text-white p-2">
                <Sidebar.ItemGroup className="w-full">
                    <div className="pt-2">
                        <img
                            className="lg:h-8 lg:block hidden"
                            src={logo}
                            alt=""
                        />
                        <img className="lg:hidden h-6" src={logoTab} alt="" />
                    </div>
                    <NavLink
                        to={"/management/manage-tasks"}
                        className={"w-full"}
                    >
                        <li className="flex items-center gap-3 mt-8 pt-8 w-full">
                            <HiViewBoards className="text-2xl"></HiViewBoards>{" "}
                            <span className="lg:block hidden">Manage Task</span>
                        </li>
                    </NavLink>
                    <NavLink to={"/management/add-task"} className={"w-full"}>
                        <li className="flex items-center gap-3 pt-6 w-full">
                            <FaPlus className="text-2xl"></FaPlus>{" "}
                            <span className="lg:block hidden">
                                Add New Task
                            </span>
                        </li>
                    </NavLink>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className="w-full border-0 mb-6">
                    <span className="flex gap-2 items-center">
                        <span className=" w-full rounded-xl ">
                            <div className="lg:grid grid-cols-9 justify-between items-center  hidden">
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
                            <div className="lg:hidden grid grid-cols-9 justify-between items-center ">
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
                                        <Dropdown.Item className="">
                                            <div className="col-span-2">
                                                <img
                                                    className="w-10 h-10 object-cover rounded-full"
                                                    src={user?.photoURL}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="col-span-6 ps-2">
                                                <p className="-mb-1 text-white">
                                                    {
                                                        user?.displayName?.split(
                                                            " "
                                                        )[0]
                                                    }
                                                </p>
                                                <span className="text-sm text-white/60">
                                                    {user?.email}
                                                </span>
                                            </div>
                                        </Dropdown.Item>
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
