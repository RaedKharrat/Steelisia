import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Sidebar from '../component/sidebar';  // Import the Sidebar component

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
      <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar} /> {/* Use Sidebar component here */}

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

        <div className="home-content" style={{ width: '100%' }}>
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Categories</div>
                <div className="number">{totalCategories}</div>
              </div>
              <i className="bx bx-category-alt cart"></i>
            </div>
          </div>

          <div className="sales-boxes" style={{ width: '100%' }}>
            <div className="recent-sales box">
              <div className="title">Category List</div>

              {/* Category List Table */}
              <div className="sales-details" style={{ width: '100%' }}>
                <table className="table table-striped" id="categoryTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map(category => (
                      <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>
                          <button className="btn btn-success btn-sm me-2" onClick={() => handleEditCategory(category)}> <i className="fas fa-pencil-alt"></i></button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteCategory(category._id)}><i className="fas fa-trash-alt"></i></button>
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
                    <input
                      type="text"
                      className="form-control"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Category Name"
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddCategoryModal(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleAddCategory}>Save Category</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Category Modal */}
          {editCategory && (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editCategoryModalLabel">Edit Category</h5>
                    <button type="button" className="btn-close" onClick={() => setEditCategory(null)}></button>
                  </div>
                  <form onSubmit={handleUpdateCategory}>
                    <div className="modal-body">
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editCategory.name}
                        onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                      />
                      <textarea
                        className="form-control"
                        value={editCategory.description}
                        onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                        placeholder="Description"
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setEditCategory(null)}>Close</button>
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
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

export default DashboardCategorie;
