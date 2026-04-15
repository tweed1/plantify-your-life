import '../custom.css';
import logo from '../assets/images/color-logo.png';
import dahlia from '../assets/images/pink_dahlia.png';
import lisi from '../assets/images/pink_lisi.png'
import peony from '../assets/images/pink_peony.png'
import yarrow from '../assets/images/pink_yarrow.png'
import { useNavigate, Link } from 'react-router';
import { Container, Image, Dropdown } from 'react-bootstrap';

const Navbar = () => {
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', path: '/', img: dahlia },
        { name: 'Manage', path: '/manage', img: lisi },
        { name: 'Favorites', path: '/favorites', img: peony },
        { name: 'About', path: '/me', img: yarrow },
    ];

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light navbar-brand custom-primary-nav bg-gradient pt-4 mx-0 position-relative">
                <Container
                    className="align-items-center justify-content-start"
                    id="navbarSupportedContent">

                    {/* Logo as dropdown — all screen sizes */}
                    <Dropdown>
                        <Dropdown.Toggle
                            as="button"
                            className="p-0 pe-4 m-1 border-0 flower-btn bg-transparent"
                            id="logo-dropdown">
                            <Image
                                src={logo}
                                alt="half a purple bachelor button used for navigation bar decoration"
                                rounded
                                width={55}
                                height={55}
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='nav-dropdown'>
                            {navItems.map((item) => (
                                <Dropdown.Item
                                    as={Link}
                                    to={item.path}
                                    key={item.name}>
                                    <img
                                        src={item.img}
                                        alt=""
                                        aria-hidden="true"
                                        className="me-2"
                                        width={25}
                                        height={25}
                                    />
                                    {item.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Static nav items — hidden below lg breakpoint */}
                    <ul className="navbar-nav flex-row mb-2 mb-lg-0 align-items-center justify-content-center mx-3 d-none d-lg-flex">
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

                </Container>
            </nav>
        </>
    );
};

export default Navbar;