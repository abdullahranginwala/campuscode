import MainHeading from "../components/MainHeading";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../App";
import Loading from "../components/Loading";

const LandingPage = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [username, setUsername] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [verifiedCertain, setVerifiedCertain] = useState<boolean>(false);
    useEffect(() => {
        if (!id) {
            setVerified(false);
            setVerifiedCertain(true);
        }
        axios
            .get(`${API_URL}/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setVerified(true);
                setVerifiedCertain(true);
            })
            .catch((e: AxiosError) => {
                setVerified(false);
                setVerifiedCertain(true);
            });
    }, []);
    return (
        <div className="text-[14px] overflow-hidden h-screen">
            {verifiedCertain && verified ? (
                <MainHeading
                    data={{
                        username: username,
                        status: "loggedin",
                    }}
                />
            ) : verifiedCertain === true && verified === false ? (
                <MainHeading
                    data={{
                        status: "not-loggedin",
                    }}
                />
            ) : (
                <MainHeading
                    data={{
                        status: "none",
                    }}
                />
            )}
            {verifiedCertain && verified ? (
                <>
                    <h1 className="absolute text-[38px] md:text-[48px] mx-auto text-center font-bold mt-[100px] z-50 inset-0 top-[100px]">
                                Welcome back {username}!
                    </h1>
                    <p className="absolute md:w-1/2 w-3/4 text-center mx-auto mt-[50px] z-50 inset-0 md:top-[300px] top-[400px]">
                        Ready to conquer complex challenges? Explore our Problem
                        List now!
                    </p>
                    <div className="absolute md:top-[450px] top-[550px] left-1/2 -translate-x-1/2 z-50">
                        <Link
                            to="/problemset"
                            className="relative ml-[8px] font-bold inline-block bg-gradient-to-r from-sky-400 to-sky-400 rounded-md text-black text-[18px] hover:bg-red-800"
                        >
                            <div className="w-full h-full bg-black text-white py-[6px] px-[16px] rounded-[6px] border border-black hover:bg-[#00000000] hover:border-[#00000000] hover:text-black transition active:bg-sky-400">
                                Problem List
                            </div>
                        </Link>
                    </div>
                </>
            ) : verifiedCertain === true && verified === false ? (
                <>
                    <h1 className="absolute text-[38px] md:text-[48px] mx-auto text-center font-bold mt-[100px] z-50 inset-0 top-[100px]">
                        Welcome to CodeCampus
                    </h1>
                    <p className="absolute md:w-1/2 w-3/4 text-center mx-auto mt-[50px] z-50 inset-0 top-[300px]">
                        Please login or signup to continue.
                    </p>
                    <div className=" absolute top-[500px] left-1/2 -translate-x-1/2 z-50">
                        <Link
                            to="/signup"
                            className=" relative ml-[8px] font-bold inline-block bg-gradient-to-r from-orange-500 to-red-600 rounded-md text-black text-[18px] hover:bg-red-800"
                        >
                            <div className="w-full h-full bg-black text-white py-[6px] px-[16px] rounded-[6px] border border-black hover:bg-[#00000000] hover:border-[#00000000] hover:text-black transition active:bg-red-700">
                                Get Started
                            </div>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-[120]">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default LandingPage;
