import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container product-details mt-2">
        {/* Product Image */}
        <img
          src={`/api/v1/product/product-photo/${product._id}`}
          className="product-image"
          alt={product.name}
        />

        {/* Product Text Section */}
        <div className="product-text">
          <h1>Product Details</h1>
          <h6>
            <span>Name:</span> {product.name}
          </h6>
          <h6>
            <span>Description:</span> {product.description}
          </h6>
          <h6>
            <span>Price:</span> ${product.price}
          </h6>
          <h6>
            <span>Category:</span> {product?.category?.name}
          </h6>

          <button className="add-to-cart-btn">ADD TO CART</button>
        </div>
      </div>

      <hr />

      {/* Similar Products Section */}
      <div className="container similar-products">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}

        <div className="row">
          {relatedProducts?.map((p) => (
            <div className="col-md-4 col-sm-6 mb-3" key={p._id}>
              <div className="card h-100">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top img-fluid"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text card-price">$ {p.price}</p>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
