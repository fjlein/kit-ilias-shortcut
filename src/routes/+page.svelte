<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Step from "$lib/components/ui/step.svelte";
    import Steps from "$lib/components/ui/steps.svelte";
    import { page } from "$app/stores";
    import { Copy, GripVertical, ListPlus, ListRestart } from "lucide-svelte";
    import type { PageData } from "./$types";
    import { Label } from "$lib/components/ui/label";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import * as Accordion from "$lib/components/ui/accordion/index.js";

    let { data }: { data: PageData } = $props();

    let redirectHome = $state(true);
</script>

<p class="text-center space-x-2">
    <a
        href="#what-is-this"
        class="underline underline-offset-4 text-muted-foreground text-sm"
        >What is this?</a
    >
    <a
        href="#who-is-this-for"
        class="underline underline-offset-4 text-muted-foreground text-sm"
        >Who is this for?</a
    >
    <a
        href="#video"
        class="underline underline-offset-4 text-muted-foreground text-sm"
        >Video demo</a
    >
</p>
<h1 class="font-sans text-3xl tracking-tight font-bold mt-2 text-center">
    Omnibox shortcut search to ilias course
</h1>

<!-- <p class="leading-7">
    Enter your tab-to-search keyword into your
    <a
        href="https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium"
        target="_blank"
        rel="noopener noreferrer"
        class="underline underline-offset-4">chromium based browser</a
    >

    and get redirected to an ilias course based on your search term.
</p> -->

<Steps>
    <Step>Add your courses</Step>
    <p class="leading-7 mt-3">
        To add a course enter the full <code>url</code>
        of the ilias page, the copied title of the course and your preffered exact
        match abbreviations.
    </p>

    <form class="mt-6">
        <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
                <Label for="name">Page url</Label>
                <Input
                    id="name"
                    placeholder="https://ilias.studium.kit.edu/..."
                />
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="framework">Title</Label>
                <Input
                    id="framework"
                    placeholder="24076 – Softwaretechnik II"
                />
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="framework">Abbreviations (comma-seperated)</Label>
                <Input id="framework" placeholder="swt2, s2" />
            </div>
            <div class="flex justify-between">
                <Button variant={"secondary"}
                    ><ListRestart></ListRestart>Clear</Button
                >
                <Button><ListPlus></ListPlus>Add</Button>
            </div>
        </div>
    </form>
    <Step>View and Prioritize courses</Step>
    <p class="leading-7 mt-3">
        Sort courses to prioritize for prefix matching.
    </p>

    <!-- <p class="leading-7 mt-6">Add at least one course!</p>-->

    <div class="flex flex-col space-y-3 mt-3">
        <div class="flex items-center gap-2">
            <div class="p-2 border rounded-md bg-white grow">
                <p>Sofwaretest und Quality Management (SQM)</p>
            </div>
            <div class="flex-none">
                <GripVertical size={16} class="text-primary"></GripVertical>
            </div>
        </div>

        <div class="flex items-center gap-2">
            <div class="p-2 border rounded-md bg-white grow">
                <p>Robotik 1</p>
            </div>
            <div class="flex-none">
                <GripVertical size={16} class="text-primary"></GripVertical>
            </div>
        </div>
    </div>
    <Step>Choose no result default</Step>
    <p class="leading-7 mt-3">
        Decide if you want to go to the Ilias course overview or display an
        error when no course was found for your search string.
    </p>
    <div class="flex items-center space-x-2 mt-3">
        <Checkbox
            id="terms"
            bind:checked={redirectHome}
            aria-labelledby="terms-label"
        />
        <Label
            id="terms-label"
            for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            Redirect to course overview
        </Label>
    </div>
    <Step>Copy your individual link</Step>
    <div class="flex space-x-2 mt-3">
        <Input
            class="text-base"
            value="{$page.url
                .href}api/redirect/?db=%5B%7B%22id%22%3A2455989%2C%22name%22%3A%22Softwaretest%20and%20Quality%20Management%22%2C%22abbr%22%3A%5B%22sqm%22%5D%7D%2C%7B%22id%22%3A2492998%2C%22name%22%3A%22Softwaretechnik%202%22%2C%22abbr%22%3A%5B%22swt%22%2C%22swt2%22%5D%7D%2C%7B%22id%22%3A2496741%2C%22name%22%3A%22Gehirn%20und%20Zentrales%20Nervensystem%22%2C%22abbr%22%3A%5B%22gzn%22%5D%7D%2C%7B%22id%22%3A2496473%2C%22name%22%3A%22Robotik%201%22%7D%2C%7B%22id%22%3A2512215%2C%22name%22%3A%22Software-Evolution%22%2C%22abbr%22%3A%5B%22se%22%2C%22evo%22%5D%7D%5D&redirectHome=true&search=%s"
            readonly
        />
        <Button class="shrink-0"><Copy />Copy</Button>
    </div>
    <Step>Paste your link</Step>
    <p class="leading-7 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit laudantium
        consectetur ipsam?
    </p>
    <Step>Do an omnibox search</Step>
    <p class="leading-7 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit laudantium
        consectetur ipsam?
    </p>
</Steps>

<div class="ml-4 my-24 mr-4 border-l pl-8">
    <Accordion.Root
        type="multiple"
        class="w-full"
        value={["what-is-this", "who-is-this-for"]}
    >
        <Accordion.Item value="what-is-this" id="what-is-this">
            <Accordion.Trigger>What is this?</Accordion.Trigger>
            <Accordion.Content>
                <p class="leading-7">
                    This simple app lets you generate a custom link which can be
                    added to your site search configuration of your browser.
                    After that you can enter a custom keyword in your address
                    bar followed by a search query. This search query will
                    redirect you to one of your Ilias courses. The search query
                    can either be an exact match with a previously specified
                    abbreviation or a prefix of a course name.
                </p></Accordion.Content
            >
        </Accordion.Item>
        <Accordion.Item value="who-is-this-for" id="who-is-this-for">
            <Accordion.Trigger>Who is this for?</Accordion.Trigger>
            <Accordion.Content>
                <p class="leading-7">
                    This app is for KIT students using a chromium based browser
                    wanting to have omnibox search query shortcuts to their
                    ilias course pages.
                </p>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
