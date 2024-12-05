<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
</script>

<div
    class="steps ml-2 sm:ml-4 border-l pl-8 [counter-reset:step] mr-4 [&>div:not(:last-child)]:mb-12"
>
    {@render children()}
</div>
