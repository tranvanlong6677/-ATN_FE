import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  callFetchJob,
  callFetchJobByCompany,
  callSearchJob,
  callSendEmail,
} from "@/config/api";
import { IJob } from "@/types/backend";

interface IState {
  isFetching: boolean;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IJob[];
  resultByCompany: IJob[];
}
// First, create the thunk
export const fetchJob = createAsyncThunk(
  "job/fetchJob",
  async ({
    query,
    isAdminPage = false,
  }: {
    query: string;
    isAdminPage?: boolean;
  }) => {
    console.log(">>> check query", query);

    const response = await callFetchJob(query, isAdminPage);
    return response;
  }
);

export const fetchJobByCompany = createAsyncThunk(
  "job/fetchJobByCompany",
  async ({ query }: { query: string }) => {
    const response = await callFetchJobByCompany(query);
    return response;
  }
);

export const searchJob = createAsyncThunk(
  "job/searchJob",
  async ({
    values,
    query,
  }: {
    values: {
      skills: string[];
      location: string[];
      level: string;
      salary?: string;
    };
    query: string;
  }) => {
    const response = await callSearchJob({ values, query });
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
  resultByCompany: [],
};

export const jobSlide = createSlice({
  name: "job",
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
    builder.addCase(fetchJob.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchJob.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchJob.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isFetching = false;
        state.meta = action.payload.data.meta;
        state.result = action.payload.data.result;
        console.log(">>> check action.payload", action.payload);
      }
      // Add user to the state array

      // state.courseOrder = action.payload;
    });

    builder.addCase(searchJob.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(searchJob.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(searchJob.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isFetching = false;
        state.meta = action.payload.data.meta;
        state.result = action.payload.data.result;
      }
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchJobByCompany.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchJobByCompany.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchJobByCompany.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isFetching = false;
        state.meta = action.payload.data.meta;
        state.resultByCompany = action.payload.data.result;
      }
      // Add user to the state array

      // state.courseOrder = action.payload;
    });
  },
});

export const { setActiveMenu } = jobSlide.actions;

export default jobSlide.reducer;
