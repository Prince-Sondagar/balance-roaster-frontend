import API, { APISuccessResponse } from "../utils/axios";

//user
export const updateUser = (payload: any) =>
  API.patch<APISuccessResponse, any>(`/user/me`, payload);

//Document
export const createDocument = (payload: any) =>
  API.post<APISuccessResponse, any>("/document/upload", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllDocument = ({ page, limit }: any) =>
  API.get<APISuccessResponse, any>(
    `/document/list?limit=${limit}&page=${page}`
  );

export const removeDocument = (payload: any) =>
  API.delete<APISuccessResponse, any>(`/document/list/${payload}`);

export const updateDoc = (docId: any) =>
  API.patch<APISuccessResponse, any>(`/document/list/${docId}`);

export const reportGenerator = (payload: any) =>
  API.post<APISuccessResponse, any>(`/document/report`, payload);

//subscription

export const getAllStripeProduct = (payload: any) =>
  API.get<APISuccessResponse, any>(`/subscription/all`, payload);

export const createStripeSubscription = (payload: any) =>
  API.post<APISuccessResponse, any>(`/subscription/create`, payload);
