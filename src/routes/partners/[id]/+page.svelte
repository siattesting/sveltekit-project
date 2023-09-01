<script>
    export let data
    $: ({ partner } = data)
</script>
<div>
    <h2>{partner.title}</h2>
    <h4>{partner.city}</h4>
    <a href={`/partners/${partner._id}`}>{partner._id}</a>
</div>