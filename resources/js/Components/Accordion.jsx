import { Disclosure, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

import { useState } from "react";
import { WhiteTooltip } from "./Tooltip";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Accordion({ title, children, className }) {
  return (
    <Disclosure
      as="div"
      className="inline-block w-full drop-shadow-lg"
      defaultOpen={true}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              className?.button,
              `inline-flex justify-center items-center w-full py-2 px-2 bg-white bg-opacity-15 text-base font-medium text-indigo-100 transition duration-300 hover:bg-opacity-10 rounded`
            )}
          >
            {title}
            {open ? (
              <ChevronDownIcon
                className={classNames(className?.icon, `-mr-1 ml-2 h-5 w-5`)}
                aria-hidden="true"
              />
            ) : (
              <ChevronUpIcon
                className={classNames(className?.icon, `-mr-1 ml-2 h-5 w-5`)}
              />
            )}
          </Disclosure.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel
              className={classNames(
                className?.list,
                `origin-top-right w-full bg-white bg-opacity-5 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100`
              )}
            >
              <div className="py-1 pl-2">
                <p>{children}</p>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export function ClosedSidebarAccordion({ title, children, className }) {
  return (
    <Disclosure
      as="div"
      className="inline-block w-full drop-shadow-lg"
      defaultOpen={true}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              className?.button,
              `inline-flex justify-center items-center !w-full py-2 px-2 bg-white bg-opacity-15 text-base font-medium text-indigo-100 transition duration-300 hover:bg-opacity-10 rounded`
            )}
          >
            {title}
          </Disclosure.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel
              className={classNames(
                className?.list,
                `origin-top-right w-full bg-white bg-opacity-5 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100`
              )}
            >
              <div className="flex justify-center items-center">
                <p>{children}</p>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export const WhiteAccordion = ({
  children,
  className,
  category,
  selectedCategory,
  setSelectedCategory,
  acquainted,
  notAcquainted,
  lastChildrenElem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Disclosure as="div" className={`flex flex-col justify-center items-center w-full pl-4 p-[6px] mb-3 transition duration-300 rounded-[6px] ${!category.parent_id && "bg-[#F9FAFB] border-[#00000014] border-[1px] shadow-md"}`} defaultOpen={false}>
        {({ open }) => {
          setIsOpen(open);
          return (<>
            <div className="flex items-center w-full">
              <Disclosure.Button className="mr-3 w-5"
              >
                {children &&
                  (open ? (
                    <ChevronUpIcon
                      className={classNames(
                        className?.icon,
                        `h-4 font-bold w-5  border-[1px] border-[#7972EB]  text-[#7972EB] rounded-none `
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className={classNames(
                        className?.icon,
                        `h-4 w-5 font-bold border-[1px] border-[#7972EB]  text-[#7972EB] rounded-none`
                      )}
                    />
                  ))}
              </Disclosure.Button>
              <span
                onClick={(e) => {
                  setSelectedCategory(category);
                }}
                className={`width-available flex items-center ${(category.parent_id &&
                  category.id !== lastChildrenElem[0].id) ||
                  (category.parent_id && open)
                  ? "border-b-[1px]"
                  : ""
                  }
                  ${selectedCategory.id === category.id ? "text-[#4F46E5]" : ""}
                  w-full text-left flex cursor-pointer`}
              >
                <p className="max-w-fit break-all overflow-hidden">{category.name}</p>
                {selectedCategory.id !== category.id &&
                  acquainted &&
                  !open &&
                  !notAcquainted && (
                    <WhiteTooltip
                      tooltip="В этом разделе есть статьи, с которыми вы еще не ознакомились"
                      className="tooltip-cp ml-auto mr-2"
                    >
                      <ExclamationCircleIcon className="h-5 w-5 opacity-50 text-indigo-500" />
                    </WhiteTooltip>
                  )}
              </span>
            </div>

          </>);
        }}
      </Disclosure>
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div
          className={classNames(
            className?.list,
            `origin-top-right w-full divide-y divide-gray-100`
          )}
        >
          <div className="pl-6 xxs:pl-4">{children}</div>
        </div>
      </Transition>
    </>
  );
};
