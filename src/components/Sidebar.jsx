import React from 'react'

export default function Sidebar({cart,onSelect,products,filters,setFilters,removeFromCart,updateQty}){
  const total = cart.reduce((s,p)=>s+p.price*p.qty,0)
  return (
    <div className="card sidebar-card">
      <h3>Cart</h3>
      <div className="cart-list">
        {cart.length===0 && <div className="small">Cart is empty</div>}
        {cart.map(item=> (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail || item.images?.[0]} alt="" />
            <div style={{flex:1}}>
              <div style={{fontWeight:700,cursor:'pointer'}} onClick={()=>onSelect(item)}>{item.title}</div>
              <div className="small">₱{item.price} • <span style={{fontWeight:700}}>₱{(item.price*item.qty).toFixed(2)}</span></div>
              <div style={{display:'flex',gap:8,alignItems:'center',marginTop:6}}>
                <button className="qty" onClick={()=>updateQty(item.id,item.qty-1)}>-</button>
                <div className="small">{item.qty}</div>
                <button className="qty" onClick={()=>updateQty(item.id,item.qty+1)}>+</button>
                <button className="btn ghost small" onClick={()=>removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

        <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div className="small">Total</div>
        <div style={{fontWeight:700}}>₱{total}</div>
      </div>

      <hr style={{margin:'12px 0'}} />

      <h4 className="small">Filters</h4>
      <div className="small">Price Range</div>
      <div style={{display:'flex',gap:6,marginTop:6}}>
        <input type="number" value={filters.min} onChange={e=>setFilters(f=>({...f,min:Number(e.target.value)}))} />
        <input type="number" value={filters.max} onChange={e=>setFilters(f=>({...f,max: Number(e.target.value)}))} />
      </div>

      <div style={{marginTop:10}}>
        <button className="btn">Checkout</button>
      </div>
    </div>
  )
}
