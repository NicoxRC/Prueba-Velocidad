// src/components/LoadingSpinner.tsx
import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Cargando...', 
  size = 'medium' 
}) => {
  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner ${size}`}>
        <div className="spinner-portal">
          <div className="spinner-inner"></div>
        </div>
        <div className="spinner-rick">🛸</div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;