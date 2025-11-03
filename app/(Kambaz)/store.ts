import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import accountReducer from "./Account/reducer";

const store = configureStore({
 reducer: { coursesReducer, modulesReducer, assignmentsReducer, accountReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;