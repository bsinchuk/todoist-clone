import React from 'react';
import { render, cleanup} from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup);

describe("<App />", () => {
  it("renders an App", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('application')).toBeTruthy();
  });
  it("renders an App in darkmode", () => {
    const { queryByTestId } = render(<App darkModeDefault />);
    expect(queryByTestId('application').classList.contains('darkmode')).toBeTruthy();
  })
})