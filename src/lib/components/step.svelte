<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import type { Snippet } from "svelte";

    let {
        stepTitle,
        children,
    }: {
        children: Snippet;
        stepTitle: string;
    } = $props();
</script>

<div>
    <Accordion.Root type="single" class="w-full" value={"item"}>
        <Accordion.Item value="item">
            <Accordion.Trigger class="!pt-0">
                <h3
                    class="step font-heading scroll-m-20 font-semibold tracking-tight text-xl"
                >
                    {stepTitle}
                </h3>
            </Accordion.Trigger>
            <Accordion.Content>
                {@render children()}
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
