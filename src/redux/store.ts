import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./reducer/appReducer";

const reducer = combineReducers({
  app: appReducer,
});

const initialState = {};

const store = createStore(reducer, initialState, composeWithDevTools());

export default store;
