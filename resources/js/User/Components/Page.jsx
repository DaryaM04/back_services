import React from "react";
import {clsx} from "clsx";

export function Page({ children, className, ...props }) {
    return (
        <main className={clsx(className, `w-full h-fit`)} {...props}>
            <div className="shadow bg-white px-4 pt-1 pb-4 rounded-xl border-b border-gray-200 sm:px-6 h-full min-h-[85vh]">
                {children}
            </div>
        </main>
    );
}
