import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewestProducts.css';

const NewestProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewestProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9090/product/newest');
                setProducts(response.data);
            } catch (err) {
                setError('Error fetching newest products');
            } finally {
                setLoading(false);
            }
        };
        fetchNewestProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className="product-section">
            <h2 className="product-section-title" style={{ marginTop: '100px' }}>Newest Products</h2>
            <div className="product-cards">
                {products.map(product => (
                    <div className="card" key={product._id} style={{backgroundColor:'#2b2b2b', borderRadius:'30px'}}>
                        <img 
                            src={`http://localhost:9090/images/${product.images[0]}`} 
                            alt={product.name} 
                            className="card-image" 
                            
                        />
                        <div className="card-price-container">
                            Dt {product.prix}
                        </div>
                        <h3 className="card-title"style={{color:'orange'}}>{product.name}</h3>
                        <div className="card-description">
                            {product.description}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewestProducts;
