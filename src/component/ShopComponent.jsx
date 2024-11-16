import React, { useEffect, useState } from 'react';
import ProductModal from './ProductModal';
import Slider from 'react-slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './FurnitureSales.css';

const FurnitureSales = ({ updateCartCount }) => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortNewest, setSortNewest] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:9090/product/'),
          fetch('http://localhost:9090/categorie/')
        ]);
        const products = await productsResponse.json();
        const categories = await categoriesResponse.json();
        
        setFurnitureItems(products);
        setFilteredItems(products);
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = furnitureItems.filter((item) => (
      item.prix >= priceRange[0] && item.prix <= priceRange[1]
    ));
    
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.categoryId === selectedCategory);
    }
    
    if (sortNewest) {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredItems(filtered);
  }, [priceRange, selectedCategory, sortNewest, furnitureItems]);

  const handlePriceRangeChange = (values) => setPriceRange(values);

  const handleCategoryChange = (event) => setSelectedCategory(event.target.value);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSortNewest(false);
  };

  const handleSortNewestChange = () => setSortNewest(!sortNewest);

  const openModal = (product) => setSelectedProduct(product);

  const closeModal = () => setSelectedProduct(null);

  const handleAddToCart = (item) => {
    updateCartCount(item);
    toast.success(`${item.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      style: { backgroundColor: '#fff', color: '#2b2b2b', borderRadius: '8px' }
    });
  };

  const toggleDescription = (id) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <section className="furniture-sales-section">
      <div className="container">
        <ToastContainer />
        
        {/* Filter Section */}
        <div className="filter-container">
          <div className="filter-box">
            <label>Price Range</label>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              min={0}
              max={1000}
              step={10}
              renderTrack={(props) => <div {...props} className="slider-track" />}
              renderThumb={(props) => <div {...props} className="slider-thumb" />}
            />
            <div className="price-values">
              <span>{priceRange[0]} Dt</span> - <span>{priceRange[1]} Dt</span>
            </div>
          </div>

          <div className="filter-box">
            <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-box">
            <label>
              <input type="checkbox" checked={sortNewest} onChange={handleSortNewestChange} />
              New Collection
            </label>
          </div>

          <button className="btn btn-clear" onClick={handleClearFilters}>
            <FontAwesomeIcon icon={faTrash} /> Clear Filters
          </button>
        </div>

        {/* Items Display */}
        <div className="items-container">
          <div className="row">
            {filteredItems.map((item) => (
              <div key={item._id} className="col-lg-3 col-md-4 col-sm-6 mb-30">
                <div className="item-card">
                  <div className="item-image" onClick={() => openModal(item)}>
                    <img src={`http://localhost:9090/images/${item.images[0]}`} alt={item.name} />
                    <span className="category-badge">{item.idCategorie?.name || 'Unknown Category'}</span>
                    <span className="price-tag">{item.prix.toFixed(1)} Dt</span>
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>
                      {expandedDescription[item._id]
                        ? item.description
                        : `${item.description.slice(0, 100)}...`}
                    </p>
                    {item.description.length > 100 && (
                      <button onClick={() => toggleDescription(item._id)}>
                        {expandedDescription[item._id] ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>
                  <button className="btn btn-add-to-cart" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
      </div>
    </section>
  );
};

export default FurnitureSales;
