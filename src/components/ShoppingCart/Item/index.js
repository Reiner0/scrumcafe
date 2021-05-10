import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Item = ({ item, onClick, disabled }) => {
	return (
		<Row>
			<Col>{item.name}</Col>
			<Col sm="auto">Qty - {item.qty}</Col>
			<Col sm="auto">
				<Button variant="danger" onClick={() => onClick(item.id)} disabled={disabled}>
					Remove
				</Button>
			</Col>
		</Row>
	);
};

export default Item;
