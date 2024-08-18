import SkewLoader from "react-spinners/SkewLoader";

import "./index.style.css";

const Loading = () => {
    return (
        <>
            <div className="dev-loading">
                <SkewLoader color={"#037edb"} loading size={50} />
            </div>
        </>
    );
};

export default Loading;