import PouchDB from 'pouchdb';
import { CloudantCRN } from './CloudantCRN';

const DB = new PouchDB('sveltekit-project02');

const CloundantDB = new PouchDB(CloudantCRN.url + '/sveltekit-project', {
	auth: {
		// name: 'shopsredux-cloudant',
		username: CloudantCRN.username,
		password: CloudantCRN.password
	}
});

export const syncCloundant = () => {
	return DB.sync(CloundantDB, { live: true, retry: true });
};
syncCloundant();

/**
 * @param {string} id
 */
export async function readItem(id) {
	const post = await DB.get(id);
	return post;
}

export async function listAllItems() {
	const result = await DB.allDocs({ include_docs: true });
	const items = result.rows.map((row) => row.doc);
	return items;
}

/**
 * @param {any} item
 */
export async function deleteItem(item) {
	const result = await DB.remove(item);
	return result;
}

/**
 * @param {{ updated_at: string; }} item
 */
export async function updateItem(item) {
	item.updated_at = new Date().toISOString();
	await DB.put(item);
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
	const result = await DB.post(item);
	return result;
}

export async function getPartners() {
	const { rows } = await DB.allDocs({ include_docs: true, startkey: 'partner' });
	const results = rows.filter((row) => row.doc.type === 'partner');
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
	const result = await DB.post(item);
	return result;
}

export async function getContacts() {
	const { rows } = await DB.allDocs({ include_docs: true, startkey: 'contact' });
	const results = rows.filter((row) => row.doc.type === 'contact');
	return results.map(({ doc }) => doc);
}
