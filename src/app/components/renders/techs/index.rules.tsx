import { useEffect } from "react";

import useGlobal from "@/app/hook/global";

const useTechs = () => {

    const { 
        fetchTechsAndTools,
        techsAndTools
    } = useGlobal();

    useEffect(() => {
        fetchTechsAndTools();
    }, []);

    return {
        techsAndTools
    };
};

export default useTechs;