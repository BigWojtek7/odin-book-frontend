import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import SubmitButton from './SubmitButton.jsx';
import CancelButton from './CancelButton.js';
import { expect } from 'vitest';

describe('Submit button', () => {
  it('call the click handler every time button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<SubmitButton onClick={handleClick} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});

describe('Cancel button', () => {
  it('call the click handler every time button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<CancelButton onClick={handleClick} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
