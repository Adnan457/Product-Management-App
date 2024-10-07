import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { prices } from "./../components/Prices";
import ChatBot from "../components/chatBot"; // Import ChatBot component
import "../styles/HomePage.css"; // Assuming you have your styles for the page here
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Importing heart icons

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishList, setWishList] = useState([]); // Wishlist state

  const banners = [
    "/images/Apple-Slider.jpg",
    "/images/Glorious.jpg",
    "/images/intel.jpg",
    "/images/lianli.jpg",
    "/images/steelseries.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000); // Change banner every 3 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  }, [banners.length]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle wishlist
  const handleWishlist = (productId) => {
    if (wishList.includes(productId)) {
      setWishList(wishList.filter((id) => id !== productId));
    } else {
      setWishList([...wishList, productId]);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      {/* Banner Slider */}
      <div className="banner-slider">
        <img
          src={banners[currentBanner]}
          alt="Banner"
          className="banner-img-slider"
        />
      </div>

      {/* Image Layout Section (Placed Below Navbar) */}
      <div className="image-layout">
        <div className="left-image">
          <img
            src="/images/ASUS-TUF-BANNER.png" // Replace with your actual image source
            alt="Large"
            className="hover-image"
          />
        </div>
        <div className="right-images">
          <div className="top-image">
            <img
              src="/images/HyperX-BANNER.png" // Replace with your actual image source
              alt="Top"
              className="hover-image"
            />
          </div>
          <div className="bottom-image">
            <img
              src="/images/USP-Banner-3.png" // Replace with your actual image source
              alt="Bottom"
              className="hover-image"
            />
          </div>
        </div>
      </div>

      <div className="row mt-3">
        {/* Filter Section */}
        <div className="filter-section">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="filter-checkbox"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="filter-price">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id} className="filter-radio">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <button
            className="btn-reset-filters"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>

        {/* Products Section */}
        <div className="products-section">
          <h1 className="heading-title text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card product-card m-2"
                style={{ width: "18rem", position: "relative" }} // Added relative positioning
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top product-img"
                  alt={p.name}
                />
                <div className="card-body product-card-body">
                  <h5 className="card-title product-title">{p.name}</h5>
                  <p className="card-text product-description">
                    {p.description.substring(0, 30)}
                  </p>
                  {p.discount > 0 ? (
                    <p className="card-text product-price">
                      <span className="price-strike">${p.price}</span>{" "}
                      <span className="price-discounted">
                        ${p.price - (p.price * p.discount) / 100}
                      </span>
                    </p>
                  ) : (
                    <p className="card-text product-price"> ${p.price}</p>
                  )}

                  <button
                    className="btn btn-primary ms-1 product-details-btn"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More details
                  </button>
                  <button className="btn btn-secondary ms-1 add-to-cart-btn">
                    ADD TO CART
                  </button>
                </div>
                {/* Heart Icon for Wishlist */}
                <div
                  className="wishlist-icon"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: wishList.includes(p._id) ? "red" : "gray",
                  }}
                  onClick={() => handleWishlist(p._id)}
                >
                  {wishList.includes(p._id) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn btn-warning btn-load-more"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot Integration */}
      <div className="chatbot-container">
        <ChatBot />
      </div>
    </Layout>
  );
};

export default HomePage;
