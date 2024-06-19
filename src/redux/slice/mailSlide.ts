import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callSendEmail } from "@/config/api";

const initialState = {
  isFetching: false,
};
export const sendEmail = createAsyncThunk("mail/sendEmail", async () => {
  const response = await callSendEmail();
  return response;
});
export const mailSlide = createSlice({
  name: "mail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendEmail.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(sendEmail.rejected, (state, action) => {
      state.isFetching = false;
    });

    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.isFetching = false;
    });
  },
});

export const {} = mailSlide.actions;

export default mailSlide.reducer;
