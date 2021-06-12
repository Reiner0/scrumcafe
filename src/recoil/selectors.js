import { selector } from "recoil";
import { cartState } from "./atoms";

export const cartStatsState = selector({
	key: "cartStatsState",
	get: ({ get }) => {
		const cart = get(cartState);
		const totalItems = cart.length;
		const totalCalories = cart.reduce((acc, item) => {
			return acc + item.calories * item.qty;
		}, 0);

		console.log(cart);

		return {
			totalItems,
			totalCalories,
		};
	},
});
