import Navbar from './Navbar';
import renderWithProviders from '../../utils/testHelpers/renderWithProviders';

// import { render } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';

describe('Testing Navbar Components', () => {
  it('The component UI should not change', () => {
    const { container } = renderWithProviders(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
