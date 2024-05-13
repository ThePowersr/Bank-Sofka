import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import AdditionalInformationScreen from '../../screens/AdditionalInformationScreen';
import { formatDate } from '../../helpers/formatDate';
import { Animated } from 'react-native';

const mockRoute: any = {
  params: {
    simpleProduct: {
      id: 123,
      name: 'Product Name',
      description: 'Product Description',
      logo: 'https://example.com/logo.png',
      date_release: '2022-05-10',
      date_revision: '2022-05-15',
    },
  },
};

const mockNavigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockProps = {
  navigation: mockNavigation,
  route: mockRoute,
};

describe('AdditionalInformationScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<AdditionalInformationScreen {...mockProps} />);

    // verify text render 
    expect(getByText('ID: 123')).toBeTruthy();
    expect(getByText('Product Name')).toBeTruthy();
    expect(getByText('Product Description')).toBeTruthy();
    expect(getByText('Fecha de liberacion')).toBeTruthy();
    expect(getByText('Fecha de revision')).toBeTruthy();

    // verify image render
    expect(getByTestId('image')).toBeTruthy();
  });

  it('displays correct product information', () => {
    const { getByText } = render(<AdditionalInformationScreen {...mockProps} />);

    expect(getByText(`ID: ${mockRoute.params.simpleProduct.id}`)).toBeTruthy();
    expect(getByText(mockRoute.params.simpleProduct.name)).toBeTruthy();
    expect(getByText(mockRoute.params.simpleProduct.description)).toBeTruthy();
    expect(getByText(formatDate(mockRoute.params.simpleProduct.date_release))).toBeTruthy();
    expect(getByText(formatDate(mockRoute.params.simpleProduct.date_revision))).toBeTruthy();
  });

  it('displays delete confirmation modal when "Eliminar" button is pressed', () => {
    const { getByText, queryByText } = render(<AdditionalInformationScreen {...mockProps} />);

    expect(queryByText('¿Estás seguro de eliminar el producto Product Name?')).toBeNull();

    // Press the "Eliminar" button
    fireEvent.press(getByText('Eliminar'));
    //vefify modal
    expect(getByText('¿Estás seguro de eliminar el producto Product Name?')).toBeTruthy();
  });

  it('hides delete confirmation modal when "Cancelar" button is pressed', async () => {
    const { getByText, queryByText } = render(<AdditionalInformationScreen {...mockProps} />);

    // show modal
    fireEvent.press(getByText('Eliminar'));

    // Verify that the modal is visible
    expect(getByText('¿Estás seguro de eliminar el producto Product Name?')).toBeTruthy();

    // Press the "Cancelar" button
    fireEvent.press(getByText('Cancelar'));

    // Wait for the modal animation to complete
    await waitFor(() => {
      // Verify that the modal is no longer visible
      expect(queryByText('¿Estás seguro de eliminar el producto Product Name?')).toBeNull();
    });
  });

  it('handles close icon press', async () => {
    const { getByText, getByTestId } = render(<AdditionalInformationScreen {...mockProps} />);

    fireEvent.press(getByText('Eliminar'));
    // Press the "Confirmar" button
    const featherIcon = getByTestId('feather-icon');

    fireEvent.press(featherIcon);
  });
});
