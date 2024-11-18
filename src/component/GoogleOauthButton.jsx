import React from "react";
import { GoogleLogin } from '@react-oauth/google'; // New package for Google login
import { useNavigate } from "react-router-dom";  // Import useNavigate

const GoogleAuthButton = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSuccess = async (response) => {
    console.log("Google Login Success:", response);

    // Send token to the backend
    const idToken = response.credential; // Update token property to 'credential'

    try {
      const backendUrl = "http://localhost:9090/user/google-auth";
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }), // Send token to the backend
      });

      if (!res.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await res.json();
      console.log("Backend Response:", data);
      alert("Login Successful!");

      // Store the authToken in local storage
      localStorage.setItem('authToken', idToken);

      // Navigate to /home after successful login
      navigate('/home');
    } catch (error) {
      console.error("Error communicating with backend:", error);
      alert("Google Login Failed. Try again.");
    }
  };

  const handleFailure = (error) => {
    console.error("Google Login Failed:", error);
    alert("Google Login Failed. Try again.");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleFailure}
      useOneTap
    />
  );
};

export default GoogleAuthButton;
