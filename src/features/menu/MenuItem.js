import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { add } from "../cart/cartSlice";
import Styled from "./styles";

const MenuItem = ({ item, disabled }) => {
	const dispatch = useDispatch();

	return (
		<Styled.MenuItem>
			<Col>
				<Styled.MenuItemName>{item.name}</Styled.MenuItemName>
				<Styled.MenuItemDescription>{item.description}</Styled.MenuItemDescription>
			</Col>
			<Col sm="auto">
				<Button onClick={() => dispatch(add(item))} disabled={disabled}>
					Add to cart
				</Button>
			</Col>
		</Styled.MenuItem>
	);
};

export default MenuItem;
