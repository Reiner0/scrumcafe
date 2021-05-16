import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import menuReducer from "../features/menu/menuSlice";

export default configureStore({
	reducer: {
		cart: cartReducer,
		menu: menuReducer,
	},
});
