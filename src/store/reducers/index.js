import { combineReducers } from "redux";
import user from "./user_reducer";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/es/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user,
});

export default persistReducer(persistConfig, rootReducer);
