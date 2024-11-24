import React from "react";
import {clsx} from "clsx";

export const Header = ({children, className, ...props}) => {
    return (
        <h1 {...props} className={clsx(className, "text-4xl font-extrabold leading-10 mb-4 text-center")}>
            {children}
        </h1>
    )
}
