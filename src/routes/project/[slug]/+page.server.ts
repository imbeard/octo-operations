import {
	projectQuery as query,
	previousProjectQuery,
	nextProjectQuery,
	settingsQuery,
	type Project,
	type AdjacentPost,
	type General
} from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };
	const initial = await loadQuery<Project>(query, params);

	if (!initial?.data) {
		return { status: 404 };
	}

	const projectNumber = initial.data.projectNumber;

	const [previousPost, nextPost] = await Promise.all([
		client.fetch<AdjacentPost | null>(previousProjectQuery, { projectNumber }),
		client.fetch<AdjacentPost | null>(nextProjectQuery, { projectNumber })
	]);

	const general = await loadQuery<General>(settingsQuery);

	// We pass the data in a format that is easy for `useQuery` to consume in the
	// corresponding `+page.svelte` file, but you can return the data in any
	// format you like.
	return {
		query,
		params,
		options: { initial },
		previousPost,
		nextPost,
		general
	};
};
