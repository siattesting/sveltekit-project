<script>
    export let data
</script>

<div>
    <ul>
        {#each data.partners as partner (partner.title) }
            <li>
                <div>
                    <h2>{partner.title}</h2>
                    <h4>{partner.city}</h4>
                </div>
            </li>
        {/each}
    </ul>
</div>