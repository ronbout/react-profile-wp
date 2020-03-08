import React from "react";
import ProfileImg from "../ProfileImg";
// import ProfileCompGraph from "../ProfileCompGraph";
import Button from "styledComponents/Button";

const PersonalInfoDisplay = ({ formattedName, candId }) => {
	return (
		<div className="personal-info-display">
			<ProfileImg formattedName={formattedName} candId={candId} />
			<div style={{ marginTop: "48px" }} className="pi-button">
				<a href={`/bio/${candId}`}>
					<Button type="button">View Bio Page</Button>
				</a>
			</div>
			<br />
			<div className="pi-button">
				<a href={`/custom-resume/${candId}`}>
					<Button type="button">Resume PDF</Button>
				</a>
			</div>
			<br />
			<div className="pi-button">
				<a href={`/cand-skills/${candId}`}>
					<Button type="button">Cand Skills</Button>
				</a>
			</div>
		</div>
	);
};

export default PersonalInfoDisplay;
