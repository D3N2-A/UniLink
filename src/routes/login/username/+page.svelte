<script lang="ts">
  import AuthProtected from "$lib/components/AuthProtected.svelte";
  import { db, user, userData } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";
  let username = "";
  let isAvailable = false;
  let loading = false;
  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  $: isValid =
    username?.length > 2 && username.length < 16 && re.test(username);
  let debounce: NodeJS.Timeout;
  async function checkAvailability() {
    isAvailable = false;
    loading = true;
    clearTimeout(debounce);

    debounce = setTimeout(async () => {
      const docRef = doc(db, "usernames", username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        isAvailable = false;
        loading = false;
      } else {
        isAvailable = true;
        loading = false;
      }
    }, 500);
  }

  async function submitUsername() {
    loading = true;

    if (username === "" || isValid) {
      return;
    }

    const batch = writeBatch(db);

    const userRef = doc(db, "users", $user?.uid as string);
    const usernameRef = doc(db, "usernames", username);

    batch.set(usernameRef, { uid: $user?.uid });
    batch.set(userRef, {
      username,
      photoUrl: $user?.photoURL ?? null,
      bio: "Hey There! I&apos;m using UniLink",
      links: [
        {
          title: "Welcome",
          url: "https://d3n2.netlify.com",
          icon: "custom",
        },
      ],
    });

    await batch.commit();

    username = "";
    isAvailable = false;
    loading = false;
  }
</script>

<AuthProtected>
  {#if $userData?.username}
    <div class="flex flex-row gap-2">
      Hello, <p class="text-success">{$userData?.username}</p>
    </div>
    <p>Username can only be set once</p>
    <button class="btn mt-2 btn-info">
      <a href="/login/upload"> Upload Photo</a>
    </button>
  {:else}
    <div>Select a username</div>
    <form on:submit|preventDefault={submitUsername}>
      <input
        type="text"
        max="5"
        placeholder="Type here"
        bind:value={username}
        class:input-warning={!isValid && username.length > 0}
        class:input-error={!isAvailable && username.length > 0 && !loading}
        class:input-success={isAvailable && !loading && isValid}
        class="input input-bordered input-info w-full max-w-xs"
        on:input={checkAvailability}
        required
      />

      {#if loading === true && username !== ""}
        <p>
          <span class="mt-4 loading loading-dots loading-md" />
        </p>
      {/if}
      {#if username !== "" && loading === false && isValid}
        <p class="mt-4 {isAvailable ? 'text-white' : 'text-red-500'}">
          Username is {isAvailable ? "available" : "unavailable"}
        </p>
      {:else if !isValid && username.length > 0}
        <p class="mt-4 text-warning">Username is invalid</p>
      {/if}
      <button
        class:btn-success={isAvailable && isValid}
        class="btn mt-2 {loading && username !== '' ? 'btn-disabled' : ''}"
      >
        Confirm username @{username}
      </button>
    </form>
  {/if}
</AuthProtected>
