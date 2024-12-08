import { screen } from '@testing-library/react';
import renderWithProviders from '../../utils/testHelpers/renderWithProviders';
import Requests from './Requests';
import useRequests from '../../hooks/useRequests';

vi.mock('../../hooks/useRequests');

describe('Requests Component', () => {
  const mockRequests = {
    requestsReceived: [
      {
        follower_id: 1,
        follower_name: 'John Doe',
        user_followers_count: 10,
        avatar_url: 'test.png',
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
  };

  beforeEach(() => {
    useRequests.mockReturnValue(mockRequests);
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
});
