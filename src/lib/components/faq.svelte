<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>

<div class="ml-2 sm:ml-4 mr-4 border-l pl-8">
    <Accordion.Root
        type="multiple"
        class="w-full"
        value={["what-is-this", "who-is-this-for"]}
    >
        <Accordion.Item value="what-is-this" id="what-is-this">
            <Accordion.Trigger
                ><h3 class="text-xl tracking-tight">
                    What is this?
                </h3></Accordion.Trigger
            >
            <Accordion.Content>
                <p class="leading-7">
                    This app lets you generate a custom link that you can add to
                    the site search configuration of your browser. After that
                    you can enter a custom keyword in your
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.chromium.org/user-experience/omnibox"
                    >
                        omnibox
                    </a> followed by a search query. This search query will redirect
                    you to one of your Ilias courses. The search query can either
                    be an exact match with a previously specified abbreviation or
                    a prefix of a course name.
                </p></Accordion.Content
            >
        </Accordion.Item>
        <Accordion.Item value="who-is-this-for" id="who-is-this-for">
            <Accordion.Trigger>
                <h3 class="text-xl tracking-tight">Who is this for?</h3>
            </Accordion.Trigger>
            <Accordion.Content>
                <p class="leading-7">
                    For me and all other <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.kit.edu/"
                    >
                        KIT
                    </a>
                    students using a
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium"
                    >
                        chromium based browser
                    </a> wanting to have omnibox search query shortcuts to their
                    ilias course pages.
                </p>
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
