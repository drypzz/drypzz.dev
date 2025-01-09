"use client";

import React from "react";

import Snowfall from "react-snowfall";

import useSnowFall from "./index.rules";

const SnowfallComponent = () => {

    const { getChristmasDay } = useSnowFall();

    if (!getChristmasDay) {
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