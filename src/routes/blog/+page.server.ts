import { allLabsQuery as query, settingsQuery, type Lab, type General } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client'; 

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;

	const general = await loadQuery<General>(settingsQuery);
	const initial = await loadQuery<Lab[]>(query, { start: 0, end: 8 });
	const total = await client.fetch<number>('count(*[_type == "lab" && defined(slug.current)])');
	
	return {
		query,
		options: { initial, params: { start: 0, end: 8 }  },
		general	,
  		total
	};
};
