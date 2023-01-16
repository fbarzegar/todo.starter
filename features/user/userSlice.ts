import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeToken, setToken } from "../../api/token";
import { getMe, login, register, UserType } from "../../api/user";
import { useAppSelector } from "../../store";

export const registerThunk = createAsyncThunk(
  "user/registerThunk",
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      return await register(username, password);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "/user/loginThunk",
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      return await login(username, password);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMeThunk = createAsyncThunk("/user/me", async (_, { rejectWithValue }) => {
  try {
    return await getMe();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export type userSliceType = {
  status: "idle" | "authorized" | "unauthorized" | "loading";
  user: UserType | null;
  token: string | null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    user: null,
    token: null,
  } as userSliceType,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "unauthorized";
      state.token = null;
      removeToken();
    },
  },
  extraReducers(builder) {
    builder.addCase(loginThunk.pending, (state) => {
      state.status === "unauthorized";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if (action.payload.token) {
        state.status === "authorized";
        setToken(String(action.payload.token));
        state.user === action.payload.user;
      } else {
        state.status === "unauthorized";
      }
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.status === "unauthorized";
    });
    builder.addCase(registerThunk.pending, (state) => {
      state.status === "unauthorized";
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.status === "authorized";
        setToken(String(action.payload.token));
        state.user === action.payload.user;
      } else {
        state.status === "unauthorized";
      }
    });
    builder.addCase(registerThunk.rejected, (state) => {
      state.status = "unauthorized";
    });
    builder.addCase(getMeThunk.pending, (state) => {
      state.status === "loading";
    });
    builder.addCase(getMeThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.status === "authorized";
        state.user === action.payload;
      }
    });
    builder.addCase(getMeThunk.rejected, (state) => {
      state.status === "unauthorized";
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: any) => state.user;

export const useUser = () => {
  const user = useAppSelector(selectUser);

  return user.user ? (user.user as UserType) : null;
};
