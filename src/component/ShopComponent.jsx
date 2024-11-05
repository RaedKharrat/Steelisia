import React, { useEffect, useState } from 'react';
import ProductModal from './ProductModal'; // Import the modal component
import Slider from 'react-slider'; // This should be correct
import './FurnitureSales.css'; // Import the CSS for styling

const FurnitureSales = () => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range

  useEffect(() => {
    const fetchFurnitureItems = async () => {
      try {
        const response = await fetch('http://localhost:9090/product/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFurnitureItems(data);
        setFilteredItems(data); // Initially, show all items
      } catch (error) {
        console.error('Error fetching furniture items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFurnitureItems();
  }, []);

  const applyFilters = () => {
    const filtered = furnitureItems.filter((item) => {
      const isInPriceRange =
        item.prix >= priceRange[0] && item.prix <= priceRange[1];
      return isInPriceRange;
    });
    setFilteredItems(filtered);
  };

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
    applyFilters(); // Apply filters on change
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="section furniture-sales" id="furniture-sales">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <div className="section-heading">
          <h1 style={{backgroundColor:'#2b2b2b' , color:'white' , borderRadius:'25px' , padding:'5px' , marginBottom:'40px'}}>Shop</h1>
          <h2 >Latest Furniture Items for Sale</h2>
        </div>
      </div>
    </div>

    {/* Filter Options */}
    <div className="filter-container">
      <div className="filter-options">
        <strong style={{marginBottom:'10px'}}>Price Range:</strong>
        <Slider
          className="slider"
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={handlePriceRangeChange}
          renderTrack={(props) => <div {...props} className="slider-track" />}
          renderThumb={(props) => <div {...props} className="slider-thumb" />}
        />
        <div className="range-values" style={{marginTop:'20px'}}>
          <span style={{backgroundColor:'green', padding:'10px', borderRadius:'20px', color:'white'}}>Min Price: {priceRange[0]} Dt</span>
          <span style={{backgroundColor:'red', padding:'10px', borderRadius:'20px', color:'white'}}>Max Price: {priceRange[1]} Dt</span>
        </div>
      </div>
    </div>

    {/* Items Container with Similar Background */}
    <div className="items-container">
      <div className="row event_box justify-content-center">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className={`col-lg-4 col-md-6 align-self-center mb-30 event_outer ${item.category}`}
            onClick={() => openModal(item)}
          >
            <div className="events_item">
              <div className="thumb">
                <a href="#">
                  <img src={`http://localhost:9090/images/${item.images[0]}`} alt={item.name} />
                </a>
                <span className="category" style={{ backgroundColor: '#2b2b2b', color: 'white', opacity: '0.7' }}>{item.etat}</span>
                <span className="price"><h6><em>Dt</em>{item.prix}</h6></span>
              </div>
              <div className="down-content">
                <span className="author">{item.author}</span>
                <h4>{item.name}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {selectedProduct && (
      <ProductModal product={selectedProduct} onClose={closeModal} />
    )}
  </div>
</section>
  );
};

export default FurnitureSales;
