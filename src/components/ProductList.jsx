import React, { useMemo } from 'react'
import ProductCard from './ProductCard'
import SearchBar from './SearchBar'

export default function ProductList({products,loading,query,setQuery,onSelect,addToCart,buyCOD,filters,setFilters}){
  const categories = useMemo(()=>{
    const set = new Set(products.map(p=>p.category))
    return ['all',...Array.from(set)]
  },[products])

  const filtered = useMemo(()=>{
    let res = products
    if(filters.category && filters.category!=='all') res = res.filter(p=>p.category===filters.category)
    if(query) res = res.filter(p=>p.title.toLowerCase().includes(query.toLowerCase()))
    if(filters.min) res = res.filter(p=>p.price>=filters.min)
    if(filters.max) res = res.filter(p=>p.price<=filters.max)
    if(filters.sort==='price-asc') res = res.sort((a,b)=>a.price-b.price)
    if(filters.sort==='price-desc') res = res.sort((a,b)=>b.price-a.price)
    return res
  },[products,filters,query])

  return (
    <div>
      <SearchBar
        query={query}
        setQuery={setQuery}
        products={products}
        onSelect={onSelect}
      />

      <div style={{marginTop:12, marginBottom:12, display:'flex',gap:8,alignItems:'center'}}>
        <select value={filters.category} onChange={e=>setFilters(f=>({...f,category:e.target.value}))}>
          {categories.map(c=>(<option key={c} value={c}>{c}</option>))}
        </select>
        <select value={filters.sort} onChange={e=>setFilters(f=>({...f,sort:e.target.value}))}>
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {loading? <div>Loading products...</div> : (
        <div className="products">
          {filtered.map(p=> (
            <ProductCard key={p.id} product={p} onSelect={onSelect} addToCart={addToCart} buyCOD={buyCOD} />
          ))}
        </div>
      )}
    </div>
  )
}
