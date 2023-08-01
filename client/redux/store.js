import { combineReducers, configureStore } from "@reduxjs/toolkit";
import donorReducer from "./donorSlice";
import postsReducer from "./postSlice";
// const store = configureStore({
//   name: "donors",
//   reducer: donorReducer,
// });
const rootReducer = combineReducers({
  donors: donorReducer,
  posts: postsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
