import React from 'react';
import { View, Button, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { Radio } from 'native-base'

function TotalWeightChoosing({control, valueSet}) {  
    return (
      <View>
        <Text style={{marginBottom: 5}}>Choose your order type:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Radio.Group name="totalWeight" value={valueSet?.toString()} onChange={onChange} style={styles.radioGroup}>
              <Radio value="1">
                <Text>Below 500 kg</Text>
              </Radio>
              <Radio value="2">
                <Text>501 - 1000 kg</Text>
              </Radio>
              <Radio value="3">
                <Text>1001 - 1500 kg</Text>
              </Radio>
              <Radio value="4">
                <Text>Above 1500 kg</Text>
              </Radio>
            </Radio.Group>
          )}
          name="totalWeight"
          defaultValue={1}
        />
      </View>
    );
  }
  
const styles = StyleSheet.create({
  radioGroup: {
    marginTop: 20,
    gap: 10
  }
})

export default TotalWeightChoosing;
  