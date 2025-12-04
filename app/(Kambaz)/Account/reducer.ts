import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: string;
  [key: string]: unknown;
}

const initialState: { currentUser: User | null } = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: { payload: User | null }) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;