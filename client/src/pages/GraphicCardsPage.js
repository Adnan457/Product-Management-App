import React, { useEffect, useState } from "react";
import axios from "axios";

const GraphicCardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Starting API request..."); // Check if this is printed
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/category/graphic-cards`
        );
        // API for graphic cards
        console.log("API Response:", data); // Check if the response is logged
        setProducts(data?.category?.products || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error); // Catch any errors in the request
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading spinner or message while data is loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle the case when no products are found
  if (!products || products.length === 0) {
    return <div>No products found in the Graphic Cards category.</div>;
  }

  return (
    <div>
      <h1>Products in Graphic Cards Category</h1>
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

export default GraphicCardPage;
