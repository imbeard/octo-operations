<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	let projects = [];
	let options = [];

	 if (data?.projects?.data) {
	 	projects = data.projects.data;
	 }
	 
	onMount(() => {});
</script>

<svelte:head>
	<title>Octo Operations</title>
	<meta name="description" content="" />
</svelte:head>

<section class="items-container max-h-[60vh] data-simplebar overflow-y-scroll max-w-11/12 md:max-w-6/12  ">
	<div class="items-list grid grid-cols-2 md:grid-cols-3 gap-3 ">
		{#if projects.length}
		{#each projects as project,index}
			<a href=/project/{project.slug.current} class="text-white transition hover:text-red">
				<div class="relative aspect-square overflow-hidden bg-gray-200 border-white border  transition hover:border-black">
					{#if project.images?.[0]}
						<img 
							src={project.images[0].image.asset.url} 
							alt={project.images[0].description || project.title || 'Project image'}
						/>
					{:else}
						<div class="w-full h-full flex items-center justify-center bg-gray-300">
							<span class="text-gray-500">No image</span>
						</div>
					{/if}
				</div>
				<div class="mt-2">
					<h2 class="text-xs">
						{project.projectNumber}. {project.title || 'Untitled'}
					</h2>
				</div>
			</a>
		{/each}
	{:else}
		No articles yet.
	{/if}
	</div>

</section>