import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { HStack, VStack } from 'native-base';

const { height, width } = Dimensions.get('window');

const ServiceAdditionList = ({ serviceAddition, onSelectServiceAddition }) => {
  const [focusId, setFocusId] = useState([]);

  const handlePress = (item) => {
    if (focusId.includes(item.id)) {
      // If it is, remove it
      setFocusId((prevFocusId) => prevFocusId.filter((id) => id !== item.id));
    } else {
      // If it's not, add it
      setFocusId((prevFocusId) => [...prevFocusId, item.id]);
    }
    onSelectServiceAddition(item);
    // console.log('hiiiii');
  };

  // const [quantity, setQuantity] = useState(1);

  // const handleIncrement = () => {
  //   setQuantity(quantity + 1);
  // };

  // const handleDecrement = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={serviceAddition}
      keyExtractor={(serviceAddition) => serviceAddition.id.toString()}
      renderItem={({ item }) => (
        <View>
          <View
            style={[
              focusId.includes(item.id)
                ? styles.focusedButton
                : styles.listItem,
            ]}
          >
            <HStack space={1} justifyContent="center">
              <View style={[styles.wrapIcon, { width: '25%' }]}>
                <Image
                  style={styles.icon}
                  source={{ uri: item.image }}
                />
              </View>
              <VStack
                space={0.05}
                width={'57%'}
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-around'}
              >
                <Text style={styles.detail}>{item.name}</Text>
                <Text style={styles.detailNotBold}>{item.description}</Text>
                <Text
                  style={[
                    focusId.includes(item.id)
                      ? styles.detailPriceFocus
                      : styles.detailPrice,
                  ]}
                >
                  đ{item.price}
                </Text>
              </VStack>
              <VStack
                width={'11%'}
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
              >
                {/* <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                        <Text style={styles.buttonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{quantity}</Text>
                      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handlePress(item);
                  }}
                >
                  <Text style={styles.buttonText}>
                    {focusId.includes(item.id) ? '-' : '+'}
                  </Text>
                </TouchableOpacity>
              </VStack>
            </HStack>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 15,
    width: '100%',
    height: height * 0.13,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#F3F3F3',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // gap: 10,
    // justifyContent: 'space-around'
  },
  focusedButton: {
    marginBottom: 15,
    width: '100%',
    height: height * 0.13,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#F79E1B',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFE6C1',
  },
  wrapIcon: {
    borderColor: '#F2F4F9',
    backgroundColor: '#F2F4F9',
    borderWidth: 1,
    borderRadius: 12,
    marginRight: width * 0.04,
    // padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    height: 65,
    width: 65,
    marginTop: 10,
    // marginLeft: -width * 0.05,
  },
  detail: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    //textAlign: "center",
  },
  detailNotBold: {
    // float: 'right',
    fontSize: 16,
    fontStyle: 'normal',
    // textAlign: 'right',
    fontWeight: '500',
    //textAlign: "center",
    color: '#191D31',
  },
  detailPrice: {
    // width: '30%',
    // height: '100%',
    // borderWidth: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // alignSelf: 'center',
    // textAlignVertical: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    // textAlign: 'right',
    fontWeight: '700',
    //textAlign: "center",
    color: '#191D31',
  },
  detailPriceFocus: {
    // display: 'flex',
    // flexDirection: 'column',
    fontSize: 16,
    fontStyle: 'normal',
    // textAlign: 'right',
    fontWeight: '700',
    color: '#F79E1B',
  },
  button: {
    backgroundColor: '#F79E1B',
    // height: 50,
    // marginTop: 20,
    // marginBottom: 20,
    padding: 6,
    borderRadius: 30,
    justifyContent: 'center',
    borderColor: '#F79E1B',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
  // quantity: {
  //   fontSize: 18,
  // },
});

export default ServiceAdditionList;
