import React, {useEffect, useReducer} from 'react';
import {CommonContext, CommonReducer, initialState, resetState} from './reducer.jsx';
import {Notification} from './Components/Notification.jsx';
import {AlertModal} from "./Components/Modals/AlertModal.jsx";
import {useTranslation} from "react-i18next";

export default function CommonLayout(props) {

    const {t} = useTranslation('common')

    const [state, dispatch] = useReducer(CommonReducer, initialState, resetState);
    const {notification: {position, type, header, message}, errors} = props;
    const {alertModal} = props;

    // // load notify from backend (page prop notification)
    useEffect(() => {

        // load from session
        let payload = {position, type, header, message}

        // load from page errors
        if (Object.values(errors).length) {
            payload = {
                position,
                type: 'fail',
                header: `${t('error')}`,
                message: Object.values(errors)
            }
        }

        // dispatch notification
        if (payload.message !== null) {
            dispatch({
                type: 'SHOW_NOTIFICATION',
                payload
            });
            setTimeout(() => dispatch({type: 'HIDE_NOTIFICATION'}), 3000);
        }

        // dispatch alert modal
        if (alertModal) {
            dispatch({
                type: 'SHOW_MODAL',
                payload: alertModal,
            });
        }
    }, [position, type, header, message, errors]);

    return (
        <>
            <CommonContext.Provider value={{dispatch, state}}>

                {props.children}

                {state.notification.show && (
                    <Notification
                        position={state.notification.position}
                        type={state.notification.type}
                        header={state.notification.header}
                        message={state.notification.message}
                    />
                )}

                {state.modal?.show && (
                    <AlertModal/>
                )}

            </CommonContext.Provider>
        </>
    );

}
