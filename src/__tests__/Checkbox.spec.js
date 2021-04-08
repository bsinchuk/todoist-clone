import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';

beforeEach(cleanup);

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    })),
  },
}));

describe("<Checkbox />", () => {
  describe("Success", () => {
    it ("renders a task checkbox", () => {
      const { queryByTestId } = render(<Checkbox id="1"/>);
      expect(queryByTestId('checkbox-action')).toBeTruthy();
    });
    // it ("renders a task checkbox and recieves a click", () => {
    //   const { queryByTestId } = render(<Checkbox id="1"/>);
    //   expect(queryByTestId('checkbox-action')).toBeTruthy();
    //   fireEvent.click(queryByTestId('checkbox-action'));
    // });
    
  });
});