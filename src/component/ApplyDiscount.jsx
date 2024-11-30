import React, { useState } from 'react';
import axios from 'axios';

const ApplyDiscount = ({ productId }) => {
    const [discountType, setDiscountType] = useState('price');
    const [discountValue, setDiscountValue] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`http://localhost:9090/product/discount/${productId}`, {
                discountType,
                discountValue: Number(discountValue),
            });
            setMessage(`Discount applied successfully! New price: ${response.data.prix}`);
        } catch (err) {
            setError(err.response ? err.response.data.error : 'An error occurred');
        }
    };

    return (
        <div style={{ padding: '20px' , height:'100%'}}>
            <h2 className="mb-4">Apply Discount</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Discount Type:</label>
                    <select 
                        className="form-select" 
                        value={discountType} 
                        onChange={(e) => setDiscountType(e.target.value)}
                    >
                        <option value="price">Fixed Price</option>
                        <option value="percentage">Percentage</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Discount Value:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        required
                        style={{ borderRadius: '0.5rem' }}
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn" 
                    style={{ backgroundColor: 'orange', color: 'white', borderRadius: '20px' }}
                >
                    Apply Discount
                </button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ApplyDiscount;