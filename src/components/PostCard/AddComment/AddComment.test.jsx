import { render, screen } from '@testing-library/react';
import AddComment from './AddComment';

import userEvent from '@testing-library/user-event';

const user = { avatar_url: 'https://i.pravatar.cc/300' };
const myContextData = [, , user];

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({
      success: true,
      msg: [{ msg: 'Post has been saved' }],
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
    const mockSetForceRenderComment = vi.fn();

    const user = userEvent.setup();
    render(<AddComment setForceRenderComments={mockSetForceRenderComment} />);
    const button = screen.getByRole('button');
    const textarea = screen.getByRole('textbox');

    await user.type(textarea, 'test content');
    await user.click(button);

    expect(textarea).toHaveValue('test content');
  });
});
