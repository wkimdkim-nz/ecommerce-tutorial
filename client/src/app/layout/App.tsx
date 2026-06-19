import { useEffect, useState } from "react"
import type { Product } from "../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:7033/api/products')
      .then(response => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [])

  const addProducts = () => {
    setProducts(prevProducts => [
      ...prevProducts,
      {
        id: prevProducts.length + 1,
        name: 'New Product',
        description: 'Description of the new product',
        price: 19.99,
        pictureUrl: 'https://example.com/product.jpg',
        type: 'Type A',
        brand: 'Brand X',
        quantityInStock: 100
      }
    ]);
  }
  
  return (
    <div>
      <h1>Re-store</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name} - ${product.price.toFixed(2)}</li>
        ))}
      </ul>
      <button onClick={addProducts}>Add Product</button>
    </div>
  )
}

export default App
