import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";

function App() {
	return (
		<RecoilRoot>
			<Container>
				<Row>
					<Col>
						<h1>Scrum Cafe</h1>
					</Col>
				</Row>
				<Row>
					<Menu />
					<Cart />
				</Row>
			</Container>
		</RecoilRoot>
	);
}

export default App;
