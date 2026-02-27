import { Link } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../custom.css";
import flower from "../assets/images/half-main-flower.png";

const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light navbar-brand custom-primary bg-gradient py-0 mx-0 ">
				<div
					className="container-fluid d-flex align-items-center justify-content-between"
					id="navbarSupportedContent">
					<Link
						to="/"
						className="navbar-brand me-3 text-white my-agu fs-4">
						PLANTIFY
					</Link>
					<ul className="navbar-nav flex-row mb-2 mb-lg-0 align-items-center justify-content-center mx-3">
						<li className="nav-item px-2">
							<Link
								to="/"
								className="nav-link active text-white my-ultra nav-pill">
								{" "}
								Home
							</Link>
						</li>
						<li className="px-2">
							<Link
								to="/search"
								className="nav-link active text-white my-ultra nav-pill">
								Search
							</Link>
						</li>
                        <li className="px-2">
							<Link
								to="/manage"
								className="nav-link active text-white my-ultra nav-pill">
								Manage
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			{/* Flower attached to navbar */}
			<Container fluid className="mx-0 px-0">
				<Row>
					<Col></Col>
					<Col></Col>
					<Col className="">
						<Image
							src={flower}
							alt="half a purple bachelor button used for navigation bar decoration"
							rounded
							width={150}
							height={75}></Image>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Navbar;
