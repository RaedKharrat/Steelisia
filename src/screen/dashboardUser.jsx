import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Ensure you have the correct styles in this file
import $ from 'jquery'; // Import jQuery
import Sidebar from '../component/sidebar';  // Import the Sidebar component
import LoadingScreen from '../component/LoadingScreen.jsx'; // Import LoadingScreen
import { useNavigate } from 'react-router-dom';


const DashboardU = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 2 seconds delay for the loading screen

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9090/user/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch total user count
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:9090/user/countu');
        console.log('API Response:', response.data);
        
        if (response.data && response.data.totalUser !== undefined) {
          setTotalUsers(response.data.totalUser);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };
    fetchUserCount();
  }, []);

  // Implement search functionality with jQuery
  useEffect(() => {
    const handleSearch = () => {
      $('#searchInput').on('keyup', function() {
        const value = $(this).val().toLowerCase();
        $('#userTable tbody tr').filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    };

    handleSearch();
  }, [users]); // Rerun if users change

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:9090/user/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    try {
      const { email, first_name, last_name, companyName, phone, adresse, role } = editUser;
      const response = await axios.put(`http://localhost:9090/user/${editUser._id}`, { email, first_name, last_name, companyName, phone, adresse, role });
      setUsers(users.map(user => user._id === editUser._id ? response.data : user));
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };


  if (loading) {
    return <LoadingScreen  />; // Use LoadingScreen here
  }

  return (
    <div className="dashboard">
            <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar} /> {/* Use Sidebar component here */}



      <section className="home-section">
        <nav>
          <div className="sidebar-button" onClick={toggleSidebar}>
            <i className={`bx ${sidebarActive ? 'bx-menu-alt-right' : 'bx-menu'} sidebarBtn`}></i>
            <span className="dashboard">Dashboard</span>
          </div>
          <div className="search-box">

          </div>
          <div className="profile-details">
            <img src="/Frontoffice/assets/images/profile.jpg" alt="Profile" />
            <span className="admin_name">Steelisia Dashboard</span>
            <i className="bx bx-chevron-down"></i>
          </div>
        </nav>

        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Users</div>
                <div className="number">{totalUsers}</div>
                <div className="indicator"></div>
              </div>
              <i className="bx bx-user cart" style={{
              background: 'linear-gradient(45deg, red, orange)', // Linear gradient from red to orange

              WebkitBackgroundClip: 'text', // Apply the gradient to the text (icon)
              color: 'transparent', // Make the icon text transparent to show the gradient
            }}></i>
            </div>
          </div>

          <div className="sales-boxes">
            <div className="recent-sales box">
              <div className="title">Users List</div>
              <input
              type="text"
              placeholder="Search users..."
              id="searchInput"
              className="form-control"
              style={{marginTop:'30px' , marginBottom:'10px'}}
            />
              <div className="sales-details">
                <table className="table table-striped" id="userTable">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.role} <i class="fa fa-check-circle" style={{ color: 'green'}}></i>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.companyName}</td>
                        <td>{user.phone}</td>
                        <td>
                          <button className="btn btn-success btn-sm me-2" onClick={() => handleEditUser(user)}><i className="fas fa-pencil-alt"></i> </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteUser(user._id)}><i className="fas fa-trash-alt"></i> </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="button">
                <a href="#" className="btn btn-primary">See All</a>
              </div>
            </div>
          </div>

          {editUser && (
            <div className="update-user-form mt-4" style={{ margin: '20px' }}>
              <div className="card">
                <div className="card-header">
                  <h2>Update User</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={handleUpdateUser}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={editUser.first_name}
                        onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={editUser.last_name}
                        onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
                        placeholder="Last Name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={editUser.companyName}
                        onChange={(e) => setEditUser({ ...editUser, companyName: e.target.value })}
                        placeholder="Company"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={editUser.phone}
                        onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                        placeholder="Phone"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={editUser.adresse}
                        onChange={(e) => setEditUser({ ...editUser, adresse: e.target.value })}
                        placeholder="Address"
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-control"
                        value={editUser.role}
                        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                      >
                        <option value="Client">Client</option>
                        <option value="Admin">Admin</option>
                        <option value="Company Owner">Company owner</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardU;
