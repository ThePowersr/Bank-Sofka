import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Text, View } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import AdditionalInformationScreen from '../screens/AdditionalInformationScreen';
import { TypeProduct } from '../types/product';

export type RootStackParams = {
  Home: undefined,
  AdditionalInformationScreen: { simpleProduct: TypeProduct },
}

const Stack = createNativeStackNavigator<RootStackParams>();

const Navigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          // title: () => (
          //   <Text>Bank</Text>
          // ) ,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <>
              <AntDesign name="creditcard" size={24} color="#6262dd" />
              <View style={{ width: '5%' }}></View>
              <Text style={{ color: '#6262dd', fontWeight: 'bold' }} testID='Banco'>BANCO</Text>
            </>
          ),
          headerLeft: undefined

        }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name="AdditionalInformationScreen" component={AdditionalInformationScreen} options={{ headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
