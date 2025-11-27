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
            <div class="bg-white p-2 max-w-10/12 w-96 relative">
                <div class="modal-header bg-red flex p-1">
                    <button 
                    class="ml-auto  transition bg-white text-sm w-3 h-3 cursor-pointer flex items-center justify-center hover:bg-black hover:text-white"
                    onclick={closeModal}
                >
                    ✖
                </button>
                </div>
                <div class="modal-content py-12">
                    <div class="text-center flex flex-col text-sm">
                        <a href="mailto:{settings?.contactEmail}" class="transition hover:text-red" target="_blank">   
                            {settings?.contactEmail}
                        </a>    
                        <a href="https://www.instagram.com/octo.operations/?hl=it" class="transition hover:text-red" target="_blank">
                            @octo.operations
                        </a> 
                    </div>
                </div>

                
            </div>
        </div>
    {/if}
<footer class="footer">
    <div class="p-5  {$page.url.pathname.startsWith('/project/') ? 'flex flex-col-reverse md:flex-row flex-wrap justify-between gap-y-5' : ''} {$page.url.pathname.startsWith('/blog') ? 'text-white' : 'text-red'}">
        <nav class="flex flex-wrap items-center justify-between ">
            {#if isSingleProject}
                <!-- Show only back link when on project page -->
                <a href="/" class="nav-link transition">BACK</a>
            {:else}
                <a href="/" class="nav-link  transition {$page.url.pathname === '/' || $page.url.pathname.startsWith('/project/') ? 'active' : ''}" >COMMERCIAL</a>
                <a href="/blog" class="nav-link  transition {$page.url.pathname.startsWith('/blog') ? 'active' : ''}">BLOG</a>
                <button class="nav-link  transition cursor-pointer" onclick={openModal}>CONTACTS</button>
            {/if}    
        </nav>

        {#if projectInfo}
            <div class="footer-project-meta text-xs md:text-base md:w-10/12 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
                <div class="info flex flex-col">
                    <h1>{projectInfo.title}</h1>

                    {#if projectInfo.place}
                        <span>{projectInfo.place}</span>
                    {/if}
                </div> 

                {#if projectInfo.tags?.length}
                    <div class="tags flex flex-col md:grid  md:grid-rows-2 grid-flow-col  gap-x-2 col-span-2">
                    {#each projectInfo.tags as tag, i}
                        <span class="tag">{tag}</span>
                    {/each}

                    </div>
                {/if}
            </div>
        {/if}
    </div>


	
</footer>
