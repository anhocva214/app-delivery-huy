import React from 'react';
import { View, Button, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { Radio } from 'native-base'

function NoteForDriver({control, valueSet}) {  
  console.log(valueSet)
    return (
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput value={valueSet} />
          )}
          name="totalWeight"
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

export default NoteForDriver;
