import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { z } from "zod";

const SearchParams = z.object({
    db: z
        .string({
            invalid_type_error: "Query parameter 'db' has to be provided",
        })
        .min(1, "Query parameter 'db' can not be empty")
        .transform((val, ctx) => {
            try {
                return JSON.parse(val);
            } catch {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Parameter 'db' is invalid JSON",
                    fatal: true,
                });
            }
            return z.NEVER;
        })
        .pipe(
            z.array(
                z.object({
                    id: z.number().int().nonnegative(),
                    name: z.string().min(1),
                    abbr: z.optional(z.array(z.string().min(1))),
                }),
                {
                    invalid_type_error:
                        "URL encoded JSON object array has to be provided",
                }
            )
        ),
    search: z
        .string({
            invalid_type_error: "Query parameter 'search' has to be provided",
        })
        .min(1, "Query parameter 'search' can not be empty"),
    redirectHome: z
        .string({
            invalid_type_error:
                "Query parameter 'redirectHome' has to be provided",
        })
        .min(1, "Query parameter 'redirectHome' can not be empty")
        .transform((val, ctx) => {
            if (["true", "false"].includes(val)) {
                return val == "true";
            }
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Parameter 'redirectHome' has to be 'true' or 'false'",
                fatal: true,
            });

            return z.NEVER;
        })
        .pipe(z.boolean()),
});

export const GET: RequestHandler = async ({ url }) => {
    const searchParams = {
        db: url.searchParams.get("db"),
        redirectHome: url.searchParams.get("redirectHome"),
        search: url.searchParams.get("search"),
    };

    const result = SearchParams.safeParse(searchParams);

    if (!result.success) {
        return json({ errors: result.error.issues }, { status: 400 });
    }

    const ilias_base: string =
        "https://ilias.studium.kit.edu/ilias.php?baseClass=ilrepositorygui&ref_id=";

    // Step 1: Check exact match in abbreviations
    for (const module of result.data.db) {
        if (module.abbr?.includes(result.data.search)) {
            redirect(307, ilias_base + module.id);
        }
    }

    // Step 2: Check if search partially matches any course name
    const partialMatch = result.data.db.find((module) =>
        module.name.toLowerCase().startsWith(result.data.search.toLowerCase())
    );

    if (partialMatch) {
        redirect(307, ilias_base + partialMatch.id);
    }

    // Step 3: redirection or error display
    if (result.data.redirectHome) {
        redirect(
            307,
            "https://ilias.studium.kit.edu/ilias.php?baseClass=ilmembershipoverviewgui"
        );
    }

    return json(
        { error: "No course found for that search string" },
        { status: 404 }
    );
};
