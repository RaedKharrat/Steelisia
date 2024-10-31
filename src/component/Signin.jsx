import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Logged in successfully!");
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}> {/* Decreased width */}
            <Row className="justify-content-center">
                <Col md={12}>
                    <Card className="p-4 shadow-lg rounded-3">
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{color:'blue'}}>Log In</h2>
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="email" className="mb-3"> {/* Added spacer */}
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

                                <Form.Group controlId="password" className="mb-3"> {/* Added spacer */}
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

                                <Button variant="primary" type="submit" className="w-100 mt-3 rounded-pill p-2 fw-semibold"> {/* Adjusted margin */}
                                    Sign In
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                Don't have an account? <Link to="/signup" className="text-primary fw-semibold">Sign Up</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Signin;
