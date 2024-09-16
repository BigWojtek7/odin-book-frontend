import { render, screen } from '@testing-library/react';
import Settings from './Settings';
import { useState } from 'react';

let isLoading = true;
const setIsLoading = vi.fn();

const user = { avatar_url: 'https://i.pravatar.cc/300', user_id: 7 };
const myContextData = [, , user, isLoading, setIsLoading];
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => myContextData,
}));

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [],
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Test requests component', () => {
  it('shows loading text while API request is in progress', async () => {
    render(<Settings />);
    const loading = screen.getByText('Data is loading...');
    expect(loading).toBeInTheDocument();
  });
});
