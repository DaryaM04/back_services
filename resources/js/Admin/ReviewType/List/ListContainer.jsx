import React from "react";
import {clsx} from "clsx";

export const ListContainer = ({children, className, ...props}) => {
    return (
        <div className={clsx("bg-white border border-gray-300 overflow-hidden rounded-md", className)}>
            <ul role="list" className="divide-y divide-gray-300">
                {children}
            </ul>
        </div>
    )
}
