import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { api } from "../api";

export async function login(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { token } = await api.post<{ token: string }>("/auth/login", {
        options: {
            body: JSON.stringify({
                email,
                password,
            }),
        },
    });

    const cooks = await cookies();
    cooks.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: Date.now() + 1000 * 3600 * 24 * 7,
    });

    redirect("/recipes");
}

export async function register(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    const { token } = await api.post<{ token: string }>("/auth/register", {
        options: {
            body: JSON.stringify({
                email,
                name,
                password,
            }),

        },
    });

    const cooks = await cookies();
    cooks.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: Date.now() + 1000 * 3600 * 24 * 7,
    });

    redirect("/recipes");
}
