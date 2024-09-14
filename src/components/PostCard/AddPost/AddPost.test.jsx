import { waitFor, render, screen } from '@testing-library/react';
import AddPost from './AddPost';

import userEvent from '@testing-library/user-event';


const setIsLoading = vi.fn();
const myContextData = [,,,,setIsLoading];

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

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => myContextData,
  useNavigate: vi.fn(),
}));

describe('test AddPost component', () => {
  it('renders component', async () => {

    const user = userEvent.setup()
    render(<AddPost />);
    const button = screen.getByRole('button');
    const textarea = screen.getByRole('textbox')
    
    await user.type(textarea, 'test content')
    await user.click(button)
    expect(textarea).toHaveValue('test content');


    // await user.click(button)
  });
});
