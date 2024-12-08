import { screen } from '@testing-library/react';
import Friend from './Friend';
import renderWithProviders from '../../utils/testHelpers/renderWithProviders';

describe('testing Friend component', () => {
  const friend = {
    followerId: 1,
    name: 'name test',
    friendsNumber: 3,
    avatarURL: 'https://i.pravatar.cc/300',
  };
  it('renders Friends with props in jsx', () => {
    renderWithProviders(
      <Friend
        followerId={friend.followerId}
        name={friend.name}
        friendsNumber={friend.friendsNumber}
        avatarURL={friend.avatarURL}
      />
    );

    screen.debug();
    expect(screen.getByText('name test')).toBeInTheDocument();
    expect(
      screen.getByText(`${friend.friendsNumber} friends`)
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', friend.avatarURL);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/profile/${friend.followerId}`
    );
  });
});
