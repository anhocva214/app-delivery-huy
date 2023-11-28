import {
  Avatar,
  Flex,
  Image,
  KeyboardAvoidingView,
  Text,
  View,
} from 'native-base';
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment = require('moment');
const socket = io(process.env.EXPO_PUBLIC_API_URL as string);
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IDataChat {
  sender: number;
  content: string;
  receiver: number;
  createdAt: Date;
}

interface IUserMessage {
  fullname: string;
  lastMessage: {
    content: string;
    createdAt: Date;
  };
}

export default function MessageDetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<any>) {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const scrollViewRef = React.useRef<any>();
  const [textTyping, setTextTyping] = React.useState('');
  const { authUser } = useSelector((stateRedux: any) => stateRedux.userReducer);
  const [dataListChat, setDataListChat] = React.useState<IDataChat[]>([]);
  const [fullname, setFullname] = React.useState('');
  const [receiverId, setReceiverId] = React.useState(0)
  const [senderId, setSenderId] = React.useState(authUser.id)

  React.useEffect(() => {
    // @ts-ignore
    dispatch(getUserInfo());
  }, []);

  React.useEffect(() => {
    let userMessage: IUserMessage = route.params as any;
    console.log("🚀 ~ file: MessageDetail.tsx:61 ~ React.useEffect ~ userMessage:", userMessage)
    setFullname(userMessage.fullname);
    setReceiverId(route.params?.receiverId)
    setSenderId(route.params?.senderId)

    socket.on('message/get_all/response', async (data) => {
      let list: IDataChat[] = JSON.parse(data);
      // console.log("🚀 ~ file: MessageDetail.tsx:67 ~ socket.on ~ list:", list)
      const listIds = [route.params?.receiverId , route.params?.senderId ]
      const listFilter = list.filter(item => listIds.includes(item.sender) && listIds.includes(item.receiver))
      setDataListChat(listFilter);
    });

    if (authUser?.id) {
      socket.emit('message/get_all/request', route.params?.senderId);
    }

    socket.on(`message/receive`, (data)=>{
      let obj: {userId: string, data: IDataChat[]} = JSON.parse(data);
      if (obj.userId == route.params?.senderId){
        const list = obj.data
        const listIds = [route.params?.receiverId , route.params?.senderId ]
        const listFilter = list.filter(item => listIds.includes(item.sender) && listIds.includes(item.receiver))
        setDataListChat(listFilter);
      }
    })
    
  }, [authUser]);

  const sendMessage = () => {
    try {
      if (!textTyping) {
        return;
      }
      let data: IDataChat = {
        sender: senderId,
        content: textTyping,
        receiver: receiverId,
        createdAt: new Date(),
      };
      // console.log(data);
      socket.emit('message', JSON.stringify(data));
      setTextTyping('');
      
    } catch (err) {
      console.log(err);
    }
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
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
                  {fullname}
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
              alt="images"
            />
          </TouchableWithoutFeedback>
        </Flex>
        <Flex h="84%" align="flex-end" px="3">
          <ScrollView
            style={{ flex: 1, width: '100%', paddingTop: 20}}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ })
            }
          >
            {dataListChat.map((item, index) => {
              if (item.sender == senderId) {
                return (
                  <View key={index} mb="3">
                    <Flex flexDirection="row" w="full" justify="flex-end">
                      <Flex
                        bg="#1D272F"
                        py="2"
                        px="3"
                        rounded="lg"
                        roundedBottomRight={0}
                        style={{ alignSelf: 'flex-start' }}
                        maxW="70%"
                      >
                        <Text color="white">{item.content}</Text>
                      </Flex>
                    </Flex>
                    <Flex align="flex-end" mt="2">
                      <Text color={'#A7A9B7'} fontWeight={'semibold'}>
                        {moment(new Date(item.createdAt)).format('HH:MM A')}
                      </Text>
                    </Flex>
                  </View>
                );
              } else {
                return (
                  <View key={index} mb="3">
                    <Flex flexDirection="row" w="full">
                      <Flex
                        bg="#F9F9F9"
                        py="2"
                        px="3"
                        rounded="lg"
                        style={{ alignSelf: 'flex-start' }}
                        maxW="70%"
                      >
                        <Text color="#A7A9B7">{item.content}</Text>
                      </Flex>
                    </Flex>
                    <Flex mt="2">
                      <Text color={'#A7A9B7'} fontWeight={'semibold'}>
                        {moment(new Date(item.createdAt)).format('HH:MM A')}
                      </Text>
                    </Flex>
                  </View>
                );
              }
            })}

            <View h={100} />
          </ScrollView>
        </Flex>
        <Flex h="5%" flexDirection="row" align="center" px="3">
          <Flex bg="#f3f3f5" w="85%" rounded="lg">
            <TextInput
              value={textTyping}
              onChangeText={setTextTyping}
              style={{ width: '100%', padding: 10 }}
              // onSubmitEditing={sendMessage}
              placeholder="Type your message"
            />
          </Flex>
          <TouchableWithoutFeedback onPress={sendMessage}>
            <Flex w="15%" flexDirection="row" justify="center">
              <Image
                source={require('../../../public/images/ic-send.png')}
                size={7}
                alt="icon"
              />
            </Flex>
          </TouchableWithoutFeedback>
        </Flex>
      </Flex>
    </SafeAreaView>
  );
}
