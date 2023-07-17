<script lang="ts">
  import UniLink from "$lib/components/UniLink.svelte";
  import { user, userData } from "$lib/firebase";
  import type { PageData } from "./$types";

  import { page } from "$app/stores";
  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username}'s UniLink</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="flex flex-col min-h-screen gap-3 items-start py-12">
  <h1 class="text-success text-4xl font-bold text-center">@{data.username}</h1>
  <div
    class="card card-compact w-96 bg-base-100 shadow-xl hover:shadow-cyan-950 hover:scale-105 hover:skew-z-6 transition-all"
  >
    <figure>
      <img src={data.photoURL ?? "/user.jpg"} alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Bio</h2>
      <p>{data?.bio}</p>
    </div>
    {#if $userData?.username === $page.params.username}
      <div class="card-actions justify-end">
        <button class="btn-xs badge badge-info">
          <a href={`${$userData.username}/edit`}> Edit </a>
        </button>
      </div>
    {/if}
  </div>

  <div class="w-full">
    <ul class="w-full flex flex-col gap-3 mt-4">
      {#each data.links as link}
        <li class="hover:scale-105 transition-all">
          <UniLink {...link} />
        </li>
      {/each}
    </ul>
  </div>
</main>
