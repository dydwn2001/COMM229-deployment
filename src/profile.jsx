import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { 
  Edit, 
  LocationOn, 
  Phone, 
  Email, 
  Language,
  GitHub,
  LinkedIn
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3005/api';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getAuthToken = () => localStorage.getItem('authToken');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      const userData = await response.json();
      setUser(userData);

    } catch (error) {
      setError('Error loading profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Loading profile...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Go to Login
        </Button>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">No user data found.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
              {user.name}
            </Typography>
            {/* Se eliminaron educación, disponibilidad y tipo de perfil */}
          </Box>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => navigate('/edit-profile')}
          >
            Edit Profile
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {user.bio && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              About Me
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {user.bio}
            </Typography>
          </Box>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Contact Information
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ mr: 2, color: 'text.secondary' }} />
              <Typography>{user.email}</Typography>
            </Box>
            {user.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 2, color: 'text.secondary' }} />
                <Typography>{user.phone}</Typography>
              </Box>
            )}
            {user.location && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
                <Typography>{user.location}</Typography>
              </Box>
            )}
          </Stack>
        </Box>

        {(user.website || user.linkedin || user.github) && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Social Links
            </Typography>
            <Stack spacing={2}>
              {user.website && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Language sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography>
                    <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      {user.website}
                    </a>
                  </Typography>
                </Box>
              )}
              {user.linkedin && (
                <Box sx={{ display: '-flex', alignItems: 'center' }}>
                  <LinkedIn sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography>
                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      LinkedIn Profile
                    </a>
                  </Typography>
                </Box>
              )}
              {user.github && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GitHub sx={{ mr: 2, color: 'text.secondary' }} />
                  <Typography>
                    <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      GitHub: {user.github}
                    </a>
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        )}

        {user.skills && user.skills.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {user.skills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" color="primary" />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Account Information
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Member since: {new Date(user.created).toLocaleDateString()}
            </Typography>
            {user.updated && (
              <Typography variant="body2" color="text.secondary">
                Last updated: {new Date(user.updated).toLocaleDateString()}
              </Typography>
            )}
          </Stack>
        </Box>
      </Card>
    </Container>
  );
}
