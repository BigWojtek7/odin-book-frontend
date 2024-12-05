import { render, screen } from '@testing-library/react';
import Profile from './Profile';

import { MemoryRouter } from 'react-router-dom';

test('renders Profile component with mocked hooks', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  // Sprawdź, czy profil użytkownika został załadowany
  expect(screen.getByText('Mocked Profile User')).toBeInTheDocument();

  // Sprawdź, czy posty zostały załadowane
  expect(screen.getByText('Mock Post 1')).toBeInTheDocument();
  expect(screen.getByText('Mock Post 2')).toBeInTheDocument();
});
