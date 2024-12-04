<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Step from "$lib/components/step.svelte";
    import Steps from "$lib/components/steps.svelte";
    import { page } from "$app/stores";
    import { Check, Copy, Sparkles, Trash2, WandSparkles } from "lucide-svelte";
    import { Label } from "$lib/components/ui/label";
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import { z } from "zod";
    import { scale } from "svelte/transition";
    import omnibox from "$lib/assets/omnibox.gif";

    let redirectHome: boolean = $state(true);
    let htmlInput: string = $state("");
    let copied: boolean = $state(false);
    let parsed: boolean = $state(false);

    const coursesSchema = z.array(
        z.object({
            id: z.number().int().nonnegative(),
            name: z.string().min(1),
            abbr: z.array(z.string().min(1)),
            abbrInput: z.string(),
            nameInit: z.string().min(1),
        })
    );

    type Courses = z.infer<typeof coursesSchema>;

    let courses: Courses = $state([]);

    function deleteCourse(id: number) {
        courses = courses.filter((course) => course.id !== id);
    }

    function parseHtmlInput(): Courses | null {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlInput, "text/html");

        const semesterElement = doc.querySelector(".il-item-group");
        if (!semesterElement) return null;

        const courseElements = semesterElement.querySelectorAll(
            ".il-std-item-container"
        );
        if (!courseElements) return null;

        return Array.from(courseElements).map((courseElement) => {
            const courseTitleElement =
                courseElement.querySelector(".il-item-title a");
            const nameMatch =
                courseTitleElement?.textContent?.match(/\d+\s*–\s*(.+)/);
            const idMatch = courseTitleElement
                ?.getAttribute("href")
                ?.match(/ref_id=(\d+)/);

            return {
                id: parseInt(idMatch?.[1] || "0"),
                name: nameMatch?.[1] || "",
                abbr: [],
                abbrInput: "",
                nameInit: nameMatch?.[1] || "",
            };
        });
    }

    function handleParseInput() {
        if (!parsed) {
            parsed = true;
            const result = parseHtmlInput();
            if (!result) {
                alert(
                    "Could not parse your input. Make sure you are logged in, have sorted courses by location, and copied the page source."
                );
                parsed = false;
                htmlInput = "";
                return;
            }
            courses = result;
            setTimeout(() => (parsed = false), 2000);
        }
    }

    function validateInput() {
        courses.forEach((course) => {
            if (!course.name) course.name = course.nameInit;
        });
        const result = coursesSchema.safeParse(courses);
        console.log(result);
        if (result.success) return;
        alert("Unexpected error");
    }

    function handleCopyLink() {
        if (!copied) {
            validateInput();
            navigator.clipboard.writeText(link);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        }
    }

    const link: string = $derived(
        courses.length > 0
            ? $page.url.origin +
                  "/api/redirect/?db=" +
                  encodeURIComponent(
                      JSON.stringify(
                          courses.map(({ id, abbr, name }) => {
                              return { id, abbr, name };
                          })
                      )
                  ) +
                  "&redirectHome=" +
                  redirectHome +
                  "&search=%s"
            : ""
    );
</script>

<Steps>
    <Step stepTitle="Add your courses">
        <p class="leading-7">
            Go to your Ilias course overview (you have to be logged in), make
            sure to sort by <code>Location</code> at the top right, press right
            click, select <code>View Page Source</code> and copy everything. Paste
            it below and parse.
        </p>

        <div class="flex space-x-2 mt-3">
            <Input bind:value={htmlInput} />
            <Button
                onclick={handleParseInput}
                disabled={htmlInput === ""}
                class="space-x-1"
            >
                {#if !parsed}
                    <div in:scale>
                        <WandSparkles size="16" />
                    </div>
                {:else}
                    <div in:scale>
                        <Sparkles size="16" />
                    </div>
                {/if}
                <p>Parse</p>
            </Button>
        </div>
    </Step>

    <Step stepTitle="Edit courses and add shortcuts">
        {#if courses.length > 0}
            <p class="leading-7">
                You can now change a course's name, delete a course and add
                comma-seperated abbreviations.
            </p>
            <div class="flex flex-col space-y-6 mt-3">
                {#each courses as course, i}
                    <div class="flex space-x-2">
                        <div class="flex-1 space-y-2">
                            <Input
                                bind:value={course.name}
                                placeholder={"Default: " + course.nameInit}
                            />
                            <Input
                                bind:value={course.abbrInput}
                                placeholder="xyz, abc"
                                oninput={() => {
                                    course.abbr = course.abbrInput
                                        .split(",")
                                        .map((abbr) => abbr.trim())
                                        .filter((abbr) => abbr !== "");
                                }}
                            />
                        </div>

                        <div>
                            <Button
                                size="icon"
                                variant="outline"
                                onclick={() => {
                                    deleteCourse(course.id);
                                }}><Trash2 size="16"></Trash2></Button
                            >
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <p>No courses, yet. Parse your courses first!</p>
        {/if}
    </Step>

    <Step stepTitle="Choose default for no result">
        <p class="leading-7">
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
    </Step>

    <Step stepTitle="Copy your individual link"
        ><div class="flex space-x-2">
            <Input value={link} readonly />
            <Button
                onclick={handleCopyLink}
                disabled={link.length === 0}
                class="space-x-1"
            >
                {#if !copied}
                    <div in:scale>
                        <Copy size="16" />
                    </div>
                {:else}
                    <div in:scale>
                        <Check size="16" />
                    </div>
                {/if}
                <p>Copy</p>
            </Button>
        </div>
    </Step>

    <Step stepTitle="Paste your link"
        ><p class="leading-7">
            In your address bar type in <code
                >chrome://settings/searchEngines</code
            >
            and scroll down to site search. Press on add and fill out the form. The
            first field <code>name</code> specifies the display name when the
            shortcut is selected or about to be. The field
            <code>shortcut</code> specifies the shortcut you have to type to be
            able to search. In the <code>url</code> field you paste the copied link.
        </p></Step
    >

    <div id="demo"></div>
    <Step stepTitle="Execute your first omnibox search">
        <p>
            In this case <code>swt</code> is specified as an abbreviation for
            the course "Softwaretechnik II". The name of the custom site search
            is <code>Ilias</code> and the shortcut is <code>i</code>.
        </p>
        <img
            alt="omnibox search"
            src={omnibox}
            class="w-full mt-3 border-0 rounded-md"
        />
    </Step>
</Steps>
