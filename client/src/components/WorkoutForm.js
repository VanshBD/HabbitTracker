import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider } from '@mui/material';
import axios from '../services/api';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000', // Black
        },
        background: {
            default: '#FFFFFF', // White Background
            paper: '#F5F5F5',   // Light gray for forms/cards
        },
        text: {
            primary: '#000000', // Black Text
            secondary: '#707070', // Gray for secondary text
        },
    },
});

const WorkoutForm = ({ initialData, onSuccess }) => {
    const [activity, setActivity] = useState(initialData?.activity || '');
    const [duration, setDuration] = useState(initialData?.duration || '');
    const [caloriesBurned, setCaloriesBurned] = useState(initialData?.caloriesBurned || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workoutData = { activity, duration, caloriesBurned };
        try {
            if (initialData) {
                await axios.put(`/habbits/${initialData._id}`, workoutData);
            } else {
                await axios.post('/habbits', workoutData);
            }
            onSuccess();
        } catch (error) {
            console.error('Workout submission failed', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box mt={3} border={1} borderColor="black" borderRadius={2} p={3} bgcolor="background.paper">
                    <Typography variant="h6" align="center" color="primary">
                        {initialData ? 'Edit' : 'Add'} Habbit
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Activity"
                            fullWidth
                            margin="normal"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#707070' } }} // Gray label
                            InputProps={{ style: { color: '#000000' } }} // Black text in input
                            sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#000000', // Black border
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#000000', // Black border on hover
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#FFFFFF', // White background for input
                                },
                            }}
                        />
                        <TextField
                            label="Duration (minutes)"
                            fullWidth
                            margin="normal"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#707070' } }} // Gray label
                            InputProps={{ style: { color: '#000000' } }} // Black text in input
                            sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#000000', // Black border
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#000000', // Black border on hover
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#FFFFFF', // White background for input
                                },
                            }}
                        />
                        <TextField
                            label="Calories Burned"
                            fullWidth
                            margin="normal"
                            value={caloriesBurned}
                            onChange={(e) => setCaloriesBurned(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#707070' } }} // Gray label
                            InputProps={{ style: { color: '#000000' } }} // Black text in input
                            sx={{
                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#000000', // Black border
                                },
                                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#000000', // Black border on hover
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: '#FFFFFF', // White background for input
                                },
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            {initialData ? 'Update' : 'Add'} Habbit
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default WorkoutForm;
