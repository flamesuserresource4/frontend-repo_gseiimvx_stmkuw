import { useState } from 'react'
import Hero from './components/Hero'
import RestaurantGrid from './components/RestaurantGrid'
import MenuDrawer from './components/MenuDrawer'
import Cart from './components/Cart'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [cart, setCart] = useState([])
  const [placing, setPlacing] = useState(false)

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p._id === item._id)
      if (existing) {
        return prev.map((p) => p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const placeOrder = async (totals) => {
    if (cart.length === 0 || !selectedRestaurant) return
    setPlacing(true)
    try {
      const res = await fetch(`${BACKEND}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurant_id: selectedRestaurant._id,
          items: cart.map(c => ({ menuitem_id: c._id, name: c.name, price: c.price, quantity: c.quantity })),
          subtotal: totals.subtotal,
          delivery_fee: totals.delivery_fee,
          total: totals.total,
          customer: {
            name: 'Guest',
            address: 'Unknown Street 123'
          }
        })
      })
      const data = await res.json()
      alert(`Order placed! ID: ${data.order_id}`)
      setCart([])
    } catch (e) {
      alert('Failed to place order')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen">
        <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Flames" className="w-10 h-10" />
            <span className="text-white font-bold text-lg">BlueEats</span>
          </div>
          <a href="/test" className="text-blue-200 hover:text-white text-sm">System check</a>
        </header>

        <main className="max-w-6xl mx-auto px-6 pb-16">
          <Hero />
          <div className="grid md:grid-cols-[1fr_340px] gap-6 items-start">
            <div>
              <RestaurantGrid onSelect={(r) => setSelectedRestaurant(r)} />
            </div>
            <Cart items={cart} placing={placing} onPlaceOrder={placeOrder} restaurant={selectedRestaurant} />
          </div>
        </main>

        <footer className="border-t border-white/10 py-6 text-center text-blue-200/70 text-sm">
          © {new Date().getFullYear()} BlueEats — Fast delivery, fresh taste.
        </footer>
      </div>

      {selectedRestaurant && (
        <MenuDrawer
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onAdd={addToCart}
        />
      )}
    </div>
  )
}

export default App
