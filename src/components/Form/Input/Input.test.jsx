import Input from './Input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('testing Input component', () => {
  it('input value is updated correctly', async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'React');
    expect(input.value).toBe('React');
  });
  
  it('call the callback every time input value is changed', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'React');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
