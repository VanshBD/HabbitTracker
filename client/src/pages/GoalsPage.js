import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Container, List, ListItem, ListItemText, Typography, Box, Button, Paper, createTheme, ThemeProvider } from '@mui/material';
import GoalForm from '../components/GoalForm';

const theme = createTheme({
    palette: {
        mode: 'light', // Switch to light mode for black and white theme
        primary: {
            main: '#000000', // Black for primary elements
        },
        secondary: {
            main: '#FFFFFF', // White for secondary elements
        },
        background: {
            default: '#FFFFFF', // White background
            paper: '#F5F5F5', // Light gray for paper background
        },
        text: {
            primary: '#000000', // Black text
            secondary: '#555555', // Dark gray for secondary text
        },
    },
});

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/goals');
            setGoals(response.data);
        };
        fetchData();
    }, []);

    const handleAddGoal = () => {
        setCurrentGoal(null);
        setShowForm(true);
    };

    const handleEditGoal = (goal) => {
        setCurrentGoal(goal);
        setShowForm(true);
    };

    const handleDeleteGoal = async (id) => {
        try {
            await axios.delete(`/goals/${id}`);
            const response = await axios.get('/goals');
            setGoals(response.data);
        } catch (error) {
            console.error('Error deleting goal', error);
        }
    };

    const handleFormSuccess = async () => {
        setShowForm(false);
        const response = await axios.get('/goals');
        setGoals(response.data);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box mt={5}>
                    <Typography variant="h4" align="center" color="primary">Your Goals</Typography>
                    <Button variant="contained" color="primary" onClick={handleAddGoal} sx={{ marginBottom: '16px' }}>
                        Add Goal
                    </Button>
                    {showForm && (
                        <GoalForm initialData={currentGoal} onSuccess={handleFormSuccess} />
                    )}
                    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', backgroundColor: theme.palette.background.paper }}>
                        <List>
                            {
                                goals.length === 0 ? (
                                    <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: "20px" }}>No recent goals found.</Typography>
                                ) : (
                                    goals.map((goal) => (
                                        <ListItem key={goal._id}>
                                            <ListItemText
                                                primary={`Goal Type: ${goal.goalType}`}
                                                secondary={`Target Value: ${goal.targetValue}, Time Frame: ${goal.timeFrame}`}
                                            />
                                            <Box>
                                                <Button variant="outlined" color="primary" onClick={() => handleEditGoal(goal)} style={{ marginRight: '8px' }}>
                                                    Edit
                                                </Button>
                                                <Button variant="outlined" color="primary" onClick={() => handleDeleteGoal(goal._id)}>
                                                    Delete
                                                </Button>
                                            </Box>
                                        </ListItem>
                                    ))
                                )}
                        </List>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default GoalsPage;
