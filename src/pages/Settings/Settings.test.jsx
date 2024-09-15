import { render, screen } from '@testing-library/react';
import Settings from './Settings';

const user = { avatar_url: 'https://i.pravatar.cc/300' };
const myContextData = [,,user];
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => myContextData,
  useNavigate: vi.fn(),
}));

describe('Test settings component', () => {
  it('renders Settings component', () => {
    render(<Settings />);
    screen.debug();
  });
});
