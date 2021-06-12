import { useRecoilValueLoadable, useRecoilState } from "recoil";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { cartStatusState, menuState } from "../../recoil/atoms";
import MenuItem from "./MenuItem";

const Menu = () => {
	const { state, contents: menuItems } = useRecoilValueLoadable(menuState);
	const [cartStatus, setCartStatus] = useRecoilState(cartStatusState);
	const { isComplete, isCheckingOut } = cartStatus;

	if (isComplete) {
		return (
			<>
				<Row>
					<Col>Your order has been placed. Thank you!</Col>
				</Row>
				<Row>
					<Col>
						<Button
							onClick={() => setCartStatus((oldStatus) => ({ ...oldStatus, isComplete: false }))}
						>
							Continue Shopping
						</Button>
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
				{state === "hasValue" ? (
					menuItems.map((menuItem) => (
						<MenuItem key={menuItem.id} item={menuItem} disabled={isCheckingOut} />
					))
				) : (
					<div>Loading...</div>
				)}
			</Col>
		);
	}
};

export default Menu;
