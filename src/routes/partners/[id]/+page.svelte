<script>
	import { enhance } from '$app/forms';

    export let form
    export let data
    $: ({ partner } = data);
    let editing = false
</script>

{#if !editing}
<div>
    <h2>{partner.title}</h2>
    <h4>{partner.city}</h4>
    <p>Created on: {partner.created_at}</p>
    <p>Updated on: {partner.updated_at}</p>
    <a href={`/partners/${partner._id}`}>{partner._id}</a>
    <p>
        <button on:click={() => editing = true}>Edit</button>
    </p>
    
</div>

{:else}
<div>
    <p>Editing {partner.title} | { partner.city }</p>
    <form action="?/update" method="POST" use:enhance>
        <div>
            {#if form?.missing}
            <p>The city and title must be filled</p>                    
            {/if}
        </div>
        <div>
            <input type="text" name="title" value={form?.title ?? partner.title} />
            <label for="title">Title</label>
        </div>
        <div>
            <input type="text" name="city" value={form?.city ?? partner.city} />
            <label for="city">City</label>
        </div>
        <p><button type="submit">Save</button></p>
        <p><button type="submit" on:click={() => editing = false}>Cancel</button></p>
    </form>
</div>
{/if}