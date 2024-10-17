import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import {
    CircularProgress,
    Modal,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const AdminDashboard = () => {
    const [userStatistics, setUserStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/statistics');
                setUserStatistics(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="container mx-auto mt-10 px-4 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-center text-black mb-8">Admin Dashboard</h1>

            {loading ? (
                <div className="flex justify-center mt-10">
                    <CircularProgress />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {userStatistics.map(({ user, goals, workouts }) => (
                        <div
                            key={user._id}
                            className="bg-gray-100 border-2 border-black text-black rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
                        >
                            <div className="flex items-center mb-4">
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleViewDetails({ user, goals, workouts })}
                                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-transform"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for showing user details */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: '#f9f9f9',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 10,
                    }}
                >
                    {selectedUser && (
                        <>
                            <h2 className="text-xl font-bold text-black mb-4">{selectedUser.user.name}'s Details</h2>
                            <div className="space-y-8">
                                {/* Goals Section */}
                                <div>
                                    <h3 className="text-lg text-black font-semibold mb-2">Goals</h3>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="Goals table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="text-black">Goal Type</TableCell>
                                                    <TableCell className="text-black">Progress</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedUser.goals.length > 0 ? (
                                                    selectedUser.goals.map((goal) => (
                                                        <TableRow key={goal._id}>
                                                            <TableCell>{goal.goalType}</TableCell>
                                                            <TableCell>{goal.progress}/{goal.targetValue}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={2}>No goals available</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>

                                {/* Habbits Section */}
                                <div>
                                    <h3 className="text-lg text-black font-semibold mb-2">Habbits</h3>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="Habbits table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="text-black">Activity</TableCell>
                                                    <TableCell className="text-black">Duration (min)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedUser.workouts.length > 0 ? (
                                                    selectedUser.workouts.map((workout) => (
                                                        <TableRow key={workout._id}>
                                                            <TableCell>{workout.activity}</TableCell>
                                                            <TableCell>{workout.duration} min</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={2}>No habbits available</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>

                            <button
                                onClick={handleCloseModal}
                                className="w-full bg-black text-white py-2 mt-4 rounded hover:bg-gray-800 transition-transform"
                            >
                                Close
                            </button>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
