import React, { useEffect, useState } from 'react';
import Signin from '../component/Signin';
import LoadingScreen from '../component/LoadingScreen'; 

const AuthPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Signin />
    </div>
  );
};

export default AuthPage;
