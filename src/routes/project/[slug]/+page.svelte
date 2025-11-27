<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import type { Project, AdjacentPost, General } from '$lib/sanity/queries';

	interface ExtendedPageData extends PageData {
		previousPost: AdjacentPost | null;
		nextPost: AdjacentPost | null;
		general: { data: General };
	}

	let { data }: { data: ExtendedPageData } = $props();

	
	const q = $derived(useQuery(data.query, data.params, data.options));

	const post = $derived($q?.data as Project | null);
	const loading = $derived($q?.loading as boolean);
	const error = $derived($q?.error);


	const previousPost = $derived(data.previousPost);
	const nextPost = $derived(data.nextPost);
	const general = $derived(data.general);
</script>

<svelte:head>
	{#if post}
		<title>{post.title}</title>
		<meta name="description" content={`${post.title}`} />
		{#if post.images?.[0]}
			<meta property="og:image" content={urlFor(post.images?.[0].image.asset.url).width(1200).height(630).url()} />
		{/if}
	{/if}
</svelte:head>

{#if loading}
	<div class="loading">
		<p>Loading...</p>
	</div>
{:else if post}
	<article class="single-project ">
		<div class="outer-images-container">
			{#if post?.images && post.images.length > 0}
				<div class="images-container mx-auto max-h-[60vh] max-w-6/12 overflow-x-auto overflow-y-hidden whitespace-nowrap">
					{#each post.images as image}
						<div class="image-wrapper image-wrapper inline-block max-h-full">
							<img 
								src={image.image.asset.url} 
								alt={image.description || post.title || 'Project image'}
								class="project-image project-image max-h-[60vh] h-full w-auto inline-block"
							/>
							
						</div>
					{/each}
				</div>
			{:else}
				<p>No images available for this project.</p>
			{/if}
			
		</div>
		
	</article>

	<nav class="post__nav absolute w-full text-white px-5 flex flex-row justify-between items-center pointer-events-none"  aria-label="Navigate between blog posts">
		{#if previousPost}
			<a
				href="/project/{previousPost.slug.current}"
				class="pointer-events-auto nav-link  transition hover:text-red"
			>
				prev
			</a>
		{/if}

		{#if nextPost}
			<a href="/project/{nextPost.slug.current}" class="nav-link  transition hover:text-red pointer-events-auto ml-auto">
				next
			</a>
		{/if}
	</nav>
{:else if error}
	<div class="error">
		<p>Error loading post: {error.message || 'Something went wrong'}</p>
	</div>
{:else}
	<div class="not-found">
		<p>No propject found.</p>
	</div>
{/if}

<style>
	:global(#scrollContainer) {
		scroll-snap-type: initial;
	}
</style>
