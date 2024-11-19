import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddComment from './AddComment';
import useAuth from '../../../contexts/Auth/useAuth';

vi.mock('../../../contexts/Auth/useAuth');

test('renders user avatar, textarea, and submit button', () => {
  useAuth.mockReturnValue({
    user: { avatar_url: 'http://example.com/avatar.jpg' },
  });

  render(<AddComment handleAddComment={vi.fn()} textareaRef={null} />);

  expect(screen.getByAltText('avatar')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
});

test('updates form state on textarea change', async () => {
  useAuth.mockReturnValue({
    user: { avatar_url: 'http://example.com/avatar.jpg' },
  });

  render(<AddComment handleAddComment={vi.fn()} textareaRef={null} />);
  const textarea = screen.getByPlaceholderText('Write a comment...');

  const user = userEvent.setup();

  await user.type(textarea, 'Test comment');

  expect(textarea).toHaveValue('Test comment');
});

test('calls handleAddComment with form content on submit', async () => {
  useAuth.mockReturnValue({
    user: { avatar_url: 'http://example.com/avatar.jpg' },
  });
  const handleAddComment = vi.fn();

  render(<AddComment handleAddComment={handleAddComment} textareaRef={null} />);

  const textarea = screen.getByPlaceholderText('Write a comment...');
  const button = screen.getByRole('button', { name: /post/i });

  const user = userEvent.setup();
  await user.type(textarea, 'Test comment');
  await user.click(button);

  expect(handleAddComment).toHaveBeenCalledWith('Test comment');
});

test('does not submit form if content is invalid', async () => {
  useAuth.mockReturnValue({
    user: { avatar_url: 'http://example.com/avatar.jpg' },
  });
  const handleAddComment = vi.fn();

  render(<AddComment handleAddComment={handleAddComment} textareaRef={null} />);
  const button = screen.getByRole('button', { name: /post/i });

  const user = userEvent.setup();
  await user.click(button);

  expect(handleAddComment).not.toHaveBeenCalled();
  await waitFor(() => {
    expect(screen.getByText(/content is required/i)).toBeInTheDocument();
  });
});

test('renders user avatar from context', () => {
  useAuth.mockReturnValue({
    user: { avatar_url: 'http://example.com/avatar.jpg' },
  });

  render(<AddComment handleAddComment={vi.fn()} textareaRef={null} />);

  const avatar = screen.getByAltText('avatar');
  expect(avatar).toHaveAttribute('src', 'http://example.com/avatar.jpg');
});
