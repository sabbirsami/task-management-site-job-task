import logo from "../../../assets/logo.png";
import logoTab from "../../../assets/logoCopy.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiViewBoards } from "react-icons/hi";
import { Dropdown, Sidebar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

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
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="pt-2"
                    >
                        <NavLink to={"/"}>
                            <img
                                className="lg:h-8 lg:block hidden"
                                src={logo}
                                alt=""
                            />
                            <img
                                className="lg:hidden h-6"
                                src={logoTab}
                                alt=""
                            />
                        </NavLink>
                    </motion.div>
                    <NavLink
                        to={"/management/manage-tasks"}
                        className={"w-full"}
                    >
                        <motion.li
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="flex items-center gap-3 mt-8 pt-8 w-full"
                        >
                            <HiViewBoards className="text-2xl"></HiViewBoards>{" "}
                            <span className="lg:block hidden">Manage Task</span>
                        </motion.li>
                    </NavLink>
                    <NavLink to={"/management/add-task"} className={"w-full"}>
                        <motion.li
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9 }}
                            className="flex items-center gap-3 pt-6 w-full"
                        >
                            <FaPlus className="text-2xl"></FaPlus>{" "}
                            <span className="lg:block hidden">
                                Add New Task
                            </span>
                        </motion.li>
                    </NavLink>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className="w-full border-0 mb-6">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex gap-2 items-center"
                    >
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
                                        className="right-0 z-50 bg-white w-28 border-0 font-medium "
                                        label=""
                                        dismissOnClick={false}
                                        renderTrigger={() => (
                                            <span>
                                                <BsThreeDotsVertical />
                                            </span>
                                        )}
                                    >
                                        <Dropdown.Item className="bg-white inline w-28 text-red-500">
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
                                        <Dropdown.Item className="bg-white inline ">
                                            Log Out
                                        </Dropdown.Item>
                                    </Dropdown>
                                </button>
                            </div>
                        </span>
                    </motion.span>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default SidebarNav;
