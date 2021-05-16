import styled from "styled-components";
import Row from "react-bootstrap/Row";

const MenuItem = styled(Row)`
	border: 1px solid #cdcdcd;
	border-radius: 5px;
	margin: 1rem 0;
	padding: 1rem;
`;

const MenuItemName = styled(Row)`
	font-weight: bold;
`;

const MenuItemDescription = styled(Row)``;

const Styled = {
	MenuItem,
	MenuItemName,
	MenuItemDescription,
};

export default Styled;
