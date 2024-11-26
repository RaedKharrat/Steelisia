import React from "react";
import { GoogleLogin } from "@react-oauth/google"; // Import Google Login
import { useNavigate } from "react-router-dom"; // Import useNavigate

const GoogleAuthButton = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle successful Google Login
  const handleSuccess = async (response) => {
    console.log("Google Login Success:", response);

    // Extract token from the response
    const idToken = response.credential;

    try {
      // Send token to the backend for validation
      const backendUrl = "http://localhost:9090/user/google-auth";
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });

      if (!res.ok) {
        throw new Error("Failed to authenticate");
      }

      // Parse the response
      const data = await res.json();
      console.log("Backend Response:", data);

      // Store the authToken in localStorage (for further requests)
      localStorage.setItem("authToken", data.token);

      // Extract user data from the backend response
      const { user } = data; // Destructure the user object from the response
      const userId = user.id; // Get the user ID from the backend response

      if (userId) {
        console.log("Extracted User ID:", userId);
        // Optionally, store user data in localStorage or pass it as needed
        localStorage.setItem("userId", userId); // Store the userId from the backend
        localStorage.setItem("userName", user.name); // Store the user name
      } else {
        console.warn("User ID could not be extracted from response");
      }

      // Navigate to /home after successful login
      navigate("/home");
    } catch (error) {
      console.error("Error communicating with backend:", error);
      alert("Google Login Failed. Try again.");
    }
  };

  // Handle failed Google Login
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
