import React, { useState, useEffect } from 'react';import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Sidebar from '../component/sidebar';  // Import the Sidebar component


const DashboardP = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);  // State for categories

  // State for adding a new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    prix: '',
    qnt: '',
    etat: 'disponible',
    idCategorie: '',
    images: null,
  });

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9090/product/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  // const handleHome = () => {
  //   navigate('/home'); // Navigate to the home route using useNavigate
  // };
  
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:9090/product/countp');
        if (response.data && response.data.totalProducts !== undefined) {
          setTotalProducts(response.data.totalProducts);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };
    fetchProductCount();
  }, []);

  useEffect(() => {
    // Fetch categories dynamically
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:9090/categorie/');
        setCategories(response.data); // Assuming the response contains the list of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:9090/product/${id}`);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const { name, description, prix, qnt, etat } = editProduct;
      const response = await axios.put(`http://localhost:9090/product/${editProduct._id}`, { name, description, prix, qnt, etat });
      setProducts(products.map(product => product._id === editProduct._id ? response.data : product));
      setEditProduct(null); // Clear the form after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('prix', newProduct.prix);
    formData.append('qnt', newProduct.qnt);
    formData.append('etat', newProduct.etat);
    formData.append('idCategorie', newProduct.idCategorie);
    if (newProduct.images) {
      for (let i = 0; i < newProduct.images.length; i++) {
        formData.append('images', newProduct.images[i]);
      }
    }

    try {
      const response = await axios.post('http://localhost:9090/product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        description: '',
        prix: '',
        qnt: '',
        etat: 'disponible',
        idCategorie: '',
        images: null,
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
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
                <div className="box-topic">Total Products</div>
                <div className="number">{totalProducts}</div>
                <div className="indicator"></div>
              </div>
              <i className="bx bx-package cart" style={{
              background: 'linear-gradient(45deg, red, orange)', // Linear gradient from red to orange

              WebkitBackgroundClip: 'text', // Apply the gradient to the text (icon)
              color: 'transparent', // Make the icon text transparent to show the gradient
            }}></i>
            </div>
          </div>

          <div className="sales-boxes">
            <div className="recent-sales box">
              <div className="title">Products List</div>
              <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{marginTop:'30px' , marginBottom:'10px'}}

            />
              <button 
                  className="btn btn-outline-primary" 
                  data-bs-toggle="modal" 
                  data-bs-target="#createProductModal"
                  style={{margin:'10px'}}>
                  Create new Product
                </button>
              <div className="sales-details">
                
                <table className="table table-striped" id="productTable">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Name</th>
                      <th>Price /dt</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.name}</td>
                        <td>{product.prix}</td>
                        <td>{product.qnt}</td>
                        <td>{product.etat}</td>
                        <td>
                        <button className="btn btn-success btn-sm me-2" data-bs-toggle="modal" data-bs-target="#editProductModal" onClick={() => handleEditProduct(product)}>
                          <i className="fas fa-pencil-alt"></i> 
                        </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteProduct(product._id)}><i className="fas fa-trash-alt"></i> </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="button">
             
              </div>

              
              
              {/* Edit Product Modal */}
<div className="modal fade" id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editProductModalLabel">Edit Product</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {editProduct && (
          <form onSubmit={handleUpdateProduct}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={editProduct.name}
                onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={editProduct.description}
                onChange={(e) => setEditProduct({...editProduct, description: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price /Dt</label>
              <input
                type="number"
                className="form-control"
                value={editProduct.prix}
                onChange={(e) => setEditProduct({...editProduct, prix: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={editProduct.qnt}
                onChange={(e) => setEditProduct({...editProduct, qnt: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                value={editProduct.etat}
                onChange={(e) => setEditProduct({...editProduct, etat: e.target.value})}>
                <option value="disponible">Available</option>
                <option value="non disponible">Not Available</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  </div>
</div>

              {/* Create Product Modal */}
              <div className="modal fade" id="createProductModal" tabIndex="-1" aria-labelledby="createProductModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="createProductModalLabel">Add New Product</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleCreateProduct}>
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            placeholder="write product name"

                            className="form-control"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="write product description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Price /Dt</label>
                          <input
                            type="number"
                            placeholder="write price of 1 single item"
                            className="form-control"
                            value={newProduct.prix}
                            onChange={(e) => setNewProduct({...newProduct, prix: e.target.value})}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Quantity</label>
                          <input
                            type="number"
                            placeholder="write product stock number"
                            className="form-control"
                            value={newProduct.qnt}
                            onChange={(e) => setNewProduct({...newProduct, qnt: e.target.value})}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <select
                            className="form-control"
                            value={newProduct.idCategorie}
                            onChange={(e) => setNewProduct({...newProduct, idCategorie: e.target.value})}>
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Product Images</label>
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            onChange={(e) => setNewProduct({...newProduct, images: e.target.files})}
                          />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-primary">Save Product</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardP;
