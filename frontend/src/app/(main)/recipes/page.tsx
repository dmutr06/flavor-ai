import RecipeList from "@/components/RecipeList";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
    searchParams: Promise<{ search: string }>;
};

export default async function RecipesPage({ searchParams }: Props) {
    const { search } = await searchParams;

    const searchRecipes = async (data: FormData) => {
        "use server";
        const search = data.get("search") ?? null;

        redirect(`/recipes?${search ? `search=${search}` : ""}`);
    };

    return (
        <main className="p-6 max-w-8xl mx-auto xl:px-42 max-h-full">
            <form className="flex gap-2" action={searchRecipes}>
                <Input name="search" />
                <Button>Search</Button>
            </form>

            <Suspense fallback={<div>Loading...</div>}>
                <RecipeList search={search} />
            </Suspense>
        </main>
    );
}
