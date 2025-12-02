"use client";
import React from "react";

import Snowfall from "react-snowfall";

import useChristmas from "@/app/hooks/useChristmas";

const SnowfallComponent = () => {
    const { isChristmas } = useChristmas();

    if (!isChristmas) {
        return null;
    };

    return (
        <Snowfall 
            snowflakeCount={150}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                opacity: .5,
                userSelect: "none",
                pointerEvents: "none"
            }}
        />
    );
};

export default SnowfallComponent;