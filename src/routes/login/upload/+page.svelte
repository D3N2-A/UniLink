<script lang="ts">
    import AuthProtected from '$lib/components/AuthProtected.svelte';
import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<AuthProtected>
<div>Upload a pic</div>
</AuthProtected>