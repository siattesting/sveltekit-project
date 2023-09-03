import * as DB from '$lib/database/PouchDB.js';
import { fail, redirect } from '@sveltejs/kit';

export async function load() {
	const partners = await DB.getPartners();

	return {
		partners
	};
}

export const actions = {
	create: async ({ request }) => {
		// get the form data
		const formData = await request.formData();
		const title = String(formData.get('title'));
		const city = String(formData.get('city'));

		// gather errors
		const errors = {};

		if (!title || typeof title !== 'string') {
			errors.user = 'required';
		}
		if (!city || typeof city !== 'string') {
			errors.city = 'required';
		}

		// In case of an error return the data and errors
		if (Object.keys(errors).length > 0) {
			const data = {
				data: Object.fromEntries(formData),
				errors
			};
			return fail(400, data);
		}

		// // Success ! Redirect the user
		// throw redirect(303, '/partners')

		try {
			DB.createPartner({
				title,
				city,
				created_at: '',
				updated_at: '',
				type: '',
				_id: ''
			});
			return { success: true };
			// throw redirect(303, '/partners');
		} catch (error) {
			return fail(422, {
				title: formData.get('title'),
				city: formData.get('city'),
				error: error.message
			});
		}
	}
};
