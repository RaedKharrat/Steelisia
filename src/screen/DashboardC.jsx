import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const DashboardCategorie = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCategories, setTotalCategories] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const toggleSidebar = () => setSidebarActive(!sidebarActive);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:9090/categorie/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch total category count
  useEffect(() => {
    const fetchCategoryCount = async () => {
      try {
        const response = await axios.get('http://localhost:9090/categorie/countc');
        if (response.data && response.data.totalCategories !== undefined) {
          setTotalCategories(response.data.totalCategories);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching category count:', error.response ? error.response.data : error.message);
      }
    };
    fetchCategoryCount();
  }, []);

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:9090/categorie/${id}`);
        setCategories(categories.filter(category => category._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    try {
      const { name, description } = editCategory;
      const response = await axios.put(`http://localhost:9090/categorie/${editCategory._id}`, { name, description });
      setCategories(categories.map(category => category._id === editCategory._id ? response.data : category));
      setEditCategory(null);
    } catch (error) {
      console.error('Error updating category:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditCategory = (category) => setEditCategory(category);

  const handleAddCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/categorie', { name: newCategoryName });
      setCategories([...categories, response.data]);
      setShowAddCategoryModal(false);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <aside className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">Steelisia</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard-users">
              <i className="bx bx-grid-alt" ></i>
              <span className="links_name">Users</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard-produit" >
              <i className="bx bx-package"></i>
              <span className="links_name">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard-categories" className="active">
              <i className="bx bx-category-alt"></i>
              <span className="links_name">Categories</span>
            </Link>
          </li>
          <li className="log_out">
            <Link to="#">
              <i className="bx bx-log-out"></i>
              <span className="links_name">Log out</span>
            </Link>
          </li>
        </ul>
      </aside>

      <section className="home-section">
        <nav>
          <div className="sidebar-button" onClick={toggleSidebar}>
            <i className={`bx ${sidebarActive ? 'bx-menu-alt-right' : 'bx-menu'} sidebarBtn`}></i>
            <span className="dashboard">Dashboard</span>
          </div>
          <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
          <div className="profile-details">
            <img src="/Frontoffice/assets/images/profile.jpg" alt="Profile" />
            <span className="admin_name">Admin</span>
            <i className="bx bx-chevron-down"></i>
          </div>
        </nav>

        <div className="home-content" style={{width:'100%'}}>
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Categories</div>
                <div className="number">{totalCategories}</div>
              </div>
              <i className="bx bx-category-alt cart"></i>
            </div>
          </div>

          <div className="sales-boxes" style={{width:'100%'}}>
            <div className="recent-sales box">
              <div className="title">Category List</div>

              {/* Add New Category Button */}

              {/* Category List Table */}
              <div className="sales-details" style={{width:'100%'}}>
                <table className="table table-striped" id="categoryTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map(category => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditCategory(category)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteCategory(category._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
              <button className="btn btn-outline-success mb-3" onClick={() => setShowAddCategoryModal(true)}>Add New Category</button>

            </div>
          </div>
          

          {/* Add Category Modal */}
          {showAddCategoryModal && (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addCategoryModalLabel">Add New Category</h5>
                    <button type="button" className="btn-close" onClick={() => setShowAddCategoryModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleAddCategory}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Category Name"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{margin:'5px'}}>Save</button>
                      <button type="button" className="btn btn-outline-danger" onClick={() => setShowAddCategoryModal(false)}>Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardCategorie;
