<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import type { Lab, AdjacentPost, General } from '$lib/sanity/queries';

	interface ExtendedPageData extends PageData {
		previousPost: AdjacentPost | null;
		nextPost: AdjacentPost | null;
		general: { data: General };
	}

	let { data }: { data: ExtendedPageData } = $props();

	// Create reactive query that updates when params change
	const q = $derived(useQuery(data.query, data.params, data.options));

	// Extract reactive values from the query store
	const post = $derived($q?.data as Lab | null);
	const loading = $derived($q?.loading as boolean);
	const error = $derived($q?.error);

	// Extract other data properties directly from data
	const previousPost = $derived(data.previousPost);
	const nextPost = $derived(data.nextPost);
	const general = $derived(data.general);
</script>

<svelte:head>
	{#if post}
		<title>{post.title}</title>
		<meta name="description" content={`Read ${post.title} on our blog`} />
		{#if post.image}
			<meta property="og:image" content={urlFor(post.image).width(1200).height(630).url()} />
		{/if}
	{/if}
</svelte:head>

{#if loading}
	<div class="loading">
		<p>Loading...</p>
	</div>
{:else if post}
	<article class="post flex  gap-x-10 max-w-8/12">
		<div class="main-image relative">
		
			{#if post.image}
				<img
					class="post__cover max-h-[50vh] w-auto "
					src={urlFor(post.image).url()}
					alt={`Cover image for ${post.title}`}
				/>
			{:else}
				<div class="post__cover--none"></div>
			{/if}
		</div>
		<div class="post__container flex flex-col gap-5 text-white max-w-75">
			<div class="info-container flex flex-col">
				<h1 class="bebas-neue-regular text-3xl">{post.title}</h1>
				<time class="text-xs" datetime={post.publishedAt}>
					<strong>{formatDate(post.publishedAt)}</strong>
				</time>
			</div>
	


			{#if post.content}
				<div class="post__content prose ">
					<p>
						{@html post.content} 
					</p>
				</div>
			{/if}
		</div>
	</article>

	<nav class="post__nav absolute w-full text-white px-5 flex flex-col md:flex-row md:justify-between md:items-center pointer-events-none"  aria-label="Navigate between blog posts">
		{#if previousPost}
			<a
				href="/blog/{previousPost.slug.current}"
				class="pointer-events-auto"
			>
				previous article
			</a>
		{/if}

		{#if nextPost}
			<a href="/blog/{nextPost.slug.current}" class="pointer-events-auto ml-auto">
				next article
			</a>
		{/if}
	</nav>
{:else if error}
	<div class="error">
		<p>Error loading post: {error.message || 'Something went wrong'}</p>
	</div>
{:else}
	<div class="not-found">
		<p>No post found.</p>
	</div>
{/if}

<style>
	:global(#scrollContainer) {
		scroll-snap-type: initial;
	}
</style>
