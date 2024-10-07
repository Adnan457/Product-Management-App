import React, { useEffect, useState } from "react";
import axios from "axios";

const GamingMotherboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch the category and its products by slug
        const { data } = await axios.get(
          `/api/v1/category/gaming-motherboards`
        );

        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("No products found");
        }
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
    return <div>No products found in Gaming Motherboards category.</div>;
  }

  return (
    <div>
      <h1>Products in Gaming Motherboards Category</h1>
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

export default GamingMotherboardPage;
