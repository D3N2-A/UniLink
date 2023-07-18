<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex flex-col items-center justify-start h-full w-full">
  <button
    on:click={() => {
      window.history.back();
    }}
    class="btn mb-1 btn-circle btn-outline"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      /></svg
    >
  </button>
  <h1 class="text-3xl font-bold">Edit Bio</h1>
  <p class="text-error">{$page.form?.problem ?? ""}</p>

  <form
    method="post"
    class="flex flex-col gap-4 mt-12 items-center"
    use:enhance
  >
    <label for="bio">Your bio</label>
    <textarea
      name="bio"
      class="textarea textarea-bordered"
      id="bio"
      cols="70"
      rows="4"
      value={data?.bio}
    />
    <button class="btn btn-primary my-5" type="submit">Update Bio</button>
  </form>
</div>
