"use client";

import { useState, useEffect } from "react";

export const useSeason = () => {
    const [isChristmas, setIsChristmas] = useState(false);

    useEffect(() => {
        const now = new Date();
        const month = now.getMonth();
        const day = now.getDate();

        const isDec = month === 11;
        const isChristmasRange = day >= 1 && day <= 26;

        if (isDec && isChristmasRange) {
            setIsChristmas(true);
            document.body.classList.add("christmas-theme");
        } else {
            setIsChristmas(false);
            document.body.classList.remove("christmas-theme");
        }
    }, []);

    return { isChristmas };
};