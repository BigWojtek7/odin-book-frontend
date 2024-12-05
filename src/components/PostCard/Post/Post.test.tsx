import { describe } from 'vitest';
import Post from './Post';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const user = { user_id: 1 };

const myContextData = [, , user];

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => myContextData,
  Link: vi.fn().mockImplementation((props) => props.children),
  BrowserRouter: vi.fn().mockImplementation((props) => props.children),
}));

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      post_likes: 5,
    }),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('testing Post component', () => {
  const post = {
    date: '19.09.2023',
    author: 'John Smith',
    avatarURL: 'https://i.pravatar.cc/300',
    content: 'test',
  };
  it('render post correctly', () => {
    render(
      <Post
        content={post.content}
        date={post.date}
        author={post.author}
        avatarURL={post.avatarURL}
      />,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByText(post.content)).toBeInTheDocument();
    expect(screen.getByText(post.date)).toBeInTheDocument();
    expect(screen.getByText(post.author)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', post.avatarURL);
  });
});
