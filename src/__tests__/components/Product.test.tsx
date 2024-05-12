import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Product from '../../components/Product';


describe("render component <ListProduct/>", () => {
  it("renders correctly with provided props", () => {
    const mockOnPress = jest.fn();

    const mockItem = {
      id: 'visa-gold',
      name: 'Visa Gold'
    }

    const { getByText, getByTestId } = render(
      <Product
        id={mockItem.id}
        name={mockItem.name}
        onPress={mockOnPress}
        testID="product-component"
      />
    );

    expect(getByText(mockItem.name)).toBeTruthy();
    expect(getByText(`ID: ${mockItem.id}`)).toBeTruthy();

    //simulate onPress.
    fireEvent.press(getByTestId('product-component'));

    //validate call to onPrees
    expect(mockOnPress).toHaveBeenCalled();

  });
});