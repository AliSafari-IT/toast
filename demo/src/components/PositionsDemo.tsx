import React from 'react';
import { useToast, ToastPosition } from '@asafarim/toast';

const PositionsDemo: React.FC = () => {
  const toast = useToast();
  
  const positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ];

  const showPositionToast = (position: ToastPosition) => {
    toast.info(`Toast at ${position}`, {
      position,
      description: `This toast is positioned at ${position}`
    });
  };

  return (
    <div className="positions-demo">
      <div className="position-grid">
        {positions.map(position => (
          <button
            key={position}
            className="position-button"
            onClick={() => showPositionToast(position)}
          >
            {position}
          </button>
        ))}
      </div>
      
      <button onClick={() => toast.clear()}>
        Clear All Toasts
      </button>
    </div>
  );
};

export default PositionsDemo;
