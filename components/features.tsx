export default function Features() {
  return (
    <section className="w-full p-20 flex flex-col gap-20">
      
      {/* Feature 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 ">
        <img
          src="/demo.png"
          alt="feature"
          className="h-60 rounded-xl object-cover "
        />
        <div className="text-right">
          <h2 className="text-3xl font-semibold mb-3">Fast & Smooth Experience</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Consectetur autem voluptate facilis sint? Ipsa, laboriosam?
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 ">
        <img
          src="/demo.png"
          alt="feature"
          className="h-60 rounded-xl object-cover "
        />
        <div className="text-left">
          <h2 className="text-3xl font-semibold mb-3">Smart Automation</h2>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Voluptate repellendus nesciunt sunt officia illum recusandae!
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src="/demo.png"
          alt="feature"
          className=" h-60 rounded-xl object-cover "
        />
        <div className="text-right">
          <h2 className="text-3xl font-semibold mb-3">Built for Performance</h2>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Atque minus architecto, est officiis cumque eaque.
          </p>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10">
        <img
          src="/demo.png"
          alt="feature"
          className="h-60 rounded-xl object-cover"
        />
        <div className="text-left">
          <h2 className="text-3xl font-semibold mb-3">Modern & Minimal Design</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Quam fugit aut quas earum obcaecati ipsum.
          </p>
        </div>
      </div>

    </section>
  );
}
