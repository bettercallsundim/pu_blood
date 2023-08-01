import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    msg: "hi",
    data: [],
  },
  reducers: {
    addPosts: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export const { addPosts } = postsSlice.actions;
export default postsSlice.reducer;
