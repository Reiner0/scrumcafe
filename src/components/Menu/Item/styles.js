import styled from "styled-components";
import Row from "react-bootstrap/Row";

const Styled = {
	MenuItem: styled(Row)`
		border: 1px solid #cdcdcd;
		border-radius: 5px;
		margin: 1rem 0;
		padding: 1rem;
	`,
	Name: styled(Row)`
		font-weight: bold;
	`,
	Description: styled(Row)``,
};

export default Styled;
