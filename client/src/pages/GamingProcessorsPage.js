import React, { useEffect, useState } from "react";
import axios from "axios";

const GamingProcessorPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/category/gaming-processors`); // API for processors
        setProducts(data?.category?.products || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found in Gaming Processors category.</div>;
  }

  return (
    <div>
      <h1>Products in Gaming Processors Category</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamingProcessorPage;
