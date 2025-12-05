import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';

const About = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fff7c2', // Soft yellow background
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            ⚡ About Pika Pika Shop ⚡
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontSize: '1.15rem',
              lineHeight: 1.7,
            }}
          >
            Welcome to <strong>Pika Pika Shop</strong> — your destination for fun, stylish,
            and high-quality Pikachu-inspired apparel and accessories. ⚡💛  
            Our mission is to deliver electrifying designs and everyday comfort,
            while bringing joy to fans of all ages.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontSize: '1.15rem',
              lineHeight: 1.7,
            }}
          >
            Whether you're looking to level up your wardrobe 👕⚡  
            or pick up a cute accessory 🎒✨,
            we’ve got something perfect for every electric-type fan.
          </Typography>
        </Box>

        {/* What We Sell */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🛒 What We Sell
          </Typography>
        </Box>

        {/* Category Boxes */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          {[
            {
              title: "Apparel 👕",
              description:
                "Comfortable and stylish clothing inspired by Pikachu, including hoodies, t-shirts, socks, gloves, and more.",
            },
            {
              title: "Accessories 🎒",
              description:
                "Fun and practical items such as caps, keychains, mugs, notebooks, and other electrifying essentials.",
            },
            {
              title: "Bags & Gear 💼",
              description:
                "Durable and stylish bags, backpacks, and everyday gear featuring Pikachu-themed designs.",
            },
            {
              title: "Footwear 👟⚡",
              description:
                "Sneakers and footwear with unique electric-style details for fans on the go.",
            },
          ].map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 280,
                  borderRadius: 3,
                  textAlign: 'center',
                  backgroundColor: '#ffffff',
                  boxShadow: '0px 3px 10px rgba(0,0,0,0.15)',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 5px 15px rgba(0,0,0,0.25)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
