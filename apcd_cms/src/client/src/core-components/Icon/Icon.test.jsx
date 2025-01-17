import React from 'react';
import { render } from '@testing-library/react';
import Icon from './Icon';

const NAME = 'test-icon-name';
const CLASS = 'test-class-name';
// const TEXT = 'test-icon-text';
const LABEL = 'test-icon-label';

describe('Icon', () => {
  it('has correct `className (when not passed a `className`)`', () => {
    const { getByRole } = render(<Icon name={NAME} />);
    const icon = getByRole('img');
    expect(icon.className).toMatch(`icon-${NAME}`);
  });
  it('has correct `className` (when passed a `className`)', () => {
    const { getByRole } = render(<Icon name={NAME} className={CLASS} />);
    const icon = getByRole('img');
    expect(icon.className).toMatch(`icon-${NAME}`);
    expect(icon.className).toMatch(CLASS);
  });
  it('has correct `tagName`', () => {
    const { getByRole } = render(<Icon name={NAME} />);
    const icon = getByRole('img');
    expect(icon.tagName).toEqual('I');
  });
  it('has a label', () => {
    const { getByLabelText } = render(<Icon name={NAME} label={LABEL} />);
    const label = getByLabelText(LABEL);
    expect(label).toBeDefined();
  });
});
