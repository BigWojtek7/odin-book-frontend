import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const renderWithProviders = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
     {ui}
    </MemoryRouter>
  );
};

export default renderWithProviders;
