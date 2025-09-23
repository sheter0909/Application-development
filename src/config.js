// Configuration for API provider
// Change `provider` to 'dummyjson' (default) or 'fakestore' if you want to switch
export const config = {
  provider: 'dummyjson',
  urls: {
    dummyjson: 'https://dummyjson.com/products?limit=100',
    fakestore: 'https://fakestoreapi.com/products'
  }
}

// Normalizer: convert different APIs to a common product shape used by the app
export function normalizeProducts(provider, raw) {
  if(provider === 'dummyjson'){
    // raw is { products: [...] }
    return (raw.products || []).map(p=>({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      brand: p.brand || '',
      rating: p.rating || 0,
      stock: p.stock || 0,
      discountPercentage: p.discountPercentage || 0,
      thumbnail: p.thumbnail || (p.images && p.images[0]),
      images: p.images || []
    }))
  }

  if(provider === 'fakestore'){
    // fakestore returns an array of products
    return (raw || []).map(p=>({
      id: p.id,
      title: p.title,
      price: Math.round(p.price),
      description: p.description,
      category: p.category,
      brand: '',
      rating: (p.rating && p.rating.rate) || 0,
      stock: 10,
      discountPercentage: 0,
      thumbnail: p.image,
      images: [p.image]
    }))
  }

  // fallback: assume array
  return (raw || []).map((p,i)=>({
    id: p.id || i,
    title: p.title || p.name || 'Product '+(i+1),
    price: p.price || 0,
    description: p.description || '',
    category: p.category || 'general',
    brand: p.brand || '',
    rating: p.rating || 0,
    stock: p.stock || 0,
    discountPercentage: p.discountPercentage || 0,
    thumbnail: p.thumbnail || (p.image||''),
    images: p.images || (p.image?[p.image]:[])
  }))
}
