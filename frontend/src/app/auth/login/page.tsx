import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { login } from "@/lib/actions/auth";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Welcome Back 👋
            </h2>

            <form action={login} className="space-y-4">
                <Input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                />
                <Input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                />

                <Button
                    type="submit"
                    variant="outline"
                    fullWidth
                >
                    Login
                </Button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
                Don’t have an account?
                {" "}
                <Link
                    href="/auth/register"
                    className="text-primary-500 font-medium hover:underline"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}
