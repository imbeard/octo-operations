<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import { allLabsQuery as query,  type Lab} from '$lib/sanity/queries';
	import { client } from '$lib/sanity/client'; // or wherever you export your Sanity client

	let loading = false;
	let page = 0;
	

	export let data: PageData;
	const {options,general, total } = data;
	const { initial, params } = options;

	const limit = options.params.end;

	
	let posts: Lab[] = [];

	const q = useQuery(data);

	$: posts = $q?.data ?? [];
	let hasMore = false;

	if (total > limit) {
      hasMore = true;
    }

	async function loadMore() {
	loading = true;

	const start = (page + 1) * limit;
	const end = start + limit;

	try {
		const newPosts: Lab[] = await client.fetch(query, { start, end });

		if (posts.length + newPosts.length >= total) {
			hasMore = false;
		}

		posts = [...posts, ...newPosts];
		page += 1;
	} catch (err) {
		console.error('Failed to load more posts:', err.message || err);
	} finally {
		loading = false;
	}
	}

</script>

<section class="pb-10 px-4 2xl:container 2xl:mx-auto mt-15">
	
	{#if posts.length}

		<div class="posts-container  grid grid-cols-1 gap-5  lg:grid-cols-6">
			{#each posts as post,index}
			

			<a href=/blog/{post.slug.current} class="{index === 0 ? 'bg-black md:col-span-3 text-orange hover:text-white' : index === 1 ? 'md:col-span-3 bg-orange text-white hover:text-black' : 'bg-orange md:col-span-2 text-white  hover:text-black'} rounded-lg overflow-hidden"
			
			>
				<article >
					<div class="image-container relative">
						{#if index === 0}
							<span class="rounded-br-lg label absolute bg-orange text-white uppercase py-1 px-4 top-0 left-0 text-xl" >{general.data.New_Article}</span>
						{/if}
						{#if post.mainImage}
							<img
								class="post__cover object-cover aspect-4/3"
								src={urlFor(post.mainImage).url()}
								alt="Cover image for {post.title}"
							/>
						{:else}
							<div class="post__cover--none" ></div>
						{/if}
					</div>
						
					<div class="text-container mt-2 p-3">
						
						<h3 class="text-xl">{post.title}</h3>
						
						<div class="info-footer mt-7 flex justify-between text-xs">
							<span>{formatDate(post.publishedAt)}</span>
							
						</div>
					</div>
				</article>

			</a>
		{/each}


		</div>	
		
		{#if hasMore}
		<div class="flex justify-center mt-15">
			<button class="text-orange hover:text-black cursor-pointer" on:click={loadMore}  disabled={loading}> 
			{#if loading}
				Loading...
				{:else}
				{general.data.Load_More}
				{/if}
			</button>	

		</div>
		{/if}

	{:else}
		No articles yet.
	{/if}
</section>

<style>
	:global(#scrollContainer) {
		scroll-snap-type: initial;
	}
</style>	
