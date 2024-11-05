import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const DashboardP = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
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
      const { name, prix, qnt, etat } = editProduct;
      const response = await axios.put(`http://localhost:9090/product/${editProduct._id}`, { name, prix, qnt, etat });
      setProducts(products.map(product => product._id === editProduct._id ? response.data : product));
      setEditProduct(null);
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
      <aside className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">Steelisia</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard-users">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Users</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard-produit" className="active">
              <i className="bx bx-package"></i>
              <span className="links_name">Products</span>
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
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="profile-details">
            <img src="/Frontoffice/assets/images/profile.jpg" alt="Profile" />
            <span className="admin_name">Prem Shahi</span>
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
              <i className="bx bx-package cart"></i>
            </div>
          </div>

          <div className="sales-boxes">
            <div className="recent-sales box">
              <div className="title">Products List</div>
              <div className="sales-details">
                <table className="table table-striped" id="productTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.prix}</td>
                        <td>{product.qnt}</td>
                        <td>{product.etat}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditProduct(product)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="button">
                <button 
                  className="btn btn-primary" 
                  data-bs-toggle="modal" 
                  data-bs-target="#createProductModal">
                  Create new Product
                </button>
              </div>

              {/* Create Product Modal */}
              <div className="modal fade" id="createProductModal" tabIndex="-1" aria-labelledby="createProductModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="createProductModalLabel">Create New Product</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleCreateProduct}>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            placeholder="Product Name"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            placeholder="Description"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            value={newProduct.prix}
                            onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
                            placeholder="Price"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="number"
                            className="form-control"
                            value={newProduct.qnt}
                            onChange={(e) => setNewProduct({ ...newProduct, qnt: e.target.value })}
                            placeholder="Quantity"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <select
                            className="form-control"
                            value={newProduct.etat}
                            onChange={(e) => setNewProduct({ ...newProduct, etat: e.target.value })}>
                            <option value="available">disponible</option>
                            <option value="unavailable">non disponible</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <input
                            type="file"
                            className="form-control"
                            multiple
                            onChange={(e) => setNewProduct({ ...newProduct, images: e.target.files })}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Create Product</button>
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
};

export default DashboardP;
