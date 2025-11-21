import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function RestaurantCard({ restaurant, onSelect }) {
  return (
    <button onClick={() => onSelect(restaurant)} className="text-left group">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition">
        <img src={restaurant.image_url} alt={restaurant.name} className="h-40 w-full object-cover" />
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white font-semibold group-hover:text-blue-300 transition">{restaurant.name}</h3>
            <span className="text-blue-300 text-sm">{restaurant.eta_minutes} min</span>
          </div>
          <p className="text-blue-100/70 text-sm line-clamp-2">{restaurant.description}</p>
          <div className="mt-2 text-yellow-300">⭐ {restaurant.rating}</div>
        </div>
      </div>
    </button>
  )
}

function RestaurantGrid({ onSelect }) {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ensure seed exists
        await fetch(`${BACKEND}/seed`, { method: 'POST' })
        const res = await fetch(`${BACKEND}/restaurants`)
        const data = await res.json()
        setRestaurants(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="text-blue-200/80 text-center py-10">Loading restaurants...</div>
    )
  }

  return (
    <section id="restaurants" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-white text-2xl font-bold mb-6">Popular near you</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <RestaurantCard key={r._id} restaurant={r} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

export default RestaurantGrid
