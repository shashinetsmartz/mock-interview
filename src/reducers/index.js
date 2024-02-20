import { combineReducers } from "redux";

import api from "api";
import homeSlice from "slices/homeSlice";
// import sessionSlice from "slices/sessionSlice";

const rootReducer = combineReducers({
  homeSlice,
  // sessionSlice,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
