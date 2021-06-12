import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useRecoilState, useRecoilValue } from "recoil";

import CartItem from "./CartItem";
import { cartState, cartStatusState } from "../../recoil/atoms";
import { cartStatsState } from "../../recoil/selectors";

const Cart = () => {
	const [cart, setCart] = useRecoilState(cartState);
	const [cartStatus, setCartStatus] = useRecoilState(cartStatusState);
	const { totalCalories } = useRecoilValue(cartStatsState);

	const { isComplete, isCheckingOut } = cartStatus;

	const checkout = async () => {
		try {
			setCartStatus((oldStatus) => ({ ...oldStatus, isCheckingOut: true }));
			await fetch("/checkout", {
				method: "post",
				body: JSON.stringify(cart),
				headers: {
					"Content-Type": "application/json",
				},
			});
			setCart([]);
			localStorage.setItem("cart", JSON.stringify([]));
			setCartStatus((oldStatus) => ({ ...oldStatus, isComplete: true }));
		} catch (err) {
			throw new Error(err.message);
		} finally {
			setCartStatus((oldStatus) => ({ ...oldStatus, isCheckingOut: false }));
		}
	};

	if (isComplete) {
		return <></>;
	} else {
		return (
			<Col sm={4}>
				<Row>
					<h4>Shopping Cart</h4>
				</Row>
				{cart.map((cartItem) => (
					<CartItem key={cartItem.id} item={cartItem} disabled={isCheckingOut} />
				))}
				{cart.length > 0 ? (
					<>
						<Row>Total calories: {totalCalories}</Row>
						<Row>
							<Button onClick={checkout} disabled={isCheckingOut}>
								{isCheckingOut ? "Processing..." : "Checkout"}
							</Button>
						</Row>
					</>
				) : (
					<Row>
						<Col>Cart is empty</Col>
					</Row>
				)}
			</Col>
		);
	}
};

export default Cart;
