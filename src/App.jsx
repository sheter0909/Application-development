import React, { useEffect, useState } from 'react'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Modal from './components/Modal'
import CartDrawer from './components/CartDrawer'
// Using DummyJSON API directly

export default function App(){
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(true)
  const [query,setQuery] = useState('')
  const [selectedProduct,setSelectedProduct] = useState(null)
  const [cart,setCart] = useState([])
  const [filters,setFilters] = useState({category:'all',sort:'relevance',min:0,max:0})
  // no provider selector; use DummyJSON
  const [codOrder, setCodOrder] = useState(null) // product being purchased via COD
  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{
    async function fetchProducts(){
      setLoading(true)
      try{
        const res = await fetch('https://dummyjson.com/products?limit=100')
        const raw = await res.json()
        const list = raw.products || []
        setProducts(list)
        // derive default price range
        const prices = list.map(p=>p.price)
        if(prices.length>0) setFilters(f=>({...f,min:Math.min(...prices),max:Math.max(...prices)}))
      }catch(err){
        console.error('Failed to fetch products', err)
        setProducts([])
      }finally{setLoading(false)}
    }
    fetchProducts()
  },[])

  function addToCart(product){
    setCart(prev=>{
      const found = prev.find(p=>p.id===product.id)
      if(found) return prev.map(p=>p.id===product.id?{...p,qty:p.qty+1}:p)
      return [...prev,{...product,qty:1}]
    })
  }

  function removeFromCart(productId){
    setCart(prev=>prev.filter(p=>p.id!==productId))
  }

  function updateQty(productId,qty){
    setCart(prev=>{
      if(qty<=0) return prev.filter(p=>p.id!==productId)
      return prev.map(p=>p.id===productId?{...p,qty}:p)
    })
  }

  function buyCOD(product){
    // open modal to confirm COD
    setCodOrder(product)
    setShowModal(true)
  }

  function confirmCOD(){
    if(!codOrder) return
    // add codOrder to cart and then simulate checkout success
    addToCart(codOrder)
    setShowModal(false)
    setCodOrder(null)
    // In a real app you'd call an API here; we clear cart to simulate completion
    alert('COD order confirmed. Your order will be delivered on COD.')
  }

  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="container">
      <header className="header">
        <div>
          <div className="logo">E-Shop</div>
          <div className="sub">React Midterm Project</div>
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <button className="btn ghost" onClick={()=>setDrawerOpen(true)}>Cart ({cart.length})</button>
          <button className="btn" onClick={()=>{ setSelectedProduct(null); window.location.reload(); }}>Refresh</button>
        </div>
      </header>

      <div className="grid">
        <main>
          {selectedProduct && (
            <div style={{marginBottom:12}}>
              <ProductDetails product={selectedProduct} addToCart={addToCart} buyCOD={buyCOD} />
            </div>
          )}

          <ProductList
            products={products}
            loading={loading}
            query={query}
            setQuery={setQuery}
            onSelect={setSelectedProduct}
            addToCart={addToCart}
            buyCOD={buyCOD}
            filters={filters}
            setFilters={setFilters}
          />
        </main>

        <aside className="sidebar">
          <div className="card sidebar-card">
            <h3>Quick Cart</h3>
            <div className="small">{cart.length} items</div>
            <div style={{marginTop:12}}>
              <button className="btn" onClick={()=>setDrawerOpen(true)}>Open Cart</button>
            </div>
          </div>
        </aside>
      </div>

      <CartDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} onSelect={setSelectedProduct} />

      {showModal && (
        <Modal onClose={()=>setShowModal(false)}>
          <h3>Confirm COD Purchase</h3>
          <div style={{marginTop:8}}>
            <div><strong>{codOrder.title}</strong></div>
            <div className="small">Price: ₱{codOrder.price} • Qty: 1</div>
          </div>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <button className="btn" onClick={confirmCOD}>Confirm COD</button>
            <button className="btn ghost" onClick={()=>setShowModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
