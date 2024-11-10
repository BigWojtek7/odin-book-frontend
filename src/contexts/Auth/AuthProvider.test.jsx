import { render, screen, act } from '@testing-library/react';
import AuthProvider from './AuthProvider';
import useAuth from './useAuth';

vi.mock('../../utils/requestWithNativeFetch');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

const mockLoader = { start: vi.fn(), stop: vi.fn() };
vi.mock('../Loader/useLoader', () => ({
  default: () => mockLoader,
}));

const mockNotification = { addNotification: vi.fn() };
vi.mock('../Notification/useNotification', () => ({
  default: () => mockNotification,
}));

const MockComponent = () => {
  const { loginAction, signUpAction, logOut, token, user } = useAuth();
  return (
    <div>
      <button
        onClick={() => loginAction({ username: 'test', password: '123' })}
      >
        Log in
      </button>
      <button
        onClick={() => signUpAction({ username: 'test', password: '123' })}
      >
        Sign up
      </button>
      <button onClick={logOut}>Log out</button>
      <div>Token: {token}</div>
      <div>User: {user ? user.username : 'No user'}</div>
    </div>
  );
};

describe('test AuthProvider', () => {
  it('initializes context with default values', () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Token:')).toBeInTheDocument();
    expect(screen.getByText('User: No user')).toBeInTheDocument();
  });

  it('initializes context with default values', () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Token:')).toBeInTheDocument();
    expect(screen.getByText('User: No user')).toBeInTheDocument();
  });

  it('initializes context with default values', () => {
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Token:')).toBeInTheDocument();
    expect(screen.getByText('User: No user')).toBeInTheDocument();
  });

  it('logOut clears token and user', () => {
    localStorage.setItem('token', 'sample-token');
    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    const logOutButton = screen.getByText('Log out');
    act(() => {
      logOutButton.click();
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(screen.getByText('User: No user')).toBeInTheDocument();
    expect(mockNotification.addNotification).toHaveBeenCalledWith(
      'You have been logged out',
      'success'
    );
  });
});
