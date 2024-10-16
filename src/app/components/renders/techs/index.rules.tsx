import { useState } from "react";

const useTechs = () => {

    const [ getType, setType ] = useState("tech");

    const handleType = () => {
        setType(prevType => (prevType === "tech" ? "tool" : "tech"));
    };

    return {
        getType,
        handleType
    };
};

export default useTechs;