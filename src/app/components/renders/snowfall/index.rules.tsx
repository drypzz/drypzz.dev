"use client";

import { useState, useEffect } from 'react';

const useSnowFall = () => {

    const [getChristmasDay, setChristmasDay] = useState<boolean>(false);

    const checkChristmasDay = () => {
        const today = new Date();
        const christmasDay = new Date(today.getFullYear(), 5, 15);
        const christmasDayEnd = new Date(today.getFullYear(), 11, 29);

        const result = today >= christmasDay && today <= christmasDayEnd;

        return result;
    };

    useEffect(() => {
        setChristmasDay(checkChristmasDay());
    }, [getChristmasDay]);

    return {
        getChristmasDay
    };
};

export default useSnowFall;
