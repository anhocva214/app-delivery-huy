import React from 'react';
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
  // let checkBlank = false;
  // const isFieldBlank = (fieldValue) => {
  //   return fieldValue === null || fieldValue.trim() === '';
  // };
  return (
    <View>
      <View style={styles.dimensionInputGroup}>
        <View style={styles.inputDimensionField}>
          <Text style={styles.label}>Width:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  placeholder="Width"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  // onChangeText={(number) => {
                  //   onChange(number);
                  //   checkBlank = isFieldBlank(number);
                  // }}
                  value={value}
                />
                {/* {!value ? checkBlank = true : checkBlank = false} */}
                {errorMsg && (value == null || value.trim() == '') && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ color: '#F72D2D' }}>
                      Required...
                    </Text>
                  </View>
                )}
              </View>
            )}
            name="dimension.width"
            defaultValue=""
          />
        </View>
        <View style={styles.inputDimensionField}>
          <Text style={styles.label}>Length:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  placeholder="Length"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
                {/* {value == null || value.trim() == ''
                  ? (checkBlank = true)
                  : (checkBlank = false)} */}
                {errorMsg && (value == null || value.trim() == '') && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ color: '#F72D2D' }}>
                      Required...
                    </Text>
                  </View>
                )}
              </View>
            )}
            name="dimension.length"
            defaultValue=""
          />
        </View>
        <View style={styles.inputDimensionField}>
          <Text style={styles.label}>Height:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  placeholder="Height"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
                {/* {value == null || value.trim() == ''
                  ? (checkBlank = true)
                  : (checkBlank = false)} */}
                {errorMsg && (value == null || value.trim() == '') && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ color: '#F72D2D' }}>
                      Required...
                    </Text>
                  </View>
                )}
              </View>
            )}
            name="dimension.height"
            defaultValue=""
          />
        </View>
      </View>
      {/* {errorMsg && checkBlank && (
        <View style={{ marginTop: 5 }}>
          <Text style={{ color: '#F72D2D' }}>
            Please fill in all informations...
          </Text>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  radioGroup: {
    marginTop: 20,
    gap: 10,
  },
  label: {
    fontWeight: '600',
  },
  dimensionInputGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputDimensionField: {
    gap: 10,
  },
});

export default TotalWeightChoosing;
