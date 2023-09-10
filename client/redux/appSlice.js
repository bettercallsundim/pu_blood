import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    dark: false,
    user: null,
  },
  reducers: {
    toggleDark: (state, actions) => {
      state.dark = !state.dark;
    },
  },
});

export const { toggleDark } = appSlice.actions;
export default appSlice.reducer;
