import { t } from "i18next";
import React, { useContext, useEffect, useRef } from "react";
import { CommonContext } from "../../reducer.jsx";
import { ActionButton, CancelButton } from "../AdminPages/Page.jsx";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import Modal from "../Modal.jsx";
import {useTranslation} from "react-i18next";

const AlertIcon = ({color}) => {
  const colorVariants = {
    red: "bg-red-100 hover:bg-red-200 text-red-600",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
    yellow: "bg-yellow-100 hover:bg-yellow-200 text-yellow-600",
    green: "bg-green-100 hover:bg-green-200 text-green-600",
    indigo: "bg-indigo-100 hover:bg-indigo-200 text-indigo-600",
  }
  return (
      <div className={`p-3 rounded-[25px] opacity-80 h-fit ${colorVariants[color]}`}>
        <ExclamationTriangleIcon className={`w-7 h-7 rounded-[25px]`}/>
      </div>
  )
}

export const AlertModal = () => {
  const { state, dispatch } = useContext(CommonContext);
  const { modal } = state;
  const {
    show,
    type,
    action,
    blured } = state.modal;

  const {t} = useTranslation(['common'])
  let title = modal.title ?? t(`alert.${type}`);
  let okLabel = modal.okLabel;
  let cancelLabel = modal.cancelLabel ?? t('alert.cancel');
  let colorVariantName = 'red';
  let showCancelBtn = modal.showCancelBtn ?? true;

  switch(type) {
    // red style
    case 'danger':
    case 'delete':
      okLabel = okLabel ?? t("alert.delete");
      colorVariantName = 'red';
      break;

      // blue style
    case 'confirm':
      okLabel = okLabel ?? t("alert.save");
      colorVariantName = 'blue';
      break;

      // yellow style
    case 'warning':
      okLabel = okLabel ?? 'OK';
      colorVariantName = 'yellow';
      break;

      // green style
    case 'info':
    case 'success':
      okLabel = okLabel ?? 'OK';
      colorVariantName = 'green';
      break;

    case 'indigo':
      colorVariantName = 'indigo';
      break;
  }

  const colorVariants = {
    red: "bg-error-active hover:bg-error-active focus:ring-error-active",
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-700",
    yellow: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-700",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-700",
    indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-700",
  }

  okLabel = okLabel ?? 'OK';
  cancelLabel = cancelLabel ?? t('alert.cancel');

  useEffect(() => {
    const keyDownHandler = event => {
      switch (event.key) {
        case 'ArrowRight':
          btnRef.current[0].focus();
          break;
        case 'ArrowLeft':
          btnRef.current[1].focus();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  const btnRef = useRef([]);

  const handleClose = () => {
    dispatch({ type: "HIDE_MODAL" });
    if (typeof modal.close === "function") modal.close();
  };

  const handleAction = () => {
    dispatch({ type: "HIDE_MODAL" });
    action();
  };
  return (
    <div>
      <Modal open={show} onClose={handleClose} blured={blured}>
          <div className="flex gap-6">
            <AlertIcon color={colorVariantName}/>
            {/* <div className={`p-3 rounded-[25px] opacity-80 h-fit bg-${colorVariantName}-100 hover:bg-${colorVariantName}-200`}>
              { icon }
            </div> */}
            <div className="flex flex-col">
              <span className="text-lg font-bold">
                {title}
              </span>
              <div className="mt-2 text-gray-500 text-base">
                  <span className="break-all " dangerouslySetInnerHTML={{__html: modal.text}}/>
              </div>
            </div>
          </div>

        <div className="flex flex-row-reverse justify-start mt-4 gap-3">
          <ActionButton className={`${colorVariants[colorVariantName]}`}
                        label={okLabel}
                        onClick={handleAction}
                        btnRef={(ref) => btnRef.current.push(ref)}
          />
          {
            showCancelBtn ? (
                <CancelButton
                    label={cancelLabel}
                    onClick={handleClose}
                    btnRef={(ref) => btnRef.current.push(ref)}
                />
            ) : null
          }
        </div>
      </Modal>
    </div>
  );
};
