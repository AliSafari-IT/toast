import React from 'react';
import { useToast } from '../../../src';

const VariantsDemo: React.FC = () => {
  const toast = useToast();

  return (
    <div className="variants-demo">
      <div className="button-group">
        <button 
          className="button-success"
          onClick={() => toast.success('Success message', { description: 'Operation completed successfully!' })}
        >
          Success Toast
        </button>
        
        <button 
          className="button-info"
          onClick={() => toast.info('Info message', { description: 'Here is some additional information.' })}
        >
          Info Toast
        </button>
        
        <button 
          className="button-warning"
          onClick={() => toast.warning('Warning message', { description: 'Please be careful with this action.' })}
        >
          Warning Toast
        </button>
        
        <button 
          className="button-error"
          onClick={() => toast.error('Error message', { description: 'Something went wrong. Please try again.' })}
        >
          Error Toast
        </button>
        
        <button 
          className="button-neutral"
          onClick={() => toast.show('Neutral message', { description: 'Just a neutral notification.' })}
        >
          Neutral Toast
        </button>
      </div>
      
      <button onClick={() => toast.clear()}>
        Clear All Toasts
      </button>
    </div>
  );
};

export default VariantsDemo;
