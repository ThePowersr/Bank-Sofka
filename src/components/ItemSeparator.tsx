import { View } from 'react-native'

const ItemSeparator = () => {

  return (
    <View
      style={{
        borderBottomWidth: 1,
        opacity: 0.4,
        marginVertical: 5,
        borderColor: 'gray'
      }}
    />
  );
};

export default ItemSeparator;