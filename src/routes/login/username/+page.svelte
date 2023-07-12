<script lang="ts">
    import AuthProtected from '$lib/components/AuthProtected.svelte';
    import { db } from '$lib/firebase';
    import { doc, getDoc } from 'firebase/firestore';
let username="";
let isAvailable = false;
let loading = false;
let debounce : NodeJS.Timeout;
async function checkAvailability (){
    isAvailable = false;
    loading= true;
    clearTimeout(debounce);

    debounce = setTimeout(async ()=>{
    const docRef = doc(db,"usernames",username) 
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        isAvailable = false;
        loading = false;
    }else{
        isAvailable = true;
        loading = false;
    }
    },500);

}

async function submitUsername(){

}

</script>

<AuthProtected>
<div>Select a username</div>
<form>
    <input type="text" max="5" placeholder="Type here" bind:value={username} class="input input-bordered input-info w-full max-w-xs" on:input={checkAvailability} />

    {#if loading ===true && username !== "" }
        <p>
        <span class="mt-4  loading loading-dots loading-md"></span>
        </p>
    {/if}
    {#if username !=="" && loading === false}
        <p class="mt-4  {isAvailable ? 'text-success' : 'text-red-500'}">
            Username is {isAvailable ? 'available' : 'unavailable'}
        </p>
    {/if}
    <button class="btn btn-success mt-2">Confirm username @{username} </button>
</form>
</AuthProtected>
