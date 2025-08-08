import { House, Plus, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-primary-400 shadow-md px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl text-primary-100 font-bold">FlavorAI</h1>
            <div className="space-x-4 flex gap-1">
                <Link
                    href="/recipes/new"
                    className="text-primary-100 hover:text-primary-200 transition bg-primary-100 rounded-full p-2 flex items-center justify-center"
                >
                    <Plus className="text-primary-400" />
                </Link>
                <Link
                    href="/recipes"
                    className="text-primary-100 hover:text-primary-200 transition bg-primary-100 rounded-full p-2 flex items-center justify-center"
                >
                    <House className="text-primary-400" />
                </Link>
                <Link
                    href="/profile"
                    className="text-primary-100 hover:text-primary-200 transition bg-primary-100 rounded-full p-2 flex items-center justify-center"
                >
                    <User className="text-primary-400" />
                </Link>
            </div>
        </nav>
    );
}
