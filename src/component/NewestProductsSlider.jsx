import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NewestProductsSlider.css";

const NewestProductsSlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

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

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 cards at a time
    slidesToScroll: 1,
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 2000, // 2 seconds per slide
    pauseOnHover: true,
  };

  const handleCardClick = (id) => {
    navigate(`/produit-detais/${id}`); // Navigate to the product detail page with the product's ID
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title2">Nouvelle Collection </h2>
      <Slider {...sliderSettings} className="slider">
        {products.map((product) => (
          <div
            className="cardnew"
            key={product._id}
            onClick={() => handleCardClick(product._id)} // Add onClick handler to each card
          >
            <img
              className="card-image"
              src={`http://localhost:9090/images/${product.images[0]}`}
              alt={product.name}
            />
            <div className="card-content">
              <h3 className="card-title2">{product.name}</h3>
              <p className="card-category">
                {product.idCategorie?.name || "Uncategorized"}
              </p>
              <p>{product.sousCategorie || "non affecter"}</p>
              <p className="card-price">
                {product.prix ? product.prix.toFixed(2) : "N/A"} Dt
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewestProductsSlider;
