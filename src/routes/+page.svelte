<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	let projects = [];
	let options = [];

	 if (data?.projects?.data) {
	 	projects = data.projects.data;
	 }
	// if (data?.options?.data) {
	// 	options = data.options.data;
	// }

	 
	onMount(() => {});
</script>

<svelte:head>
	<title>Octo Operations</title>
	<meta name="description" content="" />
</svelte:head>

<div>
	{#if projects.length}
		{#each projects as project,index}
			<a href=/project/{project.slug.current} class="text-white">
					{project.title}
			</a>
		{/each}
	{:else}
		No articles yet.
	{/if}


</div>