import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerImage from "../../assets/banner-03.png";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "./AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../../firebase.config";

const Register = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [googleButtonLoading, setGoogleButtonLoading] = useState(false);
    const [signInWithGoogleError, setSignInWithGoogleError] = useState("");
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setButtonLoading(true);
        const firstName = data.firstName;
        const lastName = data.lastName;
        const photoUrl = data.photoUrl;
        const name = firstName + " " + lastName;
        console.log(name, photoUrl);
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then((result) => {
                console.log(result);
                setSignInWithGoogleError("");
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoUrl,
                })
                    .then(() => {
                        toast.success("Successfully Register", {
                            duration: 2000,
                            className: "mt-32",
                        });
                    })
                    .catch((err) => {
                        // An error occurred
                        setSignInWithGoogleError(
                            err.message?.split("(")[1]?.split("-").join(" ")
                        );
                        setButtonLoading(false);
                        toast.error(" Register fail", {
                            duration: 2000,
                            className: "mt-32",
                        });
                    });
            })
            .catch((err) => {
                console.log(err.message);

                setSignInWithGoogleError(
                    err.message?.split("(")[1]?.split("-").join(" ")
                );
                setButtonLoading(false);
                console.log(signInWithGoogleError);
                toast.error(" Register fail", {
                    duration: 2000,
                    className: "mt-32",
                });
            });
    };
    const validatePassword = (value) => {
        if (!/(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/.test(value)) {
            return "Password must have at least 1 uppercase letter, 1 special character, 1 number, and be at least 8 characters long.";
        }
        return true;
    };
    // Sign In With Google
    const handleSignInWithGoogle = () => {
        setGoogleButtonLoading(true);
        signInWithGoogle()
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
                setSignInWithGoogleError(
                    err.message?.split("(")[1]?.split("-").join(" ")
                );
                setGoogleButtonLoading(false);
                toast.error(" Register fail", {
                    duration: 2000,
                    className: "mt-32",
                });
            });
    };
    return (
        <div className="auth-section mb-20 border-b">
            <div className="max-w-6xl mx-auto px-6 mt-16 ">
                <h2 className="text-4xl text-center font-bold pb-8 pt-4">
                    Register
                </h2>
                <div className=" rounded-t-xl lg:px-16 md:px-8 lg:py-16 p-6  shadow-md bg-[#0a0f1b]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" flex lg:flex-col xl:flex-row flex-col justify-between gap-6">
                            <div className="grow">
                                <label
                                    htmlFor="firstName"
                                    className="block md:w-64 w-full pb-2 font-semibold"
                                >
                                    First Name{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    {...register("firstName", {
                                        required: true,
                                    })}
                                    className=" rounded-md w-full py-3 border-0 px-2 bg-[#303644]"
                                    placeholder="Enter first name here.."
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.firstName && (
                                        <span>First Name is required *</span>
                                    )}
                                </label>
                            </div>
                            <div className="">
                                <label
                                    htmlFor="lastName"
                                    className="block w-full pb-2 font-semibold"
                                >
                                    Last Name{" "}
                                    <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    {...register("lastName", {
                                        required: true,
                                    })}
                                    className=" border-0 rounded-md w-full py-3 px-2 bg-[#303644]"
                                    placeholder="Enter last name here.."
                                />
                                {/* error message */}
                                <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                                    {errors.lastName && (
                                        <span>Last Name is required *</span>
                                    )}
                                </label>
                            </div>
                        </div>
                        <label
                            htmlFor="email"
                            className="block lg:w-96 md:w-72 w-full pb-2 font-semibold mt-6"
                        >
                            Your Email <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            {...register("email", { required: true })}
                            className=" border-0 rounded-md w-full py-3 px-4 bg-[#303644]"
                            placeholder="Enter email here.."
                        />
                        {/* error message */}
                        <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                            {errors.email && (
                                <span>{errors.email?.message}</span>
                            )}
                            {errors.email?.type === "required" &&
                                "Email is required *"}
                        </label>

                        <label
                            htmlFor="email"
                            className="block lg:w-96 md:w-72 w-full pb-2 font-semibold mt-6"
                        >
                            Photo URL <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="email"
                            {...register("photoUrl", {
                                required: true,
                            })}
                            className=" border-0 rounded-md w-full py-3 px-4 bg-[#303644]"
                            placeholder="Enter photo url.."
                        />
                        {/* error message */}
                        <label className="block md:w-64 w-full  text-sm text-[#d63031] pt-1">
                            {errors.photoUrl && (
                                <span>Photo URL is required *</span>
                            )}
                        </label>

                        <label
                            htmlFor="password"
                            className="block w-full pb-2  pt-8 font-semibold"
                        >
                            Password <span className="text-red-600">*</span>
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="password"
                                    className="r border-0 rounded-md w-full py-3 px-4 bg-[#303644]"
                                    placeholder="Enter password here.."
                                    {...field}
                                />
                            )}
                            rules={{
                                required: "Password is required",
                                validate: validatePassword,
                            }}
                        />
                        {/* error message */}
                        <label className="block  w-full  text-sm text-[#d63031] pt-1">
                            {errors.password && (
                                <span>{errors.password?.message}</span>
                            )}
                            {errors.password?.type === "required" &&
                                "Password is required *"}
                        </label>

                        <label className="block w-full text-sm text-red-600">
                            {signInWithGoogleError.split(")")}
                        </label>

                        <label className="block md:w-64 w-full  text-sm text-red-600">
                            {/* {alreadyUsedEmailMessage} */}
                        </label>

                        <button
                            type="submit"
                            className="w-full mt-8 py-3 hover:shadow-md  rounded-md bg-gradient-to-r overflow-x-hidden  from-[#94f3b0] to-[#7abf88] text-black font-semibold"
                        >
                            {buttonLoading ? (
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <span>Register</span>
                            )}
                        </button>
                    </form>
                    <div className="py-6 grid grid-cols-3 items-center ">
                        <div className="h-0.5 bg-[#303644]"></div>
                        <div className="">
                            <p className="text-center">OR </p>
                        </div>
                        <div className="h-0.5 bg-[#303644]"></div>
                    </div>
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
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <span className="flex items-center justify-center gap-3">
                                <FcGoogle className="text-2xl"></FcGoogle>
                                <span>Register with Google</span>
                            </span>
                        )}
                    </button>
                    <div className="">
                        <p className=" pt-6">
                            Don&#39;t have any account?{" "}
                            <Link
                                className="underline text-[#94f3b0] ps-2"
                                to={"/sign-in"}
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
