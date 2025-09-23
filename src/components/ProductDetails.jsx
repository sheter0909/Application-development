import React from 'react'

export default function ProductDetails({product,addToCart,buyCOD}){
  if(!product) return <div className="card">Select a product to see details</div>
  return (
    <div className="card product-details">
      <div style={{display:'flex',gap:16,alignItems:'center'}}>
        <img src={product.images?.[0] || product.thumbnail} alt={product.title} style={{height:220,objectFit:'cover',borderRadius:8}} />
        <div style={{flex:1}}>
          <h2 style={{margin:0}}>{product.title}</h2>
          <div style={{marginTop:8}}>
            <div style={{fontWeight:700,fontSize:20}}>₱{product.price} <span className="small">({product.discountPercentage}% off)</span></div>
            <div className="small">{product.brand} • {product.category} • Stock: {product.stock}</div>
            <div className="small">Rating: ⭐ {product.rating}</div>
          </div>

          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button className="btn" onClick={()=>addToCart(product)}>Add to Cart</button>
            <button className="btn ghost" onClick={()=>buyCOD(product)}>Buy COD</button>
          </div>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <h4 className="small">Description</h4>
        <div>{product.description}</div>
      </div>
    </div>
  )
}
