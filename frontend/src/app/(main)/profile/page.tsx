import { RecipeCard } from "@/components/RecipeCard";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Recipe } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const token = await getToken();

    if (!token) {
        return redirect("/auth/login");
    }

    const recipes: Recipe[] = await api.get("/recipes/my", { token });

    console.log(recipes);

    if (recipes.length > 0)
        return (
            <main className="p-6 max-w-8xl mx-auto xl:px-42 max-h-full">
                <h2 className="text-2xl text-center mt-8">Your recipes</h2>
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
            </main>
        );

    return (
        <div className="text-2xl text-center mt-8">There are no recipes :(</div>
    );
}
