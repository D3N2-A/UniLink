<script>
    import {page} from '$app/stores';
  import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
</script>
<ul class="steps steps-vertical " style="height:70vh">
    <a href="/login" class="step step-success">Sign In</a>
    <a href="/login/username" class="step" class:step-success={$page.route.id?.match(/username|upload/g)} >Choose Username</a>
    <a href="/login/upload" class="step" class:step-success={$page.route?.id?.includes('upload')}>Upload Photo</a>
</ul>

<AnimatedRoute>
<div class="card w-96 bg-base-100 shadow-xl border-2   hover:border-white-1 hover:shadow-cyan-950 hover:scale-105 hover:skew-z-6 transition-all">
  <div class="card-body items-center text-center">
    <slot/>
  </div>
</div>
</AnimatedRoute>