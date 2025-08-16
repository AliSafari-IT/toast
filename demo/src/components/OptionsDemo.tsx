import React, { useState } from 'react';
import { useToast } from '../../../src';
import type { ToastPosition, ToastVariant } from '../../../src/core/types';

const OptionsDemo: React.FC = () => {
  const toast = useToast();
  const [message, setMessage] = useState('Custom toast message');
  const [description, setDescription] = useState('This is a description for the toast');
  const [duration, setDuration] = useState(3000);
  const [variant, setVariant] = useState<ToastVariant>('info');
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [persist, setPersist] = useState(false);
  const [canClose, setCanClose] = useState(true);

  const showCustomToast = () => {
    toast.show(message, {
      description,
      durationMs: persist ? 0 : duration,
      variant,
      position,
      persist,
      canClose,
    });
  };

  return (
    <div className="options-demo">
      <div className="options-form">
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (ms)</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={persist}
            min={500}
            max={10000}
            step={500}
          />
        </div>

        <div className="form-group">
          <label htmlFor="variant">Variant</label>
          <select
            id="variant"
            value={variant}
            onChange={(e) => setVariant(e.target.value as ToastVariant)}
          >
            <option value="success">Success</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value as ToastPosition)}
          >
            <option value="top-left">Top Left</option>
            <option value="top-center">Top Center</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>

        <div className="checkbox-group">
          <input
            id="persist"
            type="checkbox"
            checked={persist}
            onChange={(e) => setPersist(e.target.checked)}
          />
          <label htmlFor="persist">Persist (don't auto-dismiss)</label>
        </div>

        <div className="checkbox-group">
          <input
            id="canClose"
            type="checkbox"
            checked={canClose}
            onChange={(e) => setCanClose(e.target.checked)}
          />
          <label htmlFor="canClose">Show close button</label>
        </div>
      </div>

      <div className="toast-preview">
        <h4>Toast Preview</h4>
        <div className="toast-preview-title">{message}</div>
        {description && <div className="toast-preview-description">{description}</div>}
        <div>
          <small>
            <strong>Variant:</strong> {variant} | <strong>Position:</strong> {position} | 
            <strong>Duration:</strong> {persist ? 'Persistent' : `${duration}ms`} | 
            <strong>Close button:</strong> {canClose ? 'Yes' : 'No'}
          </small>
        </div>
      </div>

      <button onClick={showCustomToast}>Show Custom Toast</button>
    </div>
  );
};

export default OptionsDemo;
