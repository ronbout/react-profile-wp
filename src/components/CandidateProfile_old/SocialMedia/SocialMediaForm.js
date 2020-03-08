/* SocialMediaForm.js */
import React from "react";
import { InpString, Form } from "components/forms/formInputs";
import { useForm } from "components/forms/useForm";
import { isEqual } from "lodash";

const SocialMediaForm = ({ formData, handleSubmit }) => {
	const { formFields, BtnSubmit, BtnCancel, dirtyMsg } = useForm(
		formData,
		{ linkedIn: "", github: "" },
		handleSubmit
	);
	return (
		<Form>
			{dirtyMsg}
			<div className="social-form">
				<InpString
					id="linkedIn"
					name="linkedIn"
					label="LinkedIn"
					value={formFields.linkedIn}
					reqWarn={!formFields.github}
					autoFocus
				/>
				<InpString
					id="github"
					name="github"
					label="Github"
					value={formFields.github}
					reqWarn={!formFields.linkedIn}
				/>
			</div>
			<div className="button-section">
				<BtnSubmit>Save</BtnSubmit>
				<BtnCancel checkDirty>Cancel</BtnCancel>
			</div>
		</Form>
	);
};

export default React.memo(SocialMediaForm, (prev, next) => {
	return isEqual(prev.formData, next.formData);
});
