import { cookies } from "next/headers";

export async function getToken() {
    const cooks = await cookies();

    return cooks.get("token")?.value ?? null;
}
