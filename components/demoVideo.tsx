export default function DemoVid() {
    return (
        <div className="w-screen min-h-screen flex justify-center items-center px-6 py-10">
            <div className="bg-gray-50 border border-gray-200 rounded-xl w-full max-w-7xl min-h-[90vh] flex flex-col justify-center items-center px-8 py-12 text-black gap-6 shadow-xl ">
                <h1 className="text-6xl font-bold text-[#6C6C6C] mt-20"><span className="text-[#9B9B9B]">Type. </span>Watch. <span className="text-[#414141]">Surf.</span></h1>
                <h1 className="text-3xl font-bold mt-10">"Make me a Booking.com application."</h1>
                <p className="text-sm max-w-4xl text-center text-gray-600">Surfers immediately understands the full scope — user accounts, listings, search, filters, maps, reviews, payments, and booking flows. It pulls real accommodation data, connects live availability, and wires up a production-ready PostgreSQL database with full authentication. It integrates the Amadeus Flights API, builds the entire flights module, and syncs everything into a unified booking experience. Frontend, backend, APIs, routing, state, deployment — every layer assembled with quiet precision.</p>
                <div className="relative w-full max-w-6xl flex-1 min-h-[80vh] mt-20 rounded-2xl overflow-hidden shadow-2xl">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/N7KR20fGzDs"
                        title="Surfers Editor Demo"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    )
}