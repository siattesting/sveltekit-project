import * as DB from '$lib/database/PouchDB.js';
import { fail } from '@sveltejs/kit';

export async function load() {
	// const docs = await DB.listAllItems()
	const partners = await DB.getPartners();
	// return {
	// 	partnerlist: partners.map((partner) => ({
	// 		id: partner._id,
	// 		rev: partner._rev,
	// 		title: partner.title,
	// 		city: partner.city,
	// 		type: partner.type,
	// 		created_at: partner.created_at,
	// 		updated_at: partner.updated_at
	// 	}))
	// };
	return {
		partners
	};
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		const title = data.get('title');
		const city = data.get('city');

		if (!title || !city) {
			throw new Error();
		}

		try {
			DB.createPartner({
				title,
				city
			});
		} catch (error) {
			return fail(422, {
				title: data.get('title'),
				city: data.get('city'),
				error: error.message
			});
		}
	}
};
