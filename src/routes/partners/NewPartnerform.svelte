<script>

	import { enhance } from "$app/forms";
  let editing = true
 
   /**
	 * @type {{ error: any; title: any; success: boolean; errors: { title: any; city: any; }; city: any; }}
	 */
    export let form
    let loading = false

    const addPartner = () => {
      loading = false
      return async ({ update }) => {
        loading = false
        await update()
      }
    }

</script>


<div class="w3-container">
    <h2>New Partner Form</h2>
    
    <div class="w3-card-4">
      <div class="w3-container w3-blue">
        <h2>Input Form</h2>
      </div>
      {#if form?.error}
      <p>{form.error}</p>        
      {/if}
  
      <form class="w3-container" method="POST" use:enhance={addPartner} action="?/create">
        <p>
          <label for="title">Title</label>
          <input class="w3-input" type="text" name="title" value={form?.title ?? ''} />
          {#if form?.errors?.title}
            <p class="error">Title is required</p>          
          {/if}
        </p>
        <p>     
          <label for="city">City</label>
          <input class="w3-input" type="text" name="city" value={form?.city ?? ''} />
          {#if form?.errors?.city}
          <p class="error">City is required</p>          
          {/if}
        </p>
        <p>
            <button type="submit" class="w3-btn w3-blue">Save</button>
            <button type="button" class="w3-btn w3-blue" on:click={() => (editing = false)}>Cancel</button>
        </p>
      </form>
      {#if form?.success}
        <p>Sucess!</p>
      {/if}
    </div>
  </div>

  <style>
    .error {
      color: tomato
    }
  </style>