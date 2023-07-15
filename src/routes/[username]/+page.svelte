<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username}'s UniLink</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="flex flex-col min-h-screen gap-3 items-start py-12">
  <h1 class="text-success text-4xl font-bold text-center">@{data.username}</h1>
  <div
    class="card card-compact w-96 bg-base-100 shadow-xl border-2 hover:border-white-1 hover:shadow-cyan-950 hover:scale-105 hover:skew-z-6 transition-all"
  >
    <figure>
      <img src={data.photoURL ?? "/user.jpg"} alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">Bio</h2>
      <p>{data?.bio}</p>
    </div>
  </div>

  <div>
    {#each data.links as link}
      {@debug link}
    {/each}
  </div>
</main>
