import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    choosenReview: {},
  },
  reducers: {
    addChoosenReview: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    isFavouriteReview: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { addChoosenReview } = reviewSlice.actions;
export const { isFavouriteReview } = reviewSlice.actions;

export const reviewData = (state) => state.review;

export default reviewSlice.reducer;
