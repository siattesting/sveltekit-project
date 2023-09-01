<script>

	import { enhance } from "$app/forms";

</script>


<div class="w3-container">
    <h2>New Partner Form</h2>
    
    <div class="w3-card-4">
      <div class="w3-container w3-blue">
        <h2>Input Form</h2>
      </div>
  
      <form class="w3-container" method="post" use:enhance action="?/create">
        <p>
        <input class="w3-input" type="text" name="title">
        <label for="title">Title</label></p>
        <p>     
        <input class="w3-input" type="text" name="city">
        <label for="city">City</label></p>
        <p>
            <button type="submit" class="w3-btn w3-blue">Save</button>
        </p>
      </form>
    </div>
  </div>