import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { HStack, VStack } from 'native-base';

const { height, width } = Dimensions.get('window');

const VehicleList = ({ vehicle, onSelectVehicle }) => {
    const [focusId, setFocusId] = useState(null);

    const handlePress = (item) => {
        setFocusId(item.id);
        onSelectVehicle(item)
        // console.log('hiiiii');
    }

  return (
    <FlatList
    style={{width: '100%'}}
      data={vehicle}
      keyExtractor={(vehicle) => vehicle.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {handlePress(item)}}>
          <View style={[focusId === item.id ? styles.focusedButton : styles.listItem]}>
                <HStack space={1} justifyContent="center">
                    <View style={styles.wrapIcon}>
                        <Image
                        style={styles.icon}
                        // source={{uri: 'https://drive.google.com/file/d/1ohhid91Ws40kY06jMfV4nlQGflXNsnvd/view?usp=sharing'}}
                        // source={{uri: 'https://drive.google.com/uc?export=view&id=1ohhid91Ws40kY06jMfV4nlQGflXNsnvd"'}}
                        // source={{uri: 'https://drive.google.com/file/d/1ohhid91Ws40kY06jMfV4nlQGflXNsnvd/view'}}
                        // source={{uri: 'https://drive.google.com/uc?id=1ohhid91Ws40kY06jMfV4nlQGflXNsnvd'}}
                        source={{uri: item.image}}
                        />
                    </View>
                    <VStack space={0.05} width={'45%'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
                        <Text style={styles.detail}>{item.name}</Text>
                        <Text style={styles.detailNotBold}>{item.description}</Text>
                        <Text style={styles.detailNotBold}>{item.weight}kg</Text>
                    </VStack>
                    <Text style={[focusId === item.id ? styles.detailPriceFocus : styles.detailPrice]}>đ{item.price}</Text>
                </HStack>
            </View>
        </TouchableOpacity>
      )}
    />
    
  );
};

const styles = StyleSheet.create({
    listItem: {
        marginBottom: 15,
        width: '100%',
        height: height * 0.12,
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
        height: height * 0.12,
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
        width: '25%'
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
        display: 'flex',
        flexDirection: 'column',
        // alignSelf: 'center',
        // textAlignVertical: 'center',
        fontSize: 16,
        fontStyle: 'normal',
        textAlign: 'right',
        fontWeight: '700',
        //textAlign: "center",
        color: '#191D31',
      },
      detailPriceFocus: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 16,
        fontStyle: 'normal',
        textAlign: 'right',
        fontWeight: '700',
        color: '#F79E1B',
      },
});

export default VehicleList;
