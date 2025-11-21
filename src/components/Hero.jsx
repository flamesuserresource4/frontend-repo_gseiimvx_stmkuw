import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Crave. Tap. Delivered.
          </h1>
          <p className="text-blue-100/90 text-lg mb-8">
            Order from top local spots. Fresh burgers, crispy fries, and ice-cold drinks at your door in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('#restaurants')}
              className="inline-flex items-center justify-center rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 shadow-lg shadow-blue-500/20 transition"
            >
              Browse restaurants
            </button>
            <a href="/test" className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 backdrop-blur border border-white/10 transition">
              System check
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200"
            alt="Burger hero"
            className="rounded-3xl border border-white/10 shadow-2xl shadow-blue-900/30"
          />
          <div className="absolute -bottom-6 -left-6 bg-slate-800/80 backdrop-blur rounded-2xl px-4 py-3 border border-white/10 text-white text-sm">
            ⭐ 4.7 average, 25 min ETA
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
