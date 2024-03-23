import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  callChangePassword,
  callFetchUser,
  callUpdateUser,
} from "@/config/api";
import { IUser } from "@/types/backend";

interface IState {
  isFetching: boolean;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IUser[];
}
// First, create the thunk
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ query }: { query: string }) => {
    const response = await callFetchUser(query);
    return response;
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    console.log("slice");
    try {
      const response = await callChangePassword({ oldPassword, newPassword });
      //   console.log()
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({
    name,
    age,
    gender,
    address,
  }: {
    name: string;
    age: number;
    gender: string;
    address: string;
  }) => {
    const response = await callUpdateUser({ name, age, gender, address });
    return response;
  }
);

const initialState: IState = {
  isFetching: true,
  meta: {
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  },
  result: [],
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActiveMenu: (state, action) => {
      // state.activeMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isFetching = false;
        state.meta = action.payload.data.meta;
        state.result = action.payload.data.result;
      }
      // Add user to the state array

      // state.courseOrder = action.payload;
    });

    builder.addCase(changePassword.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(changePassword.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(changePassword.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isFetching = false;
        console.log(action);
      }
      // Add user to the state array

      // state.courseOrder = action.payload;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isFetching = false;
        console.log(action);
      }
      // Add user to the state array

      // state.courseOrder = action.payload;
    });
  },
});

export const { setActiveMenu } = userSlide.actions;

export default userSlide.reducer;
