import { useState, useEffect } from 'react';

const useChristmas = () => {
    const [isChristmas, setIsChristmas] = useState<boolean>(false);

    useEffect(() => {
        const checkChristmasDay = () => {
            const today = new Date();
            const start = new Date(today.getFullYear(), 10, 29);
            const end = new Date(today.getFullYear(), 11, 29);

            return today >= start && today <= end;
        };

        setIsChristmas(checkChristmasDay());
    }, []);

    return {
        isChristmas,
        primaryColor: isChristmas ? "#d42426" : "#037edb"
    };
};

export default useChristmas;