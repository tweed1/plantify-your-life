
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

import "../custom.css";
import logo from "../assets/images/flower.jpg";

const Footer = () => {
	console.log(logo);
	return (
		<footer>
			<Container fluid className="p-3 custom-primary bg-gradient d-flex">
				<Row className="text-white sans foot-row flex-fill">
					<Col className="footer-col">
						<Stack className="ps-5 ms-5">
							<Image
								src={logo}
								alt="looking down at a purple bachelor button growing in a field"
								rounded
								width={120}
								height={120}></Image>
							<h1 className="my-agu fs-4 text-start my-0">
								Plantify
							</h1>
							<p className="my-agu text-start my-0">
								Designed by Katie Tweed
							</p>
						</Stack>
					</Col>
					<Col className="footer-col">
						<Nav className="flex-column my-ultra">
							References
							<NavLink
								href="https://perenual.com/docs/api"
								className="text-white link my-default pb-0">
								{" "}
								Primary API from Perenual
							</NavLink>
							<NavLink
								href="https://github.com/kgjenkins/ophz"
								className="text-white link my-default">
								{" "}
								Geojson from OPHZ
							</NavLink>
						</Nav>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
