<script lang="ts">
	import { onMount } from 'svelte';

	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import type { Project, AdjacentPost, General } from '$lib/sanity/queries';
	import SimpleBar from 'simplebar';
	import 'simplebar/dist/simplebar.css';

    import ResizeObserver from 'resize-observer-polyfill';

	onMount(() => {
		window.ResizeObserver = ResizeObserver;
	});

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

	let imagesContainer: HTMLElement;
	let simpleBarInstance: SimpleBar | null = null;
	let imagesLoaded = $state(0);
	let currentPostId = $state<string | null>(null);

	
	$effect(() => {
		if (post && post._id !== currentPostId) {
			
			currentPostId = post._id;
			imagesLoaded = 0;
			
			
			if (simpleBarInstance) {
				const scrollElement = simpleBarInstance.getScrollElement();
				if (scrollElement) {
					scrollElement.scrollLeft = 0;
				}
			}
		}
	});

	
	$effect(() => {
		if (imagesContainer && post?.images  && imagesLoaded === post.images.length) {
			
			if (!simpleBarInstance) {
				setTimeout(() => {
					simpleBarInstance = new SimpleBar(imagesContainer, {
						autoHide: false
					});
				}, 10);
			} else {
				
				simpleBarInstance.recalculate();
			}
		}
		else{
			if(!post?.images && simpleBarInstance){
				simpleBarInstance.unMount();
				simpleBarInstance = null;
			}	
		}
	});

	
	onMount(() => {
		return () => {
			if (simpleBarInstance) {
				simpleBarInstance.unMount();
				simpleBarInstance = null;
			}
		};
	});

	function handleImageLoad() {
		imagesLoaded++;
	}

</script>

<svelte:head>
	{#if post}
		<title>{post.title}</title>
		<meta name="description" content={`${post.title}`} />
		{#if post.images?.[0]}
			<meta property="og:image" content={post.images?.[0].image.asset.url} />
		{/if}
	{/if}
</svelte:head>

{#if loading}
	<div class="loading">
		<p>Loading...</p>
	</div>
{:else if post}
	<article class="single-project w-full max-w-[70vw]">
		<div class="outer-images-container  mx-auto max-h-[60vh] max-w-6/12 h-full w-6/12">
			{#if post?.images && post.images.length > 0}
				<div class="images-container    w-full whitespace-nowrap" bind:this={imagesContainer}>
					{#each post.images as image}
						<div class="image-wrapper image-wrapper inline-block max-h-full " >
							<img 
								src={image.image.asset.url} 
								alt={image.description || post.title || 'Project image'}
								class="project-image project-image max-h-[60vh]   w-auto inline-block"
								onload={handleImageLoad}
							/>
							
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-white">No images available for this project.</p>
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
