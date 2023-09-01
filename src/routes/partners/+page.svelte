<script>
// @ts-nocheck

	import NewPartnerform from "./NewPartnerform.svelte";
    import PartnerList from "./PartnerList.svelte";
    export let data
    export let form
    let editing = false

</script>
<div>
    <h1>Partners page</h1>

    {#if data.partners.length < 1} <p>No partners to display</p> {/if}

    {#if !editing}

    <div>
        <button class="btn btn-blue" on:click={() => (editing = true)}>Add a Partner</button>
            {#each data.partners as partner (partner.title) }
                    <div>
                        <h2>{partner.title}</h2>
                        <h4>{partner.city}</h4>
                        <a href={`/partners/${partner._id}`}>{partner._id}</a>
                    </div>
            {/each}
    </div>
            
    {/if}
    
    {#if editing}  
    <div>
        <NewPartnerform {form} />
    </div>
    {/if}

</div>