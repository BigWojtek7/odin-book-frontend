import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';
import useAuth from '../../contexts/Auth/useAuth';
import usePosts from '../../hooks/usePosts';
import FriendsCard from '../../components/FriendsCard/FriendsCard';
import PostCard from '../../components/PostCard/PostCard';

vi.mock('../../contexts/Auth/useAuth');
vi.mock('../../hooks/usePosts');
vi.mock('../../components/FriendsCard/FriendsCard', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('../../components/PostCard/PostCard', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('Home Component', () => {
  const mockSetPosts = vi.fn();
  const mockUser = { user_id: 1, name: 'John Doe' };
  const mockPosts = [
    { post_id: 1, author_id: 2, content: 'Hello World' },
    { post_id: 2, author_id: 3, content: 'React Testing' },
  ];

  beforeEach(() => {
    useAuth.mockReturnValue({ user: mockUser });
    usePosts.mockReturnValue({ posts: mockPosts, setPosts: mockSetPosts });
    FriendsCard.mockImplementation(({ onDeletePostsByFollower }) => (
      <div data-testid="friends-card">
        <button
          onClick={() => onDeletePostsByFollower(2)}
          data-testid="delete-follower"
        >
          Delete Follower's Posts
        </button>
      </div>
    ));
    PostCard.mockImplementation(({ posts, onDelete }) => (
      <div data-testid="post-card">
        {posts.map((post) => (
          <div key={post.post_id}>
            <span>{post.content}</span>
            <button
              onClick={() => onDelete(post.post_id)}
              data-testid={`delete-post-${post.post_id}`}
            >
              Delete Post
            </button>
          </div>
        ))}
      </div>
    ));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders FriendsCard and PostCard with correct props', () => {
    render(<Home />);

    expect(screen.getByTestId('friends-card')).toBeInTheDocument();

    expect(screen.getByTestId('post-card')).toBeInTheDocument();

    expect(PostCard).toHaveBeenCalledWith(
      {
        posts: mockPosts,
        onDelete: expect.any(Function),
      },
      {}
    );

    expect(FriendsCard).toHaveBeenCalledWith(
      {
        onDeletePostsByFollower: expect.any(Function),
      },
      {}
    );
  });

  it('calls setPosts when a post is deleted', async () => {
    render(<Home />);
    const deletePostButton = screen.getByTestId('delete-post-1');
    await userEvent.click(deletePostButton);

    expect(mockSetPosts).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = mockSetPosts.mock.calls[0][0];
    const updatedPosts = updateFunction(mockPosts);
    expect(updatedPosts).toEqual([
      { post_id: 2, author_id: 3, content: 'React Testing' },
    ]);
  });

  it('calls setPosts when a follower is deleted', async () => {
    render(<Home />);
    const deleteFollowerButton = screen.getByTestId('delete-follower');
    await userEvent.click(deleteFollowerButton);

    expect(mockSetPosts).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = mockSetPosts.mock.calls[0][0];
    const updatedPosts = updateFunction(mockPosts);
    expect(updatedPosts).toEqual([
      { post_id: 2, author_id: 3, content: 'React Testing' },
    ]);
  });
});
