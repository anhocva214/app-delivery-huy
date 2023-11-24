import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { updatePackageDestination } from '../../../../redux-toolkit/slices/packageDestinationSlice';
import { ScrollView, Input, Container, Box } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { GOOGLE_API_KEY } from '../../../../config/env/env';
import { getAddressFromCoordinate, getCoordinatesFromAddress } from '../../../../service/googlemaps';
import { updatePickupLocation } from '../../../../redux-toolkit/slices/locationSlice';

const { height, width } = Dimensions.get('window');

const GOOGLE_PLACES_API_KEY = GOOGLE_API_KEY;

function AutocompleteAddressInput({ updateRegion, region }) {
    const [searchText, setSearchText] = useState<any>();
    const [suggestions, setSuggestions] = useState([]);
  
    const [isChooseSearchResult, setIsChooseSearchResult] = useState(false)
    useEffect(() => {
      if (searchText) {
        // Gửi yêu cầu gợi ý địa chỉ khi người dùng nhập vào ô nhập
        setIsChooseSearchResult(true);
        getPlacePredictions(searchText);
      } else {
        // Xóa danh sách gợi ý khi không có nội dung nhập
        setSuggestions([]);
      }
    }, [searchText]);
    
    useEffect(() => {
      const fetchAddress = async () => {
        const address = await getAddressFromCoordinate(region);
        setSearchText(address);
      };
    
      fetchAddress();


    }, [region])
  
    async function getPlacePredictions(input) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}&components=country:VN`
        );
  
        if (response.data.predictions) {
          setSuggestions(response.data.predictions);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách gợi ý:', error);
      }
    }
  
    const selectSuggestion = async (suggestion) => {
      setSuggestions([]);
      setIsChooseSearchResult(false);
      setSearchText(suggestion.description);
      const coords = await getCoordinatesFromAddress(suggestion.description)
      updateRegion(coords);
    };
  
    return (
      <Container>
        <View style={{ width: '100%' }}>
          <Input
            borderRadius={12}
            _focus={styles.inputHover}
            value={searchText?.formatted_address}
            onChangeText={(text) => setSearchText(text)}
            style={styles.input}
            placeholder="Nhập địa chỉ"
          />
        <View>
          {isChooseSearchResult && suggestions.map((suggestion) => (
            <TouchableOpacity style={styles.suggestion} key={suggestion.place_id} onPress={async () => await selectSuggestion(suggestion)}>
              <Text>{suggestion.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Container>
    );
  }

const DetailPickupPage = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const pickupLocation = useSelector((state: any) => state.location.pickupLocation)

  const goBack = () => {
    navigation.goBack();
  };
  
  const [region, setRegion] = useState({
    latitude: pickupLocation.latitude,
    longitude: pickupLocation.longitude,
    latitudeDelta: 0.010,
    longitudeDelta: 0.010,
  });

  const updateRegion = (coords) => {
    setRegion({
      latitude: coords?.latitude,
      longitude: coords?.longitude,
      latitudeDelta: 0.010,
      longitudeDelta: 0.010,
    });
    dispatch(updatePickupLocation(coords));
  };

  const onMapPress = (e) => {
    setRegion({
      ...region,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
    dispatch(updatePickupLocation(e.nativeEvent.coordinate));
  };


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
            <Text style={styles.header_1}>Pickup Location</Text>
          </View>
        </View>
        <View style={styles.wrapperInput}>
            <Text style={styles.label}>Pickup at:</Text>
            <MapView
                style={{ height: 200 }}
                region={region}
                onPress={onMapPress}
            >
                <Marker coordinate={region} />
            </MapView>
        </View>

        <View style={styles.wrapperInput}>
            <Text style={styles.label}>Address: </Text>
            <View style={{ padding: 10, width: '100%' }}>
              <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                  <AutocompleteAddressInput updateRegion={updateRegion} region={region}></AutocompleteAddressInput>
              )}
              name="typeAccomodate"
              defaultValue=""
              />
            </View>
        </View>
      </ScrollView>

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
    height: height,
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

export default DetailPickupPage;
