import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Product = ({ name, id, onPress, testID }: any) => {
  return (
    <TouchableOpacity testID={testID} style={style.containerProduct} onPress={onPress}>
      <View>
        <Text>{name}</Text>
        <Text style={{ color: 'gray' }}>ID: {id}</Text>
      </View>
      <View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color='gray' />
      </View>
    </TouchableOpacity>
  )
}

export default Product

const style = StyleSheet.create({
  containerProduct: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  }
})
