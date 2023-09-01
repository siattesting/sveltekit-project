<script>
	import NewPartnerform from "./NewPartnerform.svelte";
    export let data

</script>
<div>
    <h1>Partners page</h1>
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
    <div>
        <NewPartnerform />
    </div>
</div>