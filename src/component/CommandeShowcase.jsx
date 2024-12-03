import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { jwtDecode } from "jwt-decode";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  CircularProgress,
  TextField,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel'; // Add the Cancel icon

// Define color mapping for status
const statusColors = {
  pending: "#FFA500",  // Orange for pending
  shipped: "#1E90FF",  // Blue for shipped
  delivered: "#32CD32", // Green for delivered
  canceled: "#FF6347",  // Red for canceled
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#03dac6",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const CommandeShowcase = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("No authentication token found");
        }
        const decodedToken = jwtDecode(authToken);
        const userId = decodedToken.userId;
        const response = await axios.get(
          `https://steelisia-tunisie.onrender.com/cmd/mycommandes/${userId}`
        );
        setCommandes(response.data);
      } catch (err) {
        console.error("Error fetching commandes:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, []);

  const handleCancelCommande = async (commandeId) => {
    try {
      const response = await axios.put(
        `https://steelisia-tunisie.onrender.com/cmd/cancel/${commandeId}`
      );
      if (response.data) {
        // Update the status locally after cancellation
        setCommandes((prevCommandes) =>
          prevCommandes.map((commande) =>
            commande._id === commandeId
              ? { ...commande, status: "canceled" }
              : commande
          )
        );
      }
    } catch (err) {
      console.error("Error canceling commande:", err.message);
    }
  };

  const filteredCommandes = commandes.filter((commande) =>
    (commande.userId?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     commande.userId?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     commande.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     String(commande.totalAmount).toLowerCase().includes(searchQuery.toLowerCase()) ||
     String(commande.totalPrice).toLowerCase().includes(searchQuery.toLowerCase()) ||
     commande.products?.some((product) =>
       (product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()))
     ))
  );

  // Helper function to format the timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Wrapper Box for background and border-radius */}
        <Box
          sx={{
            padding: 4,
            borderRadius: 10,
            background: "linear-gradient(to right, #d3d3d3, #f0f0f0)",  // Light grey to lighter grey
            boxShadow: 2,
          }}
        >
          <Typography variant="h4" gutterBottom style={{ background: '#3a3a3a', padding:'20px', marginTop :'70px' , color:'white' , textAlign: 'center', fontWeight: 'bold', borderRadius:'50px' }}>
            Ma vitrine Commande
          </Typography>

          <TextField
            label="Search commandes by user or product"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputLabelProps={{
                style: {
                color: darkTheme.palette.text.secondary,
                fontWeight: 'bold',
                },
            }}
            InputProps={{
                style: {
                backgroundColor: '#2b2b2b',
                color: 'white',
                borderRadius: '8px', // Adds rounded corners
                paddingLeft: '10px', // Adds padding to avoid icon clipping
                },
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon style={{ color: 'white' }} />
                </InputAdornment>
                ),
            }}
          />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredCommandes.length > 0 ? (
                filteredCommandes.map((commande) => (
                  <Grid item xs={12} sm={6} md={4} key={commande._id}>
                    <Card
  elevation={3}
  sx={{
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: darkTheme.palette.background.paper,
    color: darkTheme.palette.text.primary,
    position: "relative", // Ensure the card content has relative positioning for absolute elements
  }}
>
  <CardContent>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>
        {commande.userId?.first_name[0] || "U"}
      </Avatar>
      <Box sx={{ ml: 2 }}>
        <Typography variant="h6">
          {commande.userId?.first_name} {commande.userId?.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {commande.userId?.email}
        </Typography>
      </Box>
    </Box>

    <Divider sx={{ my: 2, borderColor: darkTheme.palette.text.secondary }} />

    {/* Products List */}
    <Typography variant="subtitle1" gutterBottom>
      Products:
    </Typography>
    {commande.products.map((item, idx) => (
      <Box
        key={idx}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          p: 1,
          bgcolor: idx % 2 === 0 ? "grey.800" : "grey.700",
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" style={{ color: 'white' }}>
          {item.productId?.name}
        </Typography>
        <Typography variant="body2" style={{ color: 'white' }}>
          Qty: {item.quantity}
        </Typography>
        <Typography variant="body2" color="warning">
          Dt {item.prix}
        </Typography>
        <Typography variant="body2" color="warning">
          Dt {item.totalPrice.toFixed(2)}
        </Typography>
      </Box>
    ))}

    <Typography variant="h6" color="orangered" sx={{ mt: 2 }}>
      Total: Dt {commande.totalAmount.toFixed(2)}
    </Typography>

    {/* Display the date of the commande */}
    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
      Date: {formatDate(commande.createdAt)} {/* Assuming `createdAt` is the timestamp */}
    </Typography>

    {/* Status with dynamic color */}
    <Typography
      variant="body1"
      sx={{
        mt: 2,
        padding: "4px 10px",
        borderRadius: "5px",
        backgroundColor: statusColors[commande.status] || "grey",
        color: "white",
        textAlign: "center",
      }}
    >
      {commande.status.charAt(0).toUpperCase() + commande.status.slice(1)}
    </Typography>

    {/* Cancel Button with Icon */}
    {commande.status !== "canceled" && (
      <IconButton
      color="error"
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        display: "flex",
        flexDirection: "column",  // To stack the icon and text vertically
        alignItems: "center",
      }}
      onClick={() => handleCancelCommande(commande._id)}
    >
      <CancelIcon />
      <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
        Cancel Order
      </Typography>
    </IconButton>
    
    )}
  </CardContent>
</Card>

                  </Grid>
                ))
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ width: "100%", textAlign: "center" }}>
                  No commandes found
                </Typography>
              )}
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CommandeShowcase;
