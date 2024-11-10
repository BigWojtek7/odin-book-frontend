import { render, screen, waitFor } from '@testing-library/react';
import LoaderProvider from './LoaderProvider';
import useLoader from './useLoader';
import userEvent from '@testing-library/user-event';

const MockComponent = () => {
  const { isLoading, loaderText, start, stop } = useLoader();
  return (
    <div>
      <div>Is Loading: {isLoading ? 'true' : 'false'}</div>
      <div>Loader Text: {loaderText}</div>
      <button onClick={() => start('Fetching data...')}>Start Loader</button>
      <button onClick={stop}>Stop Loader</button>
    </div>
  );
};

describe('LoaderProvider', () => {
  it('sets initial values to false and empty text', () => {
    render(
      <LoaderProvider>
        <MockComponent />
      </LoaderProvider>
    );
    expect(screen.getByText('Is Loading: false')).toBeInTheDocument();
    expect(screen.getByText('Loader Text:')).toHaveTextContent('Loader Text:');
  });

  it('updates isLoading and loaderText after start is called', async () => {
    render(
      <LoaderProvider>
        <MockComponent />
      </LoaderProvider>
    );

    const user = userEvent.setup();

    await user.click(screen.getByText('Start Loader'));

    expect(screen.getByText('Is Loading: true')).toBeInTheDocument();
    expect(
      screen.getByText('Loader Text: Fetching data...')
    ).toBeInTheDocument();
  });

  it('updates isLoading after stop is called', async () => {
    render(
      <LoaderProvider>
        <MockComponent />
      </LoaderProvider>
    );

    const user = userEvent.setup();

    await user.click(screen.getByText('Start Loader'));

    await user.click(screen.getByText('Stop Loader'));

    await waitFor(() => {
      expect(screen.getByText('Is Loading: false')).toBeInTheDocument();
    });
  });
});
