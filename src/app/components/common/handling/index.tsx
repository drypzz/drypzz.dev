import useChristmas from "@/app/hooks/useChristmas";

import "./index.style.css";

const HandlingEmoji = () => {

    const isChristmas = useChristmas();

    return (
        <>        
            <span className="dev-emoji">{isChristmas ? "🎄" : "👋"}</span>
        </>
    );
};

export default HandlingEmoji;