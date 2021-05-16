import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: JSON.parse(localStorage.getItem("cart")) || [],
	status: "idle",
	error: null,
};

export const checkoutCart = createAsyncThunk("cart/checkoutCart", async (_, { getState }) => {
	const { cart = [] } = getState();
	await fetch("/checkout", {
		method: "post",
		body: JSON.stringify(cart.items),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return;
});

export const slice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add: (state, action) => {
			const index = state.items.findIndex((item) => item.id === action.payload.id);
			if (index >= 0) {
				const item = state.items[index];
				state.items.splice(index, 1, {
					...item,
					qty: item.qty + 1,
				});
			} else {
				state.items.push({ ...action.payload, qty: 1 });
			}
			localStorage.setItem("cart", JSON.stringify(state.items));
		},
		remove: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			localStorage.setItem("cart", JSON.stringify(state.items));
		},
		reset: (state, action) => {
			state.status = "idle";
		},
	},
	extraReducers: {
		[checkoutCart.pending]: (state, action) => {
			state.status = "pending";
		},
		[checkoutCart.fulfilled]: (state, action) => {
			state.status = "succeeded";
			state.items = [];
			localStorage.setItem("cart", JSON.stringify([]));
		},
		[checkoutCart.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export const { add, remove, reset } = slice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default slice.reducer;
