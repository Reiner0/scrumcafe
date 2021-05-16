import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import { selectCartItems, selectCartStatus, checkoutCart } from "./cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const cartStatus = useSelector(selectCartStatus);
	const checkingOut = cartStatus === "pending";
	const complete = cartStatus === "succeeded";

	if (complete) {
		return <></>;
	} else {
		return (
			<Col sm={4}>
				<Row>
					<h4>Shopping Cart</h4>
				</Row>
				{cartItems.map((cartItem) => (
					<CartItem key={cartItem.id} item={cartItem} disabled={checkingOut} />
				))}
				{cartItems.length > 0 ? (
					<Row>
						<Button onClick={() => dispatch(checkoutCart())} disabled={checkingOut}>
							{checkingOut ? "Processing..." : "Checkout"}
						</Button>
					</Row>
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
