import React from "react";
import { Link } from "react-router-dom";
import "./CategorySection.css"; // Ensure this file exists for styling
import bureautique from './bureautique.jpg'
import salon from './Salon.jpg'
import cuisine from './cuisine.jpg'
import pack from './pack.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const categories = [
  { id: 1, title: "Bureautique", image: bureautique, hoverText: "Explore Bureautique", route: "/shop?categoryId=674f879416810c9f5e9ad998/" },
  { id: 2, title: "Salon", image: salon, hoverText: "Discover Salon", route: "/shop?categoryId=674f87af16810c9f5e9ad99c" },
  { id: 3, title: "Cuisine", image: cuisine, hoverText: "Cuisine", route: "/shop?categoryId=674f87a516810c9f5e9ad99a" },
  { id: 4, title: "Nos Pack", image: pack, hoverText: "Nos Pack", route: "/shop?categoryId=674f87e016810c9f5e9ad9a0" },
];

const CategorySection = () => {
  return (

    <div className="category-section">

      {categories.map((category) => (
        <Link to={category.route} key={category.id} className="category-card">
          <div className="category-card-content" style={{ backgroundImage: `url(${category.image})` }}>
          <div className="category-hover">
              <p>
                {category.hoverText}{" "}
                <FontAwesomeIcon icon={faArrowRight} className="hover-icon" />
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategorySection;
