import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid email or password');
        }
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#FFFFFF', // White background
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: '40px',
                    borderRadius: '20px',
                    maxWidth: '400px',
                    width: '100%',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#FFFFFF', // White background for the paper
                }}
            >
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" fontWeight="bold" color="#000000">
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="#000000">
                        Please login to your account
                    </Typography>
                </Box>

                <Divider sx={{ marginBottom: '20px', backgroundColor: '#000000' }} />

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#000000',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000000',
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#000000',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#000000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#000000',
                                },
                            },
                        }}
                    />

                    {error && (
                        <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            marginTop: '20px',
                            padding: '12px',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            backgroundColor: '#000000', // Black button background
                            color: '#FFFFFF', // White text
                            '&:hover': {
                                backgroundColor: '#555555', // Darker grey on hover
                            },
                        }}
                        fullWidth
                    >
                        Login
                    </Button>
                </form>

                <Box textAlign="center" mt={2}>
                    <Typography variant="body2" color="#000000">
                        Don't have an account?{' '}
                        <Button href="/signup" sx={{ fontWeight: 'bold', color: '#000000' }}>
                            Sign Up
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
