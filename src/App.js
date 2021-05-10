import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useLocalStorageState } from "ahooks";

import Layout from "./components/Layout";
import Menu from "./components/Menu";
import ShoppingCart from "./components/ShoppingCart";
import OrderComplete from "./components/OrderComplete";

function App() {
	const [cart, setCart] = useLocalStorageState("cart", []);
	const [checkingOut, setCheckingOut] = useState(false);
	const [complete, setComplete] = useState(false);

	const handleAdd = (menuItem) => {
		const updatedCart = [...cart];
		const index = cart.findIndex((cartItem) => cartItem.id === menuItem.id);
		if (index >= 0) {
			const cartItem = updatedCart[index];
			updatedCart.splice(index, 1, {
				...cartItem,
				qty: cartItem.qty + 1,
			});
			setCart(updatedCart);
		} else {
			setCart((prev) => [...prev, { ...menuItem, qty: 1 }]);
		}
	};

	const handleDelete = (id) => setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));

	const handleCheckout = () => {
		setCheckingOut(true);
		fetch("/checkout", {
			method: "post",
			body: JSON.stringify(cart),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(() => {
				setComplete(true);
			})
			.finally(() => {
				setCheckingOut(false);
			});
	};

	const handleReset = () => {
		setCart([]);
		setComplete(false);
	};

	return (
		<Layout>
			{complete ? (
				<OrderComplete onClick={handleReset} />
			) : (
				<>
					<Menu handleAdd={handleAdd} checkingOut={checkingOut} />
					<ShoppingCart
						cart={cart}
						handleCheckout={handleCheckout}
						handleDelete={handleDelete}
						checkingOut={checkingOut}
					/>
				</>
			)}
		</Layout>
	);
}

export default App;
