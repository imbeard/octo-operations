<script lang="ts">
	import { onMount } from 'svelte';

	import { PortableText } from '@portabletext/svelte';
	import { useQuery } from '@sanity/svelte-loader';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	import type { Lab, AdjacentPost, General } from '$lib/sanity/queries';

	import SimpleBar from 'simplebar';
	import 'simplebar/dist/simplebar.css';

	import ResizeObserver from 'resize-observer-polyfill';

	interface ExtendedPageData extends PageData {
		previousPost: AdjacentPost | null;
		nextPost: AdjacentPost | null;
		general: { data: General };
	}

	let { data }: { data: ExtendedPageData } = $props();

	const q = $derived(useQuery(data.query, data.params, data.options));

	const post = $derived($q?.data as Lab | null);
	const loading = $derived($q?.loading as boolean);
	const error = $derived($q?.error);

	const previousPost = $derived(data.previousPost);
	const nextPost = $derived(data.nextPost);
	const general = $derived(data.general);

	let imagesContainer: HTMLElement;
	let simpleBarInstance: SimpleBar | null = null;
	let imagesLoaded = $state(0);
	let currentPostId = $state<string | null>(null);
	let isInitialized = $state(false);

	function cleanupSimpleBar() {
		if (simpleBarInstance) {
			try {
				simpleBarInstance.unMount();
			} catch (e) {
				console.error('Error unmounting SimpleBar:', e);
			}
			simpleBarInstance = null;
		}

		// Additional cleanup: remove any leftover SimpleBar elements
		if (imagesContainer) {
			const simplebarWrapper = imagesContainer.querySelector('.simplebar-wrapper');
			const simplebarMask = imagesContainer.querySelector('.simplebar-mask');
			if (simplebarWrapper || simplebarMask) {
				// Reset the container to its original state
				const children = Array.from(imagesContainer.querySelectorAll('.simplebar-content > *'));
				imagesContainer.innerHTML = '';
				children.forEach((child) => imagesContainer.appendChild(child));
			}
		}
	}

	// Handle post changes - cleanup and reset
	$effect(() => {
		if (post && post._id !== currentPostId) {
			currentPostId = post._id;
			imagesLoaded = 0;
			isInitialized = false;

			cleanupSimpleBar();
		}
	});

	// Handle SimpleBar initialization after images load
	$effect(() => {
		if (!imagesContainer || !post?.images || isInitialized) {
			return;
		}

		const totalImages = post.images.length;
		const allLoaded = imagesLoaded === totalImages;
		const needsScrollbar = totalImages > 1;

		// Wait for all images to load
		if (!allLoaded) {
			return;
		}

		// All images loaded - manage SimpleBar
		if (needsScrollbar) {
			setTimeout(() => {
				if (!simpleBarInstance && imagesContainer) {
					simpleBarInstance = new SimpleBar(imagesContainer, {
						autoHide: false
					});
					isInitialized = true;
				}
			}, 10);
		} else {
			isInitialized = true;
		}
	});

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.ResizeObserver = ResizeObserver;
		}

		return () => {
			cleanupSimpleBar();
		};
	});

	function handleImageLoad() {
		imagesLoaded++;
	}
</script>

<svelte:head>
	{#if post}
		<title>{post.title}</title>
		<meta name="description" content={`Read ${post.title} on our blog`} />
		{#if post.images?.[0]}
			<meta
				property="og:image"
				content={urlFor(post.images?.[0].image).width(1200).height(630).url()}
			/>
		{/if}
	{/if}
</svelte:head>

{#if loading}
	<div class="loading">
		<p>Loading...</p>
	</div>
{:else if post}
	<article class="post flex flex-col md:flex-row gap-y-5 gap-x-10 w-full max-w-[1000px]">
		<div class="outer-images-container h-[50vh] w-full md:w-[650px] md:flex-shrink-0">
			{#if post?.images && post.images.length > 0}
				{#key post._id}
					<div class="images-container w-full h-[50vh]" bind:this={imagesContainer}>
						<div
							class="inner-images-container w-full whitespace-nowrap flex items-center flex-nowrap"
						>
							{#each post.images as image}
								<div class="image-wrapper inline-block w-full h-[50vh] px-2 flex-shrink-0">
									<img
										src={urlFor(image.image.asset)
											.width(1920)
											.height(1920)
											.auto('format')
											.quality(85)
											.url()}
										alt={image.description || post.title || 'Lab image'}
										class="lab-image w-full h-full object-contain max-h-[50vh]"
										onload={handleImageLoad}
									/>
								</div>
							{/each}
						</div>
					</div>
				{/key}
			{:else}
				<p class="text-white">No images available for this Lab.</p>
			{/if}
		</div>

		<div
			class="post__container flex flex-col gap-5 text-white w-full md:w-[310px] md:flex-shrink-0"
		>
			<div class="info-container flex flex-col">
				<h1 class="bebas-neue-regular text-3xl">{post.title}</h1>
				<time class="text-xs" datetime={post.publishedAt}>
					<strong>{formatDate(post.publishedAt)}</strong>
				</time>
			</div>

			{#if post.content}
				<div class="post__content prose text-xs">
					<p>
						{@html post.content}
					</p>
				</div>
			{/if}

			{#if post.externalLink}
				<a
					href={post.externalLink}
					target="_blank"
					rel="noopener noreferrer"
					class="text-white hover:text-black transition underline text-xs"
				>
					{post.externalLinkText || 'SEE MORE'} →
				</a>
			{/if}
		</div>
	</article>

	<nav
		class="post__nav absolute w-full text-white px-3 md:px-5 flex flex-col md:flex-row md:justify-between md:items-center pointer-events-none text-sm md:text-base"
		aria-label="Navigate between blog posts"
	>
		{#if previousPost}
			<a
				href="/blog/{previousPost.slug.current}"
				class="pointer-events-auto nav-link transition hover:text-black"
			>
				prev
			</a>
		{/if}

		{#if nextPost}
			<a
				href="/blog/{nextPost.slug.current}"
				class="nav-link transition hover:text-black pointer-events-auto ml-auto"
			>
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
		<p>No post found.</p>
	</div>
{/if}

<style>
	:global(#scrollContainer) {
		scroll-snap-type: initial;
	}
</style>
