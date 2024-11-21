import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithProviders from '../../utils/testUtils/renderWithProviders';
import Requests from './Requests';
import useRequests from '../../hooks/useRequests';

vi.mock('../../hooks/useRequests');

describe('Requests Component', () => {
  beforeEach(() => {
    // Mock danych
    useRequests.mockReturnValue({
      requestsReceived: [
        {
          follower_id: 1,
          follower_name: 'John Doe',
          user_followers_count: 5,
          avatar_url: 'avatar1.jpg',
        },
      ],
      requestsSent: [
        {
          follower_id: 2,
          follower_name: 'Jane Smith',
          user_followers_count: 3,
          avatar_url: 'avatar2.jpg',
        },
      ],
      friendsSuggest: [
        {
          user_id: 3,
          full_name: 'Alice Johnson',
          user_followers_count: 8,
          avatar_url: 'avatar3.jpg',
        },
      ],
      handleAddFollower: vi.fn(),
      handleSentRequest: vi.fn(),
      handleDeleteRequest: vi.fn(),
    });
  });

  it('renders Sent Requests section correctly', () => {
    renderWithProviders(<Requests />);

    expect(screen.getByText('Sent Requests:')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Cancel follow request')).toBeInTheDocument();
  });

  it('renders Received Requests section correctly', () => {
    renderWithProviders(<Requests />);

    expect(screen.getByText('Received Requests:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders Users you may know section correctly', () => {
    renderWithProviders(<Requests />);

    expect(screen.getByText('Users you may know:')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Send follow request')).toBeInTheDocument();
  });

  it('calls handleAddFollower when Confirm button is clicked', async () => {
    const user = userEvent.setup();
    const { handleAddFollower } = useRequests.mock.results[0].value;

    renderWithProviders(<Requests />);

    const confirmButton = screen.getByText('Confirm');
    await user.click(confirmButton);

    expect(handleAddFollower).toHaveBeenCalledWith(1); // Sprawdzanie follower_id
  });

  it('calls handleDeleteRequest for Sent Requests when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const { handleDeleteRequest } = useRequests.mock.results[0].value;

    renderWithProviders(<Requests />);

    const cancelButton = screen.getByText('Cancel follow request');
    await user.click(cancelButton);

    expect(handleDeleteRequest).toHaveBeenCalledWith('sent', 2); // Typ requestu i follower_id
  });

  it('calls handleSentRequest when Send follow request button is clicked', async () => {
    const user = userEvent.setup();
    const { handleSentRequest } = useRequests.mock.results[0].value;

    renderWithProviders(<Requests />);

    const sendRequestButton = screen.getByText('Send follow request');
    await user.click(sendRequestButton);

    expect(handleSentRequest).toHaveBeenCalledWith(3); // ID użytkownika
  });
});