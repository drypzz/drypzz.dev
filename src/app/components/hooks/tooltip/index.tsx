import React from "react";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface TooltipProps {
  id: string;
  content: string;
  children: React.ReactNode;
}

const CustomTooltip = ({ id, content, children }: TooltipProps) => {
    return (
        <>
            <div data-tooltip-id={id} data-tooltip-content={content}>
                {children}
            </div>
            <Tooltip
                id={id}
                arrowColor="rgba(3, 126, 219, 0.4)"
                style={{
                    backgroundColor: "rgba(3, 126, 219, 0.4)",
                    borderRadius: "5px",
                    textTransform: "capitalize",
                    color: "white",
                }}
            />
        </>
    );
};

export default CustomTooltip;