import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { register } from "@/lib/actions/auth";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Create an Account 📝
            </h2>

            <form action={register} className="space-y-4">
                <Input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                />
                <Input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
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
                    Register
                </Button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
                Already have an account?
                {" "}
                <Link href="/auth/login" className="text-primary-500 font-medium hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
}
