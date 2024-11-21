import { screen } from '@testing-library/react';
import renderWithProviders from '../utils/testUtils/renderWithProviders';
import MainLayout from './MainLayout';
import styles from './MainLayout.module.css';

vi.mock('../components/Loader/Loader', () => ({
  default: () => <div>Mocked Loader</div>,
}));
vi.mock('../components/Modal/Modal', () => ({
  default: () => <div>Mocked Modal</div>,
}));

describe('MainLayout', () => {
  it('renders main layout with header, loader, modal, and outlet', () => {
    renderWithProviders(<MainLayout />);

    expect(screen.getByText('Mocked Loader')).toBeInTheDocument();

    expect(screen.getByText('Mocked Modal')).toBeInTheDocument();

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass(styles.main);
  });
});
