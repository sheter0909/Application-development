import React, { useMemo, useState } from 'react'

export default function SearchBar({query,setQuery,products,onSelect}){
  const [showSuggest,setShowSuggest] = useState(false)
  const suggestions = useMemo(()=>{
    if(!query) return []
    const q = query.toLowerCase()
    return products.filter(p=>p.title.toLowerCase().includes(q)).slice(0,8)
  },[query,products])

  return (
    <div className="searchSuggest">
      <input
        placeholder="Search products..."
        value={query}
        onChange={e=>{setQuery(e.target.value); setShowSuggest(true)}}
        onBlur={()=>setTimeout(()=>setShowSuggest(false),150)}
        style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #ddd'}}
      />
      {showSuggest && suggestions.length>0 && (
        <div className="suggestions card">
          {suggestions.map(s=>(
            <div key={s.id} onClick={()=>{onSelect(s); setQuery(s.title); setShowSuggest(false)}}>
              {s.title} <span className="small">• {s.brand}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
