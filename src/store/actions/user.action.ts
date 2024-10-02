import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { APISuccessResponse } from "../../utils/axios";
import localStorage from "../../services/localStorage.service";
import { User } from "../reducers/user.reducer";
import { toastEmitter } from "../../component/Common/ToastContainer";
import { updateUser } from "../../services/api.services";

export const loginAction = createAsyncThunk<
  APISuccessResponse,
  { email: string; password: string }
>("auth/login", async (arg, thinkAPI) => {
  try {
    const { data, status } = await API.post<APISuccessResponse, any>(
      "/auth/login",
      arg
    );
    localStorage.setItem("tokens", data?.data?.token);
    toastEmitter.success(data.message);

    if (status !== 200) {
      toastEmitter.error(data.message);
      return thinkAPI.rejectWithValue(
        new Error(data.message || "Something is wrong here")
      );
    }
    await thinkAPI.dispatch(fetchUserAction());
    return thinkAPI.fulfillWithValue(data);
  } catch (error: any) {
    toastEmitter.error(error.data.message);
    return thinkAPI.rejectWithValue(
      new Error(
        error.data.message || error.message || "Something is wrong here"
      )
    );
  }
});

export const signupAction = createAsyncThunk<
  APISuccessResponse,
  { firstname: string; lastname: string; email: string; password: string }
>("auth/signup", async (arg, thinkAPI) => {
  try {
    const { data, status } = await API.post<APISuccessResponse, any>(
      "/auth/signup",
      arg
    );
    if (status !== 200)
      return thinkAPI.rejectWithValue(
        new Error(data.message || "Something is wrong here")
      );
    localStorage.setItem("tokens", data?.data?.token);
    toastEmitter.success(data.message);
    await thinkAPI.dispatch(fetchUserAction());
    return thinkAPI.fulfillWithValue(data);
  } catch (error: any) {
    toastEmitter.error(error.data.message);
    return thinkAPI.rejectWithValue(
      new Error(
        error.data.message || error.message || "Something is wrong here"
      )
    );
  }
});

export const fetchUserAction = createAsyncThunk(
  "user/me",
  async (_, thinkAPI) => {
    try {
      const { data, status } = await API.get<APISuccessResponse<User>>(
        "/user/me"
      );

      // if (status !== 200)
      //   return thinkAPI.rejectWithValue(
      //     new Error(data.message || "Something is wrong here")
      //   );

      localStorage.setItem("user", data.data);
      toastEmitter.success(data.message);
      return thinkAPI.fulfillWithValue(data.data);
    } catch (error: any) {
      toastEmitter.error("error");
      if (error.response.data.message)
        return thinkAPI.rejectWithValue(
          new Error(error.response.data.message || "Please login first")
        );
      return thinkAPI.rejectWithValue(
        new Error(error.message || "Please login first")
      );
    }
  }
);

export const forgetPasswordAction = createAsyncThunk<
  APISuccessResponse,
  { email: string }
>("auth/forgot-password", async (arg, thinkAPI) => {
  try {
    const { data, status } = await API.post<APISuccessResponse, any>(
      "/auth/forgot-password",
      arg
    );
    if (status !== 200) {
      toastEmitter.error(data.message);
      return thinkAPI.rejectWithValue(
        new Error(data.message || "Something is wrong here")
      );
    }
    toastEmitter.success(data.message);
    await thinkAPI.dispatch(fetchUserAction());
    return thinkAPI.fulfillWithValue(data);
  } catch (error: any) {
    toastEmitter.error(error.data.message);
    return thinkAPI.rejectWithValue(new Error(error.data?.message));
  }
});

export const resetPasswordAction = createAsyncThunk<
  APISuccessResponse,
  { password: string; token: string }
>("auth/reset-password", async (arg, thinkAPI) => {
  try {
    const { data, status } = await API.post<APISuccessResponse, any>(
      "/auth/reset-password",
      arg
    );
    if (status !== 200) {
      toastEmitter.error(data.message);
      return thinkAPI.rejectWithValue(
        new Error(data.message || "Something is wrong here")
      );
    }

    toastEmitter.success(data.message);
    await thinkAPI.dispatch(fetchUserAction());
    return thinkAPI.fulfillWithValue(data);
  } catch (error: any) {
    toastEmitter.error(error.data.message);
    return thinkAPI.rejectWithValue(new Error(error.data?.message));
  }
});

export const logoutAction = createAsyncThunk<{}>(
  "user/logout",
  async (arg, thinkAPI) => {
    localStorage.clear();
    return thinkAPI.fulfillWithValue({});
  }
);

export const updateUserAction = createAsyncThunk<
  APISuccessResponse,
  {
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
  }
>("/user/me/update", async (arg, thunkAPI) => {
  try {
    const { data } = await updateUser(arg);
    toastEmitter.success(data.message);
    // await thunkAPI.dispatch(fetchDocuments());
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error: any) {
    toastEmitter.error("error");
    if (error.response.data.message)
      return thunkAPI.rejectWithValue(
        new Error(error.response.data.message || "User Update Failed")
      );
    return thunkAPI.rejectWithValue(
      new Error(error.message || "User Update Failed")
    );
  }
});
