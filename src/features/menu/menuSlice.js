import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	status: "idle",
	error: null,
};

export const fetchItems = createAsyncThunk("/menu/fetchItems", async () => {
	const response = await fetch("/menu");
	const items = (await response.json()) || [];
	return items;
});

export const slice = createSlice({
	name: "menu",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchItems.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchItems.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.items = state.items.concat(action.payload);
		},
		[fetchItems.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export const selectMenuItems = (state) => state.menu.items;

export default slice.reducer;
