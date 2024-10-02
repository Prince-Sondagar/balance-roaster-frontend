import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user.reducer";
import documentSlice from "./reducers/document.reducer";
import subscriptionSlice from "./reducers/subscriptions.reducer";

const store = configureStore({
	reducer: {
		user: userSlice,
		document: documentSlice,
		subscriptions: subscriptionSlice
	},
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
