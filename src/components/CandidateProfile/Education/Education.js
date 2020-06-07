/* Education.js */
import React, { useContext } from "react";
import CandidateEducationContainer from "./CandidateEducationContainer";
import MakeExpansion from "components/expansionPanels/MakeExpansion";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";

const EducationDiv = ({ education, candId, setShowSkills }) => {
	const { dispatch } = useContext(CompObjContext);

	const handleSubmit = (education) => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { education },
		});
	};

	return (
		<section>
			<CandidateEducationContainer
				education={education}
				candId={candId}
				handleSubmit={handleSubmit}
				setShowSkills={setShowSkills}
			/>
		</section>
	);
};

const ExpandEducationDiv = MakeExpansion(
	EducationDiv,
	"Education",
	null,
	false,
	0,
	"386px"
);

const Education = ({ education, candId, setShowSkills }) => {
	return (
		<section className="Education profile-section">
			<ExpandEducationDiv
				education={education}
				candId={candId}
				setShowSkills={setShowSkills}
			/>
		</section>
	);
};

export default React.memo(Education, (prev, next) =>
	isEqual(prev.education, next.education)
);
