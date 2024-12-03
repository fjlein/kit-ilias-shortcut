<script lang="ts">
    import type { Snippet } from "svelte";
    import "../app.css";

    let { children }: { children: Snippet } = $props();
</script>

<div class="my-6 container max-w-[600px] sm:mt-36">
    {@render children()}
</div>
