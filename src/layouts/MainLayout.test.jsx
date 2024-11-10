import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import styles from './MainLayout.module.css';

vi.mock('../components/Header/Header', () => ({
  default: () => <div>Mocked Header</div>,
}));
vi.mock('../components/Loader/Loader', () => ({
  default: () => <div>Mocked Loader</div>,
}));
vi.mock('../components/Modal/Modal', () => ({
  default: () => <div>Mocked Modal</div>,
}));

describe('MainLayout', () => {
  it('renders main layout with header, loader, modal, and outlet', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();

    expect(screen.getByText('Mocked Loader')).toBeInTheDocument();

    expect(screen.getByText('Mocked Modal')).toBeInTheDocument();

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass(styles.main);
  });
});
