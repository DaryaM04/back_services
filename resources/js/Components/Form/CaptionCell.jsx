import React from "react";

export function CaptionCell({children}) {
    // rounded-l-lg rtl:rounded-r-lg rtl:rounded-l-none
    return (
        <div className={'px-5 pt-6 [&:nth-child(4n+1)]:bg-gray-50 rounded-s-lg '}>
            {children}
        </div>
    )
}
