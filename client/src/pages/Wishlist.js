import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth"; // Adjust the import path as necessary
import "../styles/Wishlist.css"; // Ensure this path is correct

const Wishlist = () => {
  const [auth] = useAuth(); // Get the authentication context
  const [wishlist, setWishlist] = useState([]); // Initialize wishlist state

  useEffect(() => {
    if (auth?.user) {
      // Fetch the wishlist from an API or context here if needed
      const fetchWishlist = async () => {
        try {
          // Assuming you have an API endpoint for fetching wishlist
          const response = await fetch(`/api/wishlist/${auth.user.id}`); // Replace with actual endpoint
          const data = await response.json();
          setWishlist(data.wishlist || []); // Ensure it's an array
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
        }
      };

      fetchWishlist();
    }
  }, [auth]);

  // Function to handle removing an item from the wishlist
  const handleRemoveFromWishlist = async (itemId) => {
    try {
      // Assuming you have an API endpoint for removing an item from the wishlist
      await fetch(`/api/wishlist/${itemId}`, {
        method: "DELETE", // Assuming you're using DELETE to remove an item
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // Add token if required
        },
      });
      // Update the wishlist state to remove the item
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
    }
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-header">Your Wishlist</h2>
      {wishlist.length === 0 ? ( // Check if wishlist is empty
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.title} />
            <div className="wishlist-item-details">
              <h3 className="wishlist-item-title">{item.title}</h3>
              <p className="wishlist-item-price">${item.price}</p>
            </div>
            <button
              className="remove-button"
              onClick={() => handleRemoveFromWishlist(item.id)} // Call the function to remove the item
            >
              &times;
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
