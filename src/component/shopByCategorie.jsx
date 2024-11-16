import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import Slider from 'react-slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ShopProduit.css';

const ShopProduit = ({ updateCartCount }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeSubCategories, setActiveSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  // New state for search term

  const categoryId = new URLSearchParams(location.search).get('categoryId');

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/product/productsbycategorie/${categoryId}`);
        setProducts(response.data);

        const uniqueSubCategories = [
          ...new Set(response.data.map((product) => product.sousCategorie)),
        ];
        setSubCategories(uniqueSubCategories);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
    }
  }, [categoryId]);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.prix >= priceRange[0] &&
        product.prix <= priceRange[1] &&
        (activeSubCategories.length === 0 || activeSubCategories.includes(product.sousCategorie)) &&
        ((product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||  // Safe check for product name
         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
         (product.sousCategorie && product.sousCategorie.toLowerCase().includes(searchTerm.toLowerCase())))
    );
    setFilteredProducts(filtered);
  }, [priceRange, products, activeSubCategories, searchTerm]);  // Include searchTerm in dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handlePriceRangeChange = (values) => setPriceRange(values);

  const toggleSubCategory = (subCategory) => {
    setActiveSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  const handleAddToCart = (item) => {
    updateCartCount(item);
    toast.success(`${item.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
    });
  };

  const navigateToDetails = (id) => {
    navigate(`/produit-detais/${id}`);
  };

  return (
    <section className="product-section">
      <ToastContainer />

      {/* Filters Section */}
      <div className="price-filter-container">
        <h2 style={{ marginRight: '10px', color: 'orangered' }}>
          <i className="fas fa-filter" style={{ marginRight: '10px', color: 'orangered' }}></i>
          Filters
        </h2>
        {/* Separation Line */}
        <div
          style={{
            borderTop: '2px dashed orangered',
            margin: '10px 0',
            width: '100%',
          }}
        ></div>

        {/* Search Filter */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Search Products</h3>
          <input
            type="text"
            placeholder="Search by name, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '10px',
              marginBottom: '20px',
            }}
          />
        </div>

        {/* Price Filter */}
        <div>
          <h3>Filter by Price</h3>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            min={0}
            max={5000}
            step={10}
            className="slider"
            renderTrack={(props, state) => {
              return (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '4px',
                    borderRadius: '5px',
                    background: `linear-gradient(to right, orangered ${state.index[0]}%, #ddd ${state.index[1]}%)`,
                  }}
                />
              );
            }}
            renderThumb={(props) => {
              return (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    backgroundColor: 'orangered',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              );
            }}
          />
          <div style={{ marginTop: '10px', color: '#fff' }}>
            <span>{priceRange[0]} Dt</span> - <span>{priceRange[1]} Dt</span>
          </div>
        </div>
        <div
          style={{
            borderTop: '2px dashed grey',
            margin: '10px 0',
            width: '100%',
          }}
        ></div>
        {/* Subcategory Filter */}
        <div>
          <h3 style={{ marginTop: '20px' }}>Filter by Subcategory</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {subCategories.map((subCategory) => (
              <button
                key={subCategory}
                onClick={() => toggleSubCategory(subCategory)}
                style={{
                  padding: '10px 15px',
                  borderRadius: '15px',
                  backgroundColor: activeSubCategories.includes(subCategory) ? 'orangered' : 'orange',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                {subCategory}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            borderTop: '2px dashed grey',
            margin: '10px 0',
            width: '100%',
          }}
        ></div>
      </div>

      {/* Products Section */}
      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card" onClick={() => navigateToDetails(product._id)}>
            <div className="product-img-container">
              <img
                src={`http://localhost:9090/images/${product.images[0]}`}
                alt={product.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div className="product-img-overlay">
                <span style={{ backgroundColor: 'grey', padding: '6px', borderRadius: '10px' }}>
                  {product.sousCategorie}
                </span>
              </div>
            </div>
            <div>
              <h3>{product.name}</h3>
              <p style={{ color: 'orange' }}> {product.prix} Dt</p>
              <div className="description-container">
                <p>{product.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="add-to-cart-btn"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopProduit;
