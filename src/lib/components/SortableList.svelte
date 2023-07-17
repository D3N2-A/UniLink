<script lang="ts">
  import { flip } from "svelte/animate";

  export let list: any[];
  let isOver: string | boolean = false;

  //Had to check recursiverly because if we drag by clicking on image its parent will be a tag so still it wont have dataset
  function getDraggedParent(node: any) {
    if (!node.dataset.index) {
      return getDraggedParent(node.parentNode);
    } else {
      return { ...node.dataset };
    }
  }
  function onDragStart(e: DragEvent) {
    const dragged = getDraggedParent(e.target);
    e.dataTransfer?.setData("source", dragged?.index.toString());
  }
  function onDragOver(e: DragEvent) {
    // @ts-ignore
    const dragged = getDraggedParent(e.target);
    isOver = dragged?.id ?? false;
  }

  //For this section we have to considor whether we are droping on valid element or not.
  function onDragLeave(e: DragEvent) {
    // @ts-ignore
    const dragged = getDraggedParent(e.target);
    isOver === dragged?.id && (isOver = false);

    //Above function calls can be avoided by specifying each li as dropzone
  }
  function onDrop(e: DragEvent) {
    // @ts-ignore
    isOver = false;
    //Getting dataset of dropzone
    const dragged = getDraggedParent(e.target);
    //Getting index of element which was dragged
    // console.log(e.dataTransfer?.getData("source"));
    const from = e.dataTransfer?.getData("source");
    //Calling reorder function
    reOrder(from, dragged?.index);
  }

  function reOrder(from: any, to: any) {
    // swapping elements of array
    console.log(from, to);
    let newList = [...list];
    [newList[from], newList[to]] = [newList[to], newList[from]];
  }
</script>

{#if list.length}
  <div class="w-1/3">
    <ul class="w-full flex flex-col gap-3 mt-4">
      {#each list as item, index (item?.id)}
        <li
          class="border-2 border-dashed border-transparent"
          data-index={index}
          data-id={item?.id}
          class:over={item.id === isOver}
          animate:flip={{ duration: 300 }}
          on:dragstart={onDragStart}
          on:dragover|preventDefault={onDragOver}
          on:dragleave={onDragLeave}
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

<style>
  .over {
    @apply border-gray-400 scale-105;
  }
</style>
