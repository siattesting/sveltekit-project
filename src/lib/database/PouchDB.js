import PouchDB from 'pouchdb';
import {
	CLOUDANT_DB,
	CLOUDANT_PASSWORD,
	CLOUDANT_URL,
	CLOUDANT_USERNAME
} from '$env/static/private';

export const CRN = {
	apikey: 'XXK7XbEmgqDA0ThE25mcBEwbqIwDzE9YbGJuddIm4ryr',
	host: 'f6cad390-ea46-4737-b8f4-7399351be0fe-bluemix.cloudantnosqldb.appdomain.cloud',
	iam_apikey_description:
		'Auto-generated for key crn:v1:bluemix:public:cloudantnosqldb:eu-gb:a/ad1ddaf755594ddaa79a8e036da41931:ea7f2cda-98b3-467a-9d05-4521d2551560:resource-key:413dad68-f762-4599-9bfa-6b5116b69600',
	iam_apikey_name: 'sveltekit-project',
	iam_role_crn: 'crn:v1:bluemix:public:iam::::serviceRole:Manager',
	iam_serviceid_crn:
		'crn:v1:bluemix:public:iam-identity::a/ad1ddaf755594ddaa79a8e036da41931::serviceid:ServiceId-057357a6-fc4a-4775-b365-c787d3e07346',
	password: 'f30664deb96b7509178aed2a37be1451',
	port: 443,
	url: 'https://apikey-v2-5o6w9w563d5tny9dpo9nzwvus6jc2tyaenf8ccr1u29:f30664deb96b7509178aed2a37be1451@f6cad390-ea46-4737-b8f4-7399351be0fe-bluemix.cloudantnosqldb.appdomain.cloud',
	username: 'apikey-v2-5o6w9w563d5tny9dpo9nzwvus6jc2tyaenf8ccr1u29'
};

const localDB = new PouchDB('sveltekit-project02');

const CloudantDB = new PouchDB(CRN.url + '/sveltekit-project', {
	auth: {
		// name: 'shopsredux-cloudant',
		username: CLOUDANT_USERNAME,
		password: CLOUDANT_PASSWORD
		// username: CRN.username,
		// password: CRN.password
	}
});

// See 'https://dzone.com/articles/multi-user-applications-with-pouchdb-and-ibm-cloud' by Tomasz Waraska fro inspiration

const remote_url = CLOUDANT_URL + '/' + CLOUDANT_DB;
export function connect() {
	const local = localDB;
	// const remote = new PouchDB(remote_url);
	local
		.sync(CloudantDB, { live: true, retry: true })
		.on('change', function (change) {
			console.log('Something changed:', change);
		})
		.on('paused', function (info) {
			console.log('Replication is paused. Probably due to connection', info);
		})
		.on('active', function (info) {
			console.log('Replication was resumed', info);
		})
		.on('error', function (/** @type {any} */ err) {
			console.log('Error during replication: ', err);
		});
}
// export const syncCloundant = () => {
// 	return DB.sync(CloudantDB, { live: true, retry: true });
// };
// syncCloundant();

connect();

/**
 * @param {string} id
 */
export async function readItem(id) {
	const post = await localDB.get(id);
	return post;
}

export async function listAllItems() {
	connect();
	const result = await localDB.allDocs({ include_docs: true });
	const items = result.rows.map((row) => row.doc);
	items.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
	return items;
}

/**
 * @param {any} item
 */
export async function deleteItem(item) {
	const result = await localDB.remove(item);
	return result;
}

/**
 * @param {{ updated_at: string; }} item
 */
export async function updateItem(item) {
	item.updated_at = new Date().toISOString();
	await localDB.put(item);
}

/**
 * @param {{ title: string; city: string; created_at: string; updated_at: string; type: string; _id: string; }} item
 */
export async function createPartner(item) {
	if (item.title === '') {
		throw new Error('You must provide a title');
	}
	if (item.city === '') {
		throw new Error('You must provide a City');
	}
	item.created_at = new Date().toISOString();
	item.updated_at = new Date().toISOString();
	item.type = 'partner';
	item._id = 'partner:' + crypto.randomUUID();
	const result = await localDB.post(item);
	return result;
}

export async function getPartners() {
	const { rows } = await localDB.allDocs({ include_docs: true, startkey: 'partner' });
	const results = rows.filter((row) => row.doc.type === 'partner');
	results.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
	return results.map(({ doc }) => doc);
}

/**
 * @param {{ title: string; email: string; created_at: string; updated_at: string; type: string; _id: string; }} item
 */
export async function createContact(item) {
	if (item.title === '') {
		throw new Error('You must provide a title');
	}
	if (item.email === '') {
		throw new Error('You must provide an Email');
	}
	item.created_at = new Date().toISOString();
	item.updated_at = new Date().toISOString();
	item.type = 'contact';
	item._id = 'contact:' + crypto.randomUUID().toUpperCase();
	const result = await localDB.post(item);
	return result;
}

export async function getContacts() {
	const { rows } = await localDB.allDocs({ include_docs: true, startkey: 'contact' });
	const results = rows.filter((row) => row.doc.type === 'contact');
	results.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
	return results.map(({ doc }) => doc);
}

export async function saveMessage(sender, text) {
	const timestamp = new Date().getTime();
	const _id = 'message:' + sender + '-' + timestamp;
	const type = 'message';
	const message = { _id, timestamp, sender, text, type };
	const result = await localDB.put(message);
	return result;
}
export async function getMessages() {
	const { rows } = await localDB.allDocs({ include_docs: true, startkey: 'message' });
	const results = rows.filter((row) => row.doc.type === 'message');
	results.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
	return results.map(({ doc }) => doc);
}
