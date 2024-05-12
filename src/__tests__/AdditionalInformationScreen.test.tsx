import React from 'react';
import { render } from '@testing-library/react-native';
import AdditionalInformationScreen from '../screens/AdditionalInformationScreen';
import { RootStackParams } from '../navigator/Navigator';

// Mock de las props de navegación
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

    // Verifica que los elementos de texto se rendericen correctamente
    expect(getByText('ID: 123')).toBeTruthy();
    expect(getByText('Product Name')).toBeTruthy();
    expect(getByText('Product Description')).toBeTruthy();
    expect(getByText('Fecha de liberacion')).toBeTruthy();
    expect(getByText('Fecha de revision')).toBeTruthy();

    // Verifica que el componente de imagen se renderice correctamente
    expect(getByTestId('image')).toBeTruthy();
  });
});
