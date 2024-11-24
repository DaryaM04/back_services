import React from "react";

export function FormTable({children}) {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-[minmax(200px,420px)_auto]'}>
            {children}
        </div>
    )
}
