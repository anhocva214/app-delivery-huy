import { Avatar, Flex, Image, Text, View } from 'native-base';
import React = require('react');
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUserInfo } from '../../../redux-toolkit/actions/user';
const socket = io('http://localhost:3000');

interface IDataChat {
  senderId: string;
  text: string;
}

export default function MessageDetailScreen() {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const scrollViewRef = React.useRef<any>();
  const [textTyping, setTextTyping] = React.useState('');
  const { authUser } = useSelector((stateRedux: any) => stateRedux.userReducer);
  const [dataListChat, setDataListChat] = React.useState<IDataChat[]>([]);

  React.useEffect(() => {
    // @ts-ignore
    dispatch(getUserInfo());
  }, []);

  //   React.useEffect(() => {
  //     socket.on('connect', () => {
  //       console.log('Live chat connected to Socket.IO server');
  //     });

  //     socket.on('live_chat', async (data) => {
  //     //   console.log('Live chat received data:', data);
  //       setDataListChat(JSON.parse(data))
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  const sendMessage = () => {
    // try{
    //     let data: IDataChat = {
    //         senderId: authUser.id,
    //         text: textTyping
    //     }
    //     socket.emit("live_chat", JSON.stringify(data))
    //     setTextTyping("")
    // }
    // catch(err){
    //     console.log(err)
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Flex flex={1} h="full" bgColor={'#fff'}>
        <Flex
          h="11%"
          px="3"
          direction="row"
          justify="space-between"
          align="center"
          borderBottomWidth={1.5}
          borderColor={'#F3F3F3'}
        >
          <TouchableWithoutFeedback>
            <Image
              source={require('../../../public/images/arrow-left.png')}
              size={25}
              alt="image"
            />
          </TouchableWithoutFeedback>
          <Flex
            flexDirection={'row'}
            justify="space-between"
            w={width - 120}
            align="center"
          >
            <Flex
              flexDirection={'row'}
              alignItems={'center'}
              style={{ gap: 10 }}
            >
              <Avatar
                source={{
                  uri: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                }}
                size={46}
              />
              <Flex>
                <Text color={'#191D31'} fontSize={14} fontWeight={'semibold'}>
                  Maddy Lin
                </Text>
                <Text color="#A7A9B7" fontSize={14}>
                  Online
                </Text>
              </Flex>
            </Flex>

            <Flex direction="row">
              <TouchableWithoutFeedback>
                <Image
                  source={require('../../../public/images/ic-call.png')}
                  size={25}
                  alt="image"
                />
              </TouchableWithoutFeedback>
            </Flex>
          </Flex>
          <TouchableWithoutFeedback>
            <Image
              source={require('../../../public/images/ic-more.png')}
              size={25}
              alt='images'
            />
          </TouchableWithoutFeedback>
        </Flex>
        <Flex h="84%" align="flex-end" px="3">
          <ScrollView
            style={{ flex: 1, width: '100%' }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            <Flex flexDirection="row" w="full" justify="flex-end">
              <Flex
                bg="#1D272F"
                py="2"
                px="3"
                rounded="lg"
                roundedBottomRight={0}
                style={{ alignSelf: 'flex-start' }}
                w="70%"
              >
                <Text color="white">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Officiis veniam voluptatum rerum maiores, modi tempore.
                </Text>
              </Flex>
            </Flex>
            <Flex align="flex-end" mt="2">
              <Text color={'#A7A9B7'} fontWeight={'semibold'}>
                5:22 Am
              </Text>
            </Flex>

            <Flex flexDirection="row" w="full">
              <Flex
                bg="#F9F9F9"
                py="2"
                px="3"
                rounded="lg"
                style={{ alignSelf: 'flex-start' }}
                w="70%"
              >
                <Text color="#A7A9B7">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Officiis veniam voluptatum rerum maiores
                </Text>
              </Flex>
            </Flex>
            <Flex mt="2">
              <Text color={'#A7A9B7'} fontWeight={'semibold'}>
                5:22 Am
              </Text>
            </Flex>

            {/* {dataListChat.map((item, index) => {
              if (item.senderId == authUser.id) {
                return (
                  <Flex key={index} flexDirection="row" w="full" justify="flex-end">
                    <Flex
                      bg="#0a7cff"
                      py="2"
                      px="3"
                      rounded="full"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      <Text color="white">{item.text}</Text>
                    </Flex>
                  </Flex>
                );
              } else {
                return (
                  <Flex key={index} flexDirection="row" w="full">
                    <Flex
                      bg="#f3f3f5"
                      py="2"
                      px="3"
                      rounded="full"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      <Text color="black">{item.text}</Text>
                    </Flex>
                  </Flex>
                );
              }
            })} */}
          </ScrollView>
        </Flex>
        <Flex h="5%" flexDirection="row" align="center" px="3">
          <Flex bg="#f3f3f5" w="85%" rounded="lg">
            <TextInput
              value={textTyping}
              onChangeText={setTextTyping}
              style={{ width: '100%', padding: 10 }}
              onEndEditing={sendMessage}
              placeholder='Type your message'
            />
          </Flex>
          <TouchableWithoutFeedback onPress={sendMessage}>
            <Flex w="15%" flexDirection="row" justify="center">
              <Image source={require("../../../public/images/ic-send.png")} size={7}alt='icon'/>
            </Flex>
          </TouchableWithoutFeedback>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
}
