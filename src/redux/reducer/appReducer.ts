import initialState from "./intialState";
import * as types from "../action/actionTypes";

interface appActions {
  type: string;
  payload: any;
}

export default function appReducer(currentState: any, action: appActions): any {
  const state = currentState || initialState.app;
  switch (action.type) {
    case types.SET_MODAL_STATE:
      return {
        ...state,
        openModal: action.payload,
      };

    case types.SET_CONTACT_DATA:
      return {
        ...state,
        contactList: action.payload,
      };

    case types.SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };

    case types.SET_USER_DETAILS:
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      return state;
  }
}
