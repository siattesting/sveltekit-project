import { fail } from '@sveltejs/kit';
import * as DB from '$lib/database/PouchDB.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const contacts = await DB.getContacts();
	return {
		contacts
	};
}

export const actions = {
	create: async ({ request }) => {
		// get the form data
		const formData = await request.formData();

		const title = String(formData.get('title'));
		const email = String(formData.get('email'));

		//gather errors
		const errors = {};
		if (!title || typeof title !== 'string' || title.length < 2) {
			errors.title = 'required';
			return fail(400, { title, missing: true });
		}
		if (!email || typeof email !== 'string' || email.length < 2) {
			errors.email = 'required';
			return fail(400, { email, missing: true });
		}

		// In case of errors, return the data and errors
		if (Object.keys(errors).length > 0) {
			const data = {
				data: Object.fromEntries(formData),
				errors
			};
			return fail(400, data);
		}

		try {
			const result = await DB.createContact({
				title,
				email,
				created_at: '',
				updated_at: '',
				type: '',
				_id: ''
			});
			return { success: true, message: result };
		} catch (error) {
			console.error(error);
			return fail(422, {
				title: formData.get('title'),
				email: formData.get('email'),
				error: error.message
			});
		}
	}
};
