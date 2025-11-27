<script>
    import { page } from '$app/stores';

    const { settings } = $props();

    let projectInfo = $derived($page.data.projectInfo);

    let isModalOpen = $state(false);

    function openModal() {
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
    }

    let isSingleProject = $derived(
        $page.url.pathname.startsWith('/project/')
    );
</script>
{#if isModalOpen}
        <div class="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div class="bg-white p-2  w-96 relative">
                <div class="modal-header bg-red flex p-1">
                    <button 
                    class="ml-auto bg-white text-sm w-3 h-3 cursor-pointer flex items-center justify-center"
                    onclick={closeModal}
                >
                    ✖
                </button>
                </div>
                <div class="modal-content py-12">
                    <p class="text-center text-sm">{settings?.contactEmail}<br/>
                    <a href="https://www.instagram.com/octo.operations/?hl=it" target="_blank">
                        @octo.operations
                    </a> </p>
                </div>

                
            </div>
        </div>
    {/if}
<footer class="footer">
    <div class="p-5  {$page.url.pathname.startsWith('/project/') ? 'flex flex-wrap justify-between' : ''} {$page.url.pathname.startsWith('/blog') ? 'text-white' : 'text-red'}">
        <nav class="flex flex-wrap items-center justify-between ">
            {#if isSingleProject}
                <!-- Show only back link when on project page -->
                <a href="/" class="nav-link">BACK</a>
            {:else}
                <a href="/" class="nav-link {$page.url.pathname === '/' || $page.url.pathname.startsWith('/project/') ? 'text-white' : ''}" >COMMERCIAL</a>
                <a href="/blog" class="nav-link {$page.url.pathname.startsWith('/blog') ? 'text-black' : ''}">BLOG</a>
                <button class="cursor-pointer" onclick={openModal}>CONTACTS</button>
            {/if}    
        </nav>

        {#if projectInfo}
            <div class="footer-project-meta text-base w-10/12 grid grid-cols-3 gap-4">
                <div class="info flex flex-col">
                    <h1>{projectInfo.title}</h1>

                    {#if projectInfo.place}
                        <span>{projectInfo.place}</span>
                    {/if}
                </div> 

                {#if projectInfo.tags?.length}
                    <div class="tags grid grid-rows-2 grid-flow-col  gap-x-2 col-span-2">
                    {#each projectInfo.tags as tag, i}
                        <span class="tag">{tag}</span>
                    {/each}

                    </div>
                {/if}
            </div>
        {/if}
    </div>


	
</footer>
