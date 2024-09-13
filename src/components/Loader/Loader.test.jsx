import { render, screen } from '@testing-library/react';

import Loader from './Loader';

it('renders Loader component', () => {
  const { container } = render(<Loader />);

  expect(container).toMatchSnapshot();
});
