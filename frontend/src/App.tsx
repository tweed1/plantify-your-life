import "./App.css";
import { HashRouter, Routes, Route } from "react-router";

import Home from "./Views/Home";
import Search from "./Views/Search";
import ZoneMap from "./Views/ZoneMap";
import Zone from "./Views/Zone";
import AppLayout from "./Layouts/AppLayout";
import PlantDetails from "./Views/PlantDetails";
import Manage from "./Views/Manage";
import EditPlant from "./Views/EditPlant";


const App = () => {
	return (
		<div>
			<HashRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Home />} />
						<Route path="search" element={<Search />} />
						<Route path="zonemap" element={<ZoneMap />} />
						<Route path="zone/:id" element={<Zone />} />
                        <Route path="manage" element={<Manage />} />
                        <Route path="edit/:id" element={<EditPlant />} />
						<Route
							path="plant-details/:id"
							element={<PlantDetails />}
						/>
					</Route>
				</Routes>
			</HashRouter>
		</div>
	);
};

export default App;
