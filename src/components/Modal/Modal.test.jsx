import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

// Inicjalizacja mockowanych funkcji
let mockOnConfirm = vi.fn();
let mockCloseModal = vi.fn();

vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  createPortal: (element) => element,
}));

// Mockowanie hooka useModal
vi.mock('../../contexts/Modal/useModal.js', () => {
  return {
    default: () => ({
      modalData: {
        message: 'Are you sure you want to delete this post?',
        onConfirm: mockOnConfirm,
      },
      closeModal: mockCloseModal,
    }),
  };
});

describe('Modal component', () => {
  it('renders modal with message and buttons', () => {
    render(<Modal />);

    expect(
      screen.getByText('Are you sure you want to delete this post?')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
  });

  it('calls onConfirm when "Yes" button is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal />);

    const yesButton = screen.getByRole('button', { name: /yes/i });
    await user.click(yesButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('closes the modal when "No" button is clicked', async () => {
    const user = userEvent.setup();
    render(<Modal />);

    const noButton = screen.getByRole('button', { name: /no/i });
    await user.click(noButton);

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
