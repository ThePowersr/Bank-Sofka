import { StackScreenProps } from '@react-navigation/stack'
import { Animated, Modal, StyleSheet, Text, View } from 'react-native'
import { RootStackParams } from '../navigator/Navigator'
import { formatDate } from '../helpers/formatDate';
import { useState } from 'react';
import FadeInImage from '../components/FadeInImage';
import ButtonCustom from '../components/ButtonCustom';
import Feather from '@expo/vector-icons/Feather';
import useAnimation from '../hooks/useAnimation';
import UseApiInstance from '../hooks/UseApiInstance';

interface Props extends StackScreenProps<RootStackParams, 'AdditionalInformationScreen'> { };

const AdditionalInformationScreen = ({ navigation, route }: Props) => {

  const { name, id, logo, date_release, date_revision, description } = route.params.simpleProduct;

  const [visible, setVisible] = useState(false);
  const { fadeIn, position, startMovingPosition } = useAnimation();

  const handleSubmit = async () => {
    await UseApiInstance.delete(`/bp/products?id=${id}`)
      .then(() => navigation.navigate('Home'))
      .catch((error) => console.log(error));
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ width: '90%', flex: 1, paddingTop: 20 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
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
        <View style={{ flex: 1 }}>
          <ButtonCustom
            text='Eliminar'
            onPress={() => {
              setVisible(true)
              fadeIn()
              startMovingPosition(200, 900)
            }}
            colorBackground='#e61919'
            colorText='white' />
          <Modal
            animationType='fade'
            visible={visible}
            transparent={true}
          >
            <Animated.View style={{
              flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end'
            }}>
              <Animated.View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, transform: [{ translateY: position }] }}>
                <View style={{ height: '15%', borderBottomWidth: 0.2, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', borderBottomColor: 'gray' }}>
                  <View style={{ paddingRight: 10 }}>
                    <Feather
                      testID='feather-icon'
                      name="x"
                      size={24}
                      color="black"
                      onPress={async () => {
                        fadeIn();
                        startMovingPosition(0, 900, 400);
                        setTimeout(() => {
                          setVisible(false);
                        }, 600);
                      }
                      }
                    />
                  </View>
                </View>
                <View style={{ height: '25%', borderBottomWidth: 0.2, justifyContent: 'center', alignItems: 'center', borderBottomColor: 'gray' }}>
                  <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', textAlign: 'center' }}>{`¿Estás seguro de eliminar el producto ${name}?`}</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: '5%' }}>
                  <ButtonCustom
                    onPress={handleSubmit}
                    text='Confirmar'
                    containerStyle={{ padding: 15, paddingBottom: 0 }}
                  />
                  <ButtonCustom
                    onPress={async () => {
                      fadeIn();
                      startMovingPosition(0, 900, 400);
                      setTimeout(() => {
                        setVisible(false);
                      }, 600);
                    }
                    }
                    text='Cancelar'
                    colorBackground='#dbd9d9'
                    containerStyle={{
                      padding: 15,
                      paddingBottom: 20
                    }}
                  />
                </View>
              </Animated.View>
            </Animated.View>
          </Modal>
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
