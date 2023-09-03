import {
	CLOUDANT_APIKEY,
	CLOUDANT_PASSWORD,
	CLOUDANT_URL,
	CLOUDANT_USERNAME,
	CLOUDANT_HOST
} from '$env/static/private';
export const CloudantCRN = {
	apikey: CLOUDANT_APIKEY,
	host: CLOUDANT_HOST,
	iam_apikey_description:
		'Auto-generated for key crn:v1:bluemix:public:cloudantnosqldb:eu-gb:a/ad1ddaf755594ddaa79a8e036da41931:ea7f2cda-98b3-467a-9d05-4521d2551560:resource-key:413dad68-f762-4599-9bfa-6b5116b69600',
	iam_apikey_name: 'sveltekit-project',
	iam_role_crn: 'crn:v1:bluemix:public:iam::::serviceRole:Manager',
	iam_serviceid_crn:
		'crn:v1:bluemix:public:iam-identity::a/ad1ddaf755594ddaa79a8e036da41931::serviceid:ServiceId-057357a6-fc4a-4775-b365-c787d3e07346',
	password: CLOUDANT_PASSWORD,
	port: 443,
	url: CLOUDANT_URL,
	username: CLOUDANT_USERNAME
};
