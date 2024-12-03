import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Sidebar from '../component/sidebar';  // Import the Sidebar component
import LoadingScreen from '../component/LoadingScreen.jsx'; // Import LoadingScreen
import { useNavigate } from 'react-router-dom';

const DashboardCmd = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [commands, setCommands] = useState([]);
  const [editCommand, setEditCommand] = useState(null); // Will hold the current command for editing
  const [loading, setLoading] = useState(true);
  const [totalCommands, setTotalCommands] = useState(0);
  const [shippedCount, setShippedCommands] = useState(0);
  const [canceledCommandes, setCanceledCommands] = useState(0);
  const [deliveredCommandes, setDeliveredCommands] = useState(0);
  const [pendingCommandes, setPendingCommands] = useState(0);
  const [totalDeliveredAmount, setSumDeliveredCmd] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCommandName, setNewCommandName] = useState('');
  const [newCommandStatus, setNewCommandStatus] = useState('pending');
  const [showAddCommandModal, setShowAddCommandModal] = useState(false);
  const [statusOptions] = useState(['pending', 'shipped', 'delivered', 'canceled']); // Status options for the dropdown

  const toggleSidebar = () => setSidebarActive(!sidebarActive);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 2 seconds delay for the loading screen

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  // Fetch all commands
  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await axios.get('https://steelisia-tunisie.onrender.com/cmd/commandes/');
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
        const response = await axios.get('https://steelisia-tunisie.onrender.com/cmd/commande/countcmd');
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

  useEffect(() => {
    const fetchCommandCounts = async () => {
      try {
        const response = await axios.get('https://steelisia-tunisie.onrender.com/cmd/commande/countcmd-shipped');
        if (response.data && response.data.shippedCount !== undefined) {
          setShippedCommands(response.data.shippedCount);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching command count:', error.response ? error.response.data : error.message);
      }
    };
    fetchCommandCounts();
  }, []);
  useEffect(() => {
    const fetchCommandCountc = async () => {
      try {
        const response = await axios.get('https://steelisia-tunisie.onrender.com/cmd/commande/countcmd-canceled');
        if (response.data && response.data.canceledCommandes !== undefined) {
          setCanceledCommands(response.data.canceledCommandes);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching command count:', error.response ? error.response.data : error.message);
      }
    };
    fetchCommandCountc();
  }, []);
  useEffect(() => {
    const fetchCommandCountd = async () => {
      try {
        const response = await axios.get('https://steelisia-tunisie.onrender.com/cmd/commande/countcmd-delivred');
        if (response.data && response.data.deliveredCommandes !== undefined) {
          setDeliveredCommands(response.data.deliveredCommandes);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching command count:', error.response ? error.response.data : error.message);
      }
    };
    fetchCommandCountd();
  }, []);
  useEffect(() => {
    const fetchCommandCountp = async () => {
      try {
        const response = await axios.get('https://steelisia-tunisie.onrender.com/cmd/commande/countcmd-pending');
        if (response.data && response.data.pendingCommandes !== undefined) {
          setPendingCommands(response.data.pendingCommandes);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching command count:', error.response ? error.response.data : error.message);
      }
    };
    fetchCommandCountp();
  }, []);
  useEffect(() => {
    const fetchCommandCountss = async () => {
      try {
        const response = await axios.get('https://steelisia-tunisie.onrender.com/cmd/commande/countcmd-sum');
        if (response.data && response.data.totalDeliveredAmount !== undefined) {
          setSumDeliveredCmd(response.data.totalDeliveredAmount);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching command count:', error.response ? error.response.data : error.message);
      }
    };
    fetchCommandCountss();
  }, []);

  const deleteCommand = async (id) => {
    if (window.confirm("Are you sure you want to delete this command?")) {
      try {
        await axios.delete(`https://steelisia-tunisie.onrender.com/cmd/commande/${id}`);
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
      const response = await axios.put(`https://steelisia-tunisie.onrender.com/cmd/commande/${_id}`, { name, status });
      setCommands(commands.map(command => command._id === _id ? response.data : command));
      setEditCommand(null); // Clear the edit form
    } catch (error) {
      console.error('Error updating command:', error.response ? error.response.data : error.message);
    }
  };

  const handleStatusChange = async (commandId, newStatus) => {
    try {
      const response = await axios.put(`https://steelisia-tunisie.onrender.com/cmd/commande/${commandId}`, { status: newStatus });
      setCommands(commands.map(command => command._id === commandId ? response.data : command));
    } catch (error) {
      console.error('Error updating status:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddCommand = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://steelisia-tunisie.onrender.com/cmd/commande', { name: newCommandName, status: newCommandStatus });
      setCommands([...commands, response.data]);
      setShowAddCommandModal(false);
      setNewCommandName('');
      setNewCommandStatus('Pending'); // Reset to default
    } catch (error) {
      console.error('Error creating command:', error.response ? error.response.data : error.message);
    }
  };

  const handleDownloadPDF = async (commandId) => {
    try {
      const response = await axios.get(`https://steelisia-tunisie.onrender.com/cmd/commande-pdf/${commandId}`, {
        responseType: 'blob', // Important for file download
      });
      // Create a link to download the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `command_${commandId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the link after download
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };



  if (loading) {
    return <LoadingScreen />; // Render Preloader if loading is true
  }
  // Filter commands based on search term
  const filteredCommands = commands.filter(command =>
    (
      String(command.userId.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(command.status || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(command._id || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'shipped':
        return 'success';
      case 'delivered':
        return 'info';
      case 'canceled':
        return 'danger';
      case 'pending':
      default:
        return 'warning';
    }
  };

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

          </div>
          <div className="profile-details">
            <img src="/Frontoffice/assets/images/profile.jpg" alt="Profile" />
            <span className="admin_name">Steelisia Dashboard</span>
            <i className="bx bx-chevron-down"></i>
          </div>
        </nav>

        <div className="home-content" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', padding: '20px', flexWrap: 'wrap' }}>
  
  {/* Total Commands Box */}
  <div className="overview-boxes" style={{
              background: 'linear-gradient(45deg, orange, yellow)', // Linear gradient from red to orange
              borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '200px',
    height: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}>
    <i className="bx bx-list-ul" style={{ fontSize: '50px', color: '#fff' }}></i>
    <div className="box-topic" style={{ fontSize: '14px', color: '#fff', marginTop: '10px', fontWeight: 'bold' }}>Total Commands</div>
    <div className="number" style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginTop: '5px' }}>{totalCommands}</div>
  </div>

  {/* Total Pending Box */}
  <div className="overview-boxes" style={{
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '200px',
    height: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}>
    <i className="bx bx-time" style={{ fontSize: '50px', color: '#FF9800' }}></i>
    <div className="box-topic" style={{ fontSize: '14px', color: '#777', marginTop: '10px', fontWeight: 'bold' }}>Total Pending</div>
    <div className="number" style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginTop: '5px' }}>{pendingCommandes}</div>
  </div>

<div className="overview-boxes" style={{
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  width: '200px',
  height: '180px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
}}>
  <i className="bx bx-check-circle" style={{ fontSize: '50px', color: '#4CAF50' }}></i>
  <div className="box-topic" style={{ fontSize: '14px', color: '#777', marginTop: '10px', fontWeight: 'bold' }}>Total Delivered</div>
  <div className="number" style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginTop: '5px' }}>{deliveredCommandes}</div>
</div>

<div className="overview-boxes" style={{
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  width: '200px',
  height: '180px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
}}>
  <i className="bx bx-package" style={{ fontSize: '50px', color: '#3F51B5' }}></i>
  <div className="box-topic" style={{ fontSize: '14px', color: '#777', marginTop: '10px', fontWeight: 'bold' }}>Total Shipped</div>
  <div className="number" style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginTop: '5px' }}>{shippedCount}</div>
</div>

  {/* Total Delivered Box */}
  <div className="overview-boxes" style={{
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '200px',
    height: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}>
<i className="bx bx-x-circle" style={{ fontSize: '50px', color: 'red' }}></i>
<div className="box-topic" style={{ fontSize: '14px', color: '#777', marginTop: '10px', fontWeight: 'bold' }}>Total canceled</div>
    <div className="number" style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginTop: '5px' }}>{canceledCommandes}</div>
  </div>

  {/* Special Total Money Box */}
  <div className="overview-boxes" style={{
              background: 'linear-gradient(45deg, red, orange)', // Linear gradient from red to orange
              borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    width: '320px',
    height: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    transform: 'scale(1.05)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}>
    <i className="bx bx-wallet" style={{ fontSize: '50px', color: '#2b2b2b' }}></i>
    <div className="box-topic" style={{ fontSize: '14px', color: '#fff', marginTop: '10px', fontWeight: 'bold' }}>Total Money</div>
    <div className="number" style={{ fontSize: '34px', fontWeight: '700', color: '#fff', marginTop: '5px' }}>Dt {totalDeliveredAmount.toFixed(2)}</div>
  </div>

</div>


          <div className="sales-boxes" style={{ width: '100%' , marginBottom:'30px' }}>
            <div className="recent-sales box">
              <h1 className="title">List Command</h1>
              <input
              type="text"
              className="form-control"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
              
              {/* Command List Table */}
              <div className="sales-details" style={{ width: '100%', marginTop:'30px' }}>
                <table className="table table-striped" id="commandTable">
                  <thead>
                    <tr>
                      <th>Reference Commande</th>
                      <th>User name</th>
                      <th>Product(s)</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCommands.map((command) => (
                      <tr key={command._id}>
                        <td>{command._id}</td>
                        <td>{command.userId ? `${command.userId.first_name} ${command.userId.last_name}` : 'Unknown User'}</td>
                        <td>
                          {command.products.map((product) => (
                            <div key={product.productId._id}>
                              {product.productId.name} x {product.quantity}
                            </div>
                          ))}
                        </td>
                        <td>{command.totalAmount} TND</td>
                        <td>
                          <select
                            value={command.status}
                            onChange={(e) => handleStatusChange(command._id, e.target.value)}
                            className={`form-control status-${getStatusColor(command.status)}`}
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status} className={`status-${getStatusColor(status)}`}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                        <button onClick={() => deleteCommand(command._id)} className="btn btn-outline-danger">
                          <i className="fas fa-trash-alt"></i> {/* Trash icon */}
                        </button>
                        <button
                          className="btn btn-link"
                          onClick={() => handleDownloadPDF(command._id)}
                        >
                          
                          <i className="fas fa-file-pdf" style={{ color: 'green' }}></i> {/* PDF icon */}
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

        {/* Add Command Modal */}
        
      </section>
    </div>
  );
};

export default DashboardCmd;
