import { useEffect, useState } from "react";
import type { Product } from "../../models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:7033/api/products')
      .then(response => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [])
  
  return (
    <>
      <ProductList products={products} />
    </>
  )
}
