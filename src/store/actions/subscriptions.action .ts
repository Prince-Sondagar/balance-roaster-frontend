import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createStripeSubscription,
  getAllStripeProduct,
} from "../../services/api.services";
import { toastEmitter } from "../../component/Common/ToastContainer";
import { APISuccessResponse } from "../../utils/axios";

export const fetchStripeProducts = createAsyncThunk(
  "document/lists",
  async (_, thinkAPI) => {
    try {
      const { data } = await getAllStripeProduct(_);
      // toastEmitter.success(data.message)

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

export const CreateUserSubscriptionAction = createAsyncThunk<
  APISuccessResponse,
  any
>("subscriptions/create", async (arg, thinkAPI) => {
  try {
    const { data } = await createStripeSubscription(arg);
    return thinkAPI.fulfillWithValue(data.data);
  } catch (error: any) {
    return thinkAPI.rejectWithValue(
      new Error(error.message || "error in creating subscription")
    );
  }
});
