import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './NewestProducts.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RandomP = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9090/product/randomproduct');
                console.log(response.data); // Check what the API is returning
                setProducts(Array.isArray(response.data) ? response.data : []); // Ensure `products` is an array
            } catch (err) {
                setError('Error fetching random products');
            } finally {
                setLoading(false);
            }
        };
        fetchRandomProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <FaChevronLeft className="slick-prev" />,
        nextArrow: <FaChevronRight className="slick-next" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section className="product-section">
            <h2 className="product-section-title" style={{ marginTop: '100px' }}>Produits Aléatoires</h2>
            <Slider {...sliderSettings} className="product-slider">
                {Array.isArray(products) && products.map(product => (
                    <div className="card" key={product._id}>
                        <img 
                            src={`http://localhost:9090/images/${product.images[0]}`} 
                            alt={product.name} 
                            className="card-image"
                        />
                        <div className="card-price-container">
                            Dt {product.prix}
                        </div>
                        <h3 className="card-title">{product.name}</h3>
                        <div className="card-description">
                            {product.description}
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default RandomP;
