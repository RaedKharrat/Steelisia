import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Sidebar from '../component/sidebar';  // Import the Sidebar component
import LoadingScreen from '../component/LoadingScreen.jsx'; // Import LoadingScreen

const DashboardCategorie = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);  // To hold the category being edited
  const [loading, setLoading] = useState(true);
  const [totalCategories, setTotalCategories] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  
  // State for file upload
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const toggleSidebar = () => setSidebarActive(!sidebarActive);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay for the loading screen

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://steelisia-tunisie.onrender.com/categorie/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategoryCount = async () => {
      try {
        const response = await axios.get('https://steelisia-tunisie.onrender.com/categorie/countc');
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
        await axios.delete(`https://steelisia-tunisie.onrender.com/categorie/${id}`);
        setCategories(categories.filter(category => category._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://steelisia-tunisie.onrender.com/categorie', { name: newCategoryName });
      setCategories([...categories, response.data]);
      setShowAddCategoryModal(false);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`https://steelisia-tunisie.onrender.com/categorie/${editCategory._id}`, { name: editCategory.name });
      setCategories(categories.map(category => (category._id === response.data._id ? response.data : category)));
      setEditCategory(null);  // Close the edit modal after saving changes
    } catch (error) {
      console.error('Error editing category:', error.response ? error.response.data : error.message);
    }
  };

  // Handle file upload
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!pdfFile) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append('pdf', pdfFile);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('https://steelisia-tunisie.onrender.com/product/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(`Upload successful!`);
    } catch (error) {
      console.error('Error uploading PDF:', error.response ? error.response.data : error.message);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  if (loading) {
    return <LoadingScreen />; // Render Preloader if loading is true
  }

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

          <div className="profile-details">
            <img src="/Frontoffice/assets/images/profile.jpg" alt="Profile" />
            <span className="admin_name">Steelisia Dashboard</span>
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
              <i className="bx bx-category-alt cart" style={{
                background: 'linear-gradient(45deg, red, orange)', // Linear gradient from red to orange
                WebkitBackgroundClip: 'text', // Apply the gradient to the text (icon)
                color: 'transparent', // Make the icon text transparent to show the gradient
              }}></i>
            </div>
          </div>

          {/* File Upload Section */}
        <div className="upload-section-container mb-4 p-4" style={{
          background: '#f8f9fa',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: 'auto',
          textAlign: 'center',
        }}>
          <h5 className="mb-3" style={{ fontSize: '1.2rem', color: '#495057' }}>Upload Catalogue</h5>
  
  {/* PDF Input Field */}
  <div className="mb-3">
    <input
      type="file"
      accept="application/pdf"
      className="form-control"
      onChange={handleFileChange}
      style={{
        display: 'block',
        margin: 'auto',
        border: '1px solid #ced4da',
        borderRadius: '5px',
        padding: '10px',
        width: '100%',
      }}
    />
  </div>

  {/* Upload Button */}
  <button
    className="btn btn-primary mt-3"
    onClick={handleFileUpload}
    style={{
      padding: '10px 20px',
      fontSize: '1rem',
      borderRadius: '5px',
      background: '#007bff',
      borderColor: '#007bff',
      transition: 'background 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.background = '#0056b3')}
    onMouseLeave={(e) => (e.target.style.background = '#007bff')}
  >
    Upload 
  </button>

  {/* Upload Status */}
  {uploadStatus && (
    <div className="mt-3" style={{ fontSize: '1rem', color: '#28a745', fontWeight: 'bold' }}>
      {uploadStatus}
    </div>
  )}
</div>


          <div className="sales-boxes" style={{ width: '100%' }}>
            <div className="recent-sales box">
              <div className="title">Category List</div>
              <button className="btn btn-outline-success mb-3" onClick={() => setShowAddCategoryModal(true)}>Add New Category</button>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              

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
                          <button className="btn btn-success btn-sm me-2" onClick={() => setEditCategory(category)}> <i className="fas fa-pencil-alt"></i></button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteCategory(category._id)}><i className="fas fa-trash-alt"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                      placeholder="Category Name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
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
                  <div className="modal-body">
                    <input
                      type="text"
                      className="form-control"
                      value={editCategory.name}
                      onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setEditCategory(null)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleEditCategory}>Save Changes</button>
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
