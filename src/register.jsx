import React, { useState } from 'react';
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3005/api';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      console.log('🚀 Registering user:', userData);
      
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('📨 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const result = await response.json();
      console.log('✅ Registration successful:', result);

      // Guardar token y usuario en localStorage
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      localStorage.setItem('isLoggedIn', 'true');

      // Redirigir al home
      window.location.href = '/';

    } catch (error) {
      console.error('❌ Registration error:', error);
      setError(error.message || 'Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom color="primary">
          Create Account
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Join us and start your journey
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              variant="outlined"
              required
              InputProps={{
                startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              required
              InputProps={{
                startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              required
              InputProps={{
                startAdornment: <LockIcon color="action" sx={{ mr: 1 }} />
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              required
              InputProps={{
                startAdornment: <LockIcon color="action" sx={{ mr: 1 }} />
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>

            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link href="/login" underline="hover" fontWeight={600}>
                Sign In
              </Link>
            </Typography>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}