import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { remove } from "./cartSlice";

const CartItem = ({ item, disabled }) => {
	const dispatch = useDispatch();

	return (
		<Row>
			<Col>{item.name}</Col>
			<Col sm="auto">Qty - {item.qty}</Col>
			<Col sm="auto">
				<Button variant="danger" onClick={() => dispatch(remove(item.id))} disabled={disabled}>
					Remove
				</Button>
			</Col>
		</Row>
	);
};

export default CartItem;
