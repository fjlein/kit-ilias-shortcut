<script lang="ts">
    import type { Snippet } from "svelte";
    interface Props {
        children: Snippet;
        stepTitle: string;
    }

    let { stepTitle, children }: Props = $props();
</script>

<div>
    <h3
        class="step font-heading scroll-m-20 font-semibold tracking-tight text-xl mb-3"
    >
        {stepTitle}
    </h3>
    {@render children()}
</div>
