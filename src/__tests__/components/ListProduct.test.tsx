
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ListProduct from '../../components/ListProduct';
import axios, { AxiosResponse } from 'axios';
import { TypeProduct } from '../../types/product';



describe("render component <ListProduct/>", () => {
  it("Validate full items.", async () => {

    const response = await axios.get('/bp/products');

    const { getByTestId, debug, getByText } = render(<ListProduct data={response.data} />);

    expect(getByTestId("FlatListProduct"));
    response.data.map((product: TypeProduct) => {
      expect(getByText(`ID: ${product.id}`)).toBeTruthy(); // Text
      expect(getByTestId(product.id)).toBeTruthy(); // testID
    });
  });

  it("Validate null data ListProduct", () => {

    const { getByTestId, getByText } = render(<ListProduct data={undefined} />)

    expect(getByTestId("FlatListProduct"));
    expect(getByText("No se encontraron productos")).toBeTruthy();
    expect(getByTestId("text-no-product")).toBeTruthy();
  })
})
