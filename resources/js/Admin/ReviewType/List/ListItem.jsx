import React from "react";

export const ListItem = ({children}) => {
    return (
        <li className="px-6 py-4 flex gap-3 items-center">
            {children}
        </li>
    )
}
