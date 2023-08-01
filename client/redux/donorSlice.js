import { createSlice } from "@reduxjs/toolkit";

const donorSlice = createSlice({
  name: "donors",
  initialState: {
    msg: "hi",
    data: [],
  },
  reducers: {
    addDonors: (state, actions) => {
    
      state.data = actions.payload;
    },
  },
});

export const { addDonors } = donorSlice.actions;
export default donorSlice.reducer;
