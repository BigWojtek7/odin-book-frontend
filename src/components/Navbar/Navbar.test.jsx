import { expect } from 'vitest';
import Navbar from './Navbar';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Navbar Components', () => {
  it('The component UI should not change', () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
