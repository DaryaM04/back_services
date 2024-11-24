import React from 'react';

export const CommonContext = React.createContext();

export const initialState = {
  notification: {
    show: false,
    position: null,
    type: null,
    header: null,
    message: null
  },
  modal: {
    show: false,
    action: null,
    okLabel: null,
    title: null,
    text: null,
    type: 'confirm',
  }
};

export const resetState = (state) => state;

export const CommonReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      // console.log('SHOW_NOTIFICATION');
      return {
        ...state,
        notification: {
          show: true,
          position: action.payload.position,
          type: action.payload.type,
          header: action.payload.header,
          message: action.payload.message
        }
      };
    case 'HIDE_NOTIFICATION':
      // console.log('HIDE_NOTIFICATION');
      return {
        ...state,
        notification: {
          show: false,
          position: null,
          type: null,
          header: null,
          message: null
        }
      };
    case 'SHOW_MODAL':
        // console.log('SHOW_MODAL');
      return {
        ...state,
        modal: {
          show: true,
          type: action.payload.type,
          text: action.payload.text,
          title: action.payload.title,
          action: action.payload.action,
          close: action.payload.close,
          okLabel: action.payload.okLabel,
          cancelLabel: action.payload.cancelLabel,
          showCancelBtn: action.payload.showCancelBtn,
          blured: action.payload.blured,
        }
      };
    case 'HIDE_MODAL':
      return {
        ...state,
        modal: {
          show: false,
        }
      };
    case 'RESET':
      return resetState(action.payload);
    default:
      return state;
  }
};

