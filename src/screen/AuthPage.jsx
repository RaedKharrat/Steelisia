import React, { useEffect, useState } from 'react';
import Signin from '../component/Signin';
import LoadingScreen from '../component/LoadingScreen'; // Import the Preloader component

const AuthPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 0.5 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return <LoadingScreen />; // Render Preloader if loading is true
  }

  return (
    <div>
      <Signin />
    </div>
  );
};

export default AuthPage;
