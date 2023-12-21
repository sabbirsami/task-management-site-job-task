import { Link } from "react-router-dom";
import errorImage from "../../../assets/error.svg";

const ErrorPage = () => {
    return (
        <section className=" flex items-center justify-center h-screen bg-white">
            <div className="">
                <h2 className="text-4xl">This page is lost in tasks!</h2>
                <p className="">
                    We can&#39;t find what you&#39;re looking for
                </p>
                <div className="mt-6">
                    <Link to={"/"} className="border py-3 px-6 bg-green-300">
                        Back to home
                    </Link>
                </div>
                <img className="w-[36rem]" src={errorImage} alt="" />
            </div>
        </section>
    );
};

export default ErrorPage;
