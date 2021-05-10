import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Styled from "./styles";

const Item = ({ item, onClick, disabled }) => {
	return (
		<Styled.MenuItem>
			<Col>
				<Styled.Name>{item.name}</Styled.Name>
				<Styled.Description>{item.description}</Styled.Description>
			</Col>
			<Col sm="auto">
				<Button onClick={() => onClick(item)} disabled={disabled}>
					Add to cart
				</Button>
			</Col>
		</Styled.MenuItem>
	);
};

export default Item;
