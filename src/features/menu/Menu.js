import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "./MenuItem";
import { selectMenuItems, fetchItems } from "./menuSlice";
import { selectCartStatus, reset } from "../cart/cartSlice";

const Menu = () => {
	const dispatch = useDispatch();
	const menuItems = useSelector(selectMenuItems);
	const menuStatus = useSelector((state) => state.menu.status);
	const cartStatus = useSelector(selectCartStatus);
	const checkingOut = cartStatus === "pending";
	const complete = cartStatus === "succeeded";

	useEffect(() => {
		if (menuStatus === "idle") {
			dispatch(fetchItems());
		}
	}, [menuStatus, dispatch]);

	if (complete) {
		return (
			<>
				<Row>
					<Col>Your order has been placed. Thank you!</Col>
				</Row>
				<Row>
					<Col>
						<Button onClick={() => dispatch(reset())}>Continue Shopping</Button>
					</Col>
				</Row>
			</>
		);
	} else {
		return (
			<Col sm={8}>
				<Row>
					<h4>Menu</h4>
				</Row>
				{menuItems.map((menuItem) => (
					<MenuItem key={menuItem.id} item={menuItem} disabled={checkingOut} />
				))}
			</Col>
		);
	}
};

export default Menu;
