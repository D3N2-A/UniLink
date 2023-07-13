<script lang="ts">
  import AuthProtected from "$lib/components/AuthProtected.svelte";
  import { user, storage, db, userData } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

  let previewUrl: string = "";
  let uploading: boolean = false;

  async function handleSubmit(e: any) {
    uploading = true;

    const file = e.target.files[0];
    previewUrl = URL.createObjectURL(file);

    const storageRef = ref(storage, `users/${$user?.uid}/profile.png`);
    const result = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(result.ref);

    await updateDoc(doc(db, "users", $user!.uid), { photoUrl: url });
    uploading = false;
  }
</script>

<AuthProtected>
  <h1
    class="text-xl underline decoration-wavy decoration-info font-medium"
    class:decoration-green-300={previewUrl.length > 0}
  >
    Upload a pic
  </h1>

  <form class="flex flex-col gap-4 items-center">
    <div>
      <img
        src={previewUrl ? previewUrl : $userData?.photoUrl ?? "/user.jpg"}
        alt=""
        width="256"
        height="256"
        class="mx-auto"
      />
    </div>
    {#if uploading}
      <p>Uploading</p>
      <span class="loading loading-ball loading-lg" />
    {/if}
    <input
      type="file"
      accept="image/*"
      on:change={handleSubmit}
      class="file-input file-input-bordered cursor-pointer {previewUrl
        ? 'file-input-success'
        : 'file-input-info'} w-full max-w-xs"
    />
  </form>
</AuthProtected>
