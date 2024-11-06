import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const DashboardCmd = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [commands, setCommands] = useState([]);
  const [editCommand, setEditCommand] = useState(null); // Will hold the current command for editing
  const [loading, setLoading] = useState(true);
  const [totalCommands, setTotalCommands] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCommandName, setNewCommandName] = useState('');
  const [newCommandStatus, setNewCommandStatus] = useState('Pending');
  const [showAddCommandModal, setShowAddCommandModal] = useState(false);
  const [statusOptions] = useState(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']); // Status options for the dropdown

  const toggleSidebar = () => setSidebarActive(!sidebarActive);

  // Fetch all commands
  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await axios.get('http://localhost:9090/cmd/commandes/');
        setCommands(response.data);
      } catch (error) {
        console.error('Error fetching commands:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCommands();
  }, []);

  // Fetch total command count
  useEffect(() => {
    const fetchCommandCount = async () => {
      try {
        const response = await axios.get('http://localhost:9090/cmd/commande/countcmd');
        if (response.data && response.data.totalCommands !== undefined) {
          setTotalCommands(response.data.totalCommands);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching command count:', error.response ? error.response.data : error.message);
      }
    };
    fetchCommandCount();
  }, []);

  const deleteCommand = async (id) => {
    if (window.confirm("Are you sure you want to delete this command?")) {
      try {
        await axios.delete(`http://localhost:9090/cmd/commande/${id}`);
        setCommands(commands.filter(command => command._id !== id));
      } catch (error) {
        console.error('Error deleting command:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleEditCommand = (command) => {
    setEditCommand(command); // Set the current command for editing
  };

  const handleUpdateCommand = async (event) => {
    event.preventDefault();
    try {
      const { name, status, _id } = editCommand;
      const response = await axios.put(`http://localhost:9090/cmd/commande/${_id}`, { name, status });
      setCommands(commands.map(command => command._id === _id ? response.data : command));
      setEditCommand(null); // Clear the edit form
    } catch (error) {
      console.error('Error updating command:', error.response ? error.response.data : error.message);
    }
  };

  const handleStatusChange = async (commandId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:9090/cmd/commande/${commandId}`, { status: newStatus });
      setCommands(commands.map(command => command._id === commandId ? response.data : command));
    } catch (error) {
      console.error('Error updating status:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddCommand = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/cmd/commande', { name: newCommandName, status: newCommandStatus });
      setCommands([...commands, response.data]);
      setShowAddCommandModal(false);
      setNewCommandName('');
      setNewCommandStatus('Pending'); // Reset to default
    } catch (error) {
      console.error('Error creating command:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  // Filter commands based on search term
  const filteredCommands = commands.filter(command =>
    (String(command.name).toLowerCase().includes(searchTerm.toLowerCase()))
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
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Users</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard-produit">
              <i className="bx bx-package"></i>
              <span className="links_name">Products</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard-categories">
              <i className="bx bx-category-alt"></i>
              <span className="links_name">Categories</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard-cmd" className="active">
              <i className="bx bx-command"></i>
              <span className="links_name">Commands</span>
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
              placeholder="Search commands..."
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
                <div className="box-topic">Total Commands</div>
                <div className="number">{totalCommands}</div>
              </div>
              <i className="bx bx-command cart"></i>
            </div>
          </div>

          <div className="sales-boxes" style={{ width: '100%' }}>
            <div className="recent-sales box">
              <div className="title">Command List</div>

              {/* Add New Command Button */}
              <button className="btn btn-outline-success mb-3" onClick={() => setShowAddCommandModal(true)}>Add New Command</button>

              {/* Command List Table */}
              <div className="sales-details" style={{ width: '100%' }}>
                <table className="table table-striped" id="commandTable">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Product(s)</th>
                      <th>Total Amount</th>
                      <th>Status</th> {/* Added Status column */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommands.map((command) => (
                      <tr key={command._id}>
                        <td>{command.userId ? `${command.userId.first_name} ${command.userId.last_name}` : 'Unknown User'}</td>
                        <td>
                          {command.products.map((product) => (
                            <div key={product.productId._id}>
                              {product.productId.name} - {product.quantity} x {product.productId.price} TND
                            </div>
                          ))}
                        </td>
                        <td>{command.totalAmount} TND</td>
                        <td>
                          <select
                            value={command.status}
                            onChange={(e) => handleStatusChange(command._id, e.target.value)}
                            className="form-select"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEditCommand(command)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => deleteCommand(command._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Command Modal */}
        {editCommand && (
          <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Command</h5>
                  <button type="button" className="btn-close" onClick={() => setEditCommand(null)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdateCommand}>
                    <div className="mb-3">
                      <label htmlFor="editCommandName" className="form-label">Command Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editCommandName"
                        value={editCommand.name}
                        onChange={(e) => setEditCommand({ ...editCommand, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editCommandStatus" className="form-label">Status</label>
                      <select
                        className="form-select"
                        id="editCommandStatus"
                        value={editCommand.status}
                        onChange={(e) => setEditCommand({ ...editCommand, status: e.target.value })}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={() => setEditCommand(null)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add New Command Modal */}
        {showAddCommandModal && (
          <div className="modal fade show" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Command</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddCommandModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleAddCommand}>
                    <div className="mb-3">
                      <label htmlFor="commandName" className="form-label">Command Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="commandName"
                        value={newCommandName}
                        onChange={(e) => setNewCommandName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="commandStatus" className="form-label">Status</label>
                      <select
                        className="form-select"
                        id="commandStatus"
                        value={newCommandStatus}
                        onChange={(e) => setNewCommandStatus(e.target.value)}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={() => setShowAddCommandModal(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardCmd;
