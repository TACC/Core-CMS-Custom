import React from 'react';

type sizes = 'xs' | 'sm' | 'md' | 'lg';

type IconProps = React.PropsWithChildren<{
  className?: string;
  dataTestid?: string;
  label?: string;
  name: string;
  size?: sizes;
}>;

const Icon: React.FC<IconProps> = ({
  className,
  dataTestid,
  label,
  name,
  size,
}) => {
  const iconClassName = `icon icon-${name}` + (size ? ` icon-${size}` : '');
  // FAQ: The conditional avoids an extra space in class attribute value
  const fullClassName = className
    ? [className, iconClassName].join(' ')
    : iconClassName;

  return (
    <i
      className={fullClassName}
      role="img"
      aria-label={label}
      data-testid={dataTestid}
    />
  );
};

export default Icon;
