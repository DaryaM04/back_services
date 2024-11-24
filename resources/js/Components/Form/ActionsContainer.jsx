import React from "react";
import { clsx } from 'clsx';

export const ActionsContainer = ({className, ...props}) => {
    return (
        <div {...props} className={clsx('mt-10 mb-10 flex gap-3 justify-end', className)}/>
    )
}
