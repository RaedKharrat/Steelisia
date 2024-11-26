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
  { id: 1, title: "Bureautique", image: bureautique, hoverText: "Explore Bureautique", route: "/shop?categoryId=672ad6aeb57eec581baa0dad/" },
  { id: 2, title: "Salon", image: salon, hoverText: "Discover Salon", route: "/shop?categoryId=6720177dbc5c69c1804a1153" },
  { id: 3, title: "Cuisine", image: cuisine, hoverText: "Cuisine", route: "/shop?categoryId=672ccd44cf4acfdb37ab2f08" },
  { id: 4, title: "Nos Pack", image: pack, hoverText: "Nos Pack", route: "/shop?categoryId=6730d2bf4e5f6d1bf8cd2536" },
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
