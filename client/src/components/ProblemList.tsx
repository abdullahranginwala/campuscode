import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { kebabToSpacedPascal } from "../ts/utils/string";
import Loading from "./Loading";
import SortIcon from "./SortIcon";
import StarIcon from "./StarIcon";
import Tooltip from "./Tooltip";

const ProblemList = ({
    data
}: {
    data: ProblemListData[];
}) => {
    const [refReset, setRefReset] = useState<number>(0);
    const statusRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const acceptanceRef = useRef<HTMLDivElement>(null);
    const difficultyRef = useRef<HTMLDivElement>(null);
    const likesRef = useRef<HTMLDivElement>(null);
    const dislikesRef = useRef<HTMLDivElement>(null);
    const starRef = useRef<HTMLDivElement>(null);


    const statusWidth = starRef.current?.clientWidth;
    const acceptanceWidth = acceptanceRef.current?.clientWidth;
    const difficultyWidth = difficultyRef.current?.clientWidth;
    const likesWidth = likesRef.current?.clientWidth;
    const dislikesWidth = dislikesRef.current?.clientWidth;
    const starWidth = starRef.current?.clientWidth;

    useEffect(() => {
        setRefReset(1);
    }, []);

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-row w-full text-[14px] h-[40px] items-center text-[#808080] border-b border-borders select-none">
                    <div
                        id="status-label"
                        className="h-fit w-fit px-[20px] ml-[10px]"
                        ref={statusRef}
                    >
                        Status
                    </div>
                    <div
                        id="title-label"
                        className="h-fit flex-grow px-[20px] hover:text-white hover:cursor-pointer transition"
                        ref={titleRef}
                    >
                        Title
                    </div>
                    <div
                        id="accaptance-label"
                        className="h-fit w-fit px-[20px] hover:text-white hover:cursor-pointer transition"
                        ref={acceptanceRef}
                    >
                        Acceptance
                    </div>
                    <div
                        id="difficulty-label"
                        className="h-fit w-fit px-[20px] hover:cursor-pointer hover:text-white transition"
                        ref={difficultyRef}
                    >
                        Difficulty
                    </div>
                    <div
                        id="likes-label"
                        className="h-fit w-fit px-[20px]"
                        ref={likesRef}
                    >
                        Likes
                    </div>
                    <div
                        id="dislikes-label"
                        className="h-fit w-fit px-[20px]"
                        ref={dislikesRef}
                    >
                        Dislikes
                    </div>
                    <div
                        id="star-label"
                        className="h-fit w-fit px-[20px]"
                        ref={starRef}
                    >
                        Star
                    </div>
                </div>
                {data != undefined &&
                data.length !== 0 &&
                statusRef.current != null ? (
                    <>
                        {data.map(({ main }) => (
                            <div
                                className={`h-[40px] w-full text-[14px] hover:text-black duration-150 ${
                                    main.difficulty === "easy"
                                        ? "hover-easy-bg-color"
                                        : main.difficulty === "medium"
                                        ? "hover-medium-bg-color"
                                        : "hover-hard-bg-color"
                                } `}
                            >
                                <Link
                                    to={`/problem/${main.name}`}
                                    className="w-full h-[40px] flex flex-row whitespace-nowrap "
                                >
                                    <div
                                        style={{
                                            width: statusWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        <div
                                            className={`ml-[20px] relative`}
                                            style={{
                                                color:
                                                    main.status === "solved"
                                                        ? "#22c55e"
                                                        : main.status === "none"
                                                        ? "#808080"
                                                        : "#f97316",
                                            }}
                                        >
                                            {main.status === "solved" ? (
                                                <i
                                                    className="bi bi-check-circle status-color"
                                                    // style={{ color: "#22c55e" }}
                                                ></i>
                                            ) : main.status === "attempted" ? (
                                                <Tooltip
                                                    text="Attempted"
                                                    style={{
                                                        height: "28px",
                                                        lineHeight: "12px",
                                                        fontSize: "14px",
                                                        marginTop: "6px",
                                                        marginLeft: "-20px",
                                                        color: "white",
                                                        backgroundColor:
                                                            "black",
                                                        zIndex: "140",
                                                        padding: "8px 12px",
                                                        borderRadius: "4px",
                                                        border: "1px solid var(--borders-color)",
                                                    }}
                                                >
                                                    <i
                                                        className="bi bi-x-circle status-color "
                                                        // style={{ color: "#f97316" }}
                                                    ></i>
                                                </Tooltip>
                                            ) : (
                                                <div className="border rounded-[99px] border-[#808080] w-[14px] h-[14px] mt-[13px] status-color"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="flex-grow "
                                        style={{
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[40px]">
                                            {main.id +
                                                ". " +
                                                kebabToSpacedPascal(main.name)}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: acceptanceWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[20px]">
                                            {main.acceptance_rate_count}
                                            {"%"}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: difficultyWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div
                                            className={`ml-[20px] difficulty-text duration-150 ${
                                                main.difficulty === "easy"
                                                    ? "text-green-500"
                                                    : main.difficulty ===
                                                      "medium"
                                                    ? "text-orange-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {kebabToSpacedPascal(
                                                main.difficulty
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: likesWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[20px]">
                                            {main.like_count}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: dislikesWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[20px]">
                                            {main.dislike_count}
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: starWidth,
                                            height: "40px",
                                            lineHeight: "40px",
                                        }}
                                    >
                                        <div className="ml-[20px] relative h-full">
                                            {main.is_starred ? (
                                                <div className="absolute top-1/2 -translate-y-1/2 left-0">
                                                    <StarIcon
                                                        data={{
                                                            is_filled: true,
                                                            width: "14px",
                                                            height: "14px",
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="absolute top-1/2 -translate-y-1/2 left-0">
                                                    <StarIcon
                                                        data={{
                                                            is_filled: false,
                                                            width: "14px",
                                                            height: "14px",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </>
                ) : data != undefined && data.length === 0 ? (
                    <div className="text-[14px] ml-[30px] text-red-600 h-[40px] leading-[40px]">
                        Problem not found
                    </div>
                ) : (
                    <Loading For="pList" />
                )}
            </div>
        </div>
    );
};

export default ProblemList;
