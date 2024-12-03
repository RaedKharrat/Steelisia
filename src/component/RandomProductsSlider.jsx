import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const RandomProductsSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch random products from the server
  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch('https://steelisia-tunisie.onrender.com/product/randomproduct');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error('Fetched data is not an array');
        }
      } catch (error) {
        console.error('Error fetching random products:', error);
        toast.error('Error fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  const handleAddToCart = (productName) => {
    toast.success(`${productName} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5">
      <ToastContainer />
      <h2 className="text-center text-white mb-4">Random Products</h2>
      <Slider {...settings}>
        {Array.isArray(products) &&
          products.map((product) => (
            <div key={product._id} className="px-2">
              <div
                className="card shadow-lg"
                style={{
                  backgroundColor: '#2c2c2c',
                  borderRadius: '15px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={`https://steelisia-tunisie.onrender.com/images/${product.images[0]}`}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderBottom: '2px solid #ff9800',
                  }}
                />
                <div className="card-body" style={{ backgroundColor: '#2b2b2b' }}>
                  <h5 className="card-title" style={{ color: '#fff' }}>
                    {product.name}
                  </h5>
                  <p className="text-muted" style={{ color: '#b0b0b0' }}>
                    {product.idCategorie?.name || 'Uncategorized'}
                  </p>
                  <h6 className="text-warning" style={{ color: 'orange' }}>
                    {product.prix.toFixed(1)} Dt
                  </h6>
                  <button
                    className="btn btn-warning w-100 mt-3"
                    onClick={() => handleAddToCart(product.name)}
                    style={{
                      background: 'linear-gradient(to right, #ff9800, #f44336)',
                      color: 'white',
                      borderRadius: '10px',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      fontWeight: 'bold',
                    }}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default RandomProductsSlider;
