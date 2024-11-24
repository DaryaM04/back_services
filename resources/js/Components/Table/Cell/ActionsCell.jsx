import React from 'react';
import {EnvelopeIcon, PencilIcon, TrashIcon} from '@heroicons/react/24/outline';
import BlackTooltip from '../../Tooltip';
import { ArrowPathIcon, Bars4Icon } from "@heroicons/react/24/outline";
import {EyeIcon} from "@heroicons/react/24/outline/index.js";

const ActionsCell = ({value: actions, row}) => {
  return (
    <div
      className="justify-left font-medium inline-flex m-auto"
    >
      {actions?.map((action, idx) => (
        (() => {
          let component;
          switch (action.type) {
            case 'cell':
              component = action.cell({row});
              break;
            case 'approve':
              component = <EyeIcon
                  className={`w-5 h-5 mx-1 ${action.disabled ? 'text-gray-300' : 'text-indigo-600 hover:text-indigo-900 cursor-pointer'}`}
                  onClick={action.disabled ? null : action.action}/>
              break;
            case 'issue':
              component = <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mx-1 ${action.disabled ? 'text-gray-300' : 'text-indigo-600 hover:text-indigo-900 cursor-pointer'}`}
                onClick={action.disabled ? null : action.action} stroke="currentColor" viewBox="0 0 22 20" fill="none">
                <path d="M16 13H21M21 13L18 10M21 13L18 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 16V17C15 18.1046 14.1046 19 13 19H3C1.89543 19 1 18.1046 1 17V3C1 1.89543 1.89543 1 3 1H9L15 7V10"  strokeWidth="2"/>
                <path d="M6 13H8" strokeWidth="2"/>
                <path d="M9 13H11" strokeWidth="2"/>
                <path d="M12 13H14" strokeWidth="2"/>
              </svg>
              break;
            case 'edit':
              component = <PencilIcon
                className={`w-5 h-5 mx-1 ${action.disabled ? 'text-gray-300' : 'text-indigo-600 hover:text-indigo-900 cursor-pointer'}`}
                onClick={action.disabled ? null : action.action}
              />;
              break;
            case 'details':
              component = <EyeIcon
                className={`w-5 h-5 mx-1 ${action.disabled ? 'text-gray-300' : 'text-indigo-600 hover:text-indigo-900 cursor-pointer'}`}
                onClick={action.disabled ? null : action.action}
              />;
              break;
            case 'view-list':
              component = <Bars4Icon
                className={`w-5 h-5 mx-1 ${action.disabled ? 'text-gray-300' : 'text-indigo-600 hover:text-indigo-900 cursor-pointer'}`}
                onClick={action.disabled ? null : action.action}
              />;
              break;
            case 'refresh':
              component = <ArrowPathIcon
                className={`w-5 h-5 mx-1 ${action.disabled ? 'text-gray-300' : 'text-indigo-600 hover:text-indigo-900 cursor-pointer'}`}
                onClick={action.disabled ? null : action.action}
              />;
              break;
            case 'delete':
              component = <TrashIcon
                className={`w-5 h-5 mx-1 ${action.disabled ? 'text-gray-300' : 'text-red-600 hover:text-red-900 cursor-pointer'}`}
                onClick={action.disabled ? null : action.action}
              />;
              break;
            case 'resend':
              component = <EnvelopeIcon
                className={`w-5 h-5 mx-1 ${action.disabled ? 'text-gray-300' : 'text-indigo-600 hover:text-indigo-900 cursor-pointer'}`}
                onClick={action.disabled ? null : action.action}
              />;
              break;
            case 'button':
              component =  <button key={idx} type="button"
                className={ `${action.selected ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}
                  inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2`
                }
                onClick={action.disabled ? null : action.action}
              >
                {action.label}
              </button>;
              break;
            default:
              component = null;
          }

          if (action?.visible !== false) {
            return <BlackTooltip key={idx} tooltip={action.tooltip}>
              {component}
            </BlackTooltip>;
          } else return "";

        })()
      ))}
    </div>
  );
};

export default ActionsCell;
