import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        companyName: '',
        phone: '',
        adresse: '',
        image: null, // Initialize as null for file input
        role: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] }); // Handle file input
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        setMessage("Sign-up successful!");
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            <Row className="justify-content-center">
                <Col>
                    <Card className="p-5 shadow-lg rounded-4">
                        <Card.Body>
                            <h2 className="text-center mb-4"style={{color:'blue'}}>Create Account</h2>
                            {message && <Alert variant="success" className="text-center">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="email" className="mb-4">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter your email" 
                                        className="p-3 rounded-pill"
                                    />
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your password"
                                            className="p-3 rounded-pill"
                                            style={{ borderRight: "none" }}
                                        />
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={togglePasswordVisibility} 
                                            className="rounded-pill"
                                            style={{
                                                borderTopLeftRadius: "0", 
                                                borderBottomLeftRadius: "0",
                                                background: "none",
                                                border: "none",
                                                padding: "0.5rem 1rem",
                                                color: "#007bff",
                                                fontSize: "1.2rem"
                                            }}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="first_name" className="mb-4">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="first_name" 
                                        value={formData.first_name} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter your first name" 
                                        className="p-3 rounded-pill"
                                    />
                                </Form.Group>

                                <Form.Group controlId="last_name" className="mb-4">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="last_name" 
                                        value={formData.last_name} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter your last name" 
                                        className="p-3 rounded-pill"
                                    />
                                </Form.Group>

                                <Form.Group controlId="companyName" className="mb-4">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="companyName" 
                                        value={formData.companyName} 
                                        onChange={handleChange} 
                                        placeholder="Enter your company name (optional)" 
                                        className="p-3 rounded-pill"
                                    />
                                </Form.Group>

                                <Form.Group controlId="phone" className="mb-4">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter your phone number" 
                                        className="p-3 rounded-pill"
                                    />
                                </Form.Group>

                                <Form.Group controlId="adresse" className="mb-4">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="adresse" 
                                        value={formData.adresse} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Enter your address" 
                                        className="p-3 rounded-pill"
                                    />
                                </Form.Group>

                                <Form.Group controlId="image" className="mb-4">
                                    <Form.Label>Profile Image</Form.Label>
                                    <Form.Control 
                                        type="file" // Changed to file input
                                        name="image" 
                                        accept="image/*" // Accept only image files
                                        onChange={handleChange} 
                                        required 
                                        className="p-3 rounded-pill"
                                    />
                                </Form.Group>

                                <Form.Group controlId="role" className="mb-4">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        name="role" 
                                        value={formData.role} 
                                        onChange={handleChange} 
                                        required
                                        className="p-3 rounded-pill"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Client">Client</option>
                                        <option value="Company Owner">Company Owner</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 rounded-pill p-3 fw-semibold">
                                    Sign Up
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                Already have an account? <Link to="/signin" className="text-primary fw-semibold">Sign In</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;
