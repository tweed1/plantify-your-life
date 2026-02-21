import { useEffect } from "react";
import SearchPlant from "../Components/SearchPlantDB"

const Search = () => {
    useEffect(() => {
        document.title = 'Search'
    },[])

	return (
		<div className="pt-4 search-page">
            <SearchPlant/>
		</div>
	);
};

export default Search;
