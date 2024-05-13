import { useState } from 'react'
import { ActivityIndicator, Animated, ImageStyle, StyleProp, View } from 'react-native';
import useAnimation from '../hooks/useAnimation';
import { act } from '@testing-library/react-native';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

const FadeInImage = ({ uri, style }: Props) => {

  const { opacity, fadeIn } = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    act(() => {
      setIsLoading(false);
      fadeIn(1000);
    })
  }

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {
        isLoading && <ActivityIndicator style={{ position: 'absolute' }} size={30} testID='activity-indicator' />
      }
      <Animated.Image
        testID='image'
        accessibilityLabel={'image'}
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