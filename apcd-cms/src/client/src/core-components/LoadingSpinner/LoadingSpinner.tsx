import React from 'react';
import { Spinner } from 'reactstrap';

import './LoadingSpinner.global.css';

type LoadingSpinnerProps = {
  placement?: 'inline' | 'section';
  className?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  placement = 'section',
  className,
}) => {
  return (
    <div className={`loading-icon ${className}`} data-testid="loading-spinner">
      <Spinner className={placement} />
    </div>
  );
};

export default LoadingSpinner;
