import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { Radio } from 'native-base';

function TotalWeightChoosing({ control, errorMsg }) {
  const [weightScopeInput, setWeightScopeInput] = useState('1');
  return (
    <View>
      <Text style={{ marginBottom: 5 }}>Choose your order type:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Radio.Group
            name="weightScope"
            value={value}
            onChange={(newValue) => {
              setWeightScopeInput(newValue);
              onChange(newValue);
            }}
            style={styles.radioGroup}
          >
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
        name="weightScope"
        defaultValue="1"
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              defaultValue={'0'}
              keyboardType="numeric"
              placeholder="Enter est.weight below 500kg"
              onChangeText={onChange}
              style={styles.textInput}
            />
            {errorMsg && (value == null || value.trim() == '') &&(
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: '#F72D2D' }}>
                  Required...
                </Text>
              </View>
            )}
          </View>
        )}
        name="estWeight"
        defaultValue=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  radioGroup: {
    marginTop: 20,
    gap: 10,
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: '#ffe6d6',
    borderColor: '#F79E1B',
    padding: 10,
    width: 250,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default TotalWeightChoosing;
