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

describe('input value is updated correctly', () => {
  it('testing username input value', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const input = screen.getByRole('textbox', { name: 'Username / E-mail' });

    await user.type(input, 'React');
    expect(input.value).toBe('React');
  });
  it('testing password input value', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const input = screen.getByLabelText('Password');

    await user.type(input, 'React');
    expect(input.value).toBe('React');
  });
});

describe('call the callback every time input value is changed', () => {
  it('testing username input callback call', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Login />);
    const input = screen.getByRole('textbox', { name: 'Username / E-mail' });
    await user.type(input, 'React');
    expect();
  });
});
