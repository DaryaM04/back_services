import {PlusIcon} from "@/Components/Icons/Icons.jsx";
import {clsx} from "clsx";
import {Link} from "@inertiajs/react";

export const PlusButton = ({className, href, ...props}) => {
  if (href) {
    return (
      <Link
        className={clsx('w-7 focus:outline-none h-7 md:w-10 md:h-10 rounded-full bg-primary hover:bg-primary-dark flex justify-center items-center focus:ring-2 ring-offset-2 ring-primary-dark', className)}
        href={href}
        {...props}
      >
        <PlusIcon className={'w-4 h-4 md:w-5 md:h-5'}/>
      </Link>
    )
  } else {
    return (
      <span
        className={clsx('w-7 h-7 focus:outline-none md:w-10 md:h-10 rounded-full bg-primary/60 flex justify-center items-center', className)}
        {...props}
      >
        <PlusIcon className={'w-4 h-4 md:w-5 md:h-5'}/>
      </span>
    )
  }
}
