import {
  SET_CONTACT_DATA,
  SET_MODAL_STATE,
  SET_TITLE,
  SET_USER_DETAILS,
} from "./actionTypes";

export const setModalState = (payload: boolean): any => {
  return { type: SET_MODAL_STATE, payload };
};

export const setContactData = (payload: any): any => {
  return { type: SET_CONTACT_DATA, payload };
};

export const setTitle = (payload: string): any => {
  return { type: SET_TITLE, payload };
};

export const setUserDetails = (payload: any): any => {
  return { type: SET_USER_DETAILS, payload };
};
