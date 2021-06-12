import { atom, selector } from "recoil";

export const cartState = atom({
	key: "cartState",
	default: selector({
		key: "cartState/default",
		get: () => JSON.parse(localStorage.getItem("cart")) || [],
	}),
});

export const cartStatusState = atom({
	key: "cartStatusState",
	default: {
		isComplete: false,
		isCheckingOut: false,
	},
});

export const fetchMenu = async () => {
	const response = await fetch("/menu");
	const items = (await response.json()) || [];
	return items;
};

export const menuState = atom({
	key: "menuState",
	default: selector({
		key: "menuState/default",
		get: () => fetchMenu(),
	}),
});
