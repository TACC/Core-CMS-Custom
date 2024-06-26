import React, { useCallback, useState } from 'react';

import Button from '../Button';

import styles from './TextCopyField.module.css';

type TextCopyFieldProps = {
  value: string;
  placeholder?: string;
  className?: string;
  id?: string;
  buttonClassName?: string;
};

const TextCopyField: React.FC<TextCopyFieldProps> = ({
  value,
  placeholder,
  className,
  id,
  buttonClassName,
}) => {
  /* WARNING: Must match CSS `--transition-duration` */
  const transitionDuration = 0.15; // second(s)
  const stateDuration = 1; // second(s)
  const stateTimeout = transitionDuration + stateDuration; // second(s)

  const [isCopied, setIsCopied] = useState(false);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);

    const timeout = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(timeout);
    }, stateTimeout * 1000);
  }, [value, setIsCopied, stateTimeout]);
  const isEmpty = !value || value.length === 0;
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Swallow keyboard events on the Input control, but
    // still allow selecting the text. readOnly property of
    // Input is not adequate for this purpose because it
    // prevents text selection
    event.preventDefault();
  };

  return (
    <>
      <Button
        className={`${styles['copy-button']} ${
          isCopied ? styles['is-copied'] : ''
        } ${buttonClassName}`}
        size="small"
        onClick={onCopy}
        disabled={isEmpty}
        iconNameBefore={isCopied ? 'approved-reverse' : 'link'}
      >
        Copy
      </Button>
      <input
        id={id}
        type="text"
        onChange={onChange}
        value={value}
        className={className}
        placeholder={placeholder}
        data-testid="input"
        disabled
        readOnly
      />
    </>
  );
};

export default TextCopyField;
