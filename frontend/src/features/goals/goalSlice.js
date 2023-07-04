import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
import authService from "../auth/authService";

const initialState = {
  goal:[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
export const deleteGoal = createAsyncThunk(
  "goal/deleteGoal",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goal,thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await goalService.setGoal(goal, token);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const getGoal = createAsyncThunk("goal/getGoal", async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token;
    return await goalService.getGoal(token);
  } catch (error) {
    let message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

const goalReducer = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload.goal,'create');
        state.goal.push(action.payload.goal);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        
        state.message = action.payload;
      })
      .addCase(getGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);

        state.goal = action.payload;
      })
      .addCase(getGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goal = state.goal.filter((goal) => {
          return goal._id !== action.payload.id;
        });
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = goalReducer.actions;
export default goalReducer.reducer;
