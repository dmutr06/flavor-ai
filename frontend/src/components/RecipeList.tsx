import { api } from "@/lib/api";
import { Recipe } from "@/types";
import Link from "next/link";
import { RecipeCard } from "./RecipeCard";

export default async function RecipeList({ search }: { search?: string }) {
    const recipes = await api.get<Recipe[]>(`/recipes${search ? `?search=${search}` : ""}`, {
        options: {
            next: {
                revalidate: 60,
            },
            cache: "reload",
        },
    });

    if (recipes.length > 0)
        return (
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto max-h-full">
                {recipes.map(recipe => (
                    <li
                        key={recipe.id}
                    >
                        <Link href={`/recipes/${recipe.id}`}>
                            <RecipeCard recipe={recipe} />
                        </Link>
                    </li>
                ))}
            </ul>
        );

    return (
        <div className="text-2xl text-center mt-8">There are no recipes :(</div>
    );
}
