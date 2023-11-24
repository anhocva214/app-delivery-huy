import React from 'react';
import { View, Button, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { Radio } from 'native-base'

function TotalWeightChoosing({control, dimWidth , dimLength, dimHeight}) {  
    return (
      <View>
        <View style={styles.dimensionInputGroup}>
            <View style={styles.inputDimensionField}>
                <Text style={styles.label}>Width:</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Width"
                        keyboardType="numeric"
                        onChangeText={onChange}
                        value={dimWidth?.toString()}
                    />
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
                    <TextInput
                        placeholder="Length"
                        keyboardType="numeric"
                        onChangeText={onChange}
                        value={dimLength?.toString()}
                    />
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
                    <TextInput
                        placeholder="Height"
                        keyboardType="numeric"
                        onChangeText={onChange}
                        value={dimHeight?.toString()}
                    />
                    )}
                    name="dimension.height"
                    defaultValue=""
                />
            </View>
        </View>
      </View>
    );
  }
  
const styles = StyleSheet.create({
  radioGroup: {
    marginTop: 20,
    gap: 10
  },
  label: {
    fontWeight: '600'
  },
  dimensionInputGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputDimensionField: {
    gap: 10
  }
})

export default TotalWeightChoosing;
  