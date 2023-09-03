<script>
	import { enhance } from '$app/forms';

    export let form
    export let data
    $: ({ contact } = data);
    let editing = false
</script>

{#if !editing}
<div>
    <h2>{contact.title}</h2>
    <h4>{contact.email}</h4>
    <p>Created on: {contact.created_at}</p>
    <p>Updated on: {contact.updated_at}</p>
    <a href={`/contacts/${contact._id}`}>{contact._id}</a>
    <p>
        <button on:click={() => editing = true}>Edit</button>
    </p>
    
</div>

{:else}
<div>
    <p>Editing {contact.title} | { contact.email }</p>
    <form action="?/update" method="POST" use:enhance>
        <div>
            {#if form?.missing}
            <p>The email and title must be filled</p>                    
            {/if}
        </div>
        <div>
            <input type="text" name="title" value={form?.title ?? contact.title} />
            <label for="title">Title</label>
        </div>
        <div>
            <input type="email" name="email" value={form?.email ?? contact.email} />
            <label for="email">Email</label>
        </div>
        <p><button type="submit">Save</button></p>
        <p><button type="submit" on:click={() => editing = false}>Cancel</button></p>
    </form>
</div>
{/if}