import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getDonors = createAsyncThunk("donors/getDonors", async (sort) => {
  const res = await fetch(
    `http://localhost:4000/blood/getDonors?sort=${sort}`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  return data.data;
});
const donorSlice = createSlice({
  name: "donors",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {
    addDonors: (state, actions) => {
      state.data = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDonors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDonors.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log(state.data);
    });
    builder.addCase(getDonors.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { addDonors } = donorSlice.actions;
export default donorSlice.reducer;
