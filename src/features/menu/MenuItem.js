import { useSetRecoilState } from "recoil";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { cartState } from "../../recoil/atoms";
import Styled from "./styles";

const MenuItem = ({ item, disabled }) => {
	const setCart = useSetRecoilState(cartState);

	const addItem = () => {
		setCart((cart) => {
			const newCart = [...new Set(cart)];
			const index = newCart.findIndex(({ id }) => id === item.id);
			if (index >= 0) {
				const existingItem = newCart[index];
				newCart.splice(index, 1, {
					...item,
					qty: existingItem.qty + 1,
				});
			} else {
				newCart.push({ ...item, qty: 1 });
			}
			localStorage.setItem("cart", JSON.stringify(newCart));
			return newCart;
		});
	};

	return (
		<Styled.MenuItem>
			<Col>
				<Styled.MenuItemName>{item.name}</Styled.MenuItemName>
				<Styled.MenuItemDescription>{item.description}</Styled.MenuItemDescription>
			</Col>
			<Col sm="auto">
				<Button onClick={addItem} disabled={disabled}>
					Add to cart
				</Button>
			</Col>
		</Styled.MenuItem>
	);
};

export default MenuItem;
