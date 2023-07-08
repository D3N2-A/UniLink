<script lang="ts">
  import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<h1>{data.boatName ??"Welcome"}</h1>

<form action="?/rename"  method="POST" use:enhance>

<input type="text" name="boatName" >
<button type="submit">Submit</button>
<button formaction="?/capitalize">Capitalize</button>

</form>
