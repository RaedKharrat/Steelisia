import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './NewestProducts.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NewestProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewestProducts = async () => {
            try {
                const response = await axios.get('https://steelisia-tunisie.onrender.com/product/newest');
                console.log(response.data); // Debugging response
                setProducts(response.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching newest products');
            } finally {
                setLoading(false);
            }
        };
        fetchNewestProducts();
    }, []);

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!products.length) {
        return <div className="error-message">No products found.</div>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(3, products.length),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <FaChevronLeft className="custom-arrow slick-prev" />,
        nextArrow: <FaChevronRight className="custom-arrow slick-next" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };

    return (
        <section className="product-section">
            <h2 className="product-section-title">Nouvelle Collection</h2>
            <Slider {...sliderSettings} className="product-slider">
                {products.map((product) => (
                    <div className="card" key={product._id}>
                        <img
                            src={`https://steelisia-tunisie.onrender.com/images/${product.images[0]}`}
                            alt={product.name}
                            className="card-image"
                        />
                        <div className="card-price-container">DT {product.prix}</div>
                        <h3 className="card-title">{product.name}</h3>
                        <div className="card-description">{product.description}</div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default NewestProducts;
