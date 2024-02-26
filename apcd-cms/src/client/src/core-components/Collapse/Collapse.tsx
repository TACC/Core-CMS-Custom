import React, { useState, useCallback } from 'react';
import Button from '../Button';
import { Badge } from 'reactstrap';
import { Collapse as BootstrapCollapse } from 'reactstrap';
import Icon from '../Icon';
import styles from './Collapse.module.css';

type CollapseProperties = React.PropsWithChildren<{
  title: string;
  note?: string;
  open?: boolean;
  requiredText?: string;
  isCollapsable?: boolean;
  className?: string;
}>;

const Collapse: React.FC<CollapseProperties> = ({
  title,
  note,
  open,
  requiredText,
  className,
  children,
  isCollapsable = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open ?? false);
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <div className={className}>
      <div className={styles.header}>
        <div className={styles.title}>
          {title}
          {requiredText && (
            <Badge
              color="danger"
              style={{ marginLeft: '10px', marginBottom: '10px' }}
            >
              {requiredText}
            </Badge>
          )}
        </div>
        <div className={styles.controls}>
          <div>{note ?? ''}</div>
          {isCollapsable && (
            <Button type="link" className={styles.expand} onClick={toggle}>
              <Icon name={isOpen ? 'contract' : 'expand'} />
            </Button>
          )}
        </div>
      </div>
      <BootstrapCollapse isOpen={isOpen || !isCollapsable}>
        {children}
      </BootstrapCollapse>
    </div>
  );
};

export default Collapse;
