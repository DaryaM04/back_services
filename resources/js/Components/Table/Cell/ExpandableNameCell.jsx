import React from "react";
import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/24/outline/index.js";

const ExpandableNameCell = ({value, row, column}) => {
    const actionName = column.actionName;
    const action = row.values.rowActions?.find(e => e.name === actionName);
    const actionFn = action?.action;
    const actionDisabled = !!action.disabled;

    const invokeAction = () => {
        if (!actionDisabled && typeof actionFn === "function") {
            actionFn(row);
        }
    }
    return (
        <a className={`break-all ${actionName && !actionDisabled ? 'cursor-pointer' : ''}`}>
            <div className={`flex items-center h-full`} style={{paddingInlineStart: row.depth * 32}}>
                {row.canExpand ? (
                    <span {...row.getToggleRowExpandedProps({})}>
                        {row.isExpanded ?
                            <ChevronDownIcon className="w-5 h-5 -ms-0.5 me-1 text-primary"/> :
                            <ChevronRightIcon className="w-5 h-5 -ms-1 me-1 text-primary rtl:scale-x-[-1]"/>}
                    </span>
                ) : null}
                <div className="flex-shrink-1" onClick={invokeAction}>
                    <div
                        className={` ${actionName && !actionDisabled ? 'text-indigo-600 hover:text-indigo-900' : ''}`}>{value}</div>
                </div>
            </div>
        </a>
    );
};

export default ExpandableNameCell;
