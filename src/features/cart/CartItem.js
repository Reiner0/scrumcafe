import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useSetRecoilState } from "recoil";
import { cartState } from "../../recoil/atoms";

const CartItem = ({ item, disabled }) => {
	const setCart = useSetRecoilState(cartState);

	const deleteItem = () => {
		setCart((cart) => {
			const newCart = cart.filter(({ id }) => id !== item.id);
			localStorage.setItem("cart", JSON.stringify(newCart));
			return newCart;
		});
	};

	return (
		<Row>
			<Col>{item.name}</Col>
			<Col sm="auto">Qty - {item.qty}</Col>
			<Col sm="auto">
				<Button variant="danger" onClick={deleteItem} disabled={disabled}>
					Remove
				</Button>
			</Col>
		</Row>
	);
};

export default CartItem;
