import * as DB from '$lib/database/PouchDB.js';
import { error, redirect } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */

export async function load({ params }) {
	const partner = await DB.readItem(params.id);
	if (!partner) {
		throw error(404, 'Partner not found');
	}
	return {
		partner
	};
}

export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();
		const { partner } = await DB.readItem(params.id);

		try {
			var doc = await DB.readItem(params.id);
			doc.title = data.get('title');
			doc.city = data.get('city');
			doc.updated_at = new Date().toISOString();

			const updatedItem = { ...doc, ...partner };

			await DB.updateItem(updatedItem);
		} catch (error) {
			console.log(error);
			return fail(422, {
				title: data.get('title'),
				email: data.get('city'),
				error: error.message
			});
		}
		throw redirect(303, '/partners');
	}
};
