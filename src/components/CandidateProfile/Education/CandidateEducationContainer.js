/* CandidateEducationContainer.js */
import React, { useState } from "react";
import CandidateEducation from "./CandidateEducation";
import Snackbar from "styledComponents/Snackbar";
import Button from "styledComponents/Button";
import DialogContainer from "styledComponents/DialogContainer";
import { isEmptyObject, objCopy } from "assets/js/library";
import "./css/candidateEducation.css";
import dataFetch from "assets/js/dataFetch";

const API_CANDIDATES = "candidates/";
const API_EDUCATION = "/education";

const CandidateEducationContainer = (props) => {
	const [delNdx, setDelNdx] = useState(-1);
	const [editNdx, setEditNdx] = useState(false);
	const [sortEducation, setSortEducation] = useState(
		props.education
			? objCopy(props.education).sort((a, b) => a.startDate - b.startDate)
			: []
	);
	const [toast, setToast] = useState({});

	const emptyEducation = {
		id: "",
		candidateId: props.candId || "",
		schoolName: "",
		schoolMunicipality: "",
		schoolRegion: "",
		schoolCountry: "",
		degreeName: "",
		degreeType: "non-Degree",
		degreeMajor: "",
		degreeMinor: "",
		startDate: "",
		endDate: "",
		skills: [],
	};

	const addToast = (text, action, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	const updateEducation = async (education) => {
		closeToast();
		let body = {
			education,
		};
		const id = props.candId;
		const httpMethod = "PUT";
		const endpoint = `${API_CANDIDATES}${id}${API_EDUCATION}`;

		let result = await dataFetch(endpoint, "", httpMethod, body);
		if (result.error) {
			console.log("fetch error: ", result);
			addToast("An unknown error has occurred", "Close", false);
			return false;
		} else {
			addToast("Education has been updated");
			setSortEducation(
				education ? education.sort((a, b) => a.startDate - b.startDate) : []
			);
			props.handleSubmit(education);
			return true;
		}
	};

	const handleDelEducation = (ndx) => {
		setDelNdx(ndx);
	};

	const hideDelDialog = () => {
		setDelNdx(-1);
	};

	const confirmedDelete = () => {
		const tmp = objCopy(sortEducation.slice());
		tmp.splice(delNdx, 1);
		updateEducation(tmp);
		hideDelDialog();
	};

	const delDialogActions = [
		{ secondary: true, children: "Cancel", onClick: hideDelDialog },
		<Button
			className="btn btn-danger"
			variant="flat"
			color="primary"
			onClick={confirmedDelete}
		>
			Delete
		</Button>,
	];

	const handleDispEditModal = (ndx) => {
		setEditNdx(ndx);
		props.setShowSkills && props.setShowSkills(false);
	};

	const handleCloseModal = () => {
		setEditNdx(false);
		props.setShowSkills && props.setShowSkills(true);
	};

	const handleSave = async (ed) => {
		const tmp = objCopy(sortEducation.slice());
		tmp[editNdx] = ed;
		const tst = await updateEducation(tmp);
		tst && handleCloseModal();
	};

	const handleAddNewEducation = () => {
		// add empty job to list if not already empty
		// set editNdx to this new element
		sortEducation.push(emptyEducation);
		setEditNdx(sortEducation.length - 1);
		props.setShowSkills && props.setShowSkills(false);
	};

	const handleCancel = () => {
		setEditNdx(false);
		props.setShowSkills && props.setShowSkills(true);
	};

	const actions = {
		delete: handleDelEducation,
		edit: handleDispEditModal,
	};

	return (
		<React.Fragment>
			<CandidateEducation
				sortEducation={sortEducation}
				actions={actions}
				editNdx={editNdx}
				handleAddNewEducation={handleAddNewEducation}
				handleSave={handleSave}
				handleCancel={handleCancel}
				candId={props.candId}
				updateEducation={updateEducation}
			/>
			<DialogContainer
				id="delete-dialog"
				visible={delNdx >= 0}
				onHide={hideDelDialog}
				title="Delete Highlight"
				actions={delDialogActions}
			>
				<p>
					You are going to delete &nbsp;
					{sortEducation.length && delNdx !== -1
						? `${sortEducation[delNdx].degreeName} - ${sortEducation[delNdx].schoolName}`
						: ""}
					.
				</p>
				Are you sure?
			</DialogContainer>
			{isEmptyObject(toast) || (
				<Snackbar
					text={toast.text}
					action={toast.action}
					autohide={toast.autoHide}
					timeout={toast.timeout}
					onDismiss={closeToast}
				/>
			)}
		</React.Fragment>
	);
};

export default CandidateEducationContainer;
