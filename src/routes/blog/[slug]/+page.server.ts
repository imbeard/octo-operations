import {
	labQuery as query,
	previousLabQuery,
	nextLabQuery,
	settingsQuery,
	type Lab,
	type AdjacentPost,
	type General
} from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { slug } = event.params;

	const params = { slug };
	const initial = await loadQuery<Lab>(query, params);

	if (!initial?.data) {
		return { status: 404 };
	}

	const publishedAt = initial.data.publishedAt;

	const [previousPost, nextPost] = await Promise.all([
		client.fetch<AdjacentPost | null>(previousLabQuery, { publishedAt }),
		client.fetch<AdjacentPost | null>(nextLabQuery, { publishedAt })
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
