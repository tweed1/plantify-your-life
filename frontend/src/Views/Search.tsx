import { useEffect } from "react";
import SearchPlant from "../Components/SearchPlantDB"

const Search = () => {
    useEffect(() => {
        document.title = 'Search'
    },[])

	return (
		<div className="pt-4 top-spacing ">
            <SearchPlant/>
		</div>
	);
};

export default Search;
