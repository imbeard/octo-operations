<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	let projects = [];
	let options = [];

	// if (data?.projects?.data) {
	// 	projects = data.projects.data;
	// }
	// if (data?.options?.data) {
	// 	options = data.options.data;
	// }

	onMount(() => {});
</script>

<svelte:head>
	<title>Octo Operations</title>
	<meta name="description" content="" />
</svelte:head>
