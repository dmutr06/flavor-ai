"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function ErrorHandler() {
    const router = useRouter();

    return (
        <div className="mx-auto mt-8 flex flex-col max-w-md">
            <h2 className="text-2xl text-center">Recipe not found</h2>
            <Button className="mt-4" onClick={() => router.back()}>Back</Button>
        </div>
    );
}
