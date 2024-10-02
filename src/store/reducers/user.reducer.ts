import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import {
  fetchUserAction,
  forgetPasswordAction,
  loginAction,
  logoutAction,
  resetPasswordAction,
  signupAction,
  updateUserAction,
} from "../actions/user.action";
import localStorage from "../../services/localStorage.service";

export type User = {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserState = {
  user?: User;
  tokens?: Tokens;
  isLogin: boolean;
  isLoading: boolean;
  error: boolean;
  message: string;
  isToast: boolean;
  firstname: string;
};

const initialState = {
  user: { ...(localStorage.getItem("user") ?? {}) },
  tokens: localStorage.getItem("tokens"),
  isLogin: localStorage.getItem("tokens") ? true : false,
  isLoading: false,
  error: false,
  message: "",
  isToast: false,
  firstname: "",
};

export const userSlice = createSlice<
  UserState,
  SliceCaseReducers<UserState>,
  string
>({
  name: "user",
  initialState,
  reducers: {
    setIsToast(
      state,
      { payload }: { payload: { isToast: boolean; message?: string } }
    ) {
      state.isToast = payload.isToast;
    },
  },
  extraReducers: (builder) => {
    // loginAction
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, { payload }: any) => {
      state.tokens = payload?.data?.token;
      state.user = payload?.data?.user;
      state.isLogin = true;
      state.isLoading = false;
      state.isToast = true;
      state.error = false;
      if (payload) {
        state.message = payload.message;
      }
    });
    builder.addCase(loginAction.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });

    // SigupAction
    builder.addCase(signupAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupAction.fulfilled, (state, { payload }: any) => {
      state.tokens = payload?.data?.token;
      state.user = payload?.data?.user;
      state.isLogin = true;
      state.isLoading = false;
      state.isToast = true;
      state.error = false;
      if (payload) {
        state.message = payload.message;
      }
    });
    builder.addCase(signupAction.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });

    //ForgetPasswordAction
    builder.addCase(forgetPasswordAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      forgetPasswordAction.fulfilled,
      (state, { payload }: any) => {
        state.isLoading = false;
        state.isToast = true;
        state.error = false;
        if (payload) {
          state.message = payload.message;
        }
      }
    );
    builder.addCase(
      forgetPasswordAction.rejected,
      (state, { payload }: any) => {
        state.isLoading = false;
        state.isToast = true;
        state.error = true;
        if (payload) {
          state.message = payload.message;
        }
      }
    );

    //ResetPasswordAction
    builder.addCase(resetPasswordAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      resetPasswordAction.fulfilled,
      (state, { payload }: any) => {
        state.tokens = payload?.data?.token;
        state.user = payload?.data?.user;
        state.isLoading = false;
        state.isToast = true;
        state.error = false;
        if (payload) {
          state.message = payload.message;
        }
      }
    );
    builder.addCase(resetPasswordAction.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });

    // fetchUserAction
    builder.addCase(fetchUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchUserAction.fulfilled, (state, { payload }) => {
      state.user = { ...state.user, ...payload };
      // state.isLogin = true;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(fetchUserAction.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.user = undefined;
      state.tokens = undefined;
      if (payload) state.message = payload.message;
    });

    // updateUserAction
    builder.addCase(updateUserAction.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateUserAction.fulfilled, (state, { payload }) => {
      state.user = { ...state.user, ...payload };
      // state.isLogin = true;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(updateUserAction.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.user = undefined;
      state.tokens = undefined;
      if (payload) state.message = payload.message;
    });

    // userLogout
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.user = undefined;
      state.tokens = undefined;
      state.isLogin = false;
    });
  },
});

export const { setIsToast } = userSlice.actions;

export default userSlice.reducer;
