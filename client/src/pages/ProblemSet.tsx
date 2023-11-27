import { useState } from "react";
import CustomNavbar from "../components/CustomNavbar";
import ProblemList from "../components/ProblemList";
import MainHeading from "../components/MainHeading";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";

const ProblemSet = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [username, setUsername] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const navigate = useNavigate();
    const [problemListData, setProblemListData] = useState();

    useEffect(() => {
        axios
            .get(`${API_URL}/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setVerified(true);
            })
            .catch((e: AxiosError) => {
                console.log(e);
                navigate("/sorry");
                setVerified(false);
            });

        axios
            .post(`${API_URL}/api/problem/all`, { id: id })
            .then(({ data }) => {
                setProblemListData(data);
            });
    }, []);

    return (
        <>
            {verified ? (
                <MainHeading data={{ username: username }} />
            ) : (
                <MainHeading data={{ status: "none" }} />
            )}

            <div className="h-[calc(100vh-60px)] overflow-hidden bg-black">
                <div
                    id="cont"
                    className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-black border border-borders ml-[8px] rounded-lg w-[calc(100%-16px)] overflow-hidden"
                    >
                        <div>
                            <ProblemList
                                data={problemListData as any}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemSet;
