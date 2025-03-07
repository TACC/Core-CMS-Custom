import React from 'react';
import Button from 'core-components/Button';
import styles from './ClearOptionsButton.module.css';

interface ClearOptionsButtonProps {
  onClick: () => void;
}

const ClearOptionsButton: React.FC<ClearOptionsButtonProps> = ({ onClick }) => (
  <Button className={styles.clearOptions} onClick={onClick}>
    Clear Options
  </Button>
);

export default ClearOptionsButton;
