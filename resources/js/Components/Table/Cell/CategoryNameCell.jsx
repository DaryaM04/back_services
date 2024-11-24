import React from 'react';

const CategoryNameCell = ({value, row, column}) => {
  const image = row.values.image;

  const actionName = column.actionName;
  const action = row.values.rowActions?.find(e => e.name === actionName);
  const actionFn = action?.action;
  const actionDisabled = !!action.disabled;

  const invokeAction = () => {
    if (!actionDisabled && typeof actionFn === "function" ) {
      actionFn(row);
    }
  }

  return (
    <a className={`break-all ${ actionName && !actionDisabled ? 'cursor-pointer' : ''}`} onClick={invokeAction}>
      <div className={`flex items-center h-full`} style={{paddingInlineStart: row.depth*32}}>
          { image ? (
            <div className="flex-shrink-0 h-7 w-7 mr-4">
              <img className="h-7 w-7 rounded-full object-cover" src={image} alt=""/>
            </div>
          ) : null}
          <div className="flex-shrink-1">
            <div className={` ${ actionName && !actionDisabled ? 'text-indigo-600 hover:text-indigo-900' : ''}`}>{value}</div>
          </div>
      </div>
    </a>
  );
};

export default CategoryNameCell;
