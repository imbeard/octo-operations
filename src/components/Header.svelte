<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    import { page } from '$app/stores';

    const { settings } = $props();   

	let open = $state(false);

	onMount(() => {
		const interval = setInterval(() => {
            now = new Date();
        }, 1000);

        
        return () => clearInterval(interval);
	});

    let now = $state(new Date());
    
    let date = $derived(now.toLocaleDateString('en-GB'));
    
    let parisTime = $derived(now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Paris',
        hour12: false
    }));
    
    let londonTime = $derived(now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour12: false
    }));

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
