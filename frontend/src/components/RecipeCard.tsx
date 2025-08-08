"use client";

import { Recipe } from "@/types";

export function RecipeCard({ recipe: { title, ingredients } }: { recipe: Recipe }) {
    return (
        <div className="rounded-xl bg-white border border-primary-400 min-h-48 h-full shadow-sm overflow-hidden">
            <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <ul className="text-sm text-gray-600 mt-2">
                    {ingredients.slice(0, 4).map((ing, idx) => (<li key={idx}>{ing}</li>))}
                </ul>
                {ingredients.length > 4 ? "..." : null}
            </div>
        </div>
    );
}
