import { useMemo } from 'react'

function Cart({ items, onPlaceOrder, placing, restaurant }) {
  const { subtotal, delivery, total } = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
    const delivery = items.length ? 3.99 : 0
    const total = subtotal + delivery
    return { subtotal, delivery, total }
  }, [items])

  return (
    <aside className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 text-white">
      <h3 className="font-semibold mb-3">Your order</h3>
      {items.length === 0 ? (
        <p className="text-blue-200/80 text-sm">No items yet. Add something tasty!</p>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it._id} className="flex items-center justify-between text-sm">
              <div className="text-blue-100/90">{it.quantity}x {it.name}</div>
              <div className="font-medium">${'{'}(it.price * it.quantity).toFixed(2){'}'}</div>
            </div>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <div className="flex items-center justify-between text-sm text-blue-100/80">
            <span>Subtotal</span>
            <span>${'{'}subtotal.toFixed(2){'}'}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-blue-100/80">
            <span>Delivery</span>
            <span>${'{'}delivery.toFixed(2){'}'}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span>${'{'}total.toFixed(2){'}'}</span>
          </div>
          <button
            onClick={() => onPlaceOrder({ subtotal, delivery_fee: delivery, total })}
            disabled={placing}
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg"
          >
            {placing ? 'Placing order...' : 'Place order'}
          </button>
          {restaurant && (
            <p className="text-xs text-blue-200/70">from {restaurant.name}</p>
          )}
        </div>
      )}
    </aside>
  )
}

export default Cart
