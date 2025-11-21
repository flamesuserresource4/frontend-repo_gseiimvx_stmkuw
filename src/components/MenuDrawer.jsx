import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function MenuDrawer({ restaurant, onClose, onAdd }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${BACKEND}/restaurants/${restaurant._id}/menu`)
      const data = await res.json()
      setItems(data)
    }
    if (restaurant) load()
  }, [restaurant])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex">
      <div className="ml-auto w-full sm:w-[480px] h-full bg-slate-900 border-l border-white/10 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-semibold">{restaurant.name}</h3>
          <button onClick={onClose} className="text-blue-200 hover:text-white">Close</button>
        </div>
        <p className="text-blue-200/80 mb-6">{restaurant.description}</p>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item._id} className="bg-slate-800/60 border border-white/10 rounded-xl p-4 flex gap-4">
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-blue-100/70 text-sm">{item.description}</p>
                  </div>
                  <div className="text-white font-semibold">${'{'}item.price.toFixed(2){'}'}</div>
                </div>
                <button
                  onClick={() => onAdd(item)}
                  className="mt-3 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg"
                >
                  Add to order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuDrawer
