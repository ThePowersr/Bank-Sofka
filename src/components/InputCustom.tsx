import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import UseApiInstance from '../hooks/UseApiInstance';
import { act } from '@testing-library/react-native';

interface Props {
  isRequired?: boolean;
  type: 'ID' | 'Nombre' | 'Descripción' | 'Logo' | 'Fecha de Liberación' | 'Fecha de Revisión';
  onChangeText?: (text: string) => void;
  fechaLiberacion?: string;
  handleError?: (error: string) => void;
  handleValue?: (value: string) => void;
}

const InputCustom = (props: Props) => {
  const { type, onChangeText, fechaLiberacion, handleError, handleValue } = props;
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [color, setColor] = useState('');
  const [fechaRevision, setFechaRevision] = useState('');

  let title = '';
  let placeholder = '';
  let maxLength: number;

  switch (type) {
    case 'ID':
      title = 'ID';
      placeholder = 'ID de producto';
      maxLength = 10;
      break;
    case 'Nombre':
      title = 'Nombre';
      placeholder = 'Nombre de producto';
      maxLength = 100;
      break;
    case 'Descripción':
      title = 'Descripción';
      placeholder = 'Descripción del producto';
      maxLength = 200;
      break;
    case 'Logo':
      title = 'Logo';
      placeholder = 'Logo de producto';
      break;
    case 'Fecha de Liberación':
      title = 'Fecha de Liberación (dd/mm/yyyy)';
      placeholder = new Date().toLocaleDateString('es-EC');
      break;
    case 'Fecha de Revisión':
      title = 'Fecha de Revisión';
      placeholder = 'Fecha de Revisión';
      break;
    default:
      break;
  }

  const validateId = async () => {
    try {
      const response = await UseApiInstance.get(`/bp/products/verification?id=${value}`);
      if (response.data) {
        act(() => {
          setError('ID no valido!')
          setColor('red');
        })
      }
    } catch (error) {
      //console.log(error);
    }
  }

  useEffect(() => {
    if (type === 'Fecha de Revisión' && fechaLiberacion) {
      setFechaRevision(fechaLiberacion);
      if (handleValue) {
        handleValue(fechaLiberacion);
      }
    }
  }, [type, fechaLiberacion])

  useEffect(() => {
    if (type === 'ID') {
      validateId();
    }
  }, [value])

  const handleValidation = async (text: string) => {
    let errorMessage: string;
    let color: string;

    switch (type) {
      case 'ID':
        if (text.length < 3 || text.length > 10) {
          errorMessage = 'ID no valido!';
          color = 'red';
        } else {
          color = 'black';
        }
        break;
      case 'Nombre':
        if (text.length < 5 || text.length > 100) {
          errorMessage = 'Este campo es requerido';
          color = 'red';
        } else {
          color = 'black'
        }
        break;
      case 'Descripción':
        if (text.length < 10 || text.length > 200) {
          errorMessage = 'Este campo es requerido';
          color = 'red';
        } else {
          color = 'black'
        }
        break;
      case 'Logo':
        if (text.length == 0) {
          errorMessage = 'Este campo es requerido';
          color = 'red';
        } else {
          color = 'black'
        }
        break;
      case 'Fecha de Liberación':
        // "dd/mm/yyyy"
        const dateParts = text.split('/'); // '/' to '-'
        const inputDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

        if (isNaN(inputDate.getTime())) {
          errorMessage = 'La fecha ingresada no es válida.';
          color = 'red';
        } else {
          const today = new Date().toLocaleDateString('es-EC');
          const datePartsToday = today.split('/')
          const inputDateToday = new Date(`${datePartsToday[2]}-${datePartsToday[1]}-${datePartsToday[0]}`);
          if (inputDate >= inputDateToday) {
            errorMessage = '';
            color = 'black';
          } else {
            color = 'red';
          }
        }
        break;
      case 'Fecha de Revisión':
        break;
      default:
        break;
    }

    setValue(text);
    setError(errorMessage!);
    setColor(color!);

    if (handleValue) {
      handleValue(text);
    }

    if (handleError) {
      handleError(error);
    }

    if (onChangeText) {
      onChangeText(text);
    }

  };

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: '400' }}>{title}</Text>
      <TextInput
        testID={title}
        style={{ padding: 10, borderWidth: 1, borderRadius: 2, borderColor: color }}
        autoCapitalize='none'
        placeholder={placeholder}
        maxLength={maxLength! ?? null}
        value={type === 'Fecha de Revisión' ? fechaLiberacion : value}
        onChangeText={handleValidation}
        editable={type !== 'Fecha de Revisión'}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default InputCustom;
