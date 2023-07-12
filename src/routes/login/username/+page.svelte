<script lang="ts">
    import AuthProtected from '$lib/components/AuthProtected.svelte';
    import { db, user } from '$lib/firebase';
    import { doc, getDoc, writeBatch } from 'firebase/firestore';
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

    loading = true;

    if(username ==="")
        {
            return;
        }

    const batch = writeBatch(db);

    const userRef = doc(db , "users", $user?.uid as string) 
    const usernameRef = doc(db , "usernames", username) 

    batch.set(usernameRef,{uid:$user?.uid})
    batch.set(userRef,{
       username,
       photoUrl: $user?.photoURL??null,
       bio:'Hey There! I&apos;m using UniLink' ,
       links:[
            {
                title:'Welcome',
                url:'https://d3n2.netlify.com',
                icon:'custom'

            }
        ]
    })

    await batch.commit();

    username = '';
    isAvailable = false;
    loading = false;
}

</script>

<AuthProtected>
<div>Select a username</div>
<form on:submit|preventDefault={submitUsername}>
    <input type="text" max="5" placeholder="Type here" bind:value={username} class="input input-bordered input-info w-full max-w-xs" on:input={checkAvailability} />

    {#if loading ===true && username !== "" }
        <p>
        <span class="mt-4  loading loading-dots loading-md"></span>
        </p>
    {/if}
    {#if username !=="" && loading === false}
        <p class="mt-4 {isAvailable ? 'text-white' : 'text-red-500'}">
            Username is {isAvailable ? 'available' : 'unavailable'}
        </p>
    {/if}
    <button class="btn btn-success mt-2 {loading && username!=="" ? 'btn-disabled' :'' }"  >
        Confirm username @{username}
     </button>
</form>
</AuthProtected>
