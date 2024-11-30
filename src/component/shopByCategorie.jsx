import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import Slider from 'react-slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ShopProduit.css';
import { Helmet } from 'react-helmet'; // Import Helmet for SEO

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
  const [searchTerm, setSearchTerm] = useState('');

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
        ((product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||  
         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
         (product.sousCategorie && product.sousCategorie.toLowerCase().includes(searchTerm.toLowerCase())))
    );
    setFilteredProducts(filtered);
  }, [priceRange, products, activeSubCategories, searchTerm]);

  if (loading) return <div>Loading...</div>;

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
    <>
      <Helmet>
        <title>Shop - Category {categoryId}</title>
        <meta name="description" content={`Explorez notre collection de produits dans la catégorie ${categoryId}.`} />
        {/* Other meta tags */}
      </Helmet>

      <section className="product-section" style={{background: 'linear-gradient(90deg,#fff,#fff)'}}>
        <ToastContainer />

        {/* Filters Section */}
        <div className="price-filter-container">
          <h2 style={{ marginRight: '10px', color: 'orangered' }}>
            <i className="fas fa-filter" style={{ marginRight: '10px', color: 'orangered' }}></i>
            Filters
          </h2>

          <div style={{ borderTop: '2px dashed orangered', margin: '10px 0', width: '100%' }}></div>

          {/* Search Filter */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search for anything..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #555',
                backgroundColor: '#333',
                color: '#fff',
                marginTop: '20px',
                marginBottom: '20px',
                fontSize: '16px',
              }}
            />
          </div>

          <div style={{ borderTop: '2px dashed grey', margin: '10px 0', width: '100%' }}></div>
          
          {/* Price Filter */}
          <div>
            <h3 style={{ marginTop: '20px' }}>Filtrer par prix</h3>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              min={0}
              max={5000}
              step={10}
              className="slider"
              renderTrack={(props, state) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '4px',
                    borderRadius: '5px',
                    background: `linear-gradient(to right, orangered ${state.index[0]}%, #ddd ${state.index[1]}%)`,
                  }}
                />
              )}
              renderThumb={(props) => (
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
              )}
            />
            <div style={{ marginTop: '10px', color: '#fff' }}>
              <span>{priceRange[0]} Dt</span> - <span>{priceRange[1]} Dt</span>
            </div>
          </div>
          <div style={{ borderTop: '2px dashed grey', margin: '10px 0', width: '100%' }}></div>

          {/* Subcategory Filter */}
          <div>
            <h3 style={{ marginTop: '20px' }}>sous categorie</h3>
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '200px' }}>
                <h3 style={{ textAlign: 'center' }}>{product.name}</h3>
                <div className="product-description" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  <p>{product.description.slice(0, 50)}...</p>
                </div>
                {/* Display Old Price and Current Price */}
                <div style={{ textAlign: 'center' }}>
                  <span style={{ color: 'orange', textDecoration: 'line-through' }}>
                    {product.oldPrix ? `${product.oldPrix} DT` : ''} {/* Display old price if available */}
                  </span>
                  <br />
                  <span style={{ color: 'orangered', fontWeight: 'bold' }}>
                    {product.prix} DT
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <button
                    className="btn-add-to-cart"
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'orangered',
                      border: 'none',
                      color: '#fff',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'background-color 0.3s',
                      marginTop: '10px',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <FaShoppingCart />
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ShopProduit;