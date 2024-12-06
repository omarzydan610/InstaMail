import React from 'react';

const LinkToLogin = () => {
    return (
        <div className="text-sm text-center">
            <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-indigo-600 hover:text-indigo-800">
                    Login
                </a>
            </p>
        </div>
    );
};

export default LinkToLogin;
