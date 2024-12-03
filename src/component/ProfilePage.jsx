import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import axios from 'axios';

// Styled components
const ProfilePageWrapper = styled.div`
  background-color: #121212;
  color: #f5f5f5;
  padding: 50px 20px;
  min-height: 100vh;
`;

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #1f1f1f;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 40px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4caf50;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const InfoLabel = styled.h3`
  font-size: 1.2rem;
  color: #e0e0e0;
  margin-bottom: 5px;
`;

const InfoValue = styled.p`
  font-size: 1rem;
  color: #b0b0b0;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
    avatar: null
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
        setFormData({
          name: decoded.name,
          email: decoded.email,
          address: decoded.address,
          role: decoded.role,
          avatar: decoded.avatar || null
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0]
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const userId = jwtDecode(token).id;

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('role', formData.role);
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }

    try {
      const response = await axios.put(
        `https://steelisia-tunisie.onrender.com/user/${userId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <ProfilePageWrapper>
      <h2
        style={{
          background: '#3a3a3a',
          padding: '20px',
          marginTop: '70px',
          marginBottom: '50px',
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          borderRadius: '50px',
          marginRight: '20px',
          marginLeft: '20px'
        }}
      >
        Mon Profile
      </h2>

      <ProfileContainer>
        <AvatarWrapper>
          <Avatar src={formData.avatar ? URL.createObjectURL(formData.avatar) : userData.avatar || 'https://via.placeholder.com/120'} alt="Profile Avatar" />
        </AvatarWrapper>

        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <InfoSection>
              <InfoLabel>Name</InfoLabel>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </InfoSection>

            <InfoSection>
              <InfoLabel>Email</InfoLabel>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </InfoSection>

            <InfoSection>
              <InfoLabel>Address</InfoLabel>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </InfoSection>

            <InfoSection>
              <InfoLabel>Role</InfoLabel>
              <input type="text" name="role" value={formData.role} onChange={handleChange} required />
            </InfoSection>

            <InfoSection>
              <InfoLabel>Avatar</InfoLabel>
              <input type="file" name="avatar" onChange={handleFileChange} />
            </InfoSection>

            <Button type="submit">Update</Button>
          </form>
        ) : (
          <>
            <InfoSection>
              <InfoLabel>Name</InfoLabel>
              <InfoValue>{userData.name}</InfoValue>
            </InfoSection>

            <InfoSection>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>{userData.email}</InfoValue>
            </InfoSection>

            <InfoSection>
              <InfoLabel>Address</InfoLabel>
              <InfoValue>{userData.address}</InfoValue>
            </InfoSection>

            <InfoSection>
              <InfoLabel>Role</InfoLabel>
              <InfoValue>{userData.role}</InfoValue>
            </InfoSection>

            <Button onClick={handleLogout}>Log Out</Button>
            <Button onClick={handleEdit}>Edit Profile</Button>
          </>
        )}
      </ProfileContainer>
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
