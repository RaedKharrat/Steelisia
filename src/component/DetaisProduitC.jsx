import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailsProduit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9090/product/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setProduct(data);
        setMainImage(`http://localhost:9090/images/${data.images[0]}`);
        setTotalAmount(Number(data.prix)); // Ensure initial total amount is a number
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error fetching product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Update total amount whenever quantity changes
  useEffect(() => {
    if (product) {
      setTotalAmount(Number(product.prix) * Number(quantity)); // Ensure total amount is a number
    }
  }, [quantity, product]);

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleConfirmOrder = async () => {
    const authToken = localStorage.getItem('authToken');
    let userId = null;

    if (authToken) {
      try {
        const payload = JSON.parse(atob(authToken.split('.')[1])); // Decode JWT payload
        userId = payload.userId;
      } catch (error) {
        console.error('Error decoding auth token:', error);
      }
    }

    if (!userId) {
      toast.error('Please log in to confirm your order.');
      return;
    }

    const orderData = {
      userId,
      products: [
        {
          productId: product._id,
          quantity,
        },
      ],
    };

    try {
      const response = await fetch('http://localhost:9090/cmd/command/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Failed to confirm order.');

      const orderResult = await response.json();
      toast.success('Order confirmed successfully!');
    } catch (error) {
      console.error('Error confirming order:', error);
      toast.error('Error confirming order.');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5" style={{ color: '#fff' }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-5" style={{ color: '#fff' }}>Product not found</div>;
  }

  return (
    <div className="container-fluid" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5rem', backgroundColor: '#0f0f0f', }}>
      <ToastContainer />
      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '1300px', minHeight: '70vh', display: 'flex', backgroundColor: '#2B2B2B', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
        <div className="row g-0 h-100" style={{ width: '100%' }}>
          {/* Thumbnail List */}
          <div className="col-md-2 h-100 d-flex flex-column align-items-center py-3" style={{ backgroundColor: '#2c2c2c', borderRadius: '10px' }}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:9090/images/${img}`}
                alt={`Thumbnail ${index}`}
                className="img-thumbnail mb-2"
                style={{
                  cursor: 'pointer',
                  width: '80%',
                  objectFit: 'cover',
                  maxHeight: '100px',
                  border: mainImage === `http://localhost:9090/images/${img}` ? '2px solid #ff9800' : 'none',
                  transition: 'border 0.3s',
                }}
                onClick={() => setMainImage(`http://localhost:9090/images/${img}`)}
              />
            ))}
          </div>

          {/* Main Product Image */}
          <div className="col-md-4 h-100 d-flex justify-content-center align-items-center">
            <img src={mainImage} className="img-fluid rounded" alt={product.name} style={{ height: '500px', width: '100%', objectFit: 'cover', borderRadius: '10px' }} />
          </div>

          {/* Product Details */}
          <div className="col-md-6 h-100 d-flex flex-column justify-content-between" style={{ position: 'relative' }}>
            <div className="card-body" style={{ backgroundColor: '#2b2b2b', borderRadius: '20px', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
              <div>
                <h3 className="card-title" style={{ color: '#fff' }}>{product.name}</h3>
                <p className="text-muted mb-2" style={{ color: '#b0b0b0' }}>{product.idCategorie?.name || 'Uncategorized'}</p>
                <h4 style={{ color: 'orange' }}>Price per unit: {Number(product.prix).toFixed(1)} Dt</h4>
                <h4 style={{ color: '#fff' }}>Total Amount: {Number(totalAmount).toFixed(1)} Dt</h4>

                {/* Quantity Input */}
                <div className="d-flex align-items-center mt-3">
                  <label className="me-2" style={{ color: '#fff' }}>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                    style={{ width: '60px', borderRadius: '5px', textAlign: 'center' }}
                  />
                </div>

                <p className="card-text mt-4" style={{ color: '#fff', flexGrow: 1 }}>{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="d-flex mt-4">
                <button
                  className="btn btn-lg w-100 d-flex align-items-center justify-content-center me-2"
                  onClick={handleAddToCart}
                  style={{
                    background: 'linear-gradient(to right, #ff9800, #f44336)',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    padding: '1rem 2rem',
                    fontWeight: 'bold',
                    transition: 'background 0.3s',
                  }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" style={{ color: 'white' }} /> Add to Cart
                </button>
                <button
                  className="btn btn-lg w-100 d-flex align-items-center justify-content-center"
                  onClick={handleConfirmOrder}
                  style={{
                    background: 'linear-gradient(to right, #2196F3, #21CBF3)',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    padding: '1rem 2rem',
                    fontWeight: 'bold',
                    transition: 'background 0.3s',
                  }}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduit;
