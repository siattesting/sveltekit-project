import * as DB from '$lib/database/PouchDB.js';
import { error, fail, redirect } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const contact = await DB.readItem(params.id);
	if (!contact) {
		throw error(404, 'Contact not found');
	}
	return {
		contact
	};
}

export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();
		const { contact } = await DB.readItem(params.id);

		try {
			var doc = await DB.readItem(params.id);
			doc.title = data.get('title');
			doc.email = data.get('email');
			doc.updated_at = new Date().toISOString();

			const updatedItem = { ...doc, ...contact };

			await DB.updateItem(updatedItem);
		} catch (error) {
			console.log(error);
			return fail(422, {
				title: data.get('title'),
				email: data.get('email'),
				error: error.message
			});
		}
		throw redirect(303, '/contacts');
	}
};
