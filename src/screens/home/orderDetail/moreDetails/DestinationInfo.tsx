import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updatePackageDestination } from '../../../../redux-toolkit/slices/packageDestinationSlice';
import { ScrollView, Input } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { getCoordinatesFromAddress } from '../../../../service/googlemaps';
import axios from 'axios';
import { GOOGLE_API_KEY } from '../../../../config/env/env';

const { height, width } = Dimensions.get('window');

const DestinationInfo = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [suggestions, setSuggestions] = useState([]);
  const [isChooseSearchResult, setIsChooseSearchResult] = useState(false)
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.010,
    longitudeDelta: 0.010,
  });

  const { index } = route.params;

  const onDestinationSubmit = (data) => {
    // console.log('---------', index);
    dispatch(updatePackageDestination({ data, index }));
    navigation.goBack();
  };

  const goBack = () => {
    navigation.goBack();
  };

  const selectSuggestion = async (suggestion) => {
    setSuggestions([]);
    setIsChooseSearchResult(false);
    setValue('address', suggestion.description)
    const coords = await getCoordinatesFromAddress(suggestion.description)
    setRegion({ ...region, ...coords });
  };

  const handleAddressChange = async (text) => {
    await getPlacePredictions(text);
    setIsChooseSearchResult(true);    
  }

  async function getPlacePredictions(input) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}&components=country:VN`
      );

      if (response.data.predictions) {
        setSuggestions(response.data.predictions);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách gợi ý:', error);
    }
  }

  return (
    <SafeAreaView style={styles.containerParent}>
      <ScrollView
        style={[styles.container, { marginTop: 20 }]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.titleWrapper}>
          <Pressable style={styles.goBack} onPress={goBack}>
            <Image
              style={styles.imageBackground}
              source={require('../../../../public/images/Back.png')}
            />
          </Pressable>
          <View style={{ width: '85%' }}>
            <Text style={styles.header_1}>Destination Information</Text>
          </View>
        </View>
        <View style={styles.wrapperInput}>
            <MapView
                style={{ height: 200 }}
                region={region}
            >
                <Marker coordinate={region} />
            </MapView>
            <Text style={[styles.label, {marginTop: 20}]}>Destination Address:</Text>
            <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
                <Input
                borderRadius={12}
                _focus={styles.inputHover}
                value={value}
                onChangeText={(text) => {
                  onChange(text)
                  handleAddressChange(text);
                }}
                style={styles.input}
                placeholder="Fill Destination Address..."
                />
            )}
            name="address"
            rules={{ required: 'Destination Address Cannot Be Empty!' }}
            defaultValue=""
            />
        </View>
        <View style={{ marginTop: 5 }}>
          {isChooseSearchResult && suggestions.map((suggestion) => (
            <TouchableOpacity style={styles.suggestion} key={suggestion.place_id} onPress={async () => await selectSuggestion(suggestion)}>
              <Text>{suggestion.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.wrapperInput}>
            <Text style={styles.label}>Destination Type: </Text>
            <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
                <Input
                borderRadius={12}
                value={value}
                _focus={styles.inputHover}
                onChangeText={onChange}
                style={styles.input}
                placeholder="Fill Destination Type..."
                />
            )}
            name="typeAccomodate"
            defaultValue=""
            />
        </View>

        <View style={styles.wrapperInput}>
            <Text style={styles.label}>Receiver Information: </Text>
            <View style={{padding: 10, paddingTop: 0}}>
                <View>
                    <Text style={styles.label}>
                    Receiver Name: 
                    </Text>
                    <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                        borderRadius={12}
                        _focus={styles.inputHover}
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                        placeholder="Fill Receiver Name..."
                        marginBottom={3}
                        />
                    )}
                    name="receiver.name"
                    rules={{ required: 'Receiver Name Cannot Be Empty!' }}
                    defaultValue=""
                    />
                </View>

                <View>
                    <Text style={styles.label}>
                        Receiver Phone Number
                    </Text>
                    <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                        borderRadius={12}
                        _focus={styles.inputHover}
                        value={value}
                        onChangeText={onChange}
                        style={styles.input}
                        placeholder="Fill Receiver Phone Number..."
                        keyboardType="numeric"
                        />
                    )}
                    name="receiver.phoneNumber"
                    rules={{ required: 'Receiver Phone Number Cannot Be Empty!' }}
                    defaultValue=""
                    />
                </View>
            </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onDestinationSubmit)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {/* <Button title="Submit" onPress={handleSubmit(onDestinationSubmit)} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerParent: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    // flex: 1,
    marginLeft: 20,
    marginRight: 20,
    height: height * 0.8,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
    alignItems: 'center',
    // justifyContent: 'center'
    // float: 'right'
  },
  goBack: {
    width: '15%',
    // height: 50,
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // float: 'left'
  },
  header_1: {
    // width: '100%',
    fontSize: 22,
    fontWeight: '700',
    // borderWidth: 1,
    textAlign: 'center',
    marginRight: width * 0.1,
  },
  wrapperInput: {
    width: '100%',
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    marginBottom: 10
  },
  input: {
    // height: 50,
    // borderColor: '#F3F3F3',
    // borderWidth: 1,
    // borderRadius: 12,
    marginBottom: 10,
    // width: width * 0.8,
    height: height * 0.05,
    //backgroundColor: '#F79E1B',
    padding: 8,
    color: 'black',
    // borderRadius: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  inputHover: {
    backgroundColor: "#FFFFFF",
    borderColor: "#F79E1B",
  },
  errorText: {
    color: 'red',
  },
  imageBackground: {
    height: 50,
    width: 50,
    borderColor: '#F3F3F3',
  },
  button: {
    backgroundColor: '#F79E1B',
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  suggestion: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    minHeight: 30,
    // borderBottomWidth: 0,
    borderRadius: 10
  }
});

export default DestinationInfo;
