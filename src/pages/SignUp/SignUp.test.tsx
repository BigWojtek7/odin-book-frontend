import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';
import useAuth from '../../contexts/Auth/useAuth';

vi.mock('../../contexts/Auth/useAuth');

describe('SignUp Component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      token: null,
      signUpAction: vi.fn(async (data) => {
        if (data.password !== data.re_password) {
          return { success: false, msg: [{ msg: 'Passwords must match' }] };
        }
        return { success: true };
      }),
    });
  });

  test('renders the form with all inputs and submit button', () => {
    render(<SignUp />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/reenter password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test('validates inputs and shows errors', async () => {
    render(<SignUp />);

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    const user = userEvent.setup();
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('calls signUpAction with correct data on successful form submission', async () => {
    const signUpActionMock = vi.fn(async () => ({ success: true }));
    useAuth.mockReturnValue({
      token: null,
      signUpAction: signUpActionMock,
    });

    render(<SignUp />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(
      screen.getByLabelText(/email/i),
      'john.doe@example.com'
    );
    await user.type(screen.getByLabelText(/username/i), 'johndoe');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(
      screen.getByLabelText(/reenter password/i),
      'password123'
    );

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(signUpActionMock).toHaveBeenCalledWith({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'password123',
        re_password: 'password123',
      });
    });
  });

  test('shows error if passwords do not match', async () => {
    render(<SignUp />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(
      screen.getByLabelText(/email/i),
      'john.doe@example.com'
    );
    await user.type(screen.getByLabelText(/username/i), 'johndoe');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(
      screen.getByLabelText(/reenter password/i),
      'password456'
    );

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('renders success message when user is logged in', () => {
    useAuth.mockReturnValue({
      token: 'mocked-token',
      signUpAction: vi.fn(),
    });

    render(<SignUp />);
    expect(screen.getByText(/you are logged in/i)).toBeInTheDocument();
  });
});
