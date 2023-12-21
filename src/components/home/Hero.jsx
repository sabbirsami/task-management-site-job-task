import { Link, NavLink, useNavigate } from "react-router-dom";
import banner from "../../assets/banner.png";
import { useContext, useState } from "react";
import { Modal } from "flowbite-react";
import { AuthContext } from "../auth/AuthProvider";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Hero = () => {
    const { user, signInWithGoogle, signInUser } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [googleButtonLoading, setGoogleButtonLoading] = useState(false);
    const [signInWithGoogleError, setSignInWithGoogleError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const handleSignInWithGoogle = () => {
        setGoogleButtonLoading(true);

        signInWithGoogle()
            .then((result) => {
                console.log(result);
                navigate("/management");
                setGoogleButtonLoading(false);
            })
            .catch((err) => {
                setSignInWithGoogleError(
                    err.message?.split("(")[1]?.split("-").join(" ")
                );
                console.log(signInWithGoogleError);
                setGoogleButtonLoading(false);
                toast.error(" Sign In fail", {
                    duration: 2000,
                    className: "mt-32",
                });
            });
    };
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        signInUser(email, password)
            .then((res) => {
                console.log(res);
                navigate("/management");
            })
            .catch((err) => console.log(err));
    };
    return (
        <section className="w-full backdrop-blur-2xl">
            {/* login modal  */}
            <Modal
                className="backdrop-blur-xl shadow-xl"
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header className="px-14 pt-6">
                    <p className="ps-2">Login</p>
                </Modal.Header>
                <Modal.Body>
                    <div className="pb-10 px-10 pt-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                                <label htmlFor="email" className="text-sm">
                                    Your Email
                                </label>
                                <input
                                    {...register("email", {
                                        required: true,
                                    })}
                                    type="email"
                                    className="w-full mt-1 rounded-md bg-slate-100 border-0 p-3"
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.email && (
                                        <span>First Name is required *</span>
                                    )}
                                </label>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="email" className="text-sm">
                                    Password
                                </label>
                                <input
                                    {...register("password", {
                                        required: true,
                                    })}
                                    type="password"
                                    className="w-full mt-1 rounded-md bg-slate-100 border-0 p-3"
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.password && (
                                        <span>First Name is required *</span>
                                    )}
                                </label>
                            </div>
                            <button
                                className="w-full py-3 mt-4 bg-[#6CF2C0] rounded-md"
                                type="submit"
                            >
                                Login
                            </button>
                        </form>
                        <div className="mt-6">
                            <p className="text-center">
                                Don&#39;t have any account?{" "}
                                <Link
                                    onClick={() => setOpenModal(false)}
                                    to={"/register"}
                                    className="text-[#31a379]"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleSignInWithGoogle}
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 py-3 border border-primaryColor  rounded-md text-dark"
                            >
                                {googleButtonLoading ? (
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-green-400"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center gap-3">
                                        <FcGoogle className="text-2xl"></FcGoogle>
                                        <span>Sign in with Google</span>
                                    </span>
                                )}
                            </button>
                            <div className="text-center">
                                <label className="block w-full text-sm text-red-600">
                                    {signInWithGoogleError}
                                </label>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="container mx-auto px-6">
                <h2 className="xl:text-7xl lg:text-7xl md:text-5xl text-2xl font-bold max-w-4xl text-center mx-auto pt-20 pb-6">
                    Make Your Management Way More Easier Then Ever
                </h2>
                <p className=" max-w-3xl text-center mx-auto  md:pb-10 pb-6 opacity-80 md:text-base text-sm">
                    Boost productivity with TaskTo., the ultimate task
                    management solution. Effortlessly organize, prioritize, and
                    track tasks for seamless project success. Try it now for
                    streamlined efficiency!
                </p>
                <div className="text-center space-x-3 pb-20">
                    {user ? (
                        <button className="" onClick={() => setOpenModal(true)}>
                            <NavLink
                                to={"/management"}
                                className=" py-3 px-10 border rounded-full"
                            >
                                Let’s Explore
                            </NavLink>
                        </button>
                    ) : (
                        <button className="" onClick={() => setOpenModal(true)}>
                            <span className=" py-3 px-10 border rounded-full">
                                Let’s Explore
                            </span>
                        </button>
                    )}
                </div>
            </div>
            <div className="border-b mb-20 ">
                <img
                    src={banner}
                    className="container mx-auto shadow-xl"
                    alt=""
                />
            </div>
        </section>
    );
};

export default Hero;
