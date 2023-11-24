import React from 'react';
import {
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { Radio } from 'native-base';

function OrderTypeChoosing({ control, errorMsg }) {
  return (
    <View>
      <Text style={{ marginBottom: 5 }}>Choose your order type:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <Radio.Group
              name="orderType"
              value={value}
              onChange={onChange}
              style={styles.radioGroup}
            >
              <Radio value="1">
                <Text>Cosmetics</Text>
              </Radio>
              <Radio value="2">
                <Text>Medicine</Text>
              </Radio>
              <Radio value="3">
                <Text>Food</Text>
              </Radio>
              <Radio value="4">
                <Text>Drink</Text>
              </Radio>
              <Radio value="5">
                <Text>Materials for production</Text>
              </Radio>
              <Radio value="6">
                <Text>Electronics</Text>
              </Radio>
              <Radio value="7">
                <Text>Different</Text>
              </Radio>
            </Radio.Group>
            {errorMsg && !value && (
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: '#F72D2D' }}>
                  Required...
                </Text>
              </View>
            )}
          </View>
        )}
        name="orderType"
        // defaultValue={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  radioGroup: {
    marginTop: 20,
    gap: 10,
  },
});

export default OrderTypeChoosing;
