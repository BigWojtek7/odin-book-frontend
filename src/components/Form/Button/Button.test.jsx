import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('call the click handler every time button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
