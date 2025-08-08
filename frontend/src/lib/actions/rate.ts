import { redirect } from "next/navigation";
import { getToken } from "../auth";
import { api } from "../api";
import { revalidatePath } from "next/cache";

export async function rateRecipe(data: FormData) {
    "use server";

    const token = await getToken();
    if (!token) return redirect("/auth/login");

    const recipeId = data.get("recipeId") as string;
    const value = data.get("value") as string;

    try {
        await api.post(`/recipes/${recipeId}/rate`, {
            options: {
                body: JSON.stringify({
                    value: Number(value),
                }),
            },
            token,
        });

        revalidatePath(`/recipes/${recipeId}`);
    }
    catch (e) {
        console.log(e);
        throw new Error("Could not rate a recipe");
    }
}
