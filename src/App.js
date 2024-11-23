// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes';

function App() {
    return (
        <div>
            <Navbar />
            <AppRoutes />
        </div>
    );
}

export default App;
