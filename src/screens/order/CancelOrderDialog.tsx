// CancelOrderDialog.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Input } from 'native-base';

const { height, width } = Dimensions.get('window');

const CancelOrderDialog = ({ isVisible, onCancel, onSubmit }) => {
  const [cancelReason, setCancelReason] = useState('');

  const handleSubmit = () => {
    // Validate the cancelReason, and if it's valid, call the onSubmit function.
    
    // if (cancelReason) {
      onSubmit(cancelReason);
      setCancelReason('');
    // }
  };

  return (
    <Modal isVisible={isVisible} style={{ margin: 0 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', width: 350, borderRadius: 10, padding: 20 }}>
          <Text style={[{ marginBottom: 10}, {fontSize: 13}, {fontStyle: 'normal'}, {fontWeight: '500'}]}>Please enter the reason for canceling the order:</Text>
          <Input
            value={cancelReason}
            onChangeText={setCancelReason}
            placeholder="Reason for cancellation"
            marginBottom={5}
            borderWidth={1}
            borderColor={'#F79E1B'}
            borderRadius={5}
            color={'#000000'}
            height={50}
            // style={{ borderWidth: 1, borderColor: '#F79E1B', padding: 10, borderRadius: 5, marginBottom: 10, color: '#000000', height: 50 }}
          />
          <View style={[{display: 'flex', flexDirection: 'row', justifyContent: 'center'}]}>
            <TouchableOpacity style={[{width: '30%'}, {backgroundColor: '#F79E1B'}, {padding: 7}, {borderRadius: 30}, {marginRight: 10}]}
                                  onPress={handleSubmit}>
              <Text style={[{color: '#FFFFFF'}, {fontSize: 15}, {fontWeight: '600'}, {textAlign: 'center'}]}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '30%'}, {backgroundColor: '#F3F3F3'}, {padding: 7}, {borderRadius: 30}]}
                                  onPress={onCancel}>
              <Text style={[{color: '#000000'}, {fontSize: 15}, {fontWeight: '600'}, {textAlign: 'center'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#FFFFFF',
    }
});

export default CancelOrderDialog;
