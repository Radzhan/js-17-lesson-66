import React from 'react';

const ButtonSpinner = () => {
    return (
        <div>
            <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                <span className="visually-hidden">Loading...</span>
            </>
        </div>
    );
};

export default ButtonSpinner;