<script lang="ts">
  import { page } from "$app/stores";
  import SortableList from "$lib/components/SortableList.svelte";
  import UniLink from "$lib/components/UniLink.svelte";
  import { db, userData, user } from "$lib/firebase";
  import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
  import { flip } from "svelte/animate";
  import { writable } from "svelte/store";
  import { fly } from "svelte/transition";
  const typesArray = [
    "Twitter",
    "Threads",
    "Instagram",
    "Facebook",
    "YouTube",
    "Reddit",
    "Patreon",
    "Onlyfans",
    "LinkedIn",
    "GitHub",
    "Custom",
  ];
  const formDefaults = {
    icon: "Type",
    title: "",
    url: "",
  };
  const urlRegex =
    /^(https?:\/\/)?([w]{3}\.)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,})(\/[^\s]*)?$/;

  const formData = writable(formDefaults);
  $: isTitleValid = $formData.title.length > 0 && $formData.title.length < 20;
  $: isLinkValid = $formData.url.match(urlRegex);
  $: isFormValid = isTitleValid && isLinkValid;
  let showForm = false;
  async function addLink() {
    const docRef = doc(db, "users", $user!.uid);
    await updateDoc(docRef, {
      links: arrayUnion({ ...$formData, id: Date.now().toString() }),
    });
    formData.set({
      icon: "",
      title: "",
      url: "",
    });
    showForm = false;
  }

  async function sortUpdatedList(e: CustomEvent) {
    console.log(e.detail);
    const newList = e.detail;
    const userRef = doc(db, "users", $user!.uid);
    setDoc(userRef, { links: newList }, { merge: true });
  }
</script>

<main class="w-full flex flex-col gap-5 items-center justify-start">
  {#if $userData?.username == $page.params.username}
    <h1 class="text-2xl font-bold">Edit your profile</h1>
    <SortableList
      list={$userData.links}
      on:sort={sortUpdatedList}
      let:item
      let:index
    >
      <UniLink {...item} />
    </SortableList>
    {#if showForm}
      <form
        on:submit|preventDefault={addLink}
        class="bg-base-300 p-4 rounded-lg flex flex-col items-start gap-5"
      >
        <div class="join">
          <select
            bind:value={$formData.icon}
            class="select select-bordered join-item"
          >
            <option disabled selected>Type</option>
            {#each typesArray as type}
              <option value={type.toLowerCase()}>{type}</option>
            {/each}
          </select>
          <div>
            <div>
              <input
                class="input input-bordered join-item"
                placeholder="Title"
                bind:value={$formData.title}
              />
            </div>
          </div>
          <div>
            <div>
              <input
                bind:value={$formData.url}
                class="input input-bordered join-item"
                placeholder="https://"
              />
            </div>
          </div>
        </div>
        {#if !isTitleValid}
          <p class="text-sm text-error">
            Title Must be between 0 and 20 characters long
          </p>
        {/if}
        {#if !isLinkValid}
          <p class="text-sm text-error">Link should be valid</p>
        {/if}
        {#if isFormValid}
          <p class="text-sm text-success">Looks good!</p>
        {/if}
        <button
          type="submit"
          class="btn {isFormValid ? 'btn-success' : 'btn-disabled'}"
          >Add Link</button
        >
        <button
          class="btn btn-sm"
          on:click={() => {
            formData.set(formDefaults);
            showForm = false;
          }}>Cancel</button
        >
      </form>
    {:else}
      <button
        class="btn"
        on:click={() => {
          showForm = true;
        }}>Add Link</button
      >
    {/if}
  {/if}
</main>
