export type Recipe = {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    ratings: Rating[];
};

export type Rating = {
    id: string;
    recipeId: string;
    userId: string;
    value: number;
};
