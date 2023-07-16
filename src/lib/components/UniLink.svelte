<script lang="ts">
  export let title: string;
  export let icon: string;
  export let url: string;
  export let id: any;
</script>

<a
  href={url}
  class="flex flex-row w-full justify-start items-center p-4 rounded-lg gap-5 bg-base-300 hover:scale-105 transition-all no-underline"
  target="_blank"
>
  <img src={`/${icon}.svg`} alt={icon} width="32" height="32" />
  <span class="text-lg text-white font-bold text-center justify-self-center"
    >{title}</span
  >
</a>
