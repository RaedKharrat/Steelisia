import React, { useEffect, useState } from 'react';
import '../App.css';

import Signin from '../component/Signin.jsx';





const AuthPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
     
          <Signin />
         
        
    </div>
  );
};

export default AuthPage;
