import { useEffect } from "react";
import { useNavigate } from 'react-router';
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
