import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ element: Page }) => {
    const token = useAuthStore((state) => state.token);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Page />;
};

export default ProtectedRoute;
