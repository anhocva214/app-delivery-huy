import React from 'react';
import { View, Button, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { Radio, TextArea } from 'native-base'

function NoteForDriver({control}) {  
    return (
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              defaultValue={''}
              placeholder="Enter note for driver"
              onChangeText={onChange}
              style={styles.noteForArea} autoCompleteType={undefined}            />
          )}
          name="noteForDriver"
          defaultValue=""
        />
      </View>
    );
  }
  
const styles = StyleSheet.create({
  radioGroup: {
    marginTop: 20,
    gap: 10
  },
  noteForArea: {
    backgroundColor: '#ffe6d6',
    borderColor: '#F79E1B',
  }
})

export default NoteForDriver;
