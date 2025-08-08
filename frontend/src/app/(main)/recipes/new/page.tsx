"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function NewRecipePage() {
    const router = useRouter();
    const [ingredients, setIngredients] = useState<string[]>([""]);

    const addIngredient = () => setIngredients([...ingredients, ""]);
    const updateIngredient = (value: string, index: number) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const payload = {
            title: formData.get("title"),
            instructions: formData.get("instructions"),
            ingredients: ingredients.filter(Boolean),
        };

        const res = await fetch("/api/recipes", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            router.push("/recipes");
        }
        else if (res.status == 401) {
            router.push("/auth/login");
        }
        else {
            alert("Could not create a recipe");
        }
    };

    return (
        <div className="flex items-center justify-center max-h-screen px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-primary-700 mb-6">
                    Create a Recipe 🍳
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 max-h-full">
                    <Input
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ingredients
                        </label>
                        <div className="space-y-2 overflow-y-auto max-h-64">
                            {ingredients.map((value, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        type="text"
                                        value={value}
                                        onChange={e => updateIngredient(e.target.value, index)}
                                        placeholder={`Ingredient ${index + 1}`}
                                        required
                                    />
                                    {ingredients.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeIngredient(index)}
                                            className="text-red-500 font-bold"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={addIngredient}
                            className="mt-1"
                        >
                            + Add Ingredient
                        </Button>
                    </div>

                    <textarea
                        name="instructions"
                        placeholder="Instructions"
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-500"
                        rows={5}
                    />

                    <Button
                        type="submit"
                        variant="outline"
                        fullWidth
                    >
                        Create Recipe
                    </Button>
                </form>
            </div>
        </div>
    );
}
