import {clsx} from "clsx";

export default function Comment({className, ...props}) {
    return (
        <textarea className={clsx('w-full rounded-md border-gray-300 shadow-sm', className)}
                  {...props}
        />
    )
}
