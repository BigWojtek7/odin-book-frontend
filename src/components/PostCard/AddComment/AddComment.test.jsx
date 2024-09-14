import {render, screen } from '@testing-library/react';
import AddComment from './AddComment';

import userEvent from '@testing-library/user-event';


const user = {avatar_url:'http'}
const myContextData = [,,user];

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

describe('test AddComment component', () => {
  it('renders component', async () => {

    const user = userEvent.setup()
    render(<AddComment />);
    const button = screen.getByRole('button');
    const textarea = screen.getByRole('textbox')

    user.type(textarea, 'test content')
    user.click(button)

    // await user.click(button)
  });
});