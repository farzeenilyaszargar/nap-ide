export default function DemoVid() {
    return (
        <div className="w-screen sm:h-screen flex justify-center items-center px-6 pt-20">
            <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/10">
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/N7KR20fGzDs"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    )
}