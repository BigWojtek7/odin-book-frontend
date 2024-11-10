import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalProvider from './ModalProvider';
import ModalContext from './ModalContext';
import { useContext } from 'react';

const MockComponent = ({ onConfirm }) => {
  const { modalData, openModal, closeModal } = useContext(ModalContext);

  return (
    <div>
      {modalData ? (
        <div>
          <p>Message: {modalData.message}</p>
          <button onClick={modalData.onConfirm}>Confirm</button>
          <button onClick={closeModal}>Close Modal</button>
        </div>
      ) : (
        <p>No Modal</p>
      )}
      <button onClick={() => openModal('Are you sure?', onConfirm)}>
        Open Modal
      </button>
    </div>
  );
};

describe('ModalProvider', () => {
  it('should show "No Modal" initially', () => {
    render(
      <ModalProvider>
        <MockComponent />
      </ModalProvider>
    );

    expect(screen.getByText('No Modal')).toBeInTheDocument();
  });

  it('should display the modal with message when openModal is called', async () => {
    render(
      <ModalProvider>
        <MockComponent />
      </ModalProvider>
    );

    const user = userEvent.setup();
    const openButton = screen.getByText('Open Modal');
    await user.click(openButton);

    expect(screen.getByText('Message: Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Close Modal')).toBeInTheDocument();
  });

  it('should close the modal when closeModal is called', async () => {
    render(
      <ModalProvider>
        <MockComponent />
      </ModalProvider>
    );

    const user = userEvent.setup();
    const openButton = screen.getByText('Open Modal');
    await user.click(openButton);

    expect(screen.getByText('Message: Are you sure?')).toBeInTheDocument();

    const closeButton = screen.getByText('Close Modal');
    await user.click(closeButton);

    expect(screen.getByText('No Modal')).toBeInTheDocument();
  });

  it('should call onConfirm when Confirm button is clicked', async () => {
    const onConfirm = vi.fn();

    render(
      <ModalProvider>
        <MockComponent onConfirm={onConfirm} />
      </ModalProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('Open Modal'));

    const confirmButton = screen.getByText('Confirm');
    await user.click(confirmButton);

    expect(onConfirm).toHaveBeenCalled();
  });
});
