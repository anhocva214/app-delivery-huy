import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updatePackageDestination } from '../../../../redux-toolkit/slices/packageDestinationSlice';

const DestinationInfo = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { index } = route.params;

    const onDestinationSubmit = (data) => {
        // console.log('---------', index);
        dispatch(updatePackageDestination({data, index}))
        navigation.goBack();
    };

    const goBack = () => {
        navigation.goBack();
    }

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Pressable style={styles.goBack} onPress={goBack}>
              <Image style={styles.imageBackground} source={require('../../../../public/images/Back.png')} />
            </Pressable>
          </View>
        <Text>Nhập packageDestination:</Text>
        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Địa chỉ..."
            />
            )}
            name="address"
            rules={{ required: 'Địa chỉ không được để trống' }}
            defaultValue=""
        />

        <Text>Chọn kiểu nơi nhận:</Text>
        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Kiểu nơi nhận..."
            />
            )}
            name="typeAccomodate"
            defaultValue=""
        />

        <Text>Nhập thông tin người nhận:</Text>
        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Tên người nhận..."
            />
            )}
            name="receiver.name"
            rules={{ required: 'Tên người nhận không được để trống' }}
            defaultValue=""
        />

        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Số điện thoại người nhận..."
                keyboardType='numeric'
            />
            )}
            name="receiver.phoneNumber"
            rules={{ required: 'Số điện thoại không được để trống' }}
            defaultValue=""
        />

        <Button title="Submit" onPress={handleSubmit(onDestinationSubmit)} />
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    errorText: {
        color: 'red',
    },
    goBack: {
        width: 100,
        backgroundColor: 'transparent'
    },
    imageBackground: {
        height: 70,
        borderColor: '#F3F3F3'
    },
});

export default DestinationInfo;
