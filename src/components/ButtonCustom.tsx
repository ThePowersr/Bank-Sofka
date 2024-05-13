import React from 'react'
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native'

interface Props {
  onPress: () => void;
  text: string;
  colorText?: string;
  colorBackground?: string;
  containerStyle?: ViewStyle;
}

const ButtonCustom = ({ onPress, text, colorText, colorBackground, containerStyle }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40, ...containerStyle }}>
      <TouchableOpacity
        testID={text}
        style={
          {
            backgroundColor: colorBackground ?? '#ffdf00',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            padding: 20,
            elevation: 1,
          }
        }
        onPress={onPress}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', color: colorText ?? '#1515b3' }}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonCustom
