import {clsx} from "clsx";

export function Image({className, ...props}) {
    return (
        <img {...props}
             className={clsx(className, "w-full lg:max-w-none lg:w-auto lg:h-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute")}
        />
    )
}

export function RightImageWrapper({children}) {
    return (
        <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-2 lg:rtl:col-start-1">
            <div className="lg:px-0 lg:m-0 lg:relative lg:h-full sm:ps-6 md:-me-16 ps-4 -me-48">
                {children}
            </div>
        </div>
    )
}

export function LeftImageWrapper({children}) {
    return (
        <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1 lg:rtl:col-start-2">
            <div className="lg:px-0 lg:m-0 lg:relative lg:h-full sm:pe-6 md:-ms-16 pe-4 -ms-48">
                {children}
            </div>
        </div>
    )
}
