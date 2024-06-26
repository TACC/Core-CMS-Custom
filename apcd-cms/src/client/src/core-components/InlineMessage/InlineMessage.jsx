import React from 'react';

import Message from '../Message';

/**
 * Show a component-specific event-based message to the user
 * @example
 * // basic usage
 * <InlineMessage type="success">Task complete.</InlineMessage>
 * @see ../Message
 */
const InlineMessage = (props) => {
  // Override default props
  const messageProps = {
    ...Message.defaultProps,
    ...props,
    canDismiss: false,
    scope: 'inline',
  };

  // Avoid manually syncing <Message>'s props
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Message {...messageProps} />;
};
InlineMessage.propTypes = Message.propTypes;
InlineMessage.defaultProps = Message.defaultProps;

export default InlineMessage;
