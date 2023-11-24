import React from 'react';
import { View, TextInput, Button, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../redux-toolkit/actions/order';

function Screen2({ route, navigation }) {
  const { control, handleSubmit } = useForm();
  const { data } = route.params;
  const dispatch = useDispatch()

  const onSubmitScreen2 = (formData) => {
    const combinedData = { ...data, ...formData };
    // Gửi combinedData đi đâu đó ở đây

    // In dữ liệu để kiểm tra
    // console.log('Dữ liệu từ Màn hình 1 và 2:', combinedData);
    // @ts-ignore
    dispatch(createOrder(combinedData))
  };

  return (
    <SafeAreaView>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nhập thông tin 2"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="field2"
        defaultValue=""
      />
      <Button title="Submit" onPress={handleSubmit(onSubmitScreen2)} />
    </SafeAreaView>
  );
}

export default Screen2;