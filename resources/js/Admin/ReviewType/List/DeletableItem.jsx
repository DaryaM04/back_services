import {MinusIcon} from "@heroicons/react/20/solid/index.js";
import React from "react";

export const DeletableItem = ({onDelete}) => {
    return (
        <button onClick={onDelete}
                className={'w-6 h-6 rounded-full text-error'}>
            <MinusIcon/>
        </button>
    )
}
