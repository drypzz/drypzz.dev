"use client";

import SkewLoader from "react-spinners/SkewLoader";
import useChristmas from "@/app/hooks/useChristmas";
import "./index.style.css";

const Loading = () => {
    const { primaryColor } = useChristmas();

    return (
        <>
            <div className="dev-loading">
                <SkewLoader color={primaryColor} loading size={50} />
            </div>
        </>
    );
};

export default Loading;