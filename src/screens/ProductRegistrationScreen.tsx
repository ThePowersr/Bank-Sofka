import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native'
import InputCustom from '../components/InputCustom'
import ButtonCustom from '../components/ButtonCustom'
import { useState } from 'react'
import { useForm } from '../hooks/useForm'
import UseApiInstance from '../hooks/UseApiInstance'
import { fechaLiberacionChange, formatDateYyyyMmDd, initDate } from '../helpers/formatDate'

const ProductRegistrationScreen = () => {

  const [error, setError] = useState('');
  const [valueRevision, setValueRevision] = useState('');
  const { form, onChange } = useForm({ id: '', nombre: '', descripcion: '', logo: '', fechaLiberacion: valueRevision, fechaRevision: '' });

  const [fechaLiberacion, setFechaLiberacion] = useState(initDate);

  const handleFechaLiberacionChange = (fecha: string) => {
    const dateUpdate = fechaLiberacionChange(fecha);
    setFechaLiberacion(dateUpdate);
    onChange(fecha, 'fechaLiberacion')
  }

  const handleError = (error: string) => {
    setError(error)
  }

  const handleValue = (value: string) => {
    setValueRevision(value);
    onChange(value, 'fechaRevision')
  }

  const handleSubmit = async () => {
    const { descripcion, fechaLiberacion, id, nombre, logo } = form;
    if (error || fechaLiberacion == '') {
      console.log(valueRevision);
      console.log(error);
      Alert.alert('Error', 'No puedes guardar campos con error o vacios.', [
        {
          text: 'Aceptar'
        },
      ])
      return;
    }
    const formattedFechaLiberacion = formatDateYyyyMmDd(fechaLiberacion);
    const formattedFechaRevision = formatDateYyyyMmDd(valueRevision);
    try {
      await UseApiInstance.post('/bp/products', {
        id,
        name: nombre,
        logo,
        description: descripcion,
        date_release: formattedFechaLiberacion,
        date_revision: formattedFechaRevision,
      })
      //console.log(post.data);
    } catch (error: any) {
      //console.log(error.response.data);
      Alert.alert('Error', `${error.response.data}`, [
        {
          text: 'Aceptar'
        }
      ])
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: 'white', flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, width: '90%' }}>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Formulario de Registro</Text>
          </View>
          <View style={{ paddingTop: 20 }}>
            <InputCustom type='ID' onChangeText={(value) => onChange(value, 'id')} handleError={handleError} />
            <InputCustom type='Nombre' onChangeText={(value) => onChange(value, 'nombre')} handleError={handleError} />
            <InputCustom type='Descripción' onChangeText={(value) => onChange(value, 'descripcion')} handleError={handleError} />
            <InputCustom type='Logo' onChangeText={(value) => onChange(value, 'logo')} handleError={handleError} />
            <InputCustom type='Fecha de Liberación' onChangeText={handleFechaLiberacionChange} handleError={handleError} />
            <InputCustom type='Fecha de Revisión' fechaLiberacion={fechaLiberacion} handleValue={handleValue} />
          </View>
          <ButtonCustom text='Enviar' onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  )
}

export default ProductRegistrationScreen
