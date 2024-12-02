<script lang="ts">
    import type { Snippet } from "svelte";
    import type { LayoutData } from "./$types";
    import "../app.css";

    let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="mt-6 container max-w-[600px] min-h-screen sm:mt-36">
    {@render children()}
</div>
<div class="container max-w-[600px] my-12">
    <p class="text-muted-foreground text-center text-sm">
        Built with &lt;3 by
        <a
            href="https://fjlein.com"
            target="_blank"
            rel="noreferrer"
            class="underline underline-offset-4">fjlein</a
        >. Code on
        <a
            href="https://github.com/fjlein/kit-ilias-shortcut"
            target="_blank"
            rel="noreferrer"
            class="underline underline-offset-4">GitHub</a
        >.
    </p>
</div>
