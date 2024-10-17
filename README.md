# Habit Tracker Application

## Overview
The Habit Tracker Application is a full-stack web application designed to help users track and manage their habits effectively. Users can register, log in, and add habits with specific goals and frequencies. The application utilizes a modern tech stack, including Node.js, Express, MongoDB, and React with Tailwind CSS for styling.

## Features
- User registration and login functionality
- Add, read, update, and delete habits
- Track habit goals and frequencies
- User-friendly interface with a responsive design
- Admin features to manage users and habits

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Installation

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running, or use a cloud database service

### Setup Backend
1. Navigate to the backend directory.
   ```bash
   cd backend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the backend directory with the following content:
   ```plaintext
   MONGO_URI=<Your MongoDB Connection String>
   PORT=5000
   ```
4. Start the backend server.
   ```bash
   npm start
   ```

### Setup Frontend
1. Navigate to the frontend directory.
   ```bash
   cd frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the frontend development server.
   ```bash
   npm start
   ```

## Usage
- Open your browser and navigate to `http://localhost:3000` to access the application.
- Users can register, log in, and manage their habits from the dashboard.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or raise an issue for any improvements or suggestions.

## License
This project is licensed under the MIT License.

## Acknowledgements
- Thanks to all contributors and the open-source community for their support.
