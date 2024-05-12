import { StackScreenProps } from '@react-navigation/stack'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { RootStackParams } from '../navigator/Navigator'
import { formatDate } from '../helpers/formatDate';
import { useState } from 'react';
import FadeInImage from '../components/FadeInImage';

interface Props extends StackScreenProps<RootStackParams, 'AdditionalInformationScreen'> { };

const AdditionalInformationScreen = ({ navigation, route }: Props) => {

  const { name, id, logo, date_release, date_revision, description } = route.params.simpleProduct;

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ width: '90%', alignItems: 'center', flex: 1, paddingTop: 20 }}>
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ID: {id}</Text>
          <Text style={{ color: 'gray' }}>Informacion extra</Text>
        </View>
        <View style={{ width: '90%', flex: 1, paddingTop: 40 }}>
          <View style={style.container}>
            <Text style={style.Title}>Nombre</Text>
            <Text style={style.contentText}>{name}</Text>
          </View>
          <View style={style.container}>
            <Text style={style.Title}>Descripcion</Text>
            <Text numberOfLines={3} style={{ width: 150, textAlign: 'right', ...style.contentText }}>{description}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ alignSelf: 'flex-start', ...style.Title }}>Logo</Text>
            <FadeInImage uri={logo} style={style.logo} />
          </View>
          <View style={style.container}>
            <Text style={style.Title}>Fecha de liberacion</Text>
            <Text style={{ width: 150, textAlign: 'right', ...style.contentText }}>{formatDate(date_release)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={style.Title}>Fecha de revision</Text>
            <Text style={{ width: 150, textAlign: 'right', ...style.contentText }}>{formatDate(date_revision)}</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

export default AdditionalInformationScreen

const style = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Title: {
    color: 'gray',
    fontSize: 16
  },
  contentText: {
    fontSize: 16
  },
  skeleton: {
    width: 300,
    aspectRatio: 400 / 225,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10
  },
  logo: {
    width: 300,
    aspectRatio: 400 / 225,
    left: 25,
    marginVertical: 10
  },
})
