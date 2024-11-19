import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import useAuth from '../../contexts/Auth/useAuth';
import usePosts from '../../hooks/usePosts';
import useLoader from '../../contexts/Loader/useLoader';

// Mock the necessary hooks
vi.mock('../../contexts/Auth/useAuth');
vi.mock('../../hooks/usePosts');
vi.mock('../../contexts/Loader/useLoader.js')

describe('Home', () => {
  test('renders posts and friends card', () => {
    useAuth.mockReturnValue({
      user: { user_id: 'user123' },
    });

    useLoader.mockReturnValue({})

    usePosts.mockReturnValue({
      posts: [
        { post_id: '1', author_id: 'user123', content: 'Post 1' },
        { post_id: '2', author_id: 'user456', content: 'Post 2' },
      ],
      setPosts: vi.fn(),
    });

    render(<Home />);

    // Ensure the FriendsCard and PostCard are rendered
    expect(screen.getByText(/friends card/i)).toBeInTheDocument();
    expect(screen.getByText(/post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/post 2/i)).toBeInTheDocument();
  });

  test('deletes a post when handleDeletePost is triggered', async () => {
    const setPosts = vi.fn();

    useAuth.mockReturnValue({
      user: { user_id: 'user123' },
    });

    usePosts.mockReturnValue({
      posts: [
        { post_id: '1', author_id: 'user123', content: 'Post 1' },
        { post_id: '2', author_id: 'user456', content: 'Post 2' },
      ],
      setPosts,
    });

    render(<Home />);

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    // Check if setPosts is called with the updated posts list (Post 1 should be deleted)
    await waitFor(() =>
      expect(setPosts).toHaveBeenCalledWith([
        { post_id: '2', author_id: 'user456', content: 'Post 2' },
      ])
    );
  });

  test('removes posts from a specific follower when onDeletePostsByFollower is triggered', async () => {
    const setPosts = vi.fn();

    useAuth.mockReturnValue({
      user: { user_id: 'user123' },
    });

    usePosts.mockReturnValue({
      posts: [
        { post_id: '1', author_id: 'user123', content: 'Post 1' },
        { post_id: '2', author_id: 'user456', content: 'Post 2' },
      ],
      setPosts,
    });

    render(<Home />);

    // Simulate deleting posts by a specific follower
    const deleteByFollowerButton = screen.getByText(/delete posts by follower/i);
    fireEvent.click(deleteByFollowerButton);

    // Check if setPosts was called with the filtered posts (Post 1 should remain)
    await waitFor(() =>
      expect(setPosts).toHaveBeenCalledWith([
        { post_id: '1', author_id: 'user123', content: 'Post 1' },
      ])
    );
  });
});