import { Flex, Text } from 'native-base';
import { TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { submitUserInfo } from '../../redux-toolkit/actions/user';

interface IProps{
    active?: boolean;
    title: string;
    data: object;
    pageTitle: string;
}

export default function ButtonCus({title, active, data, pageTitle}:IProps) {
  const dispatch = useDispatch();
  const submitEvent = (pageTitle,data) => {
    if(pageTitle == 'Submit Edit Info') {
      // @ts-ignore
      dispatch(submitUserInfo(data));
    }
  }

  return (
    <>
      <TouchableOpacity onPress={() => submitEvent(pageTitle,data)}>
        <Flex
          w={300}
          borderWidth={1}
          borderColor={active ? "#F79E1B": '#A7A9B7'}
          alignItems="center"
          py="3"
          rounded={1000}
          bgColor={active ? "#F79E1B": "#fff"}
        >
          <Text color={active?"#fff": '#191D31'} fontWeight={'semibold'} fontSize={'lg'}>
            {title}
          </Text>
        </Flex>
      </TouchableOpacity>
    </>
  );
}
