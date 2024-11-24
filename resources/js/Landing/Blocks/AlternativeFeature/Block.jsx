import {clsx} from "clsx";

export function Block({className, ...props}) {
    return (
        <div {...props}
             className={clsx("lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24", className)}/>
    )
}
