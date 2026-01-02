import Header from "@/components/header";
import { BookOpen } from "lucide-react";

export default function BlogsPage() {
    return (
        <div className="min-h-screen ">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4 text-black">Blogs</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Insights, updates, and tutorials from the Surfers Editor team.
                    </p>
                </div>


            </div>
        </div>
    );
}
