import React from 'react';
import { render } from '@testing-library/react-native';
import Navigator from '../navigator/Navigator';


describe('test Navigator', () => {
  it("render Text", () => {
    const { queryByText } = render(<Navigator />);
    const elementWithBancoText = queryByText('BANCO');
    expect(elementWithBancoText).toBeTruthy();
  })

})
