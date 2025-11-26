<script lang="ts">
	import '../app.css';
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';

	export let data;
</script>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${$page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

{#if $isPreviewing}
	<VisualEditing />
{/if}

<div class="{$page.url.pathname.startsWith('/blog') ? 'bg-red-500' : 'bg-black'}  min-h-screen flex flex-col">
	<Header settings={data.settings} />
	
	<main class="main-container p-5 grow flex flex-col justify-center items-center">
		<slot />
	</main>	
	
	<Footer settings={data.settings} />
	
</div>
