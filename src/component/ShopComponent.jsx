  import React, { useEffect, useState } from 'react';
  import ProductModal from './ProductModal';
  import Slider from 'react-slider';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import './FurnitureSales.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faTrash } from '@fortawesome/free-solid-svg-icons';
  import 'font-awesome/css/font-awesome.min.css';

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
      if (selectedCategory) {
        const filtered = furnitureItems.filter((item) => item.categoryId === selectedCategory);
        setFilteredItems(filtered);
      } else {
        setFilteredItems(furnitureItems); // No filter, show all items
      }
    }, [selectedCategory, furnitureItems]); // Re-filter when selectedCategory changes
  
    useEffect(() => {
      let filtered = furnitureItems.filter((item) => (
        item.prix >= priceRange[0] && item.prix <= priceRange[1]
      ));

      if (selectedCategory) {
        filtered = filtered.filter((item) => 
          item.idCategorie && item.idCategorie.name === selectedCategory
        );
      }

      if (sortNewest) {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setFilteredItems(filtered);
    }, [priceRange, selectedCategory, sortNewest, furnitureItems]);

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
      setSortNewest(false); // Reset sorting
      setFilteredItems(furnitureItems);  // Reset to all items
    };

    const handleSortNewestChange = () => {
      setSortNewest(!sortNewest); // Toggle sorting by date
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
        style: {
          backgroundColor: '#fff',  // Green background for success
          color: '#2b2b2b ',  // White text color
          borderRadius: '8px',  // Rounded corners
          padding: '10px 20px',  // Padding for better look
          fontSize: '16px',  // Slightly larger font size
        }
      });
    };

    const toggleDescription = (id) => {
      setExpandedDescription((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };


    return (
      <section className="section furniture-sales" id="furniture-sales" style={{top:'0' , backgroundColor:'white'}}>
        <div className="container" >
          <ToastContainer />
          
          {/* Filter Section */}
          <div className="filter-container" style={{marginBottom:'20px'}}>
            <div className="filter-item">
              <div className="filter-box" style={{ justifyContent:'center' , alignItems:'center', backgroundColor:'white'}}>
                <p style={{ justifyContent:'center' , alignItems:'center' ,  display:'flex', color:'orange'}}>Price Range</p>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  min={0}
                  max={1000}
                  step={10}
                  renderTrack={(props, state) => <div {...props} className="slider-track" />}
                  renderThumb={(props) => <div {...props} className="slider-thumb" />}
                />
                <div className="price-values" style={{marginTop:'40px'}}>
                  <span>{priceRange[0]} Dt</span> - <span>{priceRange[1]} Dt</span>
                </div>
              </div>
            </div>

            <div className="filter-item">
    <div className="filter-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to right, red, orange)' }}>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-select modern-dropdown"
        style={{
          backgroundColor: '#2b2b2b', // Dark background for dropdown
          color: '#333', // White text for better contrast
          border: '1px solid #555', // Border color for dark theme
          borderRadius: '4px', // Rounded corners for the dropdown
          padding: '8px 12px', // Padding for better spacing
          fontSize: '16px', // Font size for readability
          outline: 'none', // Remove default outline when focused
          width: '100%' // Make it full width of the parent container (optional)
        }}
      >
        <option value="" style={{ backgroundColor: '#333', color: '#fff' }}>All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name} style={{ backgroundColor: '#333', color: '#fff' }}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  </div>


            <div className="filter-item">
              <div className="filter-box gradient-box">
              <div className="custom-control custom-checkbox" style={{ margin: '5px' }}>
    <input
      type="checkbox"
      className="custom-control-input"
      id="customCheck1"
      checked={sortNewest}
      onChange={handleSortNewestChange}
    />
    <label className="custom-control-label" htmlFor="customCheck1">
      New Collection
    </label>
  </div>

                <i className="fa fa-star" style={{ color: 'red' , fontSize:'20px' , backgroundColor:'white' , borderRadius:'50%' , padding:'3.5px' , opacity:'0.9' }}></i> {/* Icon added here */}

              </div>
            </div>


            <div className="filter-item" style={{}}>
              <div className="filter-box clear-box" style={{ display:'flex' , justifyContent:'center' , alignItems:'center',backgroundColor:'red'}}>
                <button className="btn btn-clear" onClick={handleClearFilters}  >
                  <FontAwesomeIcon icon={faTrash}  />
                  <h6 style={{margin:'5px',color:'white'}} > Clear Filters</h6>
                </button>
              </div>
            </div>
          </div>

          {/* Items Display */}
          <div className="items-container">
    <div className="row event_box justify-content-center">
      {filteredItems.map((item) => (
        <div
          key={item._id}
          className={`col-lg-3 col-md-4 col-sm-6 align-self-center mb-30 event_outer ${item.idCategorie && item.idCategorie.name}`}
        >
          <div className="events_item" style={{height:'600px'}}>
            <div className="thumb" onClick={() => openModal(item)} style={{height:'500px'}}>
              <a>
                <img
                  src={`http://localhost:9090/images/${item.images[0]}`}
                  alt={item.name}
                  style={{
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </a>
              <span className="category" style={{ background:'linear-gradient(135deg, #ff7a18, #af002d 90%)' ,color: 'white', opacity: '0.9',top:'10px', left:'10px' }}>
                {item.idCategorie && item.idCategorie.name ? item.idCategorie.name : 'Unknown Category'}
              </span>
              <span className="price" style={{marginRight:'25px'}}>
                <h6>
                  {item.prix.toFixed(1)}<em>Dt</em>
                </h6>
              </span>
            </div>
            <div className="down-content">
              <span className="author">{item.author}</span>
              <h4>{item.name}</h4>
              <div className="description-container">
    <p>
      {expandedDescription[item._id] 
        ? item.description 
        : item.description.length > 100 
          ? `${item.description.substring(0, 100)}...` 
          : item.description}
    </p>
  </div>


              {item.description.length > 1 && (
                <button 
                  onClick={() => toggleDescription(item._id)} 
                  style={{ color: 'orange' }}
                >
                  {expandedDescription[item._id] ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
            <div className="add-to-cart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button
                className="btn btn-outline-success"
                style={{ marginBottom: '20px', width: '90%', background:'linear-gradient(135deg, #ff7a18, #af002d 90%)' }}
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


          {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
        </div>
      </section>
    );
  };

  export default FurnitureSales;
