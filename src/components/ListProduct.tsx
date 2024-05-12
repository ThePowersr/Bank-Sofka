import { FlatList, Text, View } from "react-native"
import { TypeProduct } from "../types/product"
import Product from "./Product"
import ItemSeparator from "./ItemSeparator"
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/Navigator";

interface Props {
  data: TypeProduct[] | undefined;
  //onPress: () => void;
  navigation?: StackNavigationProp<RootStackParams, "Home", undefined>;
  testID?: string;
}

const ListProduct = (props: Props) => {

  const { data, navigation, testID } = props;

  return (
    <View testID={testID} style={{ borderWidth: 0.3, borderRadius: 4 }}>
      <FlatList
        testID='FlatListProduct'
        data={data}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <Product testID={item.id} id={item.id} name={item.name} onPress={() => navigation!.navigate("AdditionalInformationScreen", { simpleProduct: item })} />
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }} testID='text-no-product'>No se encontraron productos</Text>
        )}
      />
    </View>
  )
}

export default ListProduct
