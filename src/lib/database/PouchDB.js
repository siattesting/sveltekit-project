import PouchDB from 'pouchdb';
const DB = new PouchDB('sveltekit-project01');

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
	const { rows } = await DB.allDocs({ include_docs: true });
	const results = rows.filter((row) => row.doc.type === 'partner');
	return results.map(({ doc }) => doc);
}
