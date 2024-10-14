import { useEffect, useState } from "react";

import Images from "@/app/utils/image.props";

const useTechs = () => {
    const [techsAndTools, setTechsAndTools] = useState<Images[]>([]);

    useEffect(() => {
        const fetchTechsAndTools = async () => {
            try {
                const response = await fetch("/api/getImages");
                const data = await response.json();
                setTechsAndTools(data);
            } catch (error) {
                console.error("Failed to fetch techs and tools:", error);
            }
        };

        fetchTechsAndTools();
    }, []);

    return { techsAndTools };
};

export default useTechs;