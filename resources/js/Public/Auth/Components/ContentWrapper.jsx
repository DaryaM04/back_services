import {clsx} from "clsx";

export const ContentWrapper = ({children, className, ...props}) => {
    return (
        <div {...props} className={clsx(className, 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-[28px]')}>
            {children}
        </div>
    )
}
