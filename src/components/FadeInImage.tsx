import React, { useContext, useState } from 'react'
import { ActivityIndicator, Animated, ImageStyle, StyleProp, View } from 'react-native';
import useAnimation from '../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

const FadeInImage = ({ uri, style }: Props) => {

  const { opacity, fadeIn } = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false)
    fadeIn(1000);
  }

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {
        isLoading && <ActivityIndicator style={{ position: 'absolute' }} size={30} />
      }

      <Animated.Image
        source={{ uri }}
        onLoadEnd={finishLoading}
        style={{
          ...style as any,
          opacity
        }}
      />
    </View>
  )
}

export default FadeInImage