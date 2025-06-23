import { render } from '@testing-library/react';

import Src from './src';

describe('Src', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Src />);
    expect(baseElement).toBeTruthy();
  });
});
