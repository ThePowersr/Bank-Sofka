import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductRegistrationScreen from '../screens/ProductRegistrationScreen';
import { Alert } from 'react-native';
import UseApiInstance from '../hooks/UseApiInstance';

describe('ProductRegistrationScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<ProductRegistrationScreen />);

    // Verificar que los elementos de texto estén presentes
    expect(getByText('Formulario de Registro')).toBeTruthy();

    // Verificar que los campos de entrada estén presentes
    expect(getByPlaceholderText('ID de producto')).toBeTruthy();
    expect(getByPlaceholderText('Nombre de producto')).toBeTruthy();
    expect(getByPlaceholderText('Descripción del producto')).toBeTruthy();
    expect(getByPlaceholderText('Logo de producto')).toBeTruthy();
    expect(getByPlaceholderText(new Date().toLocaleDateString('es-EC'))).toBeTruthy();
    expect(getByPlaceholderText('Fecha de Revisión')).toBeTruthy();
  });

  it('handles input correctly', () => {
    const { getByPlaceholderText, debug } = render(<ProductRegistrationScreen />);
    const idInput = getByPlaceholderText('ID de producto');
    // debug()

    // Simular entrada de texto en el campo de ID
    fireEvent.changeText(idInput, '123456');
    expect(idInput.props.value).toBe('123456');
  });
  it('displays alert when submitting empty form', async () => {
    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => { });

    const { getByText } = render(<ProductRegistrationScreen />);
    // simulate press
    fireEvent.press(getByText('Enviar'));
    // await call to Alert.alert
    expect(mockAlert).toHaveBeenCalledTimes(1);
    // message of alert
    const expectedMessage = 'No puedes guardar campos con error o vacios.';
    expect(mockAlert).toHaveBeenCalledWith('Error', expectedMessage, [{ text: 'Aceptar' }]);
    //});
    // restore mock
    waitFor(() => {
      mockAlert.mockRestore();
    })
  });
});


describe('handleSubmit function', () => {
  it('displays alert with API error message', async () => {
    const mockApiResponse = { response: { data: 'Error en la solicitud' } };
    // Mock de la función post de UseApiInstance para simular una solicitud fallida
    jest.spyOn(UseApiInstance, 'post').mockRejectedValue(mockApiResponse);

    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => { });

    const { getByText, getByTestId } = render(<ProductRegistrationScreen />);


    fireEvent.changeText(getByTestId('ID'), 'nombre');
    fireEvent.changeText(getByTestId('Nombre'), 'nombre');
    fireEvent.changeText(getByTestId('Descripción'), 'descripcion larga');
    fireEvent.changeText(getByTestId('Logo'), 'logo');
    fireEvent.changeText(getByTestId('Fecha de Liberación (dd/mm/yyyy)'), '20/09/2022'); // simulate error

    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledTimes(1);
      const expectedErrorMessage = 'Error en la solicitud';
      expect(mockAlert).toHaveBeenCalledWith('Error', expectedErrorMessage, [{ text: 'Aceptar' }]);
    });

    // restore mock
    mockAlert.mockRestore();
    //UseApiInstance.post.mockRestore();
  });
});
