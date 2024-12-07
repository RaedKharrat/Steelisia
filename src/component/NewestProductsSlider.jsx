import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewestProductsSlider.css";

const NewestProductsSlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://steelisia-tunisie.onrender.com/product/newest")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching newest products:", error);
      });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleCardClick = (id) => {
    navigate(`/produit-detais/${id}`);
  };

  return (
    <div className="slider-container">
      <h2 className="slider-title2">Nouvelle Collection</h2>
      <Slider {...sliderSettings} className="slider">
        {products.map((product) => (
          <div
            className="cardnew"
            key={product._id}
            onClick={() => handleCardClick(product._id)}
          >
            <img
              className="card-image"
              src={`https://steelisia-tunisie.onrender.com/images/${product.images[0]}`}
              alt={product.name}
            />
            <div className="card-content">
              <h3 className="card-title2">{product.name}</h3>
              <p className="card-category">
                {product.idCategorie?.name || "Uncategorized"} |{" "}
                {product.sousCategorie || "Non Affecté"}
              </p>
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
