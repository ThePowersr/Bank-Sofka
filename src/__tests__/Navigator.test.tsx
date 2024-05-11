import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Navigator from '../navigator/Navigator';
import axios, { AxiosResponse } from 'axios';
import HomeScreen from '../../src/screens/HomeScreen';


describe('test Navigator', () => {
  it("render products", async () => {
    const response = await axios.get('/bp/products');

    // Verifica que la llamada a la API se haya realizado correctamente
    expect(response.data).toEqual([
      {
        "id": "trj-crds",
        "name": "Tarjetas de Credito",
        "description": "Tarjeta de consumo bajo la modalidad de credito",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2024-02-01T00:00:00.000+00:00"
      },
      {
        "id": "trj-crdts",
        "name": "Tarjetas de Creditos",
        "description": "Tarjeta de consumo bajo la modalidad de creditos",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2024-02-01T00:00:00.000+00:00"
      },
      {
        "id": "visa-gold",
        "name": "Visa Gold Credito",
        "description": "Tarjeta de consumo bajo la modalidad de creditos",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Gold/visa_gold_card_400x225.jpg",
        "date_release": "2023-02-01T00:00:00.000+00:00",
        "date_revision": "2024-02-01T00:00:00.000+00:00"
      }
    ]);

  })
  it("render Text", () => {
    const { queryByText } = render(<Navigator />);
    const elementWithBancoText = queryByText('BANCO');
    expect(elementWithBancoText).toBeTruthy();
  })


  it('renders HomeScreen', async () => {
    await act(async () => {
      // Realiza la llamada a la API
      const response = await axios.get('/bp/products');

      // Verifica que la llamada a la API se haya realizado correctamente
      expect(response.data).toEqual([
        {
          "id": "trj-crds",
          "name": "Tarjetas de Credito",
          "description": "Tarjeta de consumo bajo la modalidad de credito",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "date_release": "2023-02-01T00:00:00.000+00:00",
          "date_revision": "2024-02-01T00:00:00.000+00:00"
        },
        {
          "id": "trj-crdts",
          "name": "Tarjetas de Creditos",
          "description": "Tarjeta de consumo bajo la modalidad de creditos",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "date_release": "2023-02-01T00:00:00.000+00:00",
          "date_revision": "2024-02-01T00:00:00.000+00:00"
        },
        {
          "id": "visa-gold",
          "name": "Visa Gold Credito",
          "description": "Tarjeta de consumo bajo la modalidad de creditos",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Gold/visa_gold_card_400x225.jpg",
          "date_release": "2023-02-01T00:00:00.000+00:00",
          "date_revision": "2024-02-01T00:00:00.000+00:00"
        }
      ]);

      // Renderiza el componente después de que la llamada a la API se haya completado
      const { getByText } = render(<HomeScreen />);

      // Espera a que el estado se actualice y los elementos se rendericen
      await waitFor(() => {
        expect(getByText('ID: trj-crds')).toBeTruthy();
        expect(getByText('ID: visa-gold')).toBeTruthy();
      });
    });
  });

  // it('renders items flatlist', async () => {
  //   const mockData = [
  //     {
  //       id: 'trj-crds',
  //       name: 'Tarjetas de Credito',
  //       description: 'Tarjeta de consumo bajo la modalidad de credito',
  //       logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  //       date_release: '2023-02-01T00:00:00.000+00:00',
  //       date_revision: '2024-02-01T00:00:00.000+00:00',
  //     },
  //     {
  //       id: 'trj-crdts',
  //       name: 'Tarjetas de Creditos',
  //       description: 'Tarjeta de consumo bajo la modalidad de creditos',
  //       logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  //       date_release: '2023-02-01T00:00:00.000+00:00',
  //       date_revision: '2024-02-01T00:00:00.000+00:00',
  //     },
  //     {
  //       id: 'visa-gold',
  //       name: 'Visa Gold Credito',
  //       description: 'Tarjeta de consumo bajo la modalidad de creditos',
  //       logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Gold/visa_gold_card_400x225.jpg',
  //       date_release: '2023-02-01T00:00:00.000+00:00',
  //       date_revision: '2024-02-01T00:00:00.000+00:00',
  //     },
  //   ];
  //   (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockData } as AxiosResponse<any>);

  //   let getByTestId;

  //   awaitFor act(async () => {
  //     const component = render(<HomeScreen />);
  //     getByTestId = component.getByTestId;
  //   });

  //   // Verificar que se rendericen los elementos del FlatList
  //   expect(getByTestId!('FlatListProduct')).toBeTruthy();
  //   expect(getByTestId!('trj-crds')).toBeTruthy();
  //   expect(getByTestId!('visa-gold')).toBeTruthy();
  // });

})
