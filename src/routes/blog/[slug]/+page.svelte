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
		{#if post.mainImage}
			<meta property="og:image" content={urlFor(post.mainImage).width(1200).height(630).url()} />
		{/if}
	{/if}
</svelte:head>

{#if loading}
	<div class="loading">
		<p>Loading...</p>
	</div>
{:else if post}
	<article class="post mt-15">
		<div class="main-image relative">
			<div class="info-container bg-white  absolute top-1/2 -translate-y-1/2 w-full">
				<div class="px-4 2xl:container 2xl:mx-auto gap-4 flex flex-col md:flex-row md:justify-between md:items-center">
					<h1 class="text-xl">{post.title}</h1>
					<time class="text-xs" datetime={post.publishedAt}>
						{formatDate(post.publishedAt)}
					</time>

				</div>
			</div>

		
			{#if post.mainImage}
				<img
					class="post__cover w-full object-cover aspect-4/3"
					src={urlFor(post.mainImage).url()}
					alt={`Cover image for ${post.title}`}
				/>
			{:else}
				<div class="post__cover--none"></div>
			{/if}
		</div>
		<div class="post__container px-4 2xl:container 2xl:mx-auto">
			
			{#if post.body}
				<div class="post__content prose mx-auto mt-8">
					<PortableText onMissingComponent={false} value={post.body} />
				</div>
			{/if}
		</div>
	</article>

	<nav class="post__nav my-15 px-4 2xl:container 2xl:mx-auto gap-4 flex flex-col md:flex-row md:justify-between md:items-center "  aria-label="Navigate between blog posts">
		{#if previousPost}
			<a
				href="/blog/{previousPost.slug.current}"
				class="flex flex-col  md:w-1/2 text-orange hover:text-black"
			>
				<span class="text-md">{general?.data?.Prev_Article || 'Previous Article'}</span>
				<span class="text-xs">{previousPost.title}</span>
			</a>
		{/if}

		{#if nextPost}
			<a href="/blog/{nextPost.slug.current}" class="flex flex-col ml-auto text-right  md:w-1/2 text-orange hover:text-black">
				<span class="text-md">{general?.data?.Next_Article || 'Next Article'}</span>
				<span class="text-xs">{nextPost.title}</span>
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
