import React, { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BlackTooltip({ children, className, tooltip, tooltipClassname }) {
  console.log(tooltip)
  return tooltip ? (
    <div className={classNames(className, `tooltip`)}>
      {children}
      <div className='absolute -top-2 right-[50%] max-w-[300px]'>
        <span className={classNames("tooltiptext translate-x-[-50%] rtl:translate-x-[50%] left-full max-w-[280px] text-xs break-keep", tooltipClassname)}>{tooltip}</span>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}

export function WhiteTooltip({ children, className, tooltip, withIcon = false }) {
  const QuestionIcon = () => (
      <svg className='iconHover ltr:ml-2 rtl:mr-2' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.00001 4.375C6.67724 4.375 6.39415 4.54931 6.24154 4.81314C5.99956 5.23144 5.4643 5.37438 5.046 5.13241C4.62769 4.89043 4.48475 4.35517 4.72673 3.93686C5.17928 3.15453 6.02729 2.625 7.00001 2.625C8.44976 2.625 9.62501 3.80025 9.62501 5.25C9.62501 6.39294 8.89456 7.36528 7.87501 7.72563V7.875C7.87501 8.35825 7.48326 8.75 7.00001 8.75C6.51676 8.75 6.12501 8.35825 6.12501 7.875V7C6.12501 6.51675 6.51676 6.125 7.00001 6.125C7.48326 6.125 7.87501 5.73325 7.87501 5.25C7.87501 4.76675 7.48326 4.375 7.00001 4.375ZM7 11.375C7.48325 11.375 7.875 10.9832 7.875 10.5C7.875 10.0168 7.48325 9.625 7 9.625C6.51675 9.625 6.125 10.0168 6.125 10.5C6.125 10.9832 6.51675 11.375 7 11.375Z" fill="#9CA3AF"/>
      </svg>
  )

  return tooltip ? (
    <div
      className={classNames(
        className,
        "tooltip white relative"
      )}
    >
      <div className="flex relative">
          {children}
          {withIcon && <QuestionIcon />}
      <div>
          <span className="tooltiptext text-xs" dangerouslySetInnerHTML={{__html: tooltip}}></span>
      </div>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}
