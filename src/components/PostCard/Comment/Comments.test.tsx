
import Comments from './Comments';

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
  const mockedFetch = vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [
      {
        comment_id: 1,
        content: 'testing comment content',
        avatar_url: 'https://i.pravatar.cc/300',
        date_format: '09.03.2202',
        author_id: 5,
        author_name: 'test',
      },
    ],
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('testing Comment component', () => {
  it('render comment correctly', async () => {
    render(<Comments />, { wrapper: BrowserRouter });

    expect(
      await screen.findByText('testing comment content')
    ).toBeInTheDocument();
    expect(await screen.findByText('test')).toBeInTheDocument();
    expect(await screen.findByText('09.03.2202')).toBeInTheDocument();
    // expect(await screen.findByRole('img')).toHaveAttribute(
    //   'src',
    //   'https://i.pravatar.cc/300'
    // );
  });
});
