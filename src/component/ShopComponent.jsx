import React, { useEffect, useState } from 'react';
import ProductModal from './ProductModal';
import Slider from 'react-slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FurnitureSales.css';
import 'font-awesome/css/font-awesome.min.css';

const FurnitureSales = ({ updateCartCount }) => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchFurnitureItems = async () => {
      try {
        const response = await fetch('http://localhost:9090/product/');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setFurnitureItems(data);
        setFilteredItems(data);  // Initialize with all items
      } catch (error) {
        console.error('Error fetching furniture items:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:9090/categorie/');
        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchFurnitureItems();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Apply filters whenever priceRange or selectedCategory changes
    let filtered = furnitureItems.filter((item) => (
      item.prix >= priceRange[0] && item.prix <= priceRange[1]
    ));

    if (selectedCategory) {
      filtered = filtered.filter((item) => 
        item.idCategorie && item.idCategorie.name === selectedCategory
      );
    }

    setFilteredItems(filtered);
  }, [priceRange, selectedCategory, furnitureItems]); // Reapply filters when dependencies change

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setFilteredItems(furnitureItems);  // Reset to all items
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (item) => {
    updateCartCount(item);
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="section furniture-sales" id="furniture-sales">
      <div className="container">
        <ToastContainer />

        {/* Filter Section */}
        <div className="filter-container">
          <div className="filter-options">
            <strong style={{ marginBottom: '10px' }}>Price Range:</strong>
            <Slider
              className="slider"
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onChange={handlePriceRangeChange}
              renderTrack={(props, state) => {
                const { index, value } = state;
                const left = Math.min(value[0], value[1]);
                const right = Math.max(value[0], value[1]);
                return (
                  <div
                    {...props}
                    className="slider-track"
                    style={{
                      background: `linear-gradient(to right, red ${left / 10}%, green ${left / 10}%, green ${right / 10}%, red ${right / 10}%)`,
                    }}
                  />
                );
              }}
              renderThumb={(props) => <div {...props} className="slider-thumb" />}
            />
            <div className="range-values" style={{ marginTop: '20px' }}>
              <span
                style={{
                  backgroundColor: 'green',
                  padding: '10px',
                  borderRadius: '20px',
                  color: 'white',
                }}
              >
                Min Price: {priceRange[0]} Dt
              </span>
              <span
                style={{
                  backgroundColor: 'red',
                  padding: '10px',
                  borderRadius: '20px',
                  color: 'white',
                }}
              >
                Max Price: {priceRange[1]} Dt
              </span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="category-filter" style={{ marginTop: '20px' }}>
            <strong style={{ marginBottom: '10px' }}>Category:</strong>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{
                padding: '10px',
                borderRadius: '20px',
                width: '100%',
                marginTop: '10px',
                fontSize: '16px',
              }}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleClearFilters}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Items Display */}
        <div className="items-container">
          <div className="row event_box justify-content-center">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className={`col-lg-4 col-md-6 align-self-center mb-30 event_outer ${item.idCategorie && item.idCategorie.name}`}
              >
                <div className="events_item">
                  <div className="thumb" onClick={() => openModal(item)}>
                    <a>
                      <img
                        src={`http://localhost:9090/images/${item.images[0]}`}
                        alt={item.name}
                      />
                    </a>
                    <span className="category" style={{ backgroundColor: '#2b2b2b', color: 'white', opacity: '0.7' }}>
                      {item.idCategorie && item.idCategorie.name ? item.idCategorie.name : 'Unknown Category'}
                    </span>
                    <span className="price">
                      <h6>
                        <em>Dt</em>{item.prix}
                      </h6>
                    </span>
                  </div>
                  <div className="down-content">
                    <span className="author">{item.author}</span>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="add-to-cart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      className="btn btn-outline-success"
                      style={{ marginBottom: '20px', width: '90%' }}
                      onClick={() => handleAddToCart(item)}
                    >
                      <i className="fa fa-shopping-cart" style={{ marginRight: '8px' }}></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Modal */}
        {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
      </div>
    </section>
  );
};

export default FurnitureSales;
