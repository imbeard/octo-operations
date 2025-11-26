import type { LayoutServerLoad } from './$types';
import { client } from '$lib/sanity/client';
import { settingsQuery } from '$lib/sanity/queries';

export const load: LayoutServerLoad = async (event) => {  // <-- async here
    const { preview } = event.locals;
    
    const settings = await client.fetch(settingsQuery);

    return {
        preview,
        projectInfo: null,  
        settings: settings 
    };
};
