import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Badge,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  ShoppingCart as ShoppingCartIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

export default function Navbar({ children }) { // <-- Accept children
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser') || 'null'));
  const [cartCount, setCartCount] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  }, [location]);

  useEffect(() => {
    if (currentUser?._id) fetchCartCount();
  }, [currentUser]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/cart/${currentUser._id}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setCartCount(data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    setSnackbar({ open: true, message: 'Logged out successfully!', severity: 'success' });
    navigate('/');
  };

 const handleDeleteAccount = async () => {
  if (!currentUser?._id) return;

  if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

  try {
    const res = await fetch('http://localhost:3005/api/users/profile', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to delete account');
    }

    // Clear localStorage and redirect
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');

    setSnackbar({ open: true, message: 'Account deleted successfully!', severity: 'success' });
    navigate('/');
  } catch (error) {
    setSnackbar({ open: true, message: error.message, severity: 'error' });
  }
};

  const handleAddToCartClick = () => {
    if (!isLoggedIn) {
      setSnackbar({ open: true, message: 'Please login or register to access the cart.', severity: 'warning' });
      return;
    }
    navigate('/cart');
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const links = [
    { link: '/', label: 'Home', icon: <HomeIcon fontSize="small" /> },
    { link: '/products', label: 'Products', icon: <ShoppingCartIcon fontSize="small" /> },
    { link: '/about', label: 'About', icon: <InfoIcon fontSize="small" /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>Pika Pika Shop</Typography>
      <List>
        {links.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.link} selected={location.pathname === item.link}>
              {item.icon}
              <ListItemText primary={item.label} sx={{ ml: 1 }} />
            </ListItemButton>
          </ListItem>
        ))}
        {!isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <PersonIcon sx={{ mr: 1 }} />
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <LoginIcon sx={{ mr: 1 }} />
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <PersonIcon sx={{ mr: 1 }} />
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/edit-profile">
                <EditIcon sx={{ mr: 1 }} />
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDeleteAccount}>
                <DeleteIcon sx={{ mr: 1 }} />
                <ListItemText primary="Delete Account" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button component={Link} to="/" sx={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5">⚡</Typography>
              <Typography variant="h6" fontWeight={700}>Pika Pika</Typography>
            </Button>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {links.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.link}
                  variant={location.pathname === item.link ? 'contained' : 'text'}
                  startIcon={item.icon}
                  sx={{ fontWeight: 600 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleAddToCartClick} color="inherit">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {!isLoggedIn ? (
                <>
                  <Button component={Link} to="/login" variant="contained" size="small">Login</Button>
                  <Button component={Link} to="/register" variant="outlined" size="small">Register</Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/profile" variant="outlined" size="small">Profile</Button>
                  <Button component={Link} to="/edit-profile" variant="outlined" size="small" startIcon={<EditIcon />}>
                    Edit Profile
                  </Button>
                  <Button onClick={handleDeleteAccount} variant="outlined" color="error" size="small" startIcon={<DeleteIcon />}>
                    Delete Account
                  </Button>
                  <Button onClick={handleLogout} variant="contained" color="error" size="small">Logout</Button>
                </>
              )}
            </Stack>

            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: 240 } }}
      >
        {drawer}
      </Drawer>

      {/* Render children here */}
      <Box sx={{ flexGrow: 1 }}>{children}</Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
