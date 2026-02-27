import { useEffect } from "react";
import SearchPlant from "../Components/SearchPlantDB"
import ManageSearch from "../Components/ManageSearch";

const Manage = () => {
    useEffect(() => {
        document.title = 'Manage'
    },[])

	return (
		<div className="pt-4 search-page">
            <ManageSearch/>
		</div>
	);
};

export default Manage;
