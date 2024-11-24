import {clsx} from "clsx";

export function Text({className, ...props}) {
    return (
        <div {...props}
             className={clsx("px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0", className)}/>
    )
}
