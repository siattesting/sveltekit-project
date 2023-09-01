import * as DB from '$lib/database/PouchDB.js';
import { error } from '@sveltejs/kit';
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
