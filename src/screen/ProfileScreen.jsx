    import React, { useEffect, useState } from 'react';
    import '../App.css';
    import Header from '../component/Header.jsx';
    import LoadingScreen from '../component/LoadingScreen.jsx'; // Import the Preloader component
    import FunFacts from '../component/FunFact.jsx';
    import ProfilePage from '../component/ProfilePage.jsx';
    import Footer from '../component/Footer.jsx';
    import CategorySection from '../component/CategorySection.jsx';

    // Corrected component name (uppercase 'P')
    // Change profileScreen to ProfileScreen
    const ProfileScreen = () => {
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 2 seconds delay
    
        return () => clearTimeout(timer); // Cleanup on unmount
        }, []);
    
        if (loading) {
        return <LoadingScreen />; // Render Preloader if loading is true
        }
    
        return (
        <div>
            <Header />

            <ProfilePage />
            <FunFacts />
            <CategorySection />
           
            <Footer />
        </div>
        );
    };
    
    export default ProfileScreen;
    