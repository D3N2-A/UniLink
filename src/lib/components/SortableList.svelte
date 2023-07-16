<script lang="ts">
  import { flip } from "svelte/animate";

  export let list: any[];

  function getDraggedParent(node: any) {
    if (!node.dataset.index) {
        
      return getDraggedParent(node.parentNode);
    } else {
      return { ...node.dataset };
    }
  }
  function onDragStart(e: DragEvent) {
    const dragged = getDraggedParent(e.target);
    console.log(dragged);
  }
  function onDragOver(e: DragEvent) {
    // @ts-ignore
    console.log(e.target?.dataset);
  }
  function onDrop(e: DragEvent) {
    // @ts-ignore
  }
</script>

{#if list.length}
  <div class="w-1/3">
    <ul class="w-full flex flex-col gap-3 mt-4">
      {#each list as item, index (item?.id)}
        <li
          data-index={index}
          data-id={item?.id}
          animate:flip={{ duration: 300 }}
          on:dragstart={onDragStart}
          on:dragover|preventDefault={onDragOver}
          on:drop|preventDefault={onDrop}
        >
          <slot {item} {index} />
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <p class="text-lg text-emerald-500">No Items!</p>
{/if}
