import React, { useState, useCallback } from 'react';
// To drop this dependency, use `@tacc/core-styles/.../components/c-show-more`
import { useResizeDetector } from 'react-resize-detector';
import PropTypes from 'prop-types';

import Button from '../Button';

import styles from './ShowMore.module.css';

const ShowMore = ({ className, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleCallback = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded, setExpanded]);

  const { height, ref } = useResizeDetector();

  const hasOverflow =
    ref && ref.current ? ref.current.scrollHeight > height : false;

  return (
    <>
      {
        <div
          className={`${className} ${
            expanded ? styles.expanded : styles.clamped
          }`}
          ref={ref}
        >
          {children}
        </div>
      }
      {(hasOverflow || expanded) && (
        <Button type="link" onClick={toggleCallback}>
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </>
  );
};

ShowMore.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ShowMore.defaultProps = {
  className: '',
};

export default ShowMore;
