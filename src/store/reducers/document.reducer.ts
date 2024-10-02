import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import {
  deleteDocument,
  fetchDocuments,
  generateReport,
  updateDocument,
  uploadDocument,
} from "../actions/document.action";

export type Document = {
  id?: string;
  name?: string;
  location?: string;
  isReportGenerated?: boolean;
  key?: string;
  tag?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};

export type DocumentState = {
  documents?: [Document];
  pagination?: any;
  document?: Document;
  isLoading: boolean;
  error: boolean;
  message: string;
  isToast: boolean;
};

const initialState = {
  document: {},
  pagination: {},
  isLoading: false,
  error: false,
  message: "",
  isToast: false,
};

export const documentSlice = createSlice<
  DocumentState,
  SliceCaseReducers<DocumentState>,
  string
>({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // createDocument
    builder.addCase(uploadDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadDocument.fulfilled, (state, { payload }: any) => {
      state.document = payload?.data;
      state.isLoading = false;
      state.isToast = true;
      state.error = false;
      if (payload) {
        state.message = payload.message;
      }
    });
    builder.addCase(uploadDocument.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });

    // fetchallDocument
    builder.addCase(fetchDocuments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, { payload }: any) => {
      console.log("payloadssss", payload);

      state.documents = payload?.data;
      state.pagination = payload?.pagination;
      state.isLoading = false;
      state.isToast = true;
      state.error = false;
      if (payload) {
        state.message = payload.message;
      }
    });
    builder.addCase(fetchDocuments.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });

    // deleteDocument
    builder.addCase(deleteDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteDocument.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = false;
      if (payload) {
        state.message = payload.message;
      }
    });
    builder.addCase(deleteDocument.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });

    // generatereport
    builder.addCase(generateReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(generateReport.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = false;
      if (payload) {
        state.message = payload.message;
      }
    });
    builder.addCase(generateReport.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });

    // updateDocument
    builder.addCase(updateDocument.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateDocument.fulfilled, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = false;
      if (payload) {
        state.message = payload.message;
      }
    });
    builder.addCase(updateDocument.rejected, (state, { payload }: any) => {
      state.isLoading = false;
      state.isToast = true;
      state.error = true;
      if (payload) {
        state.message = payload.message;
      }
    });
  },
});

export default documentSlice.reducer;
