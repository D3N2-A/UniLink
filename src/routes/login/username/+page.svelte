<script lang="ts">
    import AuthProtected from '$lib/components/AuthProtected.svelte';
    import { db } from '$lib/firebase';
    import { doc, getDoc } from 'firebase/firestore';
let username="";
let isAvailable = false;
let loading = false;

async function checkAvailability (){
    isAvailable = false;
    loading= true;
    const docRef = doc(db,"usernames",username) 
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        isAvailable = false;
        loading = false;
    }else{
        isAvailable = true;
        loading = false;
    }

}
</script>

<AuthProtected>
<div>Select a username</div>
<form>
<input type="text" max="5" placeholder="Type here" bind:value={username} class="input input-bordered input-info w-full max-w-xs" on:input={checkAvailability} />
<p class="pt-4 pb-1 {isAvailable ? 'text-success' : 'text-red-500'}">
    Username is {isAvailable ? 'available' : 'unavailable'}
</p>
<button class="btn btn-success">Confirm username @{username} </button>
</form>
</AuthProtected>
