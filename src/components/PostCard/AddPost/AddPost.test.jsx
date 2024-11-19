import { render, screen } from '@testing-library/react';
import AddPost from './AddPost';
import useAuth from '../../../contexts/Auth/useAuth';
import useNotification from '../../../contexts/Notification/useNotification';
import requestWithNativeFetch from '../../../utils/requestWithNativeFetch';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();

vi.mock('../../../contexts/Auth/useAuth.js');
vi.mock('../../../contexts/Notification/useNotification.js');
vi.mock('../../../utils/requestWithNativeFetch');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
vi.mock('../../contexts/Loader/useLoader.js', () => ({
  default: () => ({ start: vi.fn(), stop: vi.fn() }),
}));

describe('AddPost component', () => {
  const mockAddNotification = vi.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ token: 'mockToken' });
    useNotification.mockReturnValue({ addNotification: mockAddNotification });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders form', () => {
    render(<AddPost />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('submits form and updates post on success', async () => {
    requestWithNativeFetch.mockResolvedValue({
      success: true,
      msg: [{ msg: 'Post has been saved' }],
    });

    render(<AddPost />);

    await userEvent.type(screen.getByPlaceholderText(/write a post/i), 'Test content');
    await userEvent.click(screen.getByText('Post'));

    expect(mockAddNotification).toHaveBeenCalledWith(
      'The post has been created',
      'success'
    );
  });
});
