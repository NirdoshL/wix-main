import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    fetchItemsStart(state) {
      state.loading = true;
    },
    fetchItemsSuccess(state, action) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchItemsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure } =
  itemsSlice.actions;

export default itemsSlice.reducer;
