// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { RxCross1 } from "react-icons/rx";
import logo from "../../../assets/logo.png";
import { useContext, useState } from "react";
// import { AuthContext } from "../../auth/AuthProvider";

function Navbar() {
    // const { user, signOutUser } = useContext(AuthContext);
    const [hide, setHide] = useState(false);
    // const handleSignOut = () => {
    //     signOutUser();
    // };
    const isAdmin = false;
    const navItem = [
        <li key={1}>
            <NavLink className=" p-4" to={"/"}>
                Home
            </NavLink>
        </li>,

        <li key={1}>
            <NavLink className=" p-4" to={"/contact"}>
                Contact
            </NavLink>
        </li>,
        <li key={2}>
            <NavLink className=" p-4" to={"/about"}>
                About
            </NavLink>
        </li>,
        <li key={3}>
            <NavLink className=" p-4" to={"/faq"}>
                FAQ
            </NavLink>
        </li>,
        <li key={4}>
            <NavLink className=" py-3 px-7 border rounded-full" to={"/task"}>
                Get Started
            </NavLink>
        </li>,

        // <li key={1}>
        //     {user ? (
        //         <div
        //             className={`py-1 px-2 flex gap-2 rounded-full items-center border`}
        //         >
        //             <p className="ps-1">{user.displayName.split(" ")[0]}</p>
        //             <div className="dropdown dropdown-end">
        //                 <label
        //                     tabIndex={0}
        //                     className="btn btn-ghost btn-circle avatar"
        //                 >
        //                     <div className="w-10 rounded-full">
        //                         <img src={user.photoURL} />
        //                     </div>
        //                 </label>
        //                 <ul
        //                     tabIndex={0}
        //                     className="menu menu-lg dropdown-content mt-3 z-[1]  p-1 shadow bg-secondaryColor hover:shadow-md rounded-box w-24"
        //                 >
        //                     <p className="text-center py-1 font-bold ">
        //                         <button onClick={handleSignOut}>
        //                             Sign Out
        //                         </button>
        //                     </p>
        //                 </ul>
        //             </div>
        //         </div>
        //     ) : (
        //         <NavLink className={"p-4"} to={"/sign-in"}>
        //             Sign In
        //         </NavLink>
        //     )}
        // </li>,
    ];
    const adminNav = [
        <li key={4}>
            <NavLink className=" p-4" to={"/dashboard"}>
                Dashboard
            </NavLink>
        </li>,
    ];
    return (
        <div className="relative z-50">
            <div className="container navbar-menu mx-auto px-6">
                <div className="flex justify-between items-center py-7">
                    {/* logo */}
                    <div className="">
                        <img className="w-36" src={logo} alt="" />
                    </div>
                    {/* menu section */}
                    <nav className="flex">
                        <ul className="lg:flex items-center hidden">
                            {isAdmin
                                ? adminNav
                                : navItem.map((item, idx) => (
                                      <span key={idx}>{item}</span>
                                  ))}
                        </ul>
                        <ul className="">
                            <button onClick={() => setHide(!hide)}>
                                <SlMenu className="text-2xl mx-4 lg:hidden block" />
                            </button>
                            {/* mobile device */}
                            {hide && (
                                <div className="fixed">
                                    <div className="h-[110vh]  border w-80 absolute -top-20 -right-24 p-10 flex flex-col gap-y-8 justify-between items-center bg-black/90 backdrop-blur-sm">
                                        <div className="flex flex-col gap-16 w-full">
                                            <button
                                                onClick={() => setHide(!hide)}
                                                className="text-end ms-auto mt-6"
                                            >
                                                <RxCross1 className="text-end text-white  text-3xl" />
                                            </button>
                                            <ul className="flex flex-col items-start gap-y-10 text-white">
                                                {navItem.map((item, idx) => (
                                                    <span key={idx}>
                                                        {item}
                                                    </span>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
Navbar.propTypes = {};
