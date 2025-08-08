import Navbar from "@/components/Navbar";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex flex-col max-h-screen">
            <Navbar />
            <main className="flex-1 p-4 bg-primary-100">
                {children}
            </main>
        </div>
    );
}
