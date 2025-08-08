import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { rateRecipe } from "@/lib/actions/rate";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Rating, Recipe } from "@/types";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function RecipePage({ params }: Props) {
    const { id } = await params;

    const recipe: Recipe = await api.get(`/recipes/${id}`);
    let user: { id: string } | null = null;
    let usersRate: Rating | null = null;

    const token = await getToken();

    if (token) {
        user = await api.get("/auth/me", { token });
        usersRate = recipe.ratings.find(r => r.userId == user?.id) ?? null;
        console.log(user);
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-4xl font-bold mb-6 text-primary-500 text-center">{recipe.title}</h2>

                <section className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2 text-primary-400">Ingredients</h3>
                    <ul className="text-lg text-gray-600 mt-2">
                        {recipe.ingredients.map((ing, idx) => (<li key={idx}>{ing}</li>))}
                    </ul>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold mb-2 text-primary-400">Istructions</h3>
                    <p className="text-gray-600 whitespace-pre-line">{recipe.instructions}</p>
                </section>

                {user
                    ? (
                            <div className="mt-2">
                                {usersRate
                                    ? (
                                            <span className="text-xl">
                                                Your rate for this recipe: 
                                                <span className="font-bold"> {usersRate.value}</span>
                                            </span>
                                        )
                                    : (
                                            <form action={rateRecipe} className="flex gap-2">
                                                <input type="hidden" name="recipeId" value={recipe.id} />
                                                <Input className="max-w-64" name="value" type="number" min="1" max="5" />
                                                <Button type="submit">Rate</Button>
                                            </form>
                                        )}
                            </div>
                        )
                    : null}
            </div>
        </div>
    );
}
