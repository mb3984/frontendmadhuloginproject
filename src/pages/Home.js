import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Check for loggedInUser in localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user && user !== "undefined") {
      setLoggedInUser(user);
    } else {
      console.log("No user found in localStorage");
      navigate("/login"); // Redirect to login if no user found
    }
  }, [navigate]);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "https://backendcodeloginproject.onrender.com/products";
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Added Bearer prefix
        },
      };
      const response = await fetch(url, headers);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result); // Log the result to see the format

      // Assuming result is an array of products
      setProducts(Array.isArray(result) ? result : []);
    } catch (err) {
      handleError(err.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <li>
                {item.name} : {item.price}
              </li>
            </ul>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
