import {clsx} from "clsx";

export default function TableActionsContainer({className, ...props}) {
    return (
        <div className={clsx(className, "flex gap-4 justify-end pb-2")} {...props}/>
    )
}
