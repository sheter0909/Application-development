import React from 'react'

export default function ProductCard({product,onSelect,addToCart,buyCOD}){
  return (
    <div className="card product-card">
      <div className="image-wrap">
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
        {product.discountPercentage>0 && <div className="badge">-{Math.round(product.discountPercentage)}%</div>}
        <div className="rating">⭐ {product.rating}</div>
      </div>

      <h3 onClick={()=>onSelect(product)} className="product-title">{product.title}</h3>
      <div className="meta">
        <div>
          <div style={{fontWeight:700}}>₱{product.price}</div>
          <div className="small">{product.brand} • {product.category}</div>
        </div>

        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>addToCart(product)}>Add</button>
          <button className="btn ghost" onClick={()=>buyCOD(product)}>Buy COD</button>
        </div>
      </div>
    </div>
  )
}
