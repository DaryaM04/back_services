import React from "react";

export function ValueCell({children}) {
    // rounded-r-lg rtl:rounded-l-lg rtl:rounded-r-none
    return (
        <div className={'p-5 [&:nth-child(4n+2)]:bg-gray-50 rounded-e-lg'}>
            {children}
        </div>
    )
}
