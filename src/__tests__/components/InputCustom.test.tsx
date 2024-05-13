import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InputCustom from '../../components/InputCustom';

interface Props {
  type: "ID" | "Nombre" | "Descripción" | "Logo" | "Fecha de Liberación" | "Fecha de Revisión"
  placeholder: string;
  errorMessage: string;
  inputTextValid: string;
  inputTextError: string;
}

const testData: Props[] = [
  { type: 'ID', placeholder: 'ID de producto', errorMessage: 'ID no valido!', inputTextValid: 'valid', inputTextError: 'v' },
  { type: 'Nombre', placeholder: 'Nombre de producto', errorMessage: 'Este campo es requerido', inputTextValid: 'valid', inputTextError: 'vali' },
  { type: 'Descripción', placeholder: 'Descripción del producto', errorMessage: 'Este campo es requerido', inputTextValid: 'descripcion', inputTextError: 'descripci' },
  { type: 'Logo', placeholder: 'Logo de producto', errorMessage: 'Este campo es requerido', inputTextValid: 'logo', inputTextError: '' },
  { type: 'Fecha de Liberación', placeholder: new Date().toLocaleDateString('es-EC'), errorMessage: 'La fecha de liberación debe ser igual o mayor a la fecha actual.', inputTextValid: '10/04/2026', inputTextError: '10/04/2024' },
  { type: 'Fecha de Revisión', placeholder: 'Fecha de Revisión', errorMessage: '', inputTextValid: '10/04/2027', inputTextError: '10/04/2025' }
];

describe('map', () => {
  testData.map((item) => {
    it(`Validate input for type: ${item.type}`, async () => {
      const onChangeText = jest.fn();
      const { getByPlaceholderText, getByText, debug } = render(<InputCustom type={item.type} onChangeText={onChangeText} />);
      const input = getByPlaceholderText(item.placeholder);

      fireEvent.changeText(input, item.inputTextValid);
      expect(() => getByText(item.errorMessage)).toThrow();
      if (item.type == 'Fecha de Revisión') return;
      expect(input.props.style.borderColor).toBe('black');
      expect(onChangeText).toHaveBeenCalledWith(item.inputTextValid);
    })
    it(`Validate input Error for type: ${item.type}`, async () => {
      const { getByPlaceholderText, getByText, debug } = render(<InputCustom type={item.type} />);
      const input = getByPlaceholderText(item.placeholder);

      if (item.type == 'Fecha de Revisión') return;
      if (item.type == 'Fecha de Liberación') return;

      fireEvent.changeText(input, item.inputTextError);
      expect(input.props.style.borderColor).toBe('red');
      expect(getByText(item.errorMessage)).toBeTruthy();
    })
  })
  it('displays placeholder correctly for unknown type', () => {
    const { getByPlaceholderText } = render(<InputCustom />); // fefault break;
    const input = getByPlaceholderText('');
    expect(input).toBeTruthy();
  });
})

describe('InputCustom with type Fecha de Revisión', () => {
  it('does not call handleValue prop if fechaLiberacion prop is not provided', () => {
    const handleValue = jest.fn();
    render(<InputCustom type="Fecha de Revisión" handleValue={handleValue} />);
    expect(handleValue).not.toHaveBeenCalled();
  });
  it('calls handleValue prop with fechaLiberacion prop value', () => {
    const handleValue = jest.fn();
    render(<InputCustom type="Fecha de Revisión" handleValue={handleValue} fechaLiberacion="12/05/2024" />);
    expect(handleValue).toHaveBeenCalledWith('12/05/2024');
  });
})