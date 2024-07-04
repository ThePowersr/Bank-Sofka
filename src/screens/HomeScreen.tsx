import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import UseApiInstance from '../hooks/UseApiInstance';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigator';
import { TypeProduct } from '../types/product';
import useDebounceValue from '../hooks/useDebonceValue';
import { act } from '@testing-library/react-native';
import ListProduct from '../components/ListProduct';
import ButtonCustom from '../components/ButtonCustom';
import { useFocusEffect } from '@react-navigation/native';


interface Props extends StackScreenProps<RootStackParams, 'Home'> { };

const HomeScreen = ({ navigation }: Props) => {

  const [product, setProduct] = useState<TypeProduct[]>();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<TypeProduct[] | null>(null);
  const [originalData, setOriginalData] = useState<TypeProduct[] | null>(null);

  const debouncedSearchTerm = useDebounceValue(searchTerm);

  const fetchProducts = async () => {
    try {
      const response = await UseApiInstance.get('/bp/products');
      act(() => {
        setProduct(response.data);
        setOriginalData(response.data);
      });
    } catch (error: any) {
      console.log(error)
    }
  };

  useFocusEffect(() => {
    fetchProducts();
  })

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  const handleSearch = () => {
    if (debouncedSearchTerm) {
      const search = product!.filter(item => {
        return item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || item.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      });
      setData(search);
    } else {
      setData(originalData);
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <View style={{ flex: 1, width: '90%' }}>
        <View style={{ paddingVertical: '10%' }}>
          <TextInput
            testID='search'
            placeholder='Search...'
            style={{ padding: 10, borderWidth: 0.2, borderRadius: 2 }}
            autoCapitalize='none'
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
          />
        </View>
        <ListProduct testID={'list-product'} data={data ?? product} navigation={navigation} />
        <ButtonCustom text='Agregar' onPress={() => navigation.navigate('ProductRegistrationScreen')} />
      </View>
    </View >
  )
}

export default HomeScreen