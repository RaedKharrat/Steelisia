import React, { useEffect, useState } from 'react';
import ProductModal from './ProductModal'; // Import the modal component

const FurnitureSales = () => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to manage selected product

  useEffect(() => {
    // Fetch furniture items from the API
    const fetchFurnitureItems = async () => {
      try {
        const response = await fetch('http://localhost:9090/product/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFurnitureItems(data); // Set the retrieved items in state
      } catch (error) {
        console.error('Error fetching furniture items:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFurnitureItems();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to open modal
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="section furniture-sales" id="furniture-sales">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-heading">
              <h6>Shop</h6>
              <h2>Latest Furniture Items for Sale</h2>
            </div>
          </div>
        </div>
        <ul className="event_filter">
          <li>
            <a className="is_active" href="#!" data-filter="*">Show All</a>
          </li>
          <li>
            <a href="#!" data-filter=".design">Sofas</a>
          </li>
          <li>
            <a href="#!" data-filter=".development">Tables</a>
          </li>
          <li>
            <a href="#!" data-filter=".wordpress">Chairs</a>
          </li>
        </ul>
        <div className="row event_box">
          {furnitureItems.map((item) => (
            <div key={item._id} className={`col-lg-4 col-md-6 align-self-center mb-30 event_outer ${item.category}`} onClick={() => openModal(item)}>
              <div className="events_item">
                <div className="thumb">
                  <a href="#">
                    <img src={`http://localhost:9090/images/${item.images[0]}`} alt={item.name} />
                  </a>
                  <span className="category">{item.category}</span>
                  <span className="price"><h6><em>$</em>{item.prix}</h6></span>
                </div>
                <div className="down-content">
                  <span className="author">{item.author}</span>
                  <h4>{item.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Render the modal if a product is selected */}
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default FurnitureSales;
