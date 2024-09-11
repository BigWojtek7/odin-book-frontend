import Login from './Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, useNavigate } from 'react-router-dom';

const myContextData = [];

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => myContextData,
  useNavigate: vi.fn(),
}));

describe('testing Login component', () => {
  it('input value is updated correctly', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const input = screen.getByRole('textbox', { name: 'Username / E-mail' });

    await user.type(input, 'React');
    expect(input.value).toBe('React');
  });
  it('input value is updated correctly', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const input = screen.getByLabelText('Password');

    await user.type(input, 'React');
    expect(input.value).toBe('React');
  });
});
