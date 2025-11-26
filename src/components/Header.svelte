<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    import { page } from '$app/stores';

    const { settings } = $props();   

	let open = $state(false);

	onMount(() => {
		/*if ('startViewTransition' in document) {
			setTimeout(() => {
				document.startViewTransition(() => {
					
				});
			}, 1000);
		} else {
			
		}*/
	});

    // Current date
    const now = new Date();

    // Format date as DD/MM/YYYY
    const date = now.toLocaleDateString('en-GB'); // e.g., "26/11/2025"

    // Format time in Paris
    const parisTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Paris',
        hour12: false
    });

    // Format time in London
    const londonTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour12: false
    });

    let isSinglePage = $derived(
        $page.url.pathname.startsWith('/project/') || 
        $page.url.pathname.startsWith('/blog/')
    );
	
</script>

<header
	class="header"
>
	<div class="p-5 flex flex-wrap items-center justify-between  {$page.url.pathname.startsWith('/blog') ? 'text-white' : 'text-red-500'}">
        <a
                id="logo"
                class=""
                href="/"
            >
            <img src="/logo.svg" alt="Octo logo" />
        </a>
        {#if !isSinglePage}
        <p class="max-w-4/12 text-sm leading-none">
            {settings?.description}
        </p>
        {/if}
        <p class="text-right text-sm">
            {date}<br/>
            {parisTime} | {londonTime}<br/>
            Paris | Londre
        </p>
	</div>
</header>
