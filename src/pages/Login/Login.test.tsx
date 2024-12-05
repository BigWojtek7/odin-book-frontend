import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import useAuth from '../../contexts/Auth/useAuth';

vi.mock('../../contexts/Auth/useAuth.js');

describe('Login Component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      token: null,
      loginAction: vi.fn().mockResolvedValue({ msg: 'Login successful!' }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login form when there is no token', () => {
    render(<Login />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows errors on submit if fields are empty', async () => {
    render(<Login />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('calls loginAction on form submit with valid data', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ msg: 'Login successful!' });
    useAuth.mockReturnValue({
      token: null,
      loginAction: mockLogin,
    });
    const user = userEvent.setup();

    render(<Login />);

    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });

  it('displays logged-in message when there is a token', () => {
    useAuth.mockReturnValue({
      token: 'sampleToken',
      loginAction: vi.fn(),
    });

    render(<Login />);

    expect(screen.getByText(/you are logged in/i)).toBeInTheDocument();
  });
});
