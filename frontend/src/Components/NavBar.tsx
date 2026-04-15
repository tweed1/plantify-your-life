import { Link } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../custom.css';
import flower from '../assets/images/half-main-flower.png';
import logo from '../assets/images/color-logo.png';
import yellow from '../assets/images/rudbeckia-tiny.png';
import straw from '../assets/images/white_strawflower_small.png'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate, useParams } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
	const navItems = [
		{ name: 'Home', path: '/', img: straw },
		{ name: 'Manage', path: '/manage', img: straw },
		{ name: 'Favorites', path: '/favorites', img: yellow },
        { name: 'Meet the Maker', path: '/me', img: yellow },
	];
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light navbar-brand custom-primary-nav bg-gradient pt-4 mx-0">
				<Container
					className="align-items-center justify-content-start"
					id="navbarSupportedContent">
					<Button
						variant="link"
						className="p-0 pe-4 m-1 border-0 flower-btn" // p-0 removes default button padding
						onClick={() => navigate('/')}>
						<Image
							src={logo}
							alt="half a purple bachelor button used for navigation bar decoration"
							rounded
							width={55}
							height={55}></Image>
					</Button>
					<ul className="navbar-nav flex-row mb-2 mb-lg-0 align-items-center justify-content-center mx-3">
						{navItems.map((item) => (
							<li className="nav-item px-2 my-ultra" key={item.name}>
								<img
									src={item.img}
									alt=""
									className="nav-flower"
									aria-hidden="true"
								/>
								<Link to={item.path} className="nav-link-text">
									{item.name}
								</Link>
							</li>
						))}
					</ul>
					{/* <ul className="navbar-nav flex-row mb-2 mb-lg-0 align-items-center justify-content-center mx-3">
						<li className="px-2 ">
							<Link
								to="/"
								className="nav-link active my-ultra nav-pill"
								style={
									{
										color: '#004040',
										'--bg': `url(${yellow})`,
									} as React.CSSProperties
								}>
								{' '}
								Home
							</Link>
						</li>
						<li className="px-2">
							<Link
								to="/search"
								className="nav-link active my-ultra nav-pill"
								style={{ color: '#004040' }}>
								Search
							</Link>
						</li>
						<li className="px-2">
							<Link
								to="/manage"
								className="nav-link active my-ultra nav-pill"
								style={{ color: '#004040' }}>
								Manage
							</Link>
						</li>
						<li className="px-2">
							<Link
								to="/favorites"
								className="nav-link active my-ultra nav-pill"
								style={{ color: '#004040' }}>
								Favorites
							</Link>
						</li>
					</ul> */}
				</Container>
			</nav>
		</>
	);
};

export default Navbar;
