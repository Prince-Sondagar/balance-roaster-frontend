import { createAsyncThunk } from "@reduxjs/toolkit";
import { APISuccessResponse } from "../../utils/axios";
import {
  createDocument,
  getAllDocument,
  removeDocument,
  reportGenerator,
  updateDoc,
} from "../../services/api.services";
import { toastEmitter } from "../../component/Common/ToastContainer";

export const uploadDocument = createAsyncThunk<APISuccessResponse, any>(
  "document/upload",
  async (arg, thinkAPI) => {
    try {
      const { data } = await createDocument(arg);
      toastEmitter.success(data.message);
      return thinkAPI.fulfillWithValue(data);
    } catch (error: any) {
      toastEmitter.error("error");
      return thinkAPI.rejectWithValue(
        new Error(
          error.data.message || error.message || "Something is wrong here"
        )
      );
    }
  }
);

export const fetchDocuments = createAsyncThunk<APISuccessResponse, any>(
  "document/list",
  async (arg, thinkAPI) => {
    try {
      const { data } = await getAllDocument(arg);
      // toastEmitter.success(data.message)

      return thinkAPI.fulfillWithValue(data);
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

export const deleteDocument = createAsyncThunk<
  APISuccessResponse,
  { id: string | undefined }
>("document/list/delete", async (arg, thunkAPI) => {
  try {
    const { data } = await removeDocument(arg.id);
    toastEmitter.success(data.message);
    // await thunkAPI.dispatch(fetchDocuments());
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error: any) {
    toastEmitter.error("error");
    if (error.response.data.message)
      return thunkAPI.rejectWithValue(
        new Error(error.response.data.message || "Please login first")
      );
    return thunkAPI.rejectWithValue(
      new Error(error.message || "Please login first")
    );
  }
});

export const updateDocument = createAsyncThunk<
  APISuccessResponse,
  { id: string | undefined }
>("document/list/update", async (arg, thunkAPI) => {
  try {
    const { data } = await updateDoc(arg.id);
    toastEmitter.success(data.message);
    // await thunkAPI.dispatch(fetchDocuments());
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error: any) {
    toastEmitter.error("error");
    if (error.response.data.message)
      return thunkAPI.rejectWithValue(
        new Error(error.response.data.message || "Please login first")
      );
    return thunkAPI.rejectWithValue(
      new Error(error.message || "Please login first")
    );
  }
});

export const generateReport = createAsyncThunk<APISuccessResponse, any>(
  "document/report",
  async (arg, thunkAPI) => {
    try {
      const { data } = await reportGenerator(arg);
      toastEmitter.success(data.message);
      // await thunkAPI.dispatch(fetchDocuments());
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error: any) {
      toastEmitter.error("error");
      if (error.response.data.message)
        return thunkAPI.rejectWithValue(
          new Error(error.response.data.message || "Please login first")
        );
      return thunkAPI.rejectWithValue(
        new Error(error.message || "Please login first")
      );
    }
  }
);
