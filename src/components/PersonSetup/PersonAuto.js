/* PersonAuto.js */
/* autocomplete component for person name */
import React, { useState, useEffect } from "react";
import Autocomplete from "styledComponents/Autocomplete";
import dataFetch from "assets/js/dataFetch";

const API_PERSON_SEARCH = "persons/search";

const PersonAuto = ({
	person,
	id = "autocomplete-search",
	label = "Name *",
	handleOnChange,
	handlePersonSelect,
	...rest
}) => {
	const [results, setResults] = useState([]);
	const [autoResults, setAutoResults] = useState([]);
	const isMounted = React.useRef(true);

	const deleteKeys = ["id"];

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	});

	useEffect(() => {
		handleSearch(person);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [person]);

	const handleSearch = async searchVal => {
		const apiQuery = `&name=${searchVal}`;

		let results = await dataFetch(API_PERSON_SEARCH, apiQuery);
		if (results.error) {
			console.log("Fetch error: ", results);
		} else {
			const data = results.map(r => {
				return {
					formattedname: r.formattedName,
					id: r.id
				};
			});
			if (isMounted.current) {
				setResults(results ? results : []);
				setAutoResults(data ? data : []);
			}
		}
	};
	const handleChange = (val, e) => {
		handleOnChange(val);
		//handleSearch(val);
	};

	const handleSelect = (val, valNdx, matches) => {
		handlePersonSelect(results[valNdx]);
	};

	return (
		<div className="input-div">
			<Autocomplete
				id={id}
				label={label}
				data={autoResults}
				dataLabel="formattedname"
				dataValue="id"
				value={person}
				deleteKeys={deleteKeys}
				onChange={handleChange}
				onAutocomplete={handleSelect}
				floating={true}
				filter={null}
				{...rest}
			/>
		</div>
	);
};

export default PersonAuto;
