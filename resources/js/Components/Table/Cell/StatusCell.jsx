import React from "react";
import { useTranslation } from "react-i18next";
import BlackTooltip from "../../Tooltip";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/20/solid";

const StatusCell = ({ value, column }) => {
  let status = value;
  let text = "";
  let tooltip = '';
  if(column?.tooltip) {
    tooltip = column.tooltip;

    if (typeof(column.tooltip) === 'function') {
      tooltip = column.tooltip(value);
    }
  }

  const { t } = useTranslation(['common', 'admin']);
  const red = "bg-red-100 text-red-800";
  const green = "bg-green-100 text-green-800";
  const yellow = "bg-yellow-100 text-yellow-800";

  switch (status) {

  // RED
    case 'fail':
      status = t('common:statusFail');
      text = red;
      break;

    case 'blocked':
      status = t('userStatus.blocked');
      text = red;
      break;

    case 0:
    case false:
      status = t('userStatus.inactive');
      text = red;
      break;

    case "not_started":
      status = t('common:statusNotStarted');
      text = red;
      break;

  // YELLOW
    case "timer":
    case "in_progress":
      status = t('common:statusInProgress');
      text = yellow;
      break;
    case "pending":
      status = t('common:pending');
      text = yellow;
      break;

    case "await":
      status = t('admin:user.verified.await')
      text = yellow;
      break;

  // GREEN
    case true:
    case 1:
    case 'active':
      status = t('userStatus.active');
      text = green;
      break;

    case "done":
      status = t('common:statusDone');
      text = green;
      break;

    case "new":
      status = '';
      break;

    default:
      status = '';
      break;
  }

  return (
    <>
      {tooltip ?
        <BlackTooltip className={`${text} px-2 max-h-10 w justify-right m-auto inline-flex text-xs leading-5 font-semibold rounded-full`} tooltip={tooltip}>
          <span>
            {status}
          </span>
        </BlackTooltip>
        :
        <span className={`${text} px-2 max-h-6 justify-right m-auto inline-flex text-xs leading-5 font-semibold rounded-full`}>
          {status}
        </span>
      }
    </>
  )

};

export default StatusCell;
