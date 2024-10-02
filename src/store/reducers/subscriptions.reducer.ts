import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";
import { CreateUserSubscriptionAction, fetchStripeProducts } from "../actions/subscriptions.action ";

export type Document = {
    id?: string;
    name?: string;
    location?: string;
    isReportGenerated?: boolean,
    key?: string;
    tag?: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date ;
    deletedAt?: Date | null;
};

export type SubscriptionState = {
    subscription?: any
    subscriptions?: any
    isLoading: boolean;
    error: boolean;
    message: string;
    isToast: boolean;
};

const initialState = {
    subscription:null,
    subscriptions:[],
    isLoading: false,
    error: false,
    message: "",
    isToast: false,
}

export const subscriptionSlice = createSlice<SubscriptionState, SliceCaseReducers<SubscriptionState>, string>({
    name: "subscriptions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // fetch
        builder.addCase(fetchStripeProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchStripeProducts.fulfilled, (state, { payload }: any) => {
            state.subscriptions = payload;
            state.isLoading = false;
            state.isToast = true;
            state.error = false;
            if (payload) {
                state.message = payload.message;
            }
        });
        builder.addCase(fetchStripeProducts.rejected, (state, { payload }: any) => {
            state.isLoading = false;
            state.isToast = true;
            state.error = true;
            if (payload) {
                state.message = payload.message;
            }
        });

        // create
        builder.addCase(CreateUserSubscriptionAction.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(CreateUserSubscriptionAction.fulfilled, (state, { payload }: any) => {
            state.subscription = payload;
            state.isLoading = false;
            state.isToast = true;
            state.error = false;
            if (payload) {
                state.message = payload.message;
            }
        });
        builder.addCase(CreateUserSubscriptionAction.rejected, (state, { payload }: any) => {
            state.isLoading = false;
            state.isToast = true;
            state.error = true;
            if (payload) {
                state.message = payload.message;
            }
        });

    },
});

export default subscriptionSlice.reducer;
