import React from 'react'

export default function CartDrawer({open,onClose,cart,removeFromCart,updateQty,onSelect}){
  const total = cart.reduce((s,p)=>s+p.price*p.qty,0)
  return (
    <div className={`drawer ${open? 'open':''}`} onClick={onClose}>
      <div className="drawer-panel" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3>Cart</h3>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>

        <div style={{marginTop:12,display:'flex',flexDirection:'column',gap:12}}>
          {cart.length===0 && <div className="small">Your cart is empty</div>}
          {cart.map(item=> (
            <div key={item.id} style={{display:'flex',gap:12,alignItems:'center'}}>
              <img src={item.thumbnail || item.images?.[0]} alt="" style={{width:72,height:72,objectFit:'cover',borderRadius:8}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:700,cursor:'pointer'}} onClick={()=>onSelect(item)}>{item.title}</div>
                <div className="small">₱{item.price} • Qty: {item.qty}</div>
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <button className="qty" onClick={()=>updateQty(item.id,item.qty-1)}>-</button>
                  <button className="qty" onClick={()=>updateQty(item.id,item.qty+1)}>+</button>
                  <button className="btn ghost small" onClick={()=>removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:18,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div className="small">Total</div>
          <div style={{fontWeight:800}}>₱{total}</div>
        </div>

        <div style={{marginTop:14}}>
          <button className="btn" onClick={()=>alert('Proceed to checkout (simulated)')}>Checkout</button>
        </div>
      </div>
    </div>
  )
}
