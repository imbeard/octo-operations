<script lang="ts">
	import { useQuery } from '@sanity/svelte-loader';
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/sanity/image';
	import type { Lab } from '$lib/sanity/queries';

	const { data }: { data: PageData } = $props();
	
	const { options, general, total } = data;
	const { initial, params } = options;
	
	const q = useQuery(data);
	
	const posts = $derived($q?.data as Lab[] ?? []);

</script>

<section class="items-container max-h-[60vh] overflow-y-scroll max-w-6/12  ">
	<div class="items-list grid grid-cols-2 md:grid-cols-3 gap-3 ">
		{#if posts.length}
		{#each posts as lab,index}
			<a href="/blog/{lab.slug.current}" class="text-white">
				<div class="relative aspect-square overflow-hidden bg-gray-200 border-white border">
					{#if lab.image}
						<img 
							src={lab.image.asset.url} 
							alt={lab.image.description || lab.title || 'Project image'}
						/>
					{:else}
						<div class="w-full h-full flex items-center justify-center bg-gray-300">
							<span class="text-gray-500">No image</span>
						</div>
					{/if}
				</div>
				<div class="mt-2">
					<h2 class="text-xs">
						{lab.title || 'Untitled'}
					</h2>
				</div>
			</a>
		{/each}
	{:else}
		No articles yet.
	{/if}
	</div>

</section>
