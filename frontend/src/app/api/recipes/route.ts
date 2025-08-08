import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const token = await getToken();
    const data = await req.text();

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await api.post("/recipes", {
            options: {
                body: data,
            },
            token,
        });

        revalidatePath("/recipes");
        return NextResponse.json("OK");
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({ error: e }, { status: 400 });
    }
}
