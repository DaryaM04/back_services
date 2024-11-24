import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline/index.js";
import React from "react";

export const ActiveItem = ({isActive, onChange}) => {
    return (
        <button onClick={() => onChange(!isActive)} className={'w-6 h-6 rounded-full '}>
            {isActive ? <EyeIcon className={'text-primary'}/> : <EyeSlashIcon className={'text-slate-600'}/>}
        </button>
    )
}
