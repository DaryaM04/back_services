import React from "react";
import BlackTooltip from "../../Tooltip";
import {useTranslation} from "react-i18next";

const BooleanCell = ({ value, column }) => {
  const { t } = useTranslation(['common']);

  let tooltip = '';
  if(column?.tooltip) {
    tooltip = column.tooltip;

    if (typeof(column.tooltip) === 'function') {
      tooltip = column.tooltip(value);
    }
  }
  return ( 
    tooltip ? 
      <BlackTooltip tooltip={tooltip} className={`px-2 m-auto max-h-6 justify-center inline-flex text-xs leading-5 font-semibold rounded-full ${
        Number(value) === 1 ? "bg-green-100" : "bg-red-100"
      } ${Number(value) === 1 ? "text-green-800" : "text-red-800"}`}>
        <span>
          {Number(value) === 1 ? t('common:yes') : ""}
        </span>
      </BlackTooltip> 
    :
      <span
      className={`px-2 m-auto max-h-6 justify-center inline-flex text-xs leading-5 font-semibold rounded-full ${
        Number(value) === 1 ? "bg-green-100" : "bg-red-100"
      } ${Number(value) === 1 ? "text-green-800" : "text-red-800"}`}
    >
      {Number(value) === 1 ? t('common:yes') : ""}
    </span>
  );
};

export default BooleanCell;
