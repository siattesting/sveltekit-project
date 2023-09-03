<script>
    // export let data
    // $: ({ partners } = data)
    /**
	 * @type {any[]}
	 */
    let partners = []
</script>

<div>
    {#each partners as partner (partner.title) }
            <div>
                <h2>{partner.title}</h2>
                <h4>{partner.city}</h4>
                <a href={`/partners/${partner._id}`}>{partner._id}</a>
            </div>
    {/each}
</div>