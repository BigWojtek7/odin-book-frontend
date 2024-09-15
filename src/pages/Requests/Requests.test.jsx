import {render, screen} from '@testing-library/react';
import Requests from './Requests';
import { useState } from 'react';

let isLoading = true
const setIsLoading = vi.fn()




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
    render(<Requests />);
    const loading = screen.getByText('Data is loading...');
    expect(loading).toBeInTheDocument();
  });
  it('not shows loading text while API request is done', async () => {
    // let isLoading = false
    // const myContextData = [, , user, isLoading, setIsLoading];
    // vi.mock('react-router-dom', () => ({
    //   ...vi.importActual('react-router-dom'),
    //   useOutletContext: () => myContextData,
    // }));
    // render(<Requests />);
    // const loading = screen.queryByText('Data is loading...');
    // expect(loading).not.toBeInTheDocument();
  });
});
