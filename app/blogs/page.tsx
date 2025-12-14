import Header from "@/components/header";
import { BookOpen } from "lucide-react";

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Insights, updates, and tutorials from the Nap Editor team.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-48 bg-gray-200 animate-pulse" />
                            <div className="p-6">
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
