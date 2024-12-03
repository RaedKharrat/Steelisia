import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Sidebar from "../component/sidebar"; // Import the Sidebar component
import LoadingScreen from '../component/LoadingScreen.jsx'; // Import the Preloader component
import ApplyDiscount from '../component/ApplyDiscount.jsx'; // Adjust the path as necessary

const DashboardP = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
   const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // State for adding a new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    prix: "",
    qnt: "",
    etat: "disponible",
    idCategorie: "",
    images: null,
    sousCategorie: "",
  });

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://steelisia-tunisie.onrender.com/product/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
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
        const response = await axios.get(
          "https://steelisia-tunisie.onrender.com/product/countp"
        );
        if (response.data && response.data.totalProducts !== undefined) {
          setTotalProducts(response.data.totalProducts);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };
    fetchProductCount();
  }, []);

  useEffect(() => {
    // Fetch categories dynamically
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://steelisia-tunisie.onrender.com/categorie/");
        setCategories(response.data); // Assuming the response contains the list of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://steelisia-tunisie.onrender.com/product/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const { name, description, prix, qnt, etat, sousCategorie } = editProduct;
      const response = await axios.put(
        `https://steelisia-tunisie.onrender.com/product/${editProduct._id}`,
        { name, description, prix, qnt, etat, sousCategorie }
      );
      setProducts(
        products.map((product) =>
          product._id === editProduct._id ? response.data : product
        )
      );
      setEditProduct(null); // Clear the form after successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
  
    // Validation
    const errors = {};
    if (!newProduct.name) errors.name = "Name is required.";
    if (!newProduct.description) errors.description = "Description is required.";
    if (!newProduct.idCategorie) errors.idCategorie = "Category is required.";
    if (!newProduct.sousCategorie) errors.sousCategorie = "Sous Categorie is required.";
    if (!newProduct.prix || newProduct.prix <= 0) errors.prix = "Price must be a positive number.";
    if (!newProduct.qnt || newProduct.qnt <= 0) errors.qnt = "Quantity must be a positive number.";
    if (!newProduct.images || newProduct.images.length === 0) errors.images = "Please upload at least one image.";
  
    // If validation fails, set errors and stop execution
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
  
    // If validation passes, proceed with product creation
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("prix", newProduct.prix);
    formData.append("qnt", newProduct.qnt);
    formData.append("etat", newProduct.etat);
    formData.append("idCategorie", newProduct.idCategorie);
    formData.append("sousCategorie", newProduct.sousCategorie);
    if (newProduct.images) {
      for (let i = 0; i < newProduct.images.length; i++) {
        formData.append("images", newProduct.images[i]);
      }
    }
  
    try {
      const response = await axios.post(
        "https://steelisia-tunisie.onrender.com/product/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Add new product to the list
      setProducts([...products, response.data]);
  
      // Reset form state
      setNewProduct({
        name: "",
        description: "",
        prix: "",
        qnt: "",
        etat: "disponible",
        idCategorie: "",
        images: null,
        sousCategorie: "",
      });
  
      // Clear errors
      setError({});
  
      // Set success message
      setSuccessMessage("Product added successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      setError({ general: "An error occurred while creating the product. Please try again." });
    }
  };  
  
  const filteredProducts = products.filter(
    (product) =>
      product.name &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingScreen />; // Render Preloader if loading is true
  }

  return (
    <div className="dashboard">
      <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar} />
      <section className="home-section">
        <nav>
          <div className="sidebar-button" onClick={toggleSidebar}>
            <i className={`bx ${sidebarActive ? "bx-menu-alt-right" : "bx-menu"} sidebarBtn`}></i>
            <span className="dashboard">Dashboard</span>
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
              </div>
              <i className="bx bx-package cart" style={{
                background: "linear-gradient(45deg, red, orange)",
                WebkitBackgroundClip: "text",
                color: "transparent",
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
                style={{ marginTop: "30px", marginBottom: "10px" }}
              />
              <button
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#createProductModal"
                style={{ margin: "10px" }}
              >
                Create new Product
              </button>
              <div className="sales-details">
                <table className="table table-striped" id="productTable">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Category</th>
                      <th>Sous Category</th>
                      <th>Name</th>
                      <th>Price /dt</th>
                      <th>Quantité</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.idCategorie?.name}</td>
                        <td>{product.sousCategorie}</td>
                        <td>{product.name}</td>
                        <td>{product.prix}</td>
                        <td>{product.qnt}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#editProductModal"
                            onClick={() => handleEditProduct(product)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteProduct(product._id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                          <button
                          // style={{marginLeft:'5px'}}
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => {
                              setSelectedProduct(product);
                              setShowDiscountModal(true);
                            }}
                          >
                          <i class="fas fa-tags" ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
  
             {/* Apply Discount Modal */}
              <div className={`modal fade ${showDiscountModal ? 'show' : ''}`} 
                  style={{ display: showDiscountModal ? 'block' : 'none', zIndex: 1050 , height:'100%' }}>
                  <div className="modal-dialog" 
                  
                      onClick={(e) => e.stopPropagation()} 
                      style={{ maxWidth: '600px', margin: '1.75rem auto'  }}>
                      <div className="modal-content" style={{
                          borderRadius: '0.5rem',
                          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                      }}>
                          <div className="modal-header" style={{
                              backgroundColor: '#f8f9fa',
                              borderBottom: '1px solid #dee2e6'
                          }}>
                              <h5 className="modal-title">Apply Discount to <strong>{selectedProduct?.name}</strong></h5>
                              <button type="button" className="btn-close" onClick={() => setShowDiscountModal(false)} aria-label="Close"></button>
                          </div>
                          <div className="modal-body" style={{
                              padding: '20px',
                              backgroundColor: '#ffffff',
                          }}>
                              {selectedProduct && (
                                  <ApplyDiscount productId={selectedProduct._id} />
                              )}
                          </div>
                          <div className="modal-footer" style={{
                              borderTop: '1px solid #dee2e6',
                              justifyContent: 'flex-end'
                          }}>
                              <button type="button" className="btn btn-secondary" onClick={() => setShowDiscountModal(false)}>Close</button>
                          </div>
                      </div>
                  </div>
              </div>
  
              {/* Edit Product Modal */}
              <div className="modal fade" id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content" style={{ height: "100%", backgroundColor: "#fefefe", padding: "20px", borderRadius: "20px", opacity: "0.9" }}>
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
                              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              rows="4"
                              value={editProduct.description}
                              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Sous Categorie</label>
                            <input
                              type="text"
                              className="form-control"
                              value={editProduct.sousCategorie}
                              onChange={(e) => setEditProduct({ ...editProduct, sousCategorie: e.target.value })}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Price /Dt</label>
                            <input
                              type="number"
                              className="form-control"
                              value={editProduct.prix}
                              onChange={(e) => setEditProduct({ ...editProduct, prix: e.target.value })}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Quantity</label>
                            <input
                              type="number"
                              className="form-control"
                              value={editProduct.qnt}
                              onChange={(e) => setEditProduct({ ...editProduct, qnt: e.target.value })}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                              className="form-control"
                              value={editProduct.etat}
                              onChange={(e) => setEditProduct({ ...editProduct, etat: e.target.value })}
                            >
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
            <div
                className="modal fade"
                id="createProductModal"
                tabIndex="-1"
                aria-labelledby="createProductModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div
                    className="modal-content"
                    style={{
                      height: "100%",
                      backgroundColor: "#fefefe",
                      padding: "20px",
                      borderRadius: "20px",
                      opacity: "0.9",
                    }}
                  >
                    <div className="modal-header">
                      <h5 className="modal-title" id="createProductModalLabel">
                        Add New Product
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      {successMessage && (
                        <div className="alert alert-success" role="alert">
                          {successMessage}
                        </div>
                      )}
                      <form onSubmit={handleCreateProduct}>
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className={`form-control ${error.name ? "is-invalid" : ""}`}
                            value={newProduct.name}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, name: e.target.value })
                            }
                          />
                          {error.name && <div className="invalid-feedback">{error.name}</div>}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className={`form-control ${
                              error.description ? "is-invalid" : ""
                            }`}
                            rows="4"
                            value={newProduct.description}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, description: e.target.value })
                            }
                          ></textarea>
                          {error.description && (
                            <div className="invalid-feedback">{error.description}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <select
                            className={`form-select ${
                              error.idCategorie ? "is-invalid" : ""
                            }`}
                            value={newProduct.idCategorie}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, idCategorie: e.target.value })
                            }
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          {error.idCategorie && (
                            <div className="invalid-feedback">{error.idCategorie}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Sous Categorie</label>
                          <input
                            type="text"
                            className={`form-control ${error.sousCategorie ? "is-invalid" : ""}`}
                            value={newProduct.sousCategorie}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, sousCategorie: e.target.value })
                            }
                          />
                          {error.sousCategorie && <div className="invalid-feedback">{error.sousCategorie}</div>}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Price /Dt</label>
                          <input
                            type="number"
                            className={`form-control ${error.prix ? "is-invalid" : ""}`}
                            value={newProduct.prix}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, prix: e.target.value })
                            }
                          />
                          {error.prix && (
                            <div className="invalid-feedback">{error.prix}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Quantity</label>
                          <input
                            type="number"
                            className={`form-control ${error.qnt ? "is-invalid" : ""}`}
                            value={newProduct.qnt}
                            onChange={(e) =>
                              setNewProduct({ ...newProduct, qnt: e.target.value })
                            }
                          />
                          {error.qnt && (
                            <div className="invalid-feedback">{error.qnt}</div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Product Image</label>
                          <input
                            type="file"
                            multiple
                            className={`form-control ${error.images ? "is-invalid" : ""}`}
                            onChange={(e) => {
                              setNewProduct({
                                ...newProduct,
                                images: e.target.files
                                  ? [...(newProduct.images || []), ...Array.from(e.target.files)]
                                  : newProduct.images,
                              });
                            }}
                          />
                          {error.images && <div className="invalid-feedback">{error.images}</div>}
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save Product
                          </button>
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
};

export default DashboardP;
