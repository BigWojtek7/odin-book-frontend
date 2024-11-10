import { render, screen, act, fireEvent } from '@testing-library/react';
import NotificationProvider from './NotificationProvider';
import NotificationContext from './NotificationContext';
import React from 'react';

const MockComponent = () => {
  const { addNotification } = React.useContext(NotificationContext);

  return (
    <button onClick={() => addNotification('Test message', 'info')}>
      Add Notification
    </button>
  );
};

describe('NotificationProvider', () => {
  vi.useFakeTimers();

  it('adds a notification after calling addNotification', async () => {
    render(
      <NotificationProvider>
        <MockComponent />
      </NotificationProvider>
    );

    // Have to change to fireEvent, because userEvent is not working well with fake timers.
    fireEvent.click(screen.getByText('Add Notification'));
    expect(screen.getByText('Test message')).toBeInTheDocument();
  }, 10000);

  it('deletes notification automatically after 5 seconds', async () => {
    render(
      <NotificationProvider>
        <MockComponent />
      </NotificationProvider>
    );

    // Have to change to fireEvent, because userEvent is not working well with fake timers.
    fireEvent.click(screen.getByText('Add Notification'));
    expect(screen.getByText('Test message')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  }, 10000);
});
