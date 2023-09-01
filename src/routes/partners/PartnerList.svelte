<script>
    export let data
</script>

<div>
    {#each data.partners as partner (partner.title) }
            <div>
                <h2>{partner.title}</h2>
                <h4>{partner.city}</h4>
                <a href={`/partners/${partner._id}`}>{partner._id}</a>
            </div>
    {/each}
</div>