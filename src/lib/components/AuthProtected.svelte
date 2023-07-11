<script lang="ts">
import {user} from '$lib/firebase'
</script>

{#if $user}
<slot/>
{:else}
<div class="text-warning">You need to Sign in to view this</div>
<a href="/login" class="btn btn-warning">Sign In</a>
{/if}