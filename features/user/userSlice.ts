import { Action, AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeToken, setToken, tokenkey } from "../../api/token";
import { getMe, login, register, userType } from "../../api/user";
import { useAppSelector } from "./hooks";

export const loginThunk = createAsyncThunk(
  "/loginThunk",
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await login(data);
      return { ...res, username: data.username, password: data.password };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "/registerThunk",
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      return await register(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMeThunk = createAsyncThunk("/me", async () => {
  return await getMe();
});

interface RejectedAction extends Action {
  payload: string;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

type initialStateType = {
  user: userType | null;
  status: "idle" | "loading" | "Authorized" | "unAuthorized" | "error";
  step?: 0 | 1;
  token?: string | null;
  error?: string | null;
  username?: string;
};

const initialState: initialStateType = {
  user: null,
  status: "idle",
  token: null,
  error: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",

  reducers: {
    logout(state: any) {
      removeToken();
      state.status = "unAuthorized";
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      // const token = action.payload.data?.token;
      if (action.payload) {
        state.status = "Authorized";
        setToken(tokenkey);
        state.user = action.payload.user;
      } else {
        state.status === "unAuthorized";
      }
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.status === "unAuthorized";
      state.error = (action.payload as any).error;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      // const token = action.payload.data;
      if (action.payload) {
        state.status = "Authorized";
        setToken(tokenkey);
        state.user = action.payload.user;
      } else {
        state.status === "unAuthorized";
      }
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.status === "unAuthorized";
      state.error = (action.payload as any).error;
    });
    builder.addCase(getMeThunk.fulfilled, (state, action) => {
      // const token = action.payload.data?.token;
      if (action.payload.token) {
        state.status = "Authorized";
        setToken(tokenkey);
        state.user = action.payload?.me;
      } else {
        state.status = "unAuthorized";
        state.error = action.payload.error;
      }
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.status === "unAuthorized";
      state.error === action.payload;
    });
  },
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export const useUser = () => {
  const user = useAppSelector(selectUser);

  return user.user ? (user.user as userType) : null;
};
