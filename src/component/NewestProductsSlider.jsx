import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewestProductsSlider.css"; // Import styles

const NewestProductsSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the newest products from the API
    axios
      .get("http://localhost:9090/product/newest")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching newest products:", error);
      });
  }, []);

  return (
    <div className="slider-container">
      <h2 className="slider-title">Newest Products</h2>
      <div className="slider">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <img
              className="card-image"
              src={`http://localhost:9090/images/${product.images[0]}`}
              alt={product.name}
            />
            <div className="card-content">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-category">
                {product.idCategorie?.name || "Uncategorized"}
              </p>
              <p className="card-price">
                ${product.prix ? product.prix.toFixed(2) : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewestProductsSlider;
