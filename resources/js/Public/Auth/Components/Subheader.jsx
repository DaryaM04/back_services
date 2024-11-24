import React from "react";
import {clsx} from "clsx";

export const Subheader = ({children, className, ...props}) => {
    return (
        <div {...props} className={clsx(className, 'mb-6 font-normal text-gray-500 text-center')}>
            {children}
        </div>
    )
}
