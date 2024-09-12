import Textarea from './Textarea';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// vi.mock('./Textarea', () => {
//   const { forwardRef } = vi.importActual('react');
//   const ChildComponentShim = vi.importActual('./Textarea');
//   return {
//     __esModule: true,
//     default: forwardRef((props, ref) => <ChildComponentShim { ...props } ref={ref} />),
//   };
// })

describe('testing Input component', () => {
  it('input value is updated correctly', async () => {
    const user = userEvent.setup();
    render(<Textarea name="test" />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'React');
    expect(input.value).toBe('React');
  });
  it('call the callback every time input value is changed', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Textarea name="test" setInputValue={handleChange} isControlled={true} />
    );
    const input = screen.getByRole('textbox');
    await user.type(input, 'React');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
