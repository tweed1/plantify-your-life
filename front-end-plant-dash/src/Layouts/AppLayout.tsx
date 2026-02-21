import { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
	useEffect(() => {
		document.title = "Search";
	}, []);

	return (
		<>
			<main className="layout">
				<NavBar />
				<Outlet />
			</main>

			<Footer />
		</>
	);
};

export default AppLayout;
