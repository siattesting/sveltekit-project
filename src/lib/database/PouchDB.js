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
