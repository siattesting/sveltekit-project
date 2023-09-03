<script>
    /** @type {import('./$types').PageServerData}*/
    export let data;
    $: ({ contacts } = data)
    /** @type {import('./$types').ActionData}*/
    export let form;
</script>
<div class="flex-container">
    <div class="flex-child">
        <h1>Contacts Page</h1>
        <div class="">
            {#each contacts as contact (contact.title) }
                <div class="">
                    <h3>{contact.title}</h3>
                    <h3>{contact.email}</h3>
                    
                    <small><a href={`/contacts/${contact._id}`}>{contact._id}</a></small>
                </div>
            {/each}
        </div>
    </div>

    <div class="flex-child">
        <h2>Create a contact</h2>
            {#if form?.errors}
            <p class="error">{form.errors}</p>
            {/if}
        <form action="?/create" method="POST">
            <div>
                {#if form?.missing}
                <p>The email and title must be filled</p>                    
                {/if}
            </div>
            <div>
                <input type="text" name="title" value={form?.title ?? ''} />
                <label for="title">Title</label>
            </div>
            <div>
                <input type="email" name="email" value={form?.email ?? ''} />
                <label for="email">Email</label>
            </div>
            <p><button type="submit">Save</button></p>
        </form>
        
    </div>
</div>

<style>
    .flex-container {
    display: flex;
}

.flex-child {
    flex: 1;
    border: 2px solid rgb(0, 76, 255);
    border-radius: 5px;
}  

.flex-child:first-child {
    margin-right: 20px;
} 
   
</style>