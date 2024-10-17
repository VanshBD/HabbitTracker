import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, createTheme, ThemeProvider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from '../services/api';

const theme = createTheme({
    palette: {
        mode: 'light', // Use light mode for black and white theme
        primary: {
            main: '#000000', // Black for primary elements
        },
        background: {
            default: '#FFFFFF', // White background
            paper: '#F5F5F5',   // Light gray for paper background
        },
        text: {
            primary: '#000000', // Black text
            secondary: '#555555', // Dark gray for secondary text
        },
    },
});

const GoalForm = ({ initialData, onSuccess }) => {
    const [goalType, setGoalType] = useState(initialData?.goalType || '');
    const [targetValue, setTargetValue] = useState(initialData?.targetValue || '');
    const [timeFrame, setTimeFrame] = useState(initialData?.timeFrame || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const goalData = { goalType, targetValue, timeFrame };
        try {
            if (initialData) {
                await axios.put(`/goals/${initialData._id}`, goalData);
            } else {
                await axios.post('/goals', goalData);
            }
            onSuccess();
        } catch (error) {
            console.error('Goal submission failed', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm">
                <Box mt={3} border={1} borderColor="grey.300" borderRadius={2} p={3} bgcolor="#F5F5F5">
                    <Typography variant="h6" align="center" color="primary">
                        {initialData ? 'Edit' : 'Add'} Goal
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Goal Type"
                            fullWidth
                            margin="normal"
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            required
                            InputLabelProps={{ style: { color: '#555555' } }} // Dark gray label
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
                            label="Target Value"
                            fullWidth
                            margin="normal"
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                            required
                            type="number"
                            InputLabelProps={{ style: { color: '#555555' } }} // Dark gray label
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
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel style={{ color: '#555555' }}>Time Frame</InputLabel>
                            <Select
                                value={timeFrame}
                                onChange={(e) => setTimeFrame(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: '#000000', // Black text color
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#000000', // Black border
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#000000', // Hover border color
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#000000', // Focused border color
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="weekly">Weekly</MenuItem>
                                <MenuItem value="monthly">Monthly</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            {initialData ? 'Update' : 'Add'} Goal
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default GoalForm;
