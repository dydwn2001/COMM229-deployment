import React from 'react'; 
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import {
  ElectricBolt as ElectricBoltIcon,
  ShoppingBag as ShoppingBagIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

// Map de imágenes locales
const imageMap = {
  hoodie: '/hoodie.png',
  tshirt: '/tshirt.png',
  cap: '/cap.png',
};

const featuredProducts = [
  { name: 'Thunderbolt Hoodie', price: '$49.99', description: 'Ultra-soft fleece with embroidered lightning bolt details.', image: 'hoodie', category: 'Apparel' },
  { name: 'Pika Pika T-Shirt', price: '$24.99', description: 'Classic fit cotton tee featuring a smiling Pikachu graphic.', image: 'tshirt', category: 'Apparel' },
  { name: 'Electric Bolt Cap', price: '$19.99', description: 'Adjustable baseball cap with an iconic tail patch.', image: 'cap', category: 'Accessories' },
];

export default function Home() {
  const theme = useTheme();

  const handleContact = () => {
    window.location.href = 'mailto:ppikashop@wshops.com?subject=Consulta&body=Hola,%20quiero%20contactarles...';
  };

  return (
    <Box sx={{ pt: 4, pb: 4, minHeight: '80vh' }}>
      {/* Hero Section */}
      <Card
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.error.main} 100%)`,
          color: theme.palette.common.white,
          p: { xs: 3, md: 5 },
          borderRadius: 2,
          boxShadow: 6,
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box sx={{ fontSize: 80 }}>⚡</Box>
          <Typography variant="h3" component="h1" fontWeight={900}>
            Welcome to PikaPika!
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 700 }}>
            The leading online shop for high-quality, one-of-a-kind Pikachu clothing and accessories.
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<ShoppingBagIcon />}
              sx={{
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.1rem',
                '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' },
              }}
            >
              Explore the Collection
            </Button>
            <Button
              variant="outlined"
              color="info"
              size="large"
              startIcon={<EmailIcon />}
              onClick={handleContact}
              sx={{
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.1rem',
                '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.2s' },
              }}
            >
              Contact Us
            </Button>
          </Stack>
          <Typography variant="body2" mt={1}>
            or email us at <strong>ppikashop@wshops.com</strong>
          </Typography>
        </Stack>
      </Card>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          Featured Items
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
          Hot picks and best sellers from our PikaPika range.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {featuredProducts.map((product, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Card
                sx={{
                  p: 1.5,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: 'box-shadow 0.3s',
                  '&:hover': { boxShadow: theme.shadows[8] },
                }}
              >
                <Box sx={{ mb: 1.5, textAlign: 'center' }}>
                  <img
                    src={imageMap[product.image] || '/placeholder.png'}
                    alt={product.name}
                    style={{
                      width: '80%',
                      maxWidth: '120px',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
                <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                  {product.name}
                </Typography>
                <Chip
                  label={product.category}
                  size="small"
                  color="warning"
                  icon={<ElectricBoltIcon fontSize="small" />}
                  sx={{ width: 'fit-content', mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary" flexGrow={1} mb={1}>
                  {product.description}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                  <Typography variant="subtitle1" color="primary" fontWeight={700}>
                    {product.price}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                    component={Link}
                    to="/products"
                  >
                    View
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Brand Features Section */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Grid container spacing={3} textAlign="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 2, bgcolor: theme.palette.action.hover }}>
              <StarIcon color="warning" sx={{ fontSize: 36 }} />
              <Typography variant="subtitle1" fontWeight={600} mt={1}>Premium Quality</Typography>
              <Typography variant="body2" color="text.secondary">High-grade materials for comfort.</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 2, bgcolor: theme.palette.action.hover }}>
              <ShippingIcon color="success" sx={{ fontSize: 36 }} />
              <Typography variant="subtitle1" fontWeight={600} mt={1}>Fast Shipping</Typography>
              <Typography variant="body2" color="text.secondary">Tracked delivery worldwide.</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 2, bgcolor: theme.palette.action.hover }}>
              <ElectricBoltIcon color="info" sx={{ fontSize: 36 }} />
              <Typography variant="subtitle1" fontWeight={600} mt={1}>Exclusive Designs</Typography>
              <Typography variant="body2" color="text.secondary">Unique items you won't see elsewhere!</Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
